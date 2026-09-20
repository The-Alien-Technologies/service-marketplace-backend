import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import {
  IsAdmin,
  IsServiceProvider,
} from '../common/decorators/roles.decorator';
import { ResponseUtil } from '../common/utils/response.util';
import {
  FinalizePayoutDto,
  MarketQueryDto,
  PayoutListQueryDto,
  PayoutInstitutionsQueryDto,
  PayoutPaginationQueryDto,
  ProviderPayoutPaginationQueryDto,
  RejectPayoutDto,
  ReviewReleaseDto,
  UpdatePaymentSettingsDto,
  UpdatePayoutAccountDto,
} from './dto/payouts.dto';
import { PayoutsService } from './payouts.service';
import { MarketActor } from '../markets/market-access.service';

@Controller('payouts')
@UseGuards(RolesGuard)
export class PayoutsController {
  constructor(private readonly payouts: PayoutsService) {}

  @Get('institutions')
  @IsServiceProvider()
  async institutions(@Query() query: PayoutInstitutionsQueryDto) {
    return ResponseUtil.success(
      await this.payouts.listInstitutions(query.type, query.marketId),
      'Payout institutions retrieved',
    );
  }

  @Post('account/otp')
  @IsServiceProvider()
  @HttpCode(200)
  async sendAccountOtp(@CurrentUser('userId') providerId: string) {
    return ResponseUtil.success(
      await this.payouts.sendAccountOtp(providerId),
      'Verification code sent',
    );
  }

  @Get('account')
  @IsServiceProvider()
  async account(
    @CurrentUser('userId') providerId: string,
    @Query() query: MarketQueryDto,
  ) {
    return ResponseUtil.success(
      await this.payouts.getAccount(providerId, query.marketId),
      'Payout account retrieved',
    );
  }

  @Put('account')
  @IsServiceProvider()
  async updateAccount(
    @CurrentUser('userId') providerId: string,
    @Body() dto: UpdatePayoutAccountDto,
  ) {
    return ResponseUtil.success(
      await this.payouts.updateAccount(providerId, dto),
      'Payout destination verified',
    );
  }

  @Get('summary')
  @IsServiceProvider()
  async summary(
    @CurrentUser('userId') providerId: string,
    @Query() query: MarketQueryDto,
  ) {
    return ResponseUtil.success(
      await this.payouts.getSummary(providerId, query.marketId),
      'Earnings summary retrieved',
    );
  }

  @Get('earnings')
  @IsServiceProvider()
  async earnings(
    @CurrentUser('userId') providerId: string,
    @Query() query: ProviderPayoutPaginationQueryDto,
  ) {
    return ResponseUtil.success(
      await this.payouts.listEarnings(
        providerId,
        query.marketId,
        query.page,
        query.limit,
      ),
      'Earnings retrieved',
    );
  }

  @Post('requests')
  @IsServiceProvider()
  async requestPayout(
    @CurrentUser('userId') providerId: string,
    @Query() query: MarketQueryDto,
  ) {
    return ResponseUtil.success(
      await this.payouts.requestPayout(providerId, query.marketId),
      'Payout request submitted',
    );
  }

  @Get('requests')
  @IsServiceProvider()
  async providerPayouts(
    @CurrentUser('userId') providerId: string,
    @Query() query: ProviderPayoutPaginationQueryDto,
  ) {
    return ResponseUtil.success(
      await this.payouts.listProviderPayouts(
        providerId,
        query.marketId,
        query.page,
        query.limit,
      ),
      'Payout history retrieved',
    );
  }

  @Get('admin')
  @IsAdmin()
  async adminPayouts(
    @CurrentUser() actor: MarketActor,
    @Query() query: PayoutListQueryDto,
  ) {
    return ResponseUtil.success(
      await this.payouts.listForAdmin(actor, query),
      'Payout requests retrieved',
    );
  }

  @Post('admin/:id/approve')
  @IsAdmin()
  @HttpCode(200)
  async approve(@Param('id') id: string, @CurrentUser() actor: MarketActor) {
    return ResponseUtil.success(
      await this.payouts.approve(id, actor),
      'Payout approval submitted',
    );
  }

  @Post('admin/:id/finalize')
  @IsAdmin()
  @HttpCode(200)
  async finalize(
    @Param('id') id: string,
    @Body() dto: FinalizePayoutDto,
    @CurrentUser() actor: MarketActor,
  ) {
    return ResponseUtil.success(
      await this.payouts.finalize(id, dto.otp, actor),
      'Payout OTP submitted',
    );
  }

  @Post('admin/:id/reject')
  @IsAdmin()
  @HttpCode(200)
  async reject(
    @Param('id') id: string,
    @CurrentUser() actor: MarketActor,
    @Body() dto: RejectPayoutDto,
  ) {
    return ResponseUtil.success(
      await this.payouts.reject(id, actor, dto.reason),
      'Payout request rejected',
    );
  }

  @Get('admin/release-reviews')
  @IsAdmin()
  async releaseReviews(
    @CurrentUser() actor: MarketActor,
    @Query() query: PayoutPaginationQueryDto,
    @Query('marketId') marketId?: string,
  ) {
    return ResponseUtil.success(
      await this.payouts.listReleaseReviews(
        actor,
        marketId,
        query.page,
        query.limit,
      ),
      'Release reviews retrieved',
    );
  }

  @Post('admin/release-reviews/:orderId')
  @IsAdmin()
  @HttpCode(200)
  async reviewRelease(
    @Param('orderId') orderId: string,
    @Body() dto: ReviewReleaseDto,
    @CurrentUser() actor: MarketActor,
  ) {
    return ResponseUtil.success(
      await this.payouts.reviewRelease(actor, orderId, dto.approve, dto.note),
      dto.approve ? 'Earnings released' : 'Release request rejected',
    );
  }

  @Get('admin/settings')
  @IsAdmin()
  async settings(
    @CurrentUser() actor: MarketActor,
    @Query('marketId') marketId?: string,
  ) {
    return ResponseUtil.success(
      await this.payouts.getSettings(actor, marketId),
      'Payment settings retrieved',
    );
  }

  @Patch('admin/settings')
  @IsAdmin()
  async updateSettings(
    @CurrentUser() actor: MarketActor,
    @Query('marketId') marketId: string | undefined,
    @Body() dto: UpdatePaymentSettingsDto,
  ) {
    return ResponseUtil.success(
      await this.payouts.updateSettings(actor, marketId, dto.commissionRate),
      'Payment settings updated',
    );
  }
}
