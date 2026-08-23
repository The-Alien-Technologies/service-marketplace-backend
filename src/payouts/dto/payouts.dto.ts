import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import {
  PayoutDestinationType,
  ProviderPayoutStatus,
} from '../../../generated/prisma';

export class UpdatePayoutAccountDto {
  @IsEnum(PayoutDestinationType)
  type: PayoutDestinationType;

  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  institutionCode: string;

  @IsString()
  @Matches(/^\d{7,20}$/, {
    message: 'accountNumber must contain 7 to 20 digits',
  })
  accountNumber: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  accountName: string;

  @IsString()
  @Length(6, 6)
  @Matches(/^\d{6}$/)
  otpCode: string;
}

export class RejectPayoutDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  reason: string;
}

export class FinalizePayoutDto {
  @IsString()
  @Length(6, 6)
  @Matches(/^\d{6}$/)
  otp: string;
}

export class PayoutPaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;
}

export class PayoutListQueryDto extends PayoutPaginationQueryDto {
  @IsOptional()
  @IsEnum(ProviderPayoutStatus)
  status?: ProviderPayoutStatus;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  search?: string;
}

export class UpdatePaymentSettingsDto {
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(100)
  commissionRate: number;
}

export class ReviewReleaseDto {
  @IsBoolean()
  approve: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  note?: string;
}
