import { IsString, IsNotEmpty, MinLength, IsEmail, Matches } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  otpCode: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]*$/, {
    message:
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character (@$!%*?&_)',
  })
  newPassword: string;
}
