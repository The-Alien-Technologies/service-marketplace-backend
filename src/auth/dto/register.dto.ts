import { IsEmail, IsNotEmpty, MinLength, IsOptional, Matches } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  username?: string;

  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]*$/, {
    message:
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character (@$!%*?&_)',
  })
  password: string;
}
