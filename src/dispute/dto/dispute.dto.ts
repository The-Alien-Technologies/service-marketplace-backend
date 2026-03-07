import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { DisputeIssueType, DisputeStatus } from '../../../generated/prisma';

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
