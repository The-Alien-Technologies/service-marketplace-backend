import { Injectable, UnauthorizedException, ConflictException, BadRequestException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { EmailService } from '../common/services/email.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { SocialAuthDto } from './dto/social-auth.dto';
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
    private configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const { firstName, lastName, email, password, username } = registerDto;

    // Check if user exists
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException({ message: 'User with this email already exists'});
    }

    // Check username uniqueness if provided
    if (username) {
      const existingUsername = await this.usersService.findByUsername(username);
      if (existingUsername) {
        throw new ConflictException({ message: 'Username already taken' });
      }
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await this.usersService.create({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
    });

    // Generate tokens
    const token = this.generateToken({ id: user.id, email: user.email, role: user.role });
    const refreshToken = this.generateRefreshToken({ id: user.id, email: user.email, role: user.role });

    // Update last login
    await this.usersService.updateLastActivity(user.id);

    // Send welcome email (async, don't wait for it to complete)
    this.sendWelcomeEmailAsync(user.email, user?.firstName || 'User');

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
      throw new UnauthorizedException({ message: 'Account is suspended or deleted' });
    }

    // Validate password
    if (!user.password) {
      throw new UnauthorizedException({ message: 'Please use social login for this account' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException({ message: 'Invalid credentials' });
    }

    // Generate tokens
    const token = this.generateToken({ id: user.id, email: user.email, role: user.role });
    const refreshToken = this.generateRefreshToken({ id: user.id, email: user.email, role: user.role });

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
      // Check if user exists before creating/updating
      const existingUser = await this.usersService.findByEmail(socialAuthDto.email);
      const isNewUser = !existingUser;

      // Create or update user from social auth
      const user = await this.usersService.createFromSocialAuth(socialAuthDto);

      // Send welcome email for new users only
      if (isNewUser) {
        const userName = user.firstName || user.displayName || 'User';
        this.sendWelcomeEmailAsync(user.email, userName);
      }

      // Generate tokens
      const token = this.generateToken({ id: user.id, email: user.email, role: user.role });
      const refreshToken = this.generateRefreshToken({ id: user.id, email: user.email, role: user.role });

      return {
        user: this.sanitizeUser(user),
        token,
        refreshToken,
      };
    } catch (error) {
      throw new BadRequestException({ message: 'Social authentication failed' });
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
      throw new BadRequestException({ message: 'Too many failed attempts. Please request a new OTP code.' });
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

  async verifyPasswordResetOtp(email: string, otpCode: string): Promise<{ valid: boolean; attemptsLeft?: number }> {
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

  async refreshToken(userId: string): Promise<{ token: string; refreshToken: string }> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException({ message: 'User not found' });
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException({ message: 'Account is not active' });
    }

    const token = this.generateToken({ id: user.id, email: user.email, role: user.role });
    const refreshToken = this.generateRefreshToken({ id: user.id, email: user.email, role: user.role });

    // Update last activity
    await this.usersService.updateLastActivity(user.id);

    return { token, refreshToken };
  }

  async refreshTokenFromRefreshToken(refreshToken: string): Promise<{ token: string; refreshToken: string }> {
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
      const newToken = this.generateToken({ id: user.id, email: user.email, role: user.role });
      const newRefreshToken = this.generateRefreshToken({ id: user.id, email: user.email, role: user.role });

      // Update last activity
      await this.usersService.updateLastActivity(user.id);

      return { token: newToken, refreshToken: newRefreshToken };
    } catch (error) {
      throw new UnauthorizedException({ message: 'Invalid refresh token' });
    }
  }

  async getUserById(id: string): Promise<Partial<User>> {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new UnauthorizedException({ message: 'User not found' });
    }

    return this.sanitizeUser(user);
  }

  async updateProfile(userId: string, updateData: UpdateProfileDto): Promise<Partial<User>> {
    const user = await this.usersService.updateProfile(userId, updateData);
    return this.sanitizeUser(user);
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    const user = await this.usersService.findByEmail((await this.usersService.findById(userId))!.email);

    if (!user || !user.password) {
      throw new BadRequestException({ message: 'Cannot change password for social auth account' });
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      throw new BadRequestException({ message: 'Current password is incorrect' }  );
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
    const { password, passwordResetOtp, passwordResetExpires, passwordResetAttempts, ...sanitizedUser } = user;
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
  private async sendWelcomeEmailAsync(email: string, userName: string): Promise<void> {
    try {
      await this.emailService.sendWelcomeEmail(email, userName);
      this.logger.log(`Welcome email sent successfully to ${email}`);
    } catch (error) {
      // Log error but don't throw - we don't want email failures to affect registration
      this.logger.error(`Failed to send welcome email to ${email}:`, error);
    }
  }
}
