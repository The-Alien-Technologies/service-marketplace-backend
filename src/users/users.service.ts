import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from '../auth/dto/register.dto';
import { SocialAuthDto, SocialProvider } from '../auth/dto/social-auth.dto';
import { UpdateProfileDto } from '../auth/dto/update-profile.dto';
import { User, UserStatus } from '../../generated/prisma';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(userData: RegisterDto): Promise<User> {
    // Check if user already exists
    const existingUser = await this.findByEmail(userData.email);
    if (existingUser) {
      throw new ConflictException({ message: 'User with this email already exists' });
    }

    // Check username uniqueness if provided
    if (userData.username) {
      const existingUsername = await this.findByUsername(userData.username);
      if (existingUsername) {
        throw new ConflictException({ message: 'Username already taken' });
      }
    }

    return this.prisma.user.create({
      data: {
        ...userData,
        status: UserStatus.ACTIVE,
        emailVerified: false,
      },
    });
  }

  async createFromSocialAuth(socialAuthDto: SocialAuthDto): Promise<User> {
    const { provider, providerId, email, firstName, lastName, displayName, avatar } = socialAuthDto;

    // Check if user already exists by email
    let user = await this.findByEmail(email);

    if (user) {
      // User exists, update social provider info
      const updateData: any = {
        lastLoginAt: new Date(),
        lastActiveAt: new Date(),
      };

      // Set provider-specific ID
      switch (provider) {
        case SocialProvider.GOOGLE:
          updateData.googleId = providerId;
          break;
        case SocialProvider.APPLE:
          updateData.appleId = providerId;
          break;
        case SocialProvider.FACEBOOK:
          updateData.facebookId = providerId;
          break;
        case SocialProvider.TWITTER:
          updateData.twitterId = providerId;
          break;
      }

      // Update user with social provider info
      user = await this.prisma.user.update({
        where: { id: user.id },
        data: updateData,
      });
    } else {
      // Create new user from social auth
      const createData: any = {
        email,
        firstName: firstName || null,
        lastName: lastName || null,
        displayName: displayName || null,
        avatar: avatar || null,
        emailVerified: true,
        status: UserStatus.ACTIVE,
        lastLoginAt: new Date(),
        lastActiveAt: new Date(),
      };

      // Set provider-specific ID
      switch (provider) {
        case SocialProvider.GOOGLE:
          createData.googleId = providerId;
          break;
        case SocialProvider.APPLE:
          createData.appleId = providerId;
          break;
        case SocialProvider.FACEBOOK:
          createData.facebookId = providerId;
          break;
        case SocialProvider.TWITTER:
          createData.twitterId = providerId;
          break;
      }

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

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    if (!username) return null;
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async findByPasswordResetOtp(email: string, otp: string): Promise<User | null> {
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

  async resetPasswordResetAttempts(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        passwordResetAttempts: 0,
      },
    });
  }

  async findBySocialProvider(provider: SocialProvider, providerId: string): Promise<User | null> {
    const where: any = {};

    switch (provider) {
      case SocialProvider.GOOGLE:
        where.googleId = providerId;
        break;
      case SocialProvider.APPLE:
        where.appleId = providerId;
        break;
      case SocialProvider.FACEBOOK:
        where.facebookId = providerId;
        break;
      case SocialProvider.TWITTER:
        where.twitterId = providerId;
        break;
    }

    return this.prisma.user.findFirst({ where });
  }

  async updateProfile(userId: string, updateData: UpdateProfileDto): Promise<User> {
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

  async updateOnboardingStatus(userId: string, completed: boolean): Promise<User> {
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
    const [totalUsers, activeUsers, premiumUsers, onboardedUsers] = await Promise.all([
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
