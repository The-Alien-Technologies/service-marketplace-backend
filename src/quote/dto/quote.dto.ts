import {
  IsString,
  IsNumber,
  IsOptional,
  Min,
  IsNotEmpty,
} from 'class-validator';

export class CreateQuoteDto {
  @IsString()
  @IsNotEmpty()
  providerId: string;

  @IsOptional()
  @IsString()
  serviceId?: string;

  @IsString()
  @IsNotEmpty()
  projectTitle: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  deliveryTime: string;

  @IsNumber()
  @Min(0)
  budget: number;

  @IsOptional()
  @IsString()
  currency?: string;
}

export class UpdateQuoteStatusDto {
  @IsString()
  @IsNotEmpty()
  status: 'ACCEPTED' | 'DECLINED' | 'EXPIRED';

  @IsOptional()
  @IsString()
  declineReason?: string;
}

export class SendQuoteOfferDto {
  @IsString()
  @IsNotEmpty()
  projectTitle: string;

  @IsNumber()
  @Min(0)
  budget: number;

  @IsString()
  @IsNotEmpty()
  deliveryTime: string;

  @IsOptional()
  @IsString()
  providerNote?: string;
}
