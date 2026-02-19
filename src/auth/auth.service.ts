import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { EmailService } from '../common/services/email.service';
import { SmsService } from '../common/services/sms.service';
import { OnboardingStatusService } from '../onboarding/onboarding-status.service';
import { GoogleAuthService } from './services/google-auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { SocialAuthDto, SocialProvider } from './dto/social-auth.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import * as bcrypt from 'bcryptjs';
import { User, UserStatus } from '../../generated/prisma';

export interface AuthResponse {
  user: Partial<User>;
  token: string;
  refreshToken: string;
}

export interface UserPayload {
  id: string;
  email: string;
  role: string;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService,
    private smsService: SmsService,
    private configService: ConfigService,
    private onboardingStatusService: OnboardingStatusService,
    private googleAuthService: GoogleAuthService,
    private prisma: PrismaService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const { email, password, role = 'USER' } = registerDto;

    // Check if user exists
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException({
        message: 'User with this email already exists',
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user with minimal data - other fields will be updated during onboarding
    const user = await this.usersService.create({
      email,
      password: hashedPassword,
      role,
      // Set default values for required fields that will be updated later
      firstName: '',
      lastName: '',
    });

    // Generate tokens
    const token = this.generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    const refreshToken = this.generateRefreshToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // Update last login
    await this.usersService.updateLastActivity(user.id);

    // Generate and send email verification OTP
    await this.sendEmailVerificationOtp(user.id, user.email);

    // Send welcome email (async, don't wait for it to complete)
    this.sendWelcomeEmailAsync(user.email, 'User');

    return {
      user: this.sanitizeUser(user),
      token,
      refreshToken,
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { email, password } = loginDto;

    // Find user (include password for validation)
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException({ message: 'Invalid credentials' });
    }

    // Check if account is active
    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException({
        message: 'Account is suspended or deleted',
      });
    }

    // Validate password
    if (!user.password) {
      throw new UnauthorizedException({
        message: 'Please use social login for this account',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException({ message: 'Invalid credentials' });
    }

    // Generate tokens
    const token = this.generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    const refreshToken = this.generateRefreshToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // Update last login
    await this.usersService.updateLastActivity(user.id);

    return {
      user: this.sanitizeUser(user),
      token,
      refreshToken,
    };
  }

  async socialAuth(socialAuthDto: SocialAuthDto): Promise<AuthResponse> {
    try {
      let userInfo;

      // Validate tokens based on provider
      if (socialAuthDto.provider === SocialProvider.GOOGLE) {
        // Always validate with Google's servers for security
        this.logger.log('Validating Google tokens with Google servers');

        if (!socialAuthDto.accessToken) {
          throw new BadRequestException({
            message: 'Access token is required for Google authentication',
          });
        }

        // Validate tokens with Google's servers
        userInfo = await this.googleAuthService.validateTokens(
          socialAuthDto.accessToken,
          socialAuthDto.idToken,
        );

        console.log({ userInfo });

        this.logger.log(
          `Google token validation successful for user: ${userInfo.email}`,
        );
      } else {
        throw new BadRequestException({
          message: `Provider ${socialAuthDto.provider} not supported`,
        });
      }

      // Create the validated social auth DTO
      const validatedSocialAuthDto: SocialAuthDto = {
        ...socialAuthDto,
        providerId: userInfo.id,
        email: userInfo.email,
        firstName: userInfo.given_name,
        lastName: userInfo.family_name,
        displayName: userInfo.name,
        avatar: userInfo.picture,
        role: socialAuthDto.role, // Pass through the role from frontend
      };

      // Check if user exists before creating/updating
      const existingUser = await this.usersService.findByEmail(
        validatedSocialAuthDto.email!,
      );
      const isNewUser = !existingUser;

      // Create or update user from social auth
      const user = await this.usersService.createFromSocialAuth(
        validatedSocialAuthDto,
      );

      // Send welcome email for new users only
      if (isNewUser) {
        const userName = user.firstName || user.displayName || 'User';
        this.sendWelcomeEmailAsync(user.email, userName);
      }

      // Generate tokens
      const token = this.generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });
      const refreshToken = this.generateRefreshToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      return {
        user: this.sanitizeUser(user),
        token,
        refreshToken,
      };
    } catch (error) {
      this.logger.error('Social authentication failed:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException({
        message: 'Social authentication failed',
      });
    }
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    const { email } = forgotPasswordDto;

    // Find user by email
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      // Don't reveal if user exists or not for security
      return;
    }

    // Check if account is active
    if (user.status !== UserStatus.ACTIVE) {
      return;
    }

    // Generate OTP code
    const otpCode = this.emailService.generateOtpCode();
    const otpExpires = new Date(Date.now() + 15 * 60 * 1000);

    // Save OTP to database
    await this.usersService.updateProfile(user.id, {
      passwordResetOtp: otpCode,
      passwordResetExpires: otpExpires,
      passwordResetAttempts: 0,
    } as any);

    // Send OTP email
    try {
      const userName = user.firstName;
      await this.emailService.sendPasswordResetOtp(email, otpCode, userName);
    } catch (error) {
      console.error('Failed to send password reset OTP:', error);
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    const { email, otpCode, newPassword } = resetPasswordDto;

    // Validate OTP format
    if (!this.emailService.isValidOtpFormat(otpCode)) {
      throw new BadRequestException({ message: 'Invalid OTP format' });
    }

    // Find user by email and OTP
    const user = await this.usersService.findByPasswordResetOtp(email, otpCode);
    if (!user) {
      throw new BadRequestException({ message: 'Invalid email or OTP code' });
    }

    // Check if OTP is expired
    if (!user.passwordResetExpires || user.passwordResetExpires < new Date()) {
      throw new BadRequestException({ message: 'OTP code has expired' });
    }

    // Check if account is active
    if (user.status !== UserStatus.ACTIVE) {
      throw new BadRequestException({ message: 'Account is not active' });
    }

    // Check attempt limit (max 5 attempts)
    if (user.passwordResetAttempts >= 5) {
      throw new BadRequestException({
        message: 'Too many failed attempts. Please request a new OTP code.',
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password and clear OTP
    await this.usersService.updateProfile(user.id, {
      password: hashedPassword,
      passwordResetOtp: null,
      passwordResetExpires: null,
      passwordResetAttempts: 0,
    } as any);
  }

  async verifyPasswordResetOtp(
    email: string,
    otpCode: string,
  ): Promise<{ valid: boolean; attemptsLeft?: number }> {
    // Validate OTP format
    if (!this.emailService.isValidOtpFormat(otpCode)) {
      return { valid: false };
    }

    // Find user by email
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return { valid: false };
    }

    // Check if OTP matches
    if (user.passwordResetOtp !== otpCode) {
      // Increment failed attempts
      await this.usersService.incrementPasswordResetAttempts(user.id);
      const attemptsLeft = Math.max(0, 5 - (user.passwordResetAttempts + 1));
      return { valid: false, attemptsLeft };
    }

    // Check if OTP is expired
    if (!user.passwordResetExpires || user.passwordResetExpires < new Date()) {
      return { valid: false };
    }

    // Check if account is active
    if (user.status !== UserStatus.ACTIVE) {
      return { valid: false };
    }

    // Check attempt limit
    if (user.passwordResetAttempts >= 5) {
      return { valid: false, attemptsLeft: 0 };
    }

    return { valid: true };
  }

  async refreshToken(
    userId: string,
  ): Promise<{ token: string; refreshToken: string }> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException({ message: 'User not found' });
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException({ message: 'Account is not active' });
    }

    const token = this.generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    const refreshToken = this.generateRefreshToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // Update last activity
    await this.usersService.updateLastActivity(user.id);

    return { token, refreshToken };
  }

  async sendEmailVerificationOtp(userId: string, email: string): Promise<void> {
    // Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Set expiration time (10 minutes from now)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    // Update user with OTP
    await this.usersService.updateProfile(userId, {
      emailVerificationOtp: otpCode,
      emailVerificationExpires: expiresAt,
      emailVerificationAttempts: 0,
    } as any);

    // Send email with OTP
    try {
      await this.emailService.sendEmailVerificationOtp(email, otpCode);
      this.logger.log(`Email verification OTP sent to ${email}`);
    } catch (error) {
      this.logger.error(
        `Failed to send email verification OTP to ${email}:`,
        error,
      );
      // Don't throw error - user can request resend
    }
  }

  async verifyEmailOtp(
    email: string,
    otpCode: string,
  ): Promise<{ valid: boolean; attemptsLeft?: number }> {
    // Validate OTP format
    if (!this.emailService.isValidOtpFormat(otpCode)) {
      return { valid: false };
    }

    // Find user by email
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return { valid: false };
    }

    // Check if OTP matches
    if (user.emailVerificationOtp !== otpCode) {
      // Increment failed attempts
      await this.usersService.incrementEmailVerificationAttempts(user.id);
      const attemptsLeft = Math.max(
        0,
        5 - (user.emailVerificationAttempts + 1),
      );
      return { valid: false, attemptsLeft };
    }

    // Check if OTP is expired
    if (
      !user.emailVerificationExpires ||
      user.emailVerificationExpires < new Date()
    ) {
      return { valid: false };
    }

    // Check if account is active
    if (user.status !== UserStatus.ACTIVE) {
      return { valid: false };
    }

    // OTP is valid - mark email as verified and clear OTP
    await this.usersService.updateProfile(user.id, {
      emailVerified: true,
      emailVerificationOtp: null,
      emailVerificationExpires: null,
      emailVerificationAttempts: 0,
    } as any);

    return { valid: true };
  }

  async resendEmailVerificationOtp(email: string): Promise<void> {
    // Find user by email
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      // Don't reveal if email exists or not for security
      return;
    }

    // Check if email is already verified
    if (user.emailVerified) {
      return;
    }

    // Check rate limiting (don't allow resend more than once per minute)
    if (
      user.emailVerificationExpires &&
      user.emailVerificationExpires > new Date()
    ) {
      const timeSinceLastSend =
        new Date().getTime() -
        (user.emailVerificationExpires.getTime() - 10 * 60 * 1000);
      if (timeSinceLastSend < 60 * 1000) {
        // Less than 1 minute
        throw new BadRequestException({
          message: 'Please wait before requesting another verification code',
        });
      }
    }

    // Send new OTP
    await this.sendEmailVerificationOtp(user.id, user.email);
  }

  async sendPhoneVerificationOtp(phoneNumber: string): Promise<void> {
    try {
      // Format phone number to E.164 format
      const formattedPhoneNumber =
        this.smsService.formatPhoneNumber(phoneNumber);

      // Generate 6-digit OTP
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 10); // 10 minutes expiry

      // Delete any existing verification for this phone number
      await this.prisma.phoneVerification.deleteMany({
        where: { phoneNumber: formattedPhoneNumber },
      });

      // Store phone verification in database
      await this.prisma.phoneVerification.create({
        data: {
          phoneNumber: formattedPhoneNumber,
          otpCode,
          expiresAt,
          attempts: 0,
          maxAttempts: 5,
        },
      });

      // Send SMS via AWS SNS
      await this.smsService.sendVerificationCode(formattedPhoneNumber, otpCode);

      this.logger.log(`Phone verification OTP sent to ${formattedPhoneNumber}`);
    } catch (error) {
      this.logger.error(
        `Failed to send phone verification OTP to ${phoneNumber}:`,
        error,
      );
      throw new BadRequestException({
        message: 'Failed to send verification code. Please try again.',
      });
    }
  }

  async verifyPhoneOtp(
    phoneNumber: string,
    otpCode: string,
  ): Promise<{ valid: boolean; attemptsLeft?: number }> {
    try {
      // Format phone number to E.164 format
      const formattedPhoneNumber =
        this.smsService.formatPhoneNumber(phoneNumber);

      // Find the phone verification record
      const phoneVerification = await this.prisma.phoneVerification.findFirst({
        where: {
          phoneNumber: formattedPhoneNumber,
          verified: false,
        },
        orderBy: { createdAt: 'desc' },
      });

      if (!phoneVerification) {
        this.logger.warn(
          `No phone verification found for ${formattedPhoneNumber}`,
        );
        return { valid: false };
      }

      // Check if expired
      if (new Date() > phoneVerification.expiresAt) {
        this.logger.warn(
          `Phone verification expired for ${formattedPhoneNumber}`,
        );
        await this.prisma.phoneVerification.delete({
          where: { id: phoneVerification.id },
        });
        return { valid: false };
      }

      // Check if max attempts reached
      if (phoneVerification.attempts >= phoneVerification.maxAttempts) {
        this.logger.warn(
          `Max attempts reached for phone verification ${formattedPhoneNumber}`,
        );
        await this.prisma.phoneVerification.delete({
          where: { id: phoneVerification.id },
        });
        return { valid: false };
      }

      // Increment attempts
      await this.prisma.phoneVerification.update({
        where: { id: phoneVerification.id },
        data: { attempts: phoneVerification.attempts + 1 },
      });

      // Check if OTP matches
      if (phoneVerification.otpCode === otpCode) {
        // Mark as verified and delete the record
        await this.prisma.phoneVerification.update({
          where: { id: phoneVerification.id },
          data: { verified: true },
        });

        this.logger.log(
          `Phone verification successful for ${formattedPhoneNumber}`,
        );
        return { valid: true };
      } else {
        const attemptsLeft =
          phoneVerification.maxAttempts - (phoneVerification.attempts + 1);
        this.logger.warn(
          `Phone verification failed for ${formattedPhoneNumber}. Attempts left: ${attemptsLeft}`,
        );
        return { valid: false, attemptsLeft: Math.max(0, attemptsLeft) };
      }
    } catch (error) {
      this.logger.error(`Error verifying phone OTP for ${phoneNumber}:`, error);
      return { valid: false };
    }
  }

  async resendPhoneVerificationOtp(phoneNumber: string): Promise<void> {
    try {
      // Format phone number to E.164 format
      const formattedPhoneNumber =
        this.smsService.formatPhoneNumber(phoneNumber);

      // Check if there's a recent verification request (rate limiting)
      const recentVerification = await this.prisma.phoneVerification.findFirst({
        where: {
          phoneNumber: formattedPhoneNumber,
          createdAt: {
            gte: new Date(Date.now() - 60000), // 1 minute ago
          },
        },
      });

      if (recentVerification) {
        throw new BadRequestException({
          message:
            'Please wait at least 1 minute before requesting another verification code.',
        });
      }

      // Send new verification code
      await this.sendPhoneVerificationOtp(phoneNumber);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      this.logger.error(
        `Failed to resend phone verification OTP to ${phoneNumber}:`,
        error,
      );
      throw new BadRequestException({
        message: 'Failed to resend verification code. Please try again.',
      });
    }
  }

  async refreshTokenFromRefreshToken(
    refreshToken: string,
  ): Promise<{ token: string; refreshToken: string }> {
    try {
      // Verify the refresh token
      const payload = this.jwtService.verify(refreshToken) as UserPayload;

      // Find user
      const user = await this.usersService.findById(payload.id);
      if (!user) {
        throw new UnauthorizedException({ message: 'User not found' });
      }

      if (user.status !== UserStatus.ACTIVE) {
        throw new UnauthorizedException({ message: 'Account is not active' });
      }

      // Generate new tokens
      const newToken = this.generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });
      const newRefreshToken = this.generateRefreshToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      // Update last activity
      await this.usersService.updateLastActivity(user.id);

      return { token: newToken, refreshToken: newRefreshToken };
    } catch (error) {
      throw new UnauthorizedException({ message: 'Invalid refresh token' });
    }
  }

  async getUserById(id: string): Promise<Partial<User>> {
    const user = await this.usersService.findWithProfile(id);
    if (!user) {
      throw new UnauthorizedException({ message: 'User not found' });
    }

    return this.sanitizeUser(user);
  }

  async updateProfile(
    userId: string,
    updateData: UpdateProfileDto,
  ): Promise<Partial<User>> {
    const user = await this.usersService.updateProfile(userId, updateData);
    return this.sanitizeUser(user);
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.usersService.findByEmail(
      (await this.usersService.findById(userId))!.email,
    );

    if (!user || !user.password) {
      throw new BadRequestException({
        message: 'Cannot change password for social auth account',
      });
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!isCurrentPasswordValid) {
      throw new BadRequestException({
        message: 'Current password is incorrect',
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(12);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    await this.usersService.updateProfile(userId, {
      password: hashedNewPassword,
    } as any);
  }

  async softDeleteAccount(userId: string): Promise<void> {
    await this.usersService.delete(userId);
  }

  private generateToken(payload: UserPayload): string {
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(payload: UserPayload): string {
    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION_TIME') || '30d',
    });
  }

  private sanitizeUser(user: User): Partial<User> {
    const {
      password,
      passwordResetOtp,
      passwordResetExpires,
      passwordResetAttempts,
      ...sanitizedUser
    } = user;
    return sanitizedUser;
  }

  // Utility method for JWT strategy
  async validateUser(payload: UserPayload): Promise<User | null> {
    const user = await this.usersService.findById(payload.id);

    if (!user || user.status !== UserStatus.ACTIVE) {
      return null;
    }

    // Update last activity
    await this.usersService.updateLastActivity(payload.id);

    return user;
  }

  // Admin/Analytics method
  async getUserStats() {
    return await this.usersService.getStats();
  }

  async verifyEmail(userId: string): Promise<void> {
    await this.usersService.updateProfile(userId, {
      emailVerified: true,
    } as any);
  }

  async userExistsByEmail(email: string): Promise<boolean> {
    const user = await this.usersService.findByEmail(email);
    return !!user;
  }

  async isUsernameAvailable(username: string): Promise<boolean> {
    const user = await this.usersService.findByUsername(username);
    return !user;
  }

  /**
   * Send welcome email asynchronously without blocking the registration response
   */
  private async sendWelcomeEmailAsync(
    email: string,
    userName: string,
  ): Promise<void> {
    try {
      await this.emailService.sendWelcomeEmail(email, userName);
      this.logger.log(`Welcome email sent successfully to ${email}`);
    } catch (error) {
      // Log error but don't throw - we don't want email failures to affect registration
      this.logger.error(`Failed to send welcome email to ${email}:`, error);
    }
  }
}
