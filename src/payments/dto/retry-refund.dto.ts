import { IsString, Matches, MaxLength } from 'class-validator';

export class ResolveRefundAccountDto {
  @IsString()
  @Matches(/^\d{7,20}$/, {
    message: 'accountNumber must contain 7 to 20 digits',
  })
  accountNumber: string;

  @IsString()
  @MaxLength(40)
  bankCode: string;
}

export class RetryRefundDto extends ResolveRefundAccountDto {
  @IsString()
  @Matches(/^GHS$/)
  currency: string;
}
