import { Controller, Get, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import {
  IsServiceProvider,
  IsAdmin,
} from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ResponseUtil } from '../common/utils/response.util';

@Controller('analytics')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('provider')
  @IsServiceProvider()
  async providerDashboard(@CurrentUser('userId') userId: string) {
    const data = await this.analyticsService.getProviderDashboard(userId);
    return ResponseUtil.success(data, 'Provider analytics retrieved');
  }

  @Get('admin')
  @IsAdmin()
  async adminDashboard() {
    const data = await this.analyticsService.getAdminDashboard();
    return ResponseUtil.success(data, 'Admin analytics retrieved');
  }
}
