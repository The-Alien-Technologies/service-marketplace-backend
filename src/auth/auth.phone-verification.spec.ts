import { BadGatewayException, ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SmsProvider, TEST_OTP_CODE } from '../common/services/sms.service';

const USER_ID = 'user-1';
const PHONE = '+233241234567';

const makeService = () => {
  const transaction = {
    verifiedPhone: {
      deleteMany: jest.fn().mockResolvedValue({ count: 0 }),
      create: jest
        .fn()
        .mockResolvedValue({ phoneNumber: PHONE, userId: USER_ID }),
    },
    phoneVerification: {
      updateMany: jest.fn().mockResolvedValue({ count: 1 }),
    },
    user: { update: jest.fn().mockResolvedValue({ id: USER_ID }) },
  };
  const prisma = {
    verifiedPhone: { findUnique: jest.fn().mockResolvedValue(null) },
    phoneVerification: {
      findFirst: jest.fn().mockResolvedValue(null),
      count: jest.fn().mockResolvedValue(0),
      create: jest.fn().mockResolvedValue({ id: 'otp-1' }),
      delete: jest.fn().mockResolvedValue({ id: 'otp-1' }),
      update: jest.fn(),
    },
    $transaction: jest.fn(
      async (callback: (client: typeof transaction) => unknown) =>
        callback(transaction),
    ),
  };
  const smsService = {
    getProvider: jest.fn().mockReturnValue(SmsProvider.TEST),
    sendVerificationCode: jest.fn().mockResolvedValue(undefined),
  };
  const service = new AuthService(
    {} as never,
    {} as never,
    {} as never,
    smsService as never,
    {} as never,
    {} as never,
    {} as never,
    prisma as never,
  );

  return { prisma, smsService, transaction, service };
};

describe('AuthService phone verification', () => {
  it('binds a TEST-mode OTP attempt to the authenticated user', async () => {
    const { service, prisma, smsService } = makeService();

    await expect(
      service.sendPhoneVerificationOtp(USER_ID, '024 123 4567'),
    ).resolves.toMatchObject({
      phoneNumber: PHONE,
    });
    expect(prisma.phoneVerification.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        userId: USER_ID,
        phoneNumber: PHONE,
        otpCode: TEST_OTP_CODE,
      }),
    });
    expect(smsService.sendVerificationCode).toHaveBeenCalledWith(
      PHONE,
      TEST_OTP_CODE,
    );
  });

  it('deletes the attempt when the SMS provider fails', async () => {
    const { service, prisma, smsService } = makeService();
    smsService.sendVerificationCode.mockRejectedValueOnce(new Error('timeout'));

    await expect(
      service.sendPhoneVerificationOtp(USER_ID, PHONE),
    ).rejects.toBeInstanceOf(BadGatewayException);
    expect(prisma.phoneVerification.delete).toHaveBeenCalledWith({
      where: { id: 'otp-1' },
    });
  });

  it('rate limits repeated sends during the cooldown', async () => {
    const { service, prisma, smsService } = makeService();
    prisma.phoneVerification.findFirst.mockResolvedValue({
      createdAt: new Date(),
    });

    await expect(
      service.sendPhoneVerificationOtp(USER_ID, PHONE),
    ).rejects.toMatchObject({ status: 429 });
    expect(prisma.phoneVerification.create).not.toHaveBeenCalled();
    expect(smsService.sendVerificationCode).not.toHaveBeenCalled();
  });

  it('increments failed verification attempts', async () => {
    const { service, prisma } = makeService();
    prisma.phoneVerification.findFirst.mockResolvedValue({
      id: 'otp-1',
      otpCode: TEST_OTP_CODE,
      attempts: 1,
      maxAttempts: 5,
      expiresAt: new Date(Date.now() + 60_000),
    });

    await expect(
      service.verifyPhoneOtp(USER_ID, PHONE, '000000'),
    ).resolves.toEqual({ valid: false, attemptsLeft: 3 });
    expect(prisma.phoneVerification.update).toHaveBeenCalledWith({
      where: { id: 'otp-1' },
      data: { attempts: 2 },
    });
  });

  it('does not let a user verify a number claimed by another account', async () => {
    const { service, prisma } = makeService();
    prisma.phoneVerification.findFirst.mockResolvedValue({
      id: 'otp-1',
      otpCode: TEST_OTP_CODE,
      attempts: 0,
      maxAttempts: 5,
      expiresAt: new Date(Date.now() + 60_000),
    });
    prisma.verifiedPhone.findUnique.mockResolvedValue({
      phoneNumber: PHONE,
      userId: 'user-2',
    });

    await expect(
      service.verifyPhoneOtp(USER_ID, PHONE, TEST_OTP_CODE),
    ).rejects.toBeInstanceOf(ConflictException);
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it('claims the verified number and updates the user atomically', async () => {
    const { service, prisma, transaction } = makeService();
    prisma.phoneVerification.findFirst.mockResolvedValue({
      id: 'otp-1',
      otpCode: TEST_OTP_CODE,
      attempts: 0,
      maxAttempts: 5,
      expiresAt: new Date(Date.now() + 60_000),
    });

    await expect(
      service.verifyPhoneOtp(USER_ID, PHONE, TEST_OTP_CODE),
    ).resolves.toEqual({ valid: true, phoneNumber: PHONE });
    expect(transaction.verifiedPhone.create).toHaveBeenCalledWith({
      data: { userId: USER_ID, phoneNumber: PHONE },
    });
    expect(transaction.user.update).toHaveBeenCalledWith({
      where: { id: USER_ID },
      data: {
        phoneNumber: PHONE,
        countryCode: '+233',
        phoneVerified: true,
      },
    });
  });
});
