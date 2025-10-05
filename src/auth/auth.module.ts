import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleAuthService } from './services/google-auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy';
import { RolesGuard } from './guards/roles.guard';
import { UsersModule } from '../users/users.module';
import { OnboardingModule } from '../onboarding/onboarding.module';
import { EmailService } from '../common/services/email.service';
import { SmsService } from '../common/services/sms.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    UsersModule,
    OnboardingModule,
    PrismaModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRATION_TIME') },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleAuthService, JwtStrategy, RefreshJwtStrategy, RolesGuard, EmailService, SmsService],
  exports: [AuthService, RolesGuard],
})
export class AuthModule {}
