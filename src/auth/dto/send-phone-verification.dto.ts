import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SendPhoneVerificationDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  phoneNumber: string;
}
