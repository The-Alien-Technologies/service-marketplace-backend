import {
  BadRequestException,
  Injectable,
  ConflictException,
  NotFoundException,
  Optional,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from '../auth/dto/register.dto';
import { SocialAuthDto, SocialProvider } from '../auth/dto/social-auth.dto';
import { UpdateProfileDto } from '../auth/dto/update-profile.dto';
import {
  DocumentStatus,
  Role,
  User,
  UserInterestType,
  UserStatus,
} from '../../generated/prisma';
import { NotificationEventsService } from '../notifications/notification-events.service';
import { ProviderApplicationDecision } from './dto/review-provider-application.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    @Optional()
    private readonly notificationEvents?: NotificationEventsService,
  ) {}

  async create(
    userData: Partial<RegisterDto> & {
      firstName: string;
      lastName: string;
      password: string;
    },
  ): Promise<User> {
    // Check if user already exists
    const existingUser = await this.findByEmail(userData.email);
    if (existingUser) {
      throw new ConflictException({
        message: 'User with this email already exists',
      });
    }

    return this.prisma.user.create({
      data: {
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role || Role.USER,
        status:
          userData.role === Role.SERVICE_PROVIDER
            ? UserStatus.PENDING
            : UserStatus.ACTIVE,
        emailVerified: false,
      },
    });
  }

  async createFromSocialAuth(socialAuthDto: SocialAuthDto): Promise<User> {
    const { provider, providerId, email, role } = socialAuthDto;

    // Only support Google for now
    if (provider !== SocialProvider.GOOGLE) {
      throw new ConflictException({
        message: 'Only Google authentication is supported',
      });
    }

    if (role && role !== Role.USER && role !== Role.SERVICE_PROVIDER) {
      throw new BadRequestException({ message: 'Invalid account role' });
    }

    const requestedRole =
      role === Role.SERVICE_PROVIDER ? Role.SERVICE_PROVIDER : Role.USER;

    // Check if user already exists by email
    let user = await this.findByEmail(email);

    if (user) {
      // User exists, update Google provider info and last login
      const updateData: any = {
        googleId: providerId,
        lastLoginAt: new Date(),
        lastActiveAt: new Date(),
      };

      // Update user with Google provider info
      user = await this.prisma.user.update({
        where: { id: user.id },
        data: updateData,
      });
    } else {
      // Create new user from Google social auth with minimal data
      const createData: any = {
        email,
        firstName: '', // Empty initially, will be filled during onboarding
        lastName: '', // Empty initially, will be filled during onboarding
        googleId: providerId,
        emailVerified: true, // Google accounts are pre-verified
        status:
          requestedRole === Role.SERVICE_PROVIDER
            ? UserStatus.PENDING
            : UserStatus.ACTIVE,
        role: requestedRole,
        lastLoginAt: new Date(),
        lastActiveAt: new Date(),
        hasCompletedOnboarding: false,
        displayName: socialAuthDto.displayName || null,
      };

      user = await this.prisma.user.create({
        data: createData,
      });
    }

    return user;
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findWithProfile(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        addresses: true,
        interests: {
          include: {
            category: true,
          },
        },
        verificationDocuments: true,
        services: {
          select: {
            id: true,
            title: true,
          },
        },
        _count: {
          select: {
            services: true,
          },
        },
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findAll(options: {
    page: number;
    limit: number;
    search?: string;
    role?: string;
    status?: string;
  }): Promise<{
    users: User[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const { page, limit, search, role, status } = options;
    const skip = (page - 1) * limit;

    const where: any = {};

    // Search filter
    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { displayName: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Role filter
    if (role) {
      where.role = role;
    }

    // Status filter
    if (status) {
      where.status = status;
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          displayName: true,
          avatar: true,
          role: true,
          status: true,
          emailVerified: true,
          phoneVerified: true,
          hasCompletedOnboarding: true,
          isServiceProviderVerified: true,
          providerApplicationSubmittedAt: true,
          createdAt: true,
          lastLoginAt: true,
          lastActiveAt: true,
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      users: users as unknown as User[],
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findProviderApplications(options: {
    page: number;
    limit: number;
    search?: string;
    status?: UserStatus;
  }) {
    const { page, limit, search } = options;
    const status = options.status ?? UserStatus.PENDING;
    const skip = (page - 1) * limit;
    const allowedStatuses: UserStatus[] = [
      UserStatus.PENDING,
      UserStatus.REJECTED,
      UserStatus.ACTIVE,
    ];

    if (!allowedStatuses.includes(status)) {
      throw new BadRequestException({
        message: 'Provider application status is invalid',
      });
    }

    const where = {
      role: Role.SERVICE_PROVIDER,
      status,
      providerApplicationSubmittedAt: { not: null },
      ...(search
        ? {
            OR: [
              { email: { contains: search, mode: 'insensitive' as const } },
              {
                firstName: {
                  contains: search,
                  mode: 'insensitive' as const,
                },
              },
              {
                lastName: {
                  contains: search,
                  mode: 'insensitive' as const,
                },
              },
              {
                displayName: {
                  contains: search,
                  mode: 'insensitive' as const,
                },
              },
            ],
          }
        : {}),
    };

    const [applications, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { providerApplicationSubmittedAt: 'asc' },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          displayName: true,
          avatar: true,
          status: true,
          emailVerified: true,
          phoneVerified: true,
          isServiceProviderVerified: true,
          providerApplicationSubmittedAt: true,
          providerApplicationReviewedAt: true,
          providerApplicationRejectionReason: true,
          _count: { select: { verificationDocuments: true } },
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      applications,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findProviderApplicationById(userId: string) {
    const application = await this.prisma.user.findUnique({
      where: { id: userId },
      omit: {
        password: true,
        passwordResetOtp: true,
        passwordResetExpires: true,
        passwordResetAttempts: true,
        emailVerificationOtp: true,
        emailVerificationExpires: true,
        emailVerificationAttempts: true,
      },
      include: {
        addresses: { orderBy: { createdAt: 'asc' } },
        interests: {
          where: { type: UserInterestType.SERVICE },
          include: { category: true },
        },
        verificationDocuments: { orderBy: { uploadedAt: 'desc' } },
      },
    });

    if (
      !application ||
      application.role !== Role.SERVICE_PROVIDER ||
      !application.providerApplicationSubmittedAt
    ) {
      throw new NotFoundException({
        message: 'Provider application not found',
      });
    }

    const reviewer = application.providerApplicationReviewedBy
      ? await this.prisma.user.findUnique({
          where: { id: application.providerApplicationReviewedBy },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            displayName: true,
            email: true,
          },
        })
      : null;

    return { ...application, reviewer };
  }

  async reviewProviderApplication(
    userId: string,
    reviewerId: string,
    decision: ProviderApplicationDecision,
    reason?: string,
  ) {
    const application = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        role: true,
        status: true,
        hasCompletedOnboarding: true,
        providerApplicationSubmittedAt: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        emailVerified: true,
        phoneVerified: true,
        serviceProviderExperienceLevel: true,
        _count: {
          select: {
            addresses: true,
            interests: { where: { type: UserInterestType.SERVICE } },
            verificationDocuments: true,
          },
        },
      },
    });

    if (!application || application.role !== Role.SERVICE_PROVIDER) {
      throw new NotFoundException({
        message: 'Provider application not found',
      });
    }
    if (
      !application.hasCompletedOnboarding ||
      !application.providerApplicationSubmittedAt
    ) {
      throw new ConflictException({
        message: 'This provider has not submitted an application',
      });
    }
    if (application.status !== UserStatus.PENDING) {
      throw new ConflictException({
        message: 'This provider application has already been reviewed',
      });
    }

    const rejectionReason = reason?.trim();
    const approved = decision === ProviderApplicationDecision.APPROVE;
    if (decision === ProviderApplicationDecision.REJECT && !rejectionReason) {
      throw new BadRequestException({
        message: 'A rejection reason is required',
      });
    }

    if (approved) {
      const missingRequirements = [
        !application.firstName && 'first name',
        !application.lastName && 'last name',
        !application.phoneNumber && 'phone number',
        !application.emailVerified && 'email verification',
        !application.phoneVerified && 'phone verification',
        !application.serviceProviderExperienceLevel && 'experience level',
        application._count.addresses === 0 && 'address',
        application._count.interests === 0 && 'service categories',
        application._count.verificationDocuments === 0 &&
          'verification documents',
      ].filter(Boolean);

      if (missingRequirements.length > 0) {
        throw new ConflictException({
          message: `This application is missing: ${missingRequirements.join(', ')}`,
        });
      }
    }

    const reviewedAt = new Date();
    const updated = await this.prisma.$transaction(async (transaction) => {
      const claimed = await transaction.user.updateMany({
        where: { id: userId, status: UserStatus.PENDING },
        data: {
          status: approved ? UserStatus.ACTIVE : UserStatus.REJECTED,
          isServiceProviderVerified: approved,
          serviceProviderVerifiedAt: approved ? reviewedAt : null,
          providerApplicationReviewedAt: reviewedAt,
          providerApplicationReviewedBy: reviewerId,
          providerApplicationRejectionReason: approved ? null : rejectionReason,
        },
      });

      if (claimed.count !== 1) {
        throw new ConflictException({
          message: 'This provider application was reviewed by another admin',
        });
      }

      await transaction.verificationDocument.updateMany({
        where: { userId },
        data: {
          status: approved ? DocumentStatus.APPROVED : DocumentStatus.REJECTED,
          reviewNotes: approved ? null : rejectionReason,
          reviewedAt,
          reviewedBy: reviewerId,
        },
      });

      return transaction.user.findUnique({
        where: { id: userId },
        omit: {
          password: true,
          passwordResetOtp: true,
          passwordResetExpires: true,
          passwordResetAttempts: true,
          emailVerificationOtp: true,
          emailVerificationExpires: true,
          emailVerificationAttempts: true,
        },
      });
    });

    await this.notificationEvents?.providerApplicationDecision({
      providerId: userId,
      approved,
      reason: rejectionReason,
      reviewedAt,
    });

    return updated;
  }

  async updateStatus(userId: string, status: UserStatus): Promise<User> {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException({ message: 'User not found' });
    }

    if (
      user.role === Role.SERVICE_PROVIDER &&
      status === UserStatus.ACTIVE &&
      !user.isServiceProviderVerified
    ) {
      throw new ConflictException({
        message:
          'Provider applications must be approved through the review queue',
      });
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: { status },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    if (!username) return null;
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async findByPasswordResetOtp(
    email: string,
    otp: string,
  ): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        email: email,
        passwordResetOtp: otp,
      },
    });
  }

  async incrementPasswordResetAttempts(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        passwordResetAttempts: {
          increment: 1,
        },
      },
    });
  }

  async incrementEmailVerificationAttempts(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        emailVerificationAttempts: {
          increment: 1,
        },
      },
    });
  }

  async resetPasswordResetAttempts(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        passwordResetAttempts: 0,
      },
    });
  }

  async findBySocialProvider(
    provider: SocialProvider,
    providerId: string,
  ): Promise<User | null> {
    // Only support Google for now
    if (provider !== SocialProvider.GOOGLE) {
      return null;
    }

    return this.prisma.user.findFirst({
      where: { googleId: providerId },
    });
  }

  async updateProfile(
    userId: string,
    updateData: UpdateProfileDto,
  ): Promise<User> {
    // Check if username is being updated and is unique
    if (updateData.username) {
      const existingUser = await this.findByUsername(updateData.username);
      if (existingUser && existingUser.id !== userId) {
        throw new ConflictException({ message: 'Username already taken' });
      }
    }

    // Convert dateOfBirth string to Date if provided
    const processedData: any = { ...updateData };
    if (updateData.dateOfBirth) {
      processedData.dateOfBirth = new Date(updateData.dateOfBirth);
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        ...processedData,
        updatedAt: new Date(),
      },
    });
  }

  async updateLastActivity(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        lastActiveAt: new Date(),
      },
    });
  }

  async updateOnboardingStatus(
    userId: string,
    completed: boolean,
  ): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        hasCompletedOnboarding: completed,
        onboardingCompletedAt: completed ? new Date() : null,
      },
    });
  }

  async delete(userId: string): Promise<void> {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException({ message: 'User not found' });
    }

    // Soft delete by updating status
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        status: UserStatus.DELETED,
        email: `deleted_${Date.now()}_${user.email}`, // Prevent email conflicts
      },
    });
  }

  async getStats(): Promise<{
    totalUsers: number;
    activeUsers: number;
    premiumUsers: number;
    onboardedUsers: number;
  }> {
    const [totalUsers, activeUsers, premiumUsers, onboardedUsers] =
      await Promise.all([
        this.prisma.user.count(),
        this.prisma.user.count({ where: { status: UserStatus.ACTIVE } }),
        this.prisma.user.count({ where: { isPremium: true } }),
        this.prisma.user.count({ where: { hasCompletedOnboarding: true } }),
      ]);

    return {
      totalUsers,
      activeUsers,
      premiumUsers,
      onboardedUsers,
    };
  }
}
