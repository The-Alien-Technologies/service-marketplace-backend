import {
  IsNumber,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  DisputeIssueType,
  DisputeResolutionType,
  DisputeStatus,
} from '../../../generated/prisma';

export class CreateDisputeDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsEnum(DisputeIssueType)
  issueType: DisputeIssueType;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  description: string;
}

export class UpdateDisputeStatusDto {
  @IsEnum(DisputeStatus)
  status: DisputeStatus;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  adminNote?: string;
}

export class ResolveDisputeDto {
  @IsEnum(DisputeResolutionType)
  resolutionType: DisputeResolutionType;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  refundAmount?: number;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  adminNote?: string;
}
