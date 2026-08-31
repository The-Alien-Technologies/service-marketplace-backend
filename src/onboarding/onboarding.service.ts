import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  Logger,
  Optional,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FileUploadService } from '../common/services/file-upload.service';
import { Role } from '../common/enums';
import {
  UpdateLocationDto,
  UpdateProfileDto,
  UpdateInterestsDto,
  UpdateExperienceDto,
  UploadDocumentDto,
  DocumentResponseDto,
} from './dto';
import {
  DocumentStatus,
  Prisma,
  User,
  UserAddress,
  UserInterest,
  UserInterestType,
  UserStatus,
} from '../../generated/prisma';
import { normalizePhoneNumber } from '../common/utils/phone.util';
import { NotificationEventsService } from '../notifications/notification-events.service';

@Injectable()
export class OnboardingService {
  private readonly logger = new Logger(OnboardingService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly fileUploadService: FileUploadService,
    @Optional()
    private readonly notificationEvents?: NotificationEventsService,
  ) {}

  async getUserWithRelations(userId: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        addresses: true,
        interests: {
          include: {
            category: true,
          },
        },
        verificationDocuments: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateLocation(
    userId: string,
    locationDto: UpdateLocationDto,
  ): Promise<UserAddress> {
    return this.prisma.$transaction(async (transaction) => {
      await this.lockUserRow(transaction, userId);
      const user = await transaction.user.findUnique({
        where: { id: userId },
      });
      if (!user) throw new NotFoundException('User not found');
      this.assertProviderApplicationEditable(user);

      if (locationDto.isPrimary) {
        await transaction.userAddress.updateMany({
          where: { userId, isPrimary: true },
          data: { isPrimary: false },
        });
      }

      const existingAddress = await transaction.userAddress.findFirst({
        where: { userId },
      });
      const address = existingAddress
        ? await transaction.userAddress.update({
            where: { id: existingAddress.id },
            data: locationDto,
          })
        : await transaction.userAddress.create({
            data: {
              ...locationDto,
              userId,
              isPrimary: true,
            },
          });

      await this.updateProfileCompleteness(userId, transaction);
      return address;
    });
  }

  async updateProfile(
    userId: string,
    profileDto: UpdateProfileDto,
  ): Promise<User> {
    return this.prisma.$transaction(async (transaction) => {
      await this.lockUserRow(transaction, userId);
      const currentUser = await transaction.user.findUnique({
        where: { id: userId },
      });
      if (!currentUser) throw new NotFoundException('User not found');
      this.assertProviderApplicationEditable(currentUser);
      await this.assertUsernameAvailable(
        transaction,
        userId,
        profileDto.username,
      );

      const updateData = await this.prepareProfileUpdate(
        userId,
        profileDto,
        transaction,
      );
      const user = await transaction.user.update({
        where: { id: userId },
        data: updateData,
      });
      await this.updateProfileCompleteness(userId, transaction);
      return user;
    });
  }

  async updateProfileWithAvatar(
    userId: string,
    profileDto: UpdateProfileDto,
    avatarFile?: Express.Multer.File,
  ): Promise<User> {
    // Fail fast before uploading, then re-check under a database lock before
    // persisting so a concurrent submission cannot be edited afterward.
    await this.ensureProviderApplicationEditable(userId);
    await this.prepareProfileUpdate(userId, profileDto);
    let avatarUrl: string | undefined;

    if (avatarFile) {
      try {
        const uploadResult = await this.fileUploadService.uploadAvatar(
          avatarFile,
          userId,
        );
        avatarUrl = uploadResult.url;
      } catch (error) {
        this.logger.error('Failed to upload avatar:', error);
        throw new BadRequestException('Failed to upload avatar');
      }
    }

    let previousAvatar: string | null = null;
    let user: User;
    try {
      user = await this.prisma.$transaction(async (transaction) => {
        await this.lockUserRow(transaction, userId);
        const currentUser = await transaction.user.findUnique({
          where: { id: userId },
        });
        if (!currentUser) throw new NotFoundException('User not found');
        this.assertProviderApplicationEditable(currentUser);
        previousAvatar = currentUser.avatar;
        await this.assertUsernameAvailable(
          transaction,
          userId,
          profileDto.username,
        );

        const updateData = await this.prepareProfileUpdate(
          userId,
          profileDto,
          transaction,
        );
        if (avatarUrl) updateData.avatar = avatarUrl;

        const updatedUser = await transaction.user.update({
          where: { id: userId },
          data: updateData,
        });
        await this.updateProfileCompleteness(userId, transaction);
        return updatedUser;
      });
    } catch (error) {
      if (avatarUrl) {
        await this.deleteUploadedFileQuietly(
          avatarUrl,
          'new avatar after a rejected profile update',
        );
      }
      throw error;
    }

    if (avatarUrl && previousAvatar && previousAvatar !== avatarUrl) {
      await this.deleteUploadedFileQuietly(previousAvatar, 'previous avatar');
    }

    return user;
  }

  private async prepareProfileUpdate(
    userId: string,
    profileDto: UpdateProfileDto,
    database: Pick<Prisma.TransactionClient, 'verifiedPhone'> = this.prisma,
  ): Promise<any> {
    const updateData: any = { ...profileDto };

    if (profileDto.dateOfBirth) {
      updateData.dateOfBirth = new Date(profileDto.dateOfBirth);
    }

    if (profileDto.phoneNumber) {
      const normalized = normalizePhoneNumber(profileDto.phoneNumber);
      if (!normalized) {
        throw new BadRequestException('Enter a valid phone number.');
      }

      const verifiedPhone = await database.verifiedPhone.findUnique({
        where: { phoneNumber: normalized.phoneNumber },
      });
      if (verifiedPhone?.userId !== userId) {
        throw new BadRequestException(
          'Verify this phone number before saving your profile.',
        );
      }

      updateData.phoneNumber = normalized.phoneNumber;
      updateData.countryCode = normalized.countryCode;
      updateData.phoneVerified = true;
    }

    return updateData;
  }

  async updateInterests(
    userId: string,
    interestsDto: UpdateInterestsDto,
  ): Promise<UserInterest[]> {
    const { categoryIds, type } = interestsDto;
    return this.prisma.$transaction(async (transaction) => {
      await this.lockUserRow(transaction, userId);
      const user = await transaction.user.findUnique({
        where: { id: userId },
      });
      if (!user) throw new NotFoundException('User not found');
      this.assertProviderApplicationEditable(user);

      const categories = await transaction.category.findMany({
        where: { id: { in: categoryIds }, isActive: true },
      });
      if (categories.length !== categoryIds.length) {
        throw new BadRequestException(
          'One or more categories not found or inactive',
        );
      }

      await transaction.userInterest.deleteMany({ where: { userId, type } });
      const interests = await Promise.all(
        categoryIds.map((categoryId) =>
          transaction.userInterest.create({
            data: { userId, categoryId, type },
            include: { category: true },
          }),
        ),
      );
      await this.updateProfileCompleteness(userId, transaction);
      return interests;
    });
  }

  async updateExperience(
    userId: string,
    experienceDto: UpdateExperienceDto,
  ): Promise<User> {
    return this.prisma.$transaction(async (transaction) => {
      await this.lockUserRow(transaction, userId);
      const user = await transaction.user.findUnique({
        where: { id: userId },
      });
      if (!user) throw new NotFoundException('User not found');
      this.assertProviderApplicationEditable(user);
      if (user.role !== Role.SERVICE_PROVIDER) {
        throw new BadRequestException(
          'Only service providers can set experience level',
        );
      }

      const updatedUser = await transaction.user.update({
        where: { id: userId },
        data: {
          serviceProviderExperienceLevel: experienceDto.experienceLevel,
        },
      });
      await this.updateProfileCompleteness(userId, transaction);
      return updatedUser;
    });
  }

  async uploadDocument(
    userId: string,
    file: Express.Multer.File,
    documentDto: UploadDocumentDto,
  ): Promise<DocumentResponseDto> {
    // Verify user is a service provider
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    this.assertProviderApplicationEditable(user);

    if (user.role !== Role.SERVICE_PROVIDER) {
      throw new BadRequestException(
        'Only service providers can upload documents',
      );
    }

    // Upload file to storage
    let uploadResult;
    try {
      uploadResult = await this.fileUploadService.uploadDocument(file, userId);
    } catch (error) {
      this.logger.error('Failed to upload document:', error);
      throw new BadRequestException('Failed to upload document');
    }

    let document;
    try {
      document = await this.prisma.$transaction(async (transaction) => {
        await this.lockUserRow(transaction, userId);
        const currentUser = await transaction.user.findUnique({
          where: { id: userId },
        });
        if (!currentUser) throw new NotFoundException('User not found');
        this.assertProviderApplicationEditable(currentUser);
        if (currentUser.role !== Role.SERVICE_PROVIDER) {
          throw new BadRequestException(
            'Only service providers can upload documents',
          );
        }

        const created = await transaction.verificationDocument.create({
          data: {
            userId,
            fileName: uploadResult.fileName,
            originalName: file.originalname,
            fileUrl: uploadResult.url,
            fileType: uploadResult.fileType,
            fileSize: uploadResult.fileSize,
            documentType: documentDto.documentType,
          },
        });
        await this.updateProfileCompleteness(userId, transaction);
        return created;
      });
    } catch (error) {
      await this.deleteUploadedFileQuietly(
        uploadResult.url,
        'document after a rejected application update',
      );
      throw error;
    }

    return {
      id: document.id,
      fileName: document.fileName,
      originalName: document.originalName,
      fileUrl: document.fileUrl,
      fileType: document.fileType,
      fileSize: document.fileSize,
      documentType: document.documentType as any,
      status: document.status,
      uploadedAt: document.uploadedAt,
    };
  }

  async getUserDocuments(userId: string): Promise<DocumentResponseDto[]> {
    const documents = await this.prisma.verificationDocument.findMany({
      where: { userId },
      orderBy: { uploadedAt: 'desc' },
    });

    return documents.map((doc) => ({
      id: doc.id,
      fileName: doc.fileName,
      originalName: doc.originalName,
      fileUrl: doc.fileUrl,
      fileType: doc.fileType,
      fileSize: doc.fileSize,
      documentType: doc.documentType as any,
      status: doc.status,
      uploadedAt: doc.uploadedAt,
    }));
  }

  async deleteDocument(userId: string, documentId: string): Promise<void> {
    const document = await this.prisma.$transaction(async (transaction) => {
      await this.lockUserRow(transaction, userId);
      const user = await transaction.user.findUnique({
        where: { id: userId },
      });
      if (!user) throw new NotFoundException('User not found');
      this.assertProviderApplicationEditable(user);

      const existing = await transaction.verificationDocument.findFirst({
        where: { id: documentId, userId },
      });
      if (!existing) throw new NotFoundException('Document not found');

      await transaction.verificationDocument.delete({
        where: { id: documentId },
      });
      await this.updateProfileCompleteness(userId, transaction);
      return existing;
    });

    await this.deleteUploadedFileQuietly(document.fileUrl, 'deleted document');
  }

  async completeOnboarding(userId: string): Promise<User> {
    let applicationWasSubmitted = false;
    let submittedAt: Date | null = null;

    const updatedUser = await this.prisma.$transaction(async (transaction) => {
      await this.lockUserRow(transaction, userId);
      const user = await transaction.user.findUnique({
        where: { id: userId },
        include: {
          addresses: true,
          interests: true,
          verificationDocuments: true,
        },
      });
      if (!user) throw new NotFoundException('User not found');

      const missingFields = this.validateOnboardingCompletion(user);
      if (missingFields.length > 0) {
        throw new BadRequestException(
          `Missing required fields: ${missingFields.join(', ')}`,
        );
      }

      const shouldSubmitProviderApplication =
        user.role === Role.SERVICE_PROVIDER &&
        (user.status === UserStatus.REJECTED ||
          (user.status === UserStatus.PENDING &&
            !user.providerApplicationSubmittedAt));

      if (shouldSubmitProviderApplication) {
        submittedAt = new Date();
        const submittedUser = await transaction.user.update({
          where: { id: userId },
          data: {
            status: UserStatus.PENDING,
            hasCompletedOnboarding: true,
            onboardingCompletedAt: user.onboardingCompletedAt ?? new Date(),
            profileCompleteness: 100,
            isServiceProviderVerified: false,
            serviceProviderVerifiedAt: null,
            providerApplicationSubmittedAt: submittedAt,
            providerApplicationReviewedAt: null,
            providerApplicationReviewedBy: null,
            providerApplicationRejectionReason: null,
          },
        });

        await transaction.verificationDocument.updateMany({
          where: { userId },
          data: {
            status: DocumentStatus.UNDER_REVIEW,
            reviewNotes: null,
            reviewedAt: null,
            reviewedBy: null,
          },
        });

        applicationWasSubmitted = true;
        return submittedUser;
      }

      return transaction.user.update({
        where: { id: userId },
        data: {
          hasCompletedOnboarding: true,
          onboardingCompletedAt: user.onboardingCompletedAt ?? new Date(),
          profileCompleteness: 100,
        },
      });
    });

    if (applicationWasSubmitted && submittedAt) {
      const providerName =
        [updatedUser.firstName, updatedUser.lastName]
          .filter(Boolean)
          .join(' ') ||
        updatedUser.displayName ||
        updatedUser.email;
      await this.notificationEvents?.providerApplicationSubmitted({
        providerId: updatedUser.id,
        providerName,
        submittedAt,
      });
    }

    return updatedUser;
  }

  async getOnboardingStatus(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        addresses: true,
        interests: true,
        verificationDocuments: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const completedSteps = this.getCompletedSteps(user);
    const nextStep = this.getNextStep(user, completedSteps);

    return {
      hasCompletedOnboarding: user.hasCompletedOnboarding,
      profileCompleteness: user.profileCompleteness,
      completedSteps,
      nextStep,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
      },
    };
  }

  private async updateProfileCompleteness(
    userId: string,
    database: Pick<Prisma.TransactionClient, 'user'> = this.prisma,
  ): Promise<void> {
    const user = await database.user.findUnique({
      where: { id: userId },
      include: {
        addresses: true,
        interests: true,
        verificationDocuments: true,
      },
    });

    if (!user) return;

    const completeness = this.calculateProfileCompleteness(user);

    await database.user.update({
      where: { id: userId },
      data: { profileCompleteness: completeness },
    });
  }

  private calculateProfileCompleteness(user: any): number {
    let completedSteps = 0;
    const totalSteps = user.role === Role.SERVICE_PROVIDER ? 5 : 3;

    // Step 1: Location (required for all)
    if (user.addresses && user.addresses.length > 0) {
      completedSteps++;
    }

    // Step 2: Profile (required for all)
    if (user.firstName && user.lastName && user.phoneNumber) {
      completedSteps++;
    }

    // Step 3: Interests (required for all)
    if (this.hasRequiredInterests(user)) {
      completedSteps++;
    }

    // Step 4: Experience (SERVICE_PROVIDER only)
    if (user.role === Role.SERVICE_PROVIDER) {
      if (user.serviceProviderExperienceLevel) {
        completedSteps++;
      }

      // Step 5: Documents (SERVICE_PROVIDER only)
      if (user.verificationDocuments && user.verificationDocuments.length > 0) {
        completedSteps++;
      }
    }

    return Math.round((completedSteps / totalSteps) * 100);
  }

  private getCompletedSteps(user: any): string[] {
    const completed: string[] = [];

    if (user.addresses && user.addresses.length > 0) {
      completed.push('location');
    }

    if (user.firstName && user.lastName && user.phoneNumber) {
      completed.push('profile');
    }

    if (this.hasRequiredInterests(user)) {
      completed.push('interests');
    }

    if (user.role === Role.SERVICE_PROVIDER) {
      if (user.serviceProviderExperienceLevel) {
        completed.push('experience');
      }

      if (user.verificationDocuments && user.verificationDocuments.length > 0) {
        completed.push('documents');
      }
    }

    return completed;
  }

  private getNextStep(user: any, completedSteps: string[]): string | null {
    const allSteps =
      user.role === Role.SERVICE_PROVIDER
        ? ['location', 'profile', 'interests', 'experience', 'documents']
        : ['location', 'profile', 'interests'];

    for (const step of allSteps) {
      if (!completedSteps.includes(step)) {
        return step;
      }
    }

    return null; // All steps completed
  }

  private validateOnboardingCompletion(user: any): string[] {
    const missing: string[] = [];

    // Required for all users
    if (!user.firstName) missing.push('firstName');
    if (!user.lastName) missing.push('lastName');
    if (!user.phoneNumber) missing.push('phoneNumber');
    if (!user.addresses || user.addresses.length === 0) missing.push('address');
    if (!this.hasRequiredInterests(user)) missing.push('interests');

    // Required for service providers
    if (user.role === Role.SERVICE_PROVIDER) {
      if (!user.emailVerified) missing.push('emailVerification');
      if (!user.phoneVerified) missing.push('phoneVerification');
      if (!user.serviceProviderExperienceLevel) missing.push('experienceLevel');
      if (
        !user.verificationDocuments ||
        user.verificationDocuments.length === 0
      ) {
        missing.push('verificationDocuments');
      }
    }

    return missing;
  }

  private async ensureProviderApplicationEditable(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    this.assertProviderApplicationEditable(user);
  }

  private hasRequiredInterests(
    user: Pick<User, 'role'> & { interests?: UserInterest[] },
  ): boolean {
    if (!user.interests) return false;
    if (user.role !== Role.SERVICE_PROVIDER) return user.interests.length > 0;
    return user.interests.some(
      (interest) => interest.type === UserInterestType.SERVICE,
    );
  }

  private async lockUserRow(
    transaction: Prisma.TransactionClient,
    userId: string,
  ): Promise<void> {
    const rows = await transaction.$queryRaw<Array<{ id: string }>>(
      Prisma.sql`SELECT "id" FROM "users" WHERE "id" = ${userId} FOR UPDATE`,
    );
    if (rows.length === 0) throw new NotFoundException('User not found');
  }

  private async assertUsernameAvailable(
    database: Pick<Prisma.TransactionClient, 'user'>,
    userId: string,
    username?: string,
  ): Promise<void> {
    if (!username) return;
    const existingUser = await database.user.findUnique({
      where: { username },
    });
    if (existingUser && existingUser.id !== userId) {
      throw new ConflictException('Username already taken');
    }
  }

  private async deleteUploadedFileQuietly(
    fileUrl: string,
    description: string,
  ): Promise<void> {
    try {
      await this.fileUploadService.deleteFile(fileUrl);
    } catch (error) {
      this.logger.warn(
        `Failed to delete ${description}: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      );
    }
  }

  private assertProviderApplicationEditable(
    user: Pick<User, 'role' | 'status' | 'providerApplicationSubmittedAt'>,
  ) {
    if (
      user.role === Role.SERVICE_PROVIDER &&
      user.providerApplicationSubmittedAt &&
      user.status !== UserStatus.REJECTED
    ) {
      throw new ConflictException(
        user.status === UserStatus.PENDING
          ? 'Your provider application is locked while it is under review'
          : 'Approved provider application documents cannot be changed',
      );
    }
  }
}
