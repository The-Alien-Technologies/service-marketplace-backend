import { BadRequestException } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';

const USER_ID = 'user-1';
const PHONE = '+233241234567';

const makeService = (verifiedUserId: string | null) => {
  const prisma = {
    verifiedPhone: {
      findUnique: jest
        .fn()
        .mockResolvedValue(
          verifiedUserId
            ? { phoneNumber: PHONE, userId: verifiedUserId }
            : null,
        ),
    },
    user: {
      findUnique: jest.fn().mockResolvedValue({ id: USER_ID, avatar: null }),
      update: jest.fn().mockResolvedValue({ id: USER_ID }),
    },
  };
  const fileUploadService = {
    uploadAvatar: jest.fn(),
    deleteFile: jest.fn(),
  };
  const service = new OnboardingService(
    prisma as never,
    fileUploadService as never,
  );
  jest
    .spyOn(service as any, 'updateProfileCompleteness')
    .mockResolvedValue(undefined);

  return { prisma, fileUploadService, service };
};

describe('OnboardingService verified phone enforcement', () => {
  it('rejects an unverified phone before uploading an avatar', async () => {
    const { service, prisma, fileUploadService } = makeService(null);

    await expect(
      service.updateProfileWithAvatar(
        USER_ID,
        { phoneNumber: '024 123 4567' },
        { originalname: 'avatar.png' } as never,
      ),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(fileUploadService.uploadAvatar).not.toHaveBeenCalled();
    expect(prisma.user.update).not.toHaveBeenCalled();
  });

  it('stores the canonical verified phone and country code', async () => {
    const { service, prisma } = makeService(USER_ID);

    await service.updateProfile(USER_ID, { phoneNumber: '024 123 4567' });

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: USER_ID },
      data: {
        phoneNumber: PHONE,
        countryCode: '+233',
        phoneVerified: true,
      },
    });
  });
});
