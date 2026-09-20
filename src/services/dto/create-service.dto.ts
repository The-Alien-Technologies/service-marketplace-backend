import { plainToInstance, Transform } from 'class-transformer';
import {
  IsString,
  IsArray,
  IsOptional,
  IsNumber,
  IsBoolean,
  ValidateNested,
  IsNotEmpty,
  MaxLength,
  Min,
  ArrayMinSize,
  ArrayMaxSize,
  IsEnum,
} from 'class-validator';
import { ServiceAvailability } from '../../../generated/prisma';

export class CreateServicePlanDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  @IsNotEmpty()
  inclusions: string;

  @IsOptional()
  @IsBoolean()
  isPopular?: boolean;

  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}

export class CreateServiceAddonDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @Min(0)
  price: number;
}

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  marketId: string;

  @IsOptional()
  @IsEnum(ServiceAvailability)
  availability?: ServiceAvailability;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsString()
  @MaxLength(500)
  overview: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        const parsed: unknown = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        return [value];
      }
    }
    return value;
  })
  tags?: string[];

  @IsArray()
  @ArrayMinSize(1, { message: 'At least one pricing plan is required' })
  @ArrayMaxSize(5, { message: 'Maximum 5 pricing plans allowed' })
  @ValidateNested({ each: true })
  @Transform(({ value }) => {
    let parsed = value;
    if (typeof value === 'string') {
      try {
        parsed = JSON.parse(value);
      } catch {
        return value;
      }
    }
    return Array.isArray(parsed)
      ? plainToInstance(CreateServicePlanDto, parsed)
      : parsed;
  })
  plans: CreateServicePlanDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Transform(({ value }) => {
    let parsed = value;
    if (typeof value === 'string') {
      try {
        parsed = JSON.parse(value);
      } catch {
        return value;
      }
    }
    return Array.isArray(parsed)
      ? plainToInstance(CreateServiceAddonDto, parsed)
      : parsed;
  })
  addons?: CreateServiceAddonDto[];
}
