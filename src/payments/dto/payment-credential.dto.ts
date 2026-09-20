import { Equals, IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class StagePaymentCredentialDto {
  @IsString()
  @IsNotEmpty()
  secretKey: string;
}

export class ActivatePaymentCredentialDto {
  @IsBoolean()
  @Equals(true, {
    message: 'confirmPavodahOwnership must be accepted before activation',
  })
  confirmPavodahOwnership: true;
}
