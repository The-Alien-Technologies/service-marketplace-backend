import {
  IsBoolean,
  IsEnum,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import {
  MarketStatus,
  ProviderMarketMembershipStatus,
  UserStatus,
} from '../../../generated/prisma';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class UpdateMarketDto {
  @IsOptional()
  @IsEnum(MarketStatus)
  status?: MarketStatus;

  @IsOptional()
  @IsBoolean()
  checkoutEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  providerOnboardingEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  servicePublishingEnabled?: boolean;
}

export class SelectMarketDto {
  @IsOptional()
  @IsString()
  marketCode?: string;
}

export class AssignCountryAdminDto {
  @IsString()
  userId: string;

  @IsString()
  marketId: string;
}

export class UpdateCountryAdminDto {
  @IsOptional()
  @IsString()
  marketId?: string;

  @IsOptional()
  @IsEnum(UserStatus)
  @IsIn([UserStatus.ACTIVE, UserStatus.SUSPENDED])
  status?: UserStatus;
}

export class ReviewMarketMembershipDto {
  @IsEnum(ProviderMarketMembershipStatus)
  status: ProviderMarketMembershipStatus;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;
}

export class MarketMembershipQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  marketId?: string;

  @IsOptional()
  @IsEnum(ProviderMarketMembershipStatus)
  status?: ProviderMarketMembershipStatus;
}
