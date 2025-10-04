import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsEnum } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsEnum(['USER', 'SERVICE_PROVIDER'], { message: 'Role must be either USER or SERVICE_PROVIDER' })
  role?: 'USER' | 'SERVICE_PROVIDER';
}
