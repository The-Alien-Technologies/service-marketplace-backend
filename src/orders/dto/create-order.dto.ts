import { Type } from 'class-transformer';
import {
  IsString,
  IsArray,
  IsOptional,
  IsNumber,
  ValidateNested,
  IsNotEmpty,
  Min,
} from 'class-validator';

export class CreateOrderAddOnDto {
  @IsString()
  @IsNotEmpty()
  id: string;

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

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  serviceId: string;

  // Plan details
  @IsString()
  @IsNotEmpty()
  planId: string;

  @IsString()
  @IsNotEmpty()
  planTitle: string;

  @IsNumber()
  @Min(0)
  planPrice: number;

  @IsString()
  @IsNotEmpty()
  planInclusions: string;

  // Add-ons
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderAddOnDto)
  addOns?: CreateOrderAddOnDto[];

  // Pricing
  @IsNumber()
  @Min(0)
  subtotal: number;

  @IsNumber()
  @Min(0)
  addOnsTotal: number;

  @IsOptional()
  @IsString()
  couponCode?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  couponDiscount?: number;

  @IsNumber()
  @Min(0)
  total: number;
}
