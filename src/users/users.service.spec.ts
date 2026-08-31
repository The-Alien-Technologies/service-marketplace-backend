import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { DocumentStatus, Role, UserStatus } from '../../generated/prisma';
import { ProviderApplicationDecision } from './dto/review-provider-application.dto';
import { UsersService } from './users.service';
import { SocialProvider } from '../auth/dto/social-auth.dto';

describe('UsersService provider approval flow', () => {
  const prisma = {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
    },
    verificationDocument: {
      updateMany: jest.fn(),
    },
    $transaction: jest.fn(),
  };
  const notificationEvents = {
    providerApplicationDecision: jest.fn(),
  };
  let service: UsersService;

  beforeEach(() => {
    jest.clearAllMocks();
    prisma.$transaction.mockImplementation(async (callback) =>
      callback(prisma),
    );
    service = new UsersService(prisma as any, notificationEvents as any);
  });

  it('creates new providers as pending while clients remain active', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    prisma.user.create.mockImplementation(({ data }) =>
      Promise.resolve({ id: 'user-1', ...data }),
    );

    await service.create({
      email: 'provider@example.com',
      password: 'hashed',
      firstName: '',
      lastName: '',
      role: Role.SERVICE_PROVIDER,
    });
    expect(prisma.user.create).toHaveBeenLastCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: UserStatus.PENDING }),
      }),
    );

    await service.create({
      email: 'client@example.com',
      password: 'hashed',
      firstName: '',
      lastName: '',
      role: Role.USER,
    });
    expect(prisma.user.create).toHaveBeenLastCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: UserStatus.ACTIVE }),
      }),
    );
  });

  it('creates new Google providers as pending', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    prisma.user.create.mockImplementation(({ data }) =>
      Promise.resolve({ id: 'provider-1', ...data }),
    );

    await service.createFromSocialAuth({
      provider: SocialProvider.GOOGLE,
      accessToken: 'validated-token',
      providerId: 'google-1',
      email: 'provider@example.com',
      role: Role.SERVICE_PROVIDER,
    });

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        role: Role.SERVICE_PROVIDER,
        status: UserStatus.PENDING,
      }),
    });
  });

  it('rejects privileged roles supplied through social authentication', async () => {
    await expect(
      service.createFromSocialAuth({
        provider: SocialProvider.GOOGLE,
        accessToken: 'validated-token',
        providerId: 'google-1',
        email: 'attacker@example.com',
        role: Role.ADMIN as any,
      }),
    ).rejects.toThrow(BadRequestException);

    expect(prisma.user.create).not.toHaveBeenCalled();
  });

  it('prevents generic activation from bypassing provider review', async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 'provider-1',
      role: Role.SERVICE_PROVIDER,
      status: UserStatus.PENDING,
      isServiceProviderVerified: false,
    });

    await expect(
      service.updateStatus('provider-1', UserStatus.ACTIVE),
    ).rejects.toThrow(ConflictException);
    expect(prisma.user.update).not.toHaveBeenCalled();
  });

  it('requires a reason when rejecting an application', async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 'provider-1',
      role: Role.SERVICE_PROVIDER,
      status: UserStatus.PENDING,
      hasCompletedOnboarding: true,
      providerApplicationSubmittedAt: new Date(),
    });

    await expect(
      service.reviewProviderApplication(
        'provider-1',
        'admin-1',
        ProviderApplicationDecision.REJECT,
        '   ',
      ),
    ).rejects.toThrow(BadRequestException);
  });

  it('does not expose an unfinished provider as a reviewable application', async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 'provider-1',
      role: Role.SERVICE_PROVIDER,
      status: UserStatus.PENDING,
      providerApplicationSubmittedAt: null,
    });

    await expect(
      service.findProviderApplicationById('provider-1'),
    ).rejects.toThrow(NotFoundException);
  });

  it('approves a pending provider and verifies their documents atomically', async () => {
    const reviewedAt = new Date('2026-08-30T12:00:00.000Z');
    jest.useFakeTimers().setSystemTime(reviewedAt);
    prisma.user.findUnique
      .mockResolvedValueOnce({
        id: 'provider-1',
        role: Role.SERVICE_PROVIDER,
        status: UserStatus.PENDING,
        hasCompletedOnboarding: true,
        providerApplicationSubmittedAt: new Date('2026-08-29T12:00:00.000Z'),
        firstName: 'Ama',
        lastName: 'Mensah',
        phoneNumber: '+233200000000',
        emailVerified: true,
        phoneVerified: true,
        serviceProviderExperienceLevel: 'EXPERT',
        _count: {
          addresses: 1,
          interests: 1,
          verificationDocuments: 2,
        },
      })
      .mockResolvedValueOnce({
        id: 'provider-1',
        status: UserStatus.ACTIVE,
      });
    prisma.user.updateMany.mockResolvedValue({ count: 1 });
    prisma.verificationDocument.updateMany.mockResolvedValue({ count: 2 });

    await service.reviewProviderApplication(
      'provider-1',
      'admin-1',
      ProviderApplicationDecision.APPROVE,
    );

    expect(prisma.user.updateMany).toHaveBeenCalledWith({
      where: { id: 'provider-1', status: UserStatus.PENDING },
      data: expect.objectContaining({
        status: UserStatus.ACTIVE,
        isServiceProviderVerified: true,
        serviceProviderVerifiedAt: reviewedAt,
        providerApplicationReviewedBy: 'admin-1',
      }),
    });
    expect(prisma.verificationDocument.updateMany).toHaveBeenCalledWith({
      where: { userId: 'provider-1' },
      data: expect.objectContaining({ status: DocumentStatus.APPROVED }),
    });
    expect(prisma.user.findUnique).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        where: { id: 'provider-1' },
        omit: expect.objectContaining({ password: true }),
      }),
    );
    expect(notificationEvents.providerApplicationDecision).toHaveBeenCalledWith(
      {
        providerId: 'provider-1',
        approved: true,
        reason: undefined,
        reviewedAt,
      },
    );
    jest.useRealTimers();
  });

  it('does not approve an application that no longer meets the requirements', async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 'provider-1',
      role: Role.SERVICE_PROVIDER,
      status: UserStatus.PENDING,
      hasCompletedOnboarding: true,
      providerApplicationSubmittedAt: new Date(),
      firstName: 'Ama',
      lastName: 'Mensah',
      phoneNumber: '+233200000000',
      emailVerified: true,
      phoneVerified: false,
      serviceProviderExperienceLevel: 'EXPERT',
      _count: {
        addresses: 1,
        interests: 1,
        verificationDocuments: 1,
      },
    });

    await expect(
      service.reviewProviderApplication(
        'provider-1',
        'admin-1',
        ProviderApplicationDecision.APPROVE,
      ),
    ).rejects.toThrow(ConflictException);
    expect(prisma.user.updateMany).not.toHaveBeenCalled();
  });
});
