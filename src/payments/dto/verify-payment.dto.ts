import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class VerifyPaymentDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z0-9.=-]+$/)
  reference: string;
}
