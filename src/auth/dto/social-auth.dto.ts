import { IsEmail, IsNotEmpty, IsOptional, IsEnum, IsString, IsUrl } from 'class-validator';

export enum SocialProvider {
  GOOGLE = 'google',
}

export class SocialAuthDto {
  @IsNotEmpty()
  @IsEnum(SocialProvider)
  provider: SocialProvider;

  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @IsOptional()
  @IsString()
  idToken?: string;

  // These fields will be populated after token validation
  @IsOptional()
  @IsString()
  providerId?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

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

  @IsOptional()
  @IsString()
  role?: 'USER' | 'SERVICE_PROVIDER'; // Intended user role from frontend
}
