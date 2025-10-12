import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class UpdateLocationDto {
  @IsOptional()
  @IsString()
  placeId?: string;

  @IsString()
  addressName: string;

  @IsString()
  formattedAddress: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  postalCode?: string;

  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;
}
