import { Controller, Post, Body, Get, Req, Put, Delete, Patch, HttpCode, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { SocialAuthDto } from './dto/social-auth.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Request } from 'express';
import { Public } from 'src/common/decorators/is-public.decorator';
import { IsAdmin } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';
import { ResponseUtil } from 'src/common/utils/response.util';

@Controller('auth')
@UseGuards(RolesGuard)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const result = await this.authService.register(registerDto);

    return ResponseUtil.success(
      {
        userId: result.user.id,
        token: result.token,
        refreshToken: result.refreshToken,
        user: result.user,
      },
      'User registered successfully',
    );
  }

  @Public()
  @HttpCode(200)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);

    return ResponseUtil.success(
      {
        userId: result.user.id,
        token: result.token,
        refreshToken: result.refreshToken,
      },
      'Login successful',
    );
  }

  @Public()
  @Post('social')
  async socialAuth(@Body() socialAuthDto: SocialAuthDto) {
    const result = await this.authService.socialAuth(socialAuthDto);

    return ResponseUtil.success(
      {
        userId: result.user.id,
        token: result.token,
        refreshToken: result.refreshToken,
        isNewUser: !result.user.hasCompletedOnboarding, // meaning onboarding is not completed
      },
      'Social authentication successful',
    );
  }

  @Public()
  @HttpCode(200)
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    await this.authService.forgotPassword(forgotPasswordDto);

    return ResponseUtil.success(null, 'If an account with that email exists, a password reset code has been sent');
  }

  @Public()
  @HttpCode(200)
  @Post('verify-password-reset-otp')
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    const result = await this.authService.verifyPasswordResetOtp(verifyOtpDto.email, verifyOtpDto.otpCode);

    if (result.valid) {
      return ResponseUtil.success({ valid: true }, 'OTP code is valid');
    } else {
      return ResponseUtil.success(
        {
          valid: false,
          attemptsLeft: result.attemptsLeft,
        },
        'Invalid OTP code',
      );
    }
  }

  @Public()
  @HttpCode(200)
  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    await this.authService.resetPassword(resetPasswordDto);

    return ResponseUtil.success(null, 'Password has been reset successfully');
  }

  @Public()
  @Post('refresh')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    const result = await this.authService.refreshTokenFromRefreshToken(refreshTokenDto.refreshToken);

    return ResponseUtil.success(
      {
        token: result.token,
        refreshToken: result.refreshToken,
      },
      'Token refreshed successfully',
    );
  }

  @Get('me')
  async getProfile(@Req() req: Request) {
    const userId = req.currentUser.id;
    const user = await this.authService.getUserById(userId);

    return ResponseUtil.success({ user }, 'Profile retrieved successfully');
  }

  @Patch('profile')
  async updateProfile(@Req() req: Request, @Body() updateProfileDto: UpdateProfileDto) {
    const userId = req.currentUser.id;
    const user = await this.authService.updateProfile(userId, updateProfileDto);

    return ResponseUtil.success({ user }, 'Profile updated successfully');
  }

  @Patch('password')
  async changePassword(@Req() req: Request, @Body() changePasswordDto: ChangePasswordDto) {
    const userId = req.currentUser.id;
    await this.authService.changePassword(userId, changePasswordDto.currentPassword, changePasswordDto.newPassword);

    return ResponseUtil.success(null, 'Password changed successfully');
  }

  @Delete('account')
  async softDeleteAccount(@Req() req: Request) {
    const userId = req.currentUser.id;
    await this.authService.softDeleteAccount(userId);

    return ResponseUtil.success(null, 'Account deleted successfully');
  }

  @IsAdmin()
  @Get('stats')
  async getUserStats() {
    const stats = await this.authService.getUserStats();

    return ResponseUtil.success(stats, 'User statistics retrieved successfully');
  }
}
