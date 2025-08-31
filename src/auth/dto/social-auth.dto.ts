import { IsEmail, IsNotEmpty, IsOptional, IsEnum, IsString, IsUrl } from 'class-validator';

export enum SocialProvider {
  GOOGLE = 'google',
  APPLE = 'apple',
  FACEBOOK = 'facebook',
  TWITTER = 'twitter',
}

export class SocialAuthDto {
  @IsNotEmpty()
  @IsEnum(SocialProvider)
  provider: SocialProvider;

  @IsNotEmpty()
  @IsString()
  providerId: string; // The ID from the social provider

  @IsEmail()
  email: string;

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
  @IsUrl()
  avatar?: string;

  @IsOptional()
  @IsString()
  supabaseUserId?: string; // Supabase user ID for reference
}
