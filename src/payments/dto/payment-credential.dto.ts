import { IsNotEmpty, IsString } from 'class-validator';

export class StagePaymentCredentialDto {
  @IsString()
  @IsNotEmpty()
  secretKey: string;
}
