import { IsOptional, IsString, IsBoolean, IsEnum, IsDateString, IsUrl } from 'class-validator';
import { ThemePreference, PreferredUnits } from '../../../generated/prisma';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  displayName?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsUrl()
  avatar?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  timezone?: string;

  @IsOptional()
  @IsEnum(ThemePreference)
  themePreference?: ThemePreference;

  @IsOptional()
  @IsBoolean()
  notificationsEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  reminderNotifications?: boolean;

  @IsOptional()
  @IsBoolean()
  achievementNotifications?: boolean;

  @IsOptional()
  @IsBoolean()
  marketingNotifications?: boolean;

  @IsOptional()
  @IsString()
  preferredLanguage?: string;

  @IsOptional()
  @IsEnum(PreferredUnits)
  preferredUnits?: PreferredUnits;

  @IsOptional()
  @IsBoolean()
  isProfilePublic?: boolean;

  @IsOptional()
  @IsBoolean()
  shareProgressData?: boolean;

  @IsOptional()
  @IsBoolean()
  dataAnalyticsEnabled?: boolean;
}
