import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import {
  IsServiceProvider,
  IsAdmin,
  IsUser,
} from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ResponseUtil } from '../common/utils/response.util';
import { AdminAnalyticsQueryDto } from './dto/admin-analytics-query.dto';
import { ProviderAnalyticsQueryDto } from './dto/provider-analytics-query.dto';
import { UserAnalyticsQueryDto } from './dto/user-analytics-query.dto';

@Controller('analytics')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('user')
  @IsUser()
  async userDashboard(
    @CurrentUser('userId') userId: string,
    @Query() query: UserAnalyticsQueryDto,
  ) {
    const data = await this.analyticsService.getUserDashboard(
      userId,
      query.year,
    );
    return ResponseUtil.success(data, 'User analytics retrieved');
  }

  @Get('provider')
  @IsServiceProvider()
  async providerDashboard(
    @CurrentUser('userId') userId: string,
    @Query() query: ProviderAnalyticsQueryDto,
  ) {
    const data = await this.analyticsService.getProviderDashboard(
      userId,
      query.year,
      query.orderMonth,
    );
    return ResponseUtil.success(data, 'Provider analytics retrieved');
  }

  @Get('admin')
  @IsAdmin()
  async adminDashboard(@Query() query: AdminAnalyticsQueryDto) {
    const data = await this.analyticsService.getAdminDashboard(
      query.year,
      query.categoryMonth,
    );
    return ResponseUtil.success(data, 'Admin analytics retrieved');
  }
}
