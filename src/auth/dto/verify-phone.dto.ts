import {
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

export class VerifyPhoneDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  phoneNumber: string;

  @IsString()
  @Length(6, 6)
  @Matches(/^\d{6}$/, { message: 'otpCode must be a 6-digit code' })
  otpCode: string;
}
