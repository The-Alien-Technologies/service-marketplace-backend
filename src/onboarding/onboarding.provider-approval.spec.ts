import { BadRequestException, ConflictException } from '@nestjs/common';
import {
  DocumentStatus,
  ExperienceLevel,
  Role,
  UserInterestType,
  UserStatus,
} from '../../generated/prisma';
import { OnboardingService } from './onboarding.service';

describe('OnboardingService provider application submission', () => {
  const submittedProvider = {
    id: 'provider-1',
    email: 'provider@example.com',
    firstName: 'Ama',
    lastName: 'Mensah',
    displayName: null,
    phoneNumber: '+233200000000',
    emailVerified: true,
    phoneVerified: true,
    role: Role.SERVICE_PROVIDER,
    status: UserStatus.PENDING,
    serviceProviderExperienceLevel: ExperienceLevel.EXPERT,
    addresses: [{ id: 'address-1' }],
    interests: [{ id: 'interest-1', type: UserInterestType.SERVICE }],
    verificationDocuments: [{ id: 'document-1' }],
    providerApplicationSubmittedAt: null,
    onboardingCompletedAt: null,
  };
  const prisma = {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
    },
    verificationDocument: {
      create: jest.fn(),
      updateMany: jest.fn(),
    },
    $queryRaw: jest.fn(),
    $transaction: jest.fn(),
  };
  const fileUploadService = {
    uploadDocument: jest.fn(),
    deleteFile: jest.fn(),
  };
  const notificationEvents = {
    providerApplicationSubmitted: jest.fn(),
  };
  let service: OnboardingService;

  beforeEach(() => {
    jest.clearAllMocks();
    prisma.user.findUnique.mockResolvedValue(submittedProvider);
    prisma.user.update.mockImplementation(({ data }) =>
      Promise.resolve({ ...submittedProvider, ...data }),
    );
    prisma.user.updateMany.mockResolvedValue({ count: 1 });
    prisma.verificationDocument.updateMany.mockResolvedValue({ count: 1 });
    prisma.$queryRaw.mockResolvedValue([{ id: 'provider-1' }]);
    prisma.$transaction.mockImplementation(async (callback) =>
      callback(prisma),
    );
    service = new OnboardingService(
      prisma as any,
      fileUploadService as any,
      notificationEvents as any,
    );
  });

  it('submits documents for review and notifies admins', async () => {
    const result = await service.completeOnboarding('provider-1');

    expect(prisma.verificationDocument.updateMany).toHaveBeenCalledWith({
      where: { userId: 'provider-1' },
      data: {
        status: DocumentStatus.UNDER_REVIEW,
        reviewNotes: null,
        reviewedAt: null,
        reviewedBy: null,
      },
    });
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 'provider-1' },
      data: expect.objectContaining({
        status: UserStatus.PENDING,
        hasCompletedOnboarding: true,
        providerApplicationSubmittedAt: expect.any(Date),
        providerApplicationRejectionReason: null,
      }),
    });
    expect(result.status).toBe(UserStatus.PENDING);
    expect(
      notificationEvents.providerApplicationSubmitted,
    ).toHaveBeenCalledWith(
      expect.objectContaining({
        providerId: 'provider-1',
        providerName: 'Ama Mensah',
        submittedAt: expect.any(Date),
      }),
    );
  });

  it('locks the application row before reading submission requirements', async () => {
    let rowLocked = false;
    prisma.$queryRaw.mockImplementationOnce(async () => {
      rowLocked = true;
      return [{ id: 'provider-1' }];
    });
    prisma.user.findUnique.mockImplementationOnce(async () => {
      expect(rowLocked).toBe(true);
      return submittedProvider;
    });

    await service.completeOnboarding('provider-1');

    expect(prisma.$queryRaw).toHaveBeenCalledTimes(1);
  });

  it('requires verified email and phone before submission', async () => {
    prisma.user.findUnique.mockResolvedValueOnce({
      ...submittedProvider,
      emailVerified: false,
      phoneVerified: false,
    });

    await expect(service.completeOnboarding('provider-1')).rejects.toThrow(
      BadRequestException,
    );
    expect(prisma.user.update).not.toHaveBeenCalled();
    expect(prisma.verificationDocument.updateMany).not.toHaveBeenCalled();
  });

  it('requires a service category rather than a client interest', async () => {
    prisma.user.findUnique.mockResolvedValueOnce({
      ...submittedProvider,
      interests: [{ id: 'interest-1', type: UserInterestType.INTEREST }],
    });

    await expect(service.completeOnboarding('provider-1')).rejects.toThrow(
      BadRequestException,
    );
    expect(prisma.user.update).not.toHaveBeenCalled();
  });

  it('locks a submitted application while it is under review', async () => {
    prisma.user.findUnique.mockResolvedValueOnce({
      ...submittedProvider,
      providerApplicationSubmittedAt: new Date(),
    });

    await expect(
      service.updateExperience('provider-1', {
        experienceLevel: ExperienceLevel.BEGINNER as any,
      }),
    ).rejects.toThrow(ConflictException);
    expect(prisma.user.update).not.toHaveBeenCalled();
  });

  it('does not resubmit an application that was already claimed', async () => {
    const pendingProvider = {
      ...submittedProvider,
      status: UserStatus.PENDING,
      providerApplicationSubmittedAt: new Date('2026-08-20T10:00:00.000Z'),
    };
    prisma.user.findUnique.mockResolvedValue(pendingProvider);

    await service.completeOnboarding('provider-1');

    expect(prisma.verificationDocument.updateMany).not.toHaveBeenCalled();
    expect(
      notificationEvents.providerApplicationSubmitted,
    ).not.toHaveBeenCalled();
  });

  it('rejects and cleans up a stale document upload after resubmission', async () => {
    const rejectedProvider = {
      ...submittedProvider,
      status: UserStatus.REJECTED,
      providerApplicationSubmittedAt: new Date('2026-08-20T10:00:00.000Z'),
    };
    prisma.user.findUnique
      .mockResolvedValueOnce(rejectedProvider)
      .mockResolvedValueOnce({
        ...rejectedProvider,
        status: UserStatus.PENDING,
      });
    fileUploadService.uploadDocument.mockResolvedValue({
      fileName: 'stored.pdf',
      fileType: 'application/pdf',
      fileSize: 100,
      url: 'https://files.example/stored.pdf',
    });

    await expect(
      service.uploadDocument(
        'provider-1',
        { originalname: 'credential.pdf' } as any,
        { documentType: 'CERTIFICATION' } as any,
      ),
    ).rejects.toThrow(ConflictException);

    expect(prisma.verificationDocument.create).not.toHaveBeenCalled();
    expect(fileUploadService.deleteFile).toHaveBeenCalledWith(
      'https://files.example/stored.pdf',
    );
  });
});
