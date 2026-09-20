import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Public } from '../common/decorators/is-public.decorator';
import {
  IsServiceProvider,
  IsSuperAdmin,
  IsAdmin,
} from '../common/decorators/roles.decorator';
import { ResponseUtil } from '../common/utils/response.util';
import {
  AssignCountryAdminDto,
  MarketMembershipQueryDto,
  ReviewMarketMembershipDto,
  SelectMarketDto,
  UpdateMarketDto,
  UpdateCountryAdminDto,
} from './dto/market.dto';
import { MarketsService } from './markets.service';
import { MarketActor } from './market-access.service';

@Controller('markets')
export class MarketsController {
  constructor(private readonly markets: MarketsService) {}

  @Public()
  @Get()
  async publicMarkets() {
    return ResponseUtil.success(
      await this.markets.listPublic(),
      'Markets retrieved',
    );
  }

  @Post('selection')
  async selectMarket(
    @CurrentUser('userId') userId: string,
    @Body() dto: SelectMarketDto,
  ) {
    return ResponseUtil.success(
      await this.markets.selectForUser(userId, dto.marketCode),
      'Market preference updated',
    );
  }

  @Get('provider/memberships')
  @IsServiceProvider()
  async memberships(@CurrentUser('userId') userId: string) {
    return ResponseUtil.success(
      await this.markets.listProviderMemberships(userId),
      'Provider markets retrieved',
    );
  }

  @Post('provider/memberships/:marketId')
  @IsServiceProvider()
  async apply(
    @CurrentUser('userId') userId: string,
    @Param('marketId') marketId: string,
  ) {
    return ResponseUtil.success(
      await this.markets.apply(userId, marketId),
      'Market application submitted',
    );
  }

  @Get('admin/all')
  @IsSuperAdmin()
  async allMarkets(
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    return ResponseUtil.success(
      await this.markets.listAll({ search, status }),
      'Markets retrieved',
    );
  }

  @Patch('admin/:id')
  @IsSuperAdmin()
  async updateMarket(
    @CurrentUser('userId') actorId: string,
    @Param('id') id: string,
    @Body() dto: UpdateMarketDto,
  ) {
    return ResponseUtil.success(
      await this.markets.update(id, actorId, dto),
      'Market updated',
    );
  }

  @Post('admin/country-admins')
  @IsSuperAdmin()
  async assignCountryAdmin(
    @CurrentUser('userId') actorId: string,
    @Body() dto: AssignCountryAdminDto,
  ) {
    return ResponseUtil.success(
      await this.markets.assignCountryAdmin(dto.userId, dto.marketId, actorId),
      'Country administrator assigned',
    );
  }

  @Get('admin/country-admins')
  @IsSuperAdmin()
  async countryAdmins(
    @Query('search') search?: string,
    @Query('marketId') marketId?: string,
    @Query('status') status?: string,
  ) {
    return ResponseUtil.success(
      await this.markets.listCountryAdmins({ search, marketId, status }),
      'Country administrators retrieved',
    );
  }

  @Patch('admin/country-admins/:id')
  @IsSuperAdmin()
  async updateCountryAdmin(
    @CurrentUser('userId') actorId: string,
    @Param('id') id: string,
    @Body() dto: UpdateCountryAdminDto,
  ) {
    return ResponseUtil.success(
      await this.markets.updateCountryAdmin(id, actorId, dto),
      'Country administrator updated',
    );
  }

  @Delete('admin/country-admins/:id')
  @IsSuperAdmin()
  async removeCountryAdmin(
    @CurrentUser('userId') actorId: string,
    @Param('id') id: string,
  ) {
    return ResponseUtil.success(
      await this.markets.removeCountryAdmin(id, actorId),
      'Country administrator access removed',
    );
  }

  @Get('admin/provider-memberships')
  @IsAdmin()
  async membershipApplications(
    @CurrentUser() actor: MarketActor,
    @Query() query: MarketMembershipQueryDto,
  ) {
    return ResponseUtil.success(
      await this.markets.listMembershipApplications(actor, {
        marketId: query.marketId,
        status: query.status,
        search: query.search,
        page: query.page,
        limit: query.limit,
        orderBy: query.orderBy,
      }),
      'Provider market applications retrieved',
    );
  }

  @Patch('admin/provider-memberships/:id')
  @IsAdmin()
  async reviewMembership(
    @CurrentUser() actor: MarketActor,
    @Param('id') id: string,
    @Body() dto: ReviewMarketMembershipDto,
  ) {
    return ResponseUtil.success(
      await this.markets.reviewMembership(id, actor, dto.status, dto.reason),
      'Provider market membership updated',
    );
  }
}
