import { Injectable, NotFoundException, BadRequestException, ConflictException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FileUploadService } from '../common/services/file-upload.service';
import { Role, UserInterestType, ExperienceLevel } from '../common/enums';
import {
  UpdateLocationDto,
  UpdateProfileDto,
  UpdateInterestsDto,
  UpdateExperienceDto,
  UploadDocumentDto,
  DocumentResponseDto,
} from './dto';
import { User, UserAddress, UserInterest } from '../../generated/prisma';

@Injectable()
export class OnboardingService {
  private readonly logger = new Logger(OnboardingService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async updateLocation(userId: string, locationDto: UpdateLocationDto): Promise<UserAddress> {
    // Check if user exists
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // If setting as primary, unset other primary addresses
    if (locationDto.isPrimary) {
      await this.prisma.userAddress.updateMany({
        where: { userId, isPrimary: true },
        data: { isPrimary: false },
      });
    }

    // Create or update user address
    const existingAddress = await this.prisma.userAddress.findFirst({
      where: { userId },
    });

    let address: UserAddress;

    if (existingAddress) {
      address = await this.prisma.userAddress.update({
        where: { id: existingAddress.id },
        data: locationDto,
      });
    } else {
      address = await this.prisma.userAddress.create({
        data: {
          ...locationDto,
          userId,
          isPrimary: true, // First address is always primary
        },
      });
    }

    // Update profile completeness
    await this.updateProfileCompleteness(userId);

    return address;
  }

  async updateProfile(userId: string, profileDto: UpdateProfileDto): Promise<User> {
    // Check if username is unique (if provided)
    if (profileDto.username) {
      const existingUser = await this.prisma.user.findUnique({
        where: { username: profileDto.username },
      });
      if (existingUser && existingUser.id !== userId) {
        throw new ConflictException('Username already taken');
      }
    }

    // Convert dateOfBirth string to Date if provided
    const updateData: any = { ...profileDto };
    if (profileDto.dateOfBirth) {
      updateData.dateOfBirth = new Date(profileDto.dateOfBirth);
    }

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    // Update profile completeness
    await this.updateProfileCompleteness(userId);

    return user;
  }

  async updateProfileWithAvatar(
    userId: string,
    profileDto: UpdateProfileDto,
    avatarFile?: Express.Multer.File,
  ): Promise<User> {
    let avatarUrl: string | undefined;

    // Upload avatar if provided
    if (avatarFile) {
      try {
        const uploadResult = await this.fileUploadService.uploadAvatar(avatarFile, userId);
        avatarUrl = uploadResult.url;

        // Delete old avatar if exists
        const existingUser = await this.prisma.user.findUnique({ where: { id: userId } });
        if (existingUser?.avatar) {
            await this.fileUploadService.deleteFile(existingUser.avatar);
        }
      } catch (error) {
        this.logger.error('Failed to upload avatar:', error);
        throw new BadRequestException('Failed to upload avatar');
      }
    }

    // Check if username is unique (if provided)
    if (profileDto.username) {
      const existingUser = await this.prisma.user.findUnique({
        where: { username: profileDto.username },
      });
      if (existingUser && existingUser.id !== userId) {
        throw new ConflictException('Username already taken');
      }
    }

    // Convert dateOfBirth string to Date if provided
    const updateData: any = { ...profileDto };
    if (profileDto.dateOfBirth) {
      updateData.dateOfBirth = new Date(profileDto.dateOfBirth);
    }
    if (avatarUrl) {
      updateData.avatar = avatarUrl;
    }

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    // Update profile completeness
    await this.updateProfileCompleteness(userId);

    return user;
  }

  async updateInterests(userId: string, interestsDto: UpdateInterestsDto): Promise<UserInterest[]> {
    const { categoryIds, type } = interestsDto;

    // Verify all categories exist
    const categories = await this.prisma.category.findMany({
      where: { id: { in: categoryIds }, isActive: true },
    });

    if (categories.length !== categoryIds.length) {
      throw new BadRequestException('One or more categories not found or inactive');
    }

    // Remove existing interests of this type for the user
    await this.prisma.userInterest.deleteMany({
      where: { userId, type },
    });

    // Create new interests
    const interests = await Promise.all(
      categoryIds.map((categoryId) =>
        this.prisma.userInterest.create({
          data: {
            userId,
            categoryId,
            type,
          },
          include: {
            category: true,
          },
        }),
      ),
    );

    // Update profile completeness
    await this.updateProfileCompleteness(userId);

    return interests;
  }

  async updateExperience(userId: string, experienceDto: UpdateExperienceDto): Promise<User> {
    // Verify user is a service provider
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role !== Role.SERVICE_PROVIDER) {
      throw new BadRequestException('Only service providers can set experience level');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        serviceProviderExperienceLevel: experienceDto.experienceLevel,
      },
    });

    // Update profile completeness
    await this.updateProfileCompleteness(userId);

    return updatedUser;
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

    if (user.role !== Role.SERVICE_PROVIDER) {
      throw new BadRequestException('Only service providers can upload documents');
    }

    // Upload file to storage
    let uploadResult;
    try {
      uploadResult = await this.fileUploadService.uploadDocument(file, userId);
    } catch (error) {
      this.logger.error('Failed to upload document:', error);
      throw new BadRequestException('Failed to upload document');
    }

    const document = await this.prisma.verificationDocument.create({
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

    // Update profile completeness
    await this.updateProfileCompleteness(userId);

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
    const document = await this.prisma.verificationDocument.findFirst({
      where: { id: documentId, userId },
    });

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    // Delete file from storage
    try {
      await this.fileUploadService.deleteFile(document.fileUrl);
    } catch (error) {
      // Log error but don't fail the deletion
      console.warn('Failed to delete file from storage:', error);
    }

    await this.prisma.verificationDocument.delete({
      where: { id: documentId },
    });

    // Update profile completeness
    await this.updateProfileCompleteness(userId);
  }

  async completeOnboarding(userId: string): Promise<User> {
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

    // Validate required fields based on user role
    const missingFields = this.validateOnboardingCompletion(user);
    if (missingFields.length > 0) {
      throw new BadRequestException(`Missing required fields: ${missingFields.join(', ')}`);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        hasCompletedOnboarding: true,
        onboardingCompletedAt: new Date(),
        profileCompleteness: 100,
      },
    });

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

  private async updateProfileCompleteness(userId: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        addresses: true,
        interests: true,
        verificationDocuments: true,
      },
    });

    if (!user) return;

    const completeness = this.calculateProfileCompleteness(user);

    await this.prisma.user.update({
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
    if (user.interests && user.interests.length > 0) {
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

    if (user.interests && user.interests.length > 0) {
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
    const allSteps = user.role === Role.SERVICE_PROVIDER 
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
    if (!user.interests || user.interests.length === 0) missing.push('interests');

    // Required for service providers
    if (user.role === Role.SERVICE_PROVIDER) {
      if (!user.serviceProviderExperienceLevel) missing.push('experienceLevel');
      if (!user.verificationDocuments || user.verificationDocuments.length === 0) {
        missing.push('verificationDocuments');
      }
    }

    return missing;
  }
}
