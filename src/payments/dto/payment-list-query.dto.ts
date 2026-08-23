import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { PaymentRefundStatus } from '../../../generated/prisma';

export class PaymentPaginationQueryDto {
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

export class PaymentListQueryDto extends PaymentPaginationQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  search?: string;
}

export class RefundListQueryDto extends PaymentPaginationQueryDto {
  @IsOptional()
  @IsEnum(PaymentRefundStatus)
  status?: PaymentRefundStatus;
}
