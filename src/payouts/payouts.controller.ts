import {
  BadRequestException,
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
import { PayoutDestinationType } from '../../generated/prisma';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import {
  IsAdmin,
  IsServiceProvider,
} from '../common/decorators/roles.decorator';
import { ResponseUtil } from '../common/utils/response.util';
import {
  FinalizePayoutDto,
  PayoutListQueryDto,
  PayoutPaginationQueryDto,
  RejectPayoutDto,
  ReviewReleaseDto,
  UpdatePaymentSettingsDto,
  UpdatePayoutAccountDto,
} from './dto/payouts.dto';
import { PayoutsService } from './payouts.service';

@Controller('payouts')
@UseGuards(RolesGuard)
export class PayoutsController {
  constructor(private readonly payouts: PayoutsService) {}

  @Get('institutions')
  @IsServiceProvider()
  async institutions(@Query('type') type: PayoutDestinationType) {
    if (!Object.values(PayoutDestinationType).includes(type)) {
      throw new BadRequestException('type must be GHIPSS or MOBILE_MONEY');
    }
    return ResponseUtil.success(
      await this.payouts.listInstitutions(type),
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
  async account(@CurrentUser('userId') providerId: string) {
    return ResponseUtil.success(
      await this.payouts.getAccount(providerId),
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
  async summary(@CurrentUser('userId') providerId: string) {
    return ResponseUtil.success(
      await this.payouts.getSummary(providerId),
      'Earnings summary retrieved',
    );
  }

  @Get('earnings')
  @IsServiceProvider()
  async earnings(
    @CurrentUser('userId') providerId: string,
    @Query() query: PayoutPaginationQueryDto,
  ) {
    return ResponseUtil.success(
      await this.payouts.listEarnings(providerId, query.page, query.limit),
      'Earnings retrieved',
    );
  }

  @Post('requests')
  @IsServiceProvider()
  async requestPayout(@CurrentUser('userId') providerId: string) {
    return ResponseUtil.success(
      await this.payouts.requestPayout(providerId),
      'Payout request submitted',
    );
  }

  @Get('requests')
  @IsServiceProvider()
  async providerPayouts(
    @CurrentUser('userId') providerId: string,
    @Query() query: PayoutPaginationQueryDto,
  ) {
    return ResponseUtil.success(
      await this.payouts.listProviderPayouts(
        providerId,
        query.page,
        query.limit,
      ),
      'Payout history retrieved',
    );
  }

  @Get('admin')
  @IsAdmin()
  async adminPayouts(@Query() query: PayoutListQueryDto) {
    return ResponseUtil.success(
      await this.payouts.listForAdmin(query),
      'Payout requests retrieved',
    );
  }

  @Post('admin/:id/approve')
  @IsAdmin()
  @HttpCode(200)
  async approve(
    @Param('id') id: string,
    @CurrentUser('userId') adminId: string,
  ) {
    return ResponseUtil.success(
      await this.payouts.approve(id, adminId),
      'Payout approval submitted',
    );
  }

  @Post('admin/:id/finalize')
  @IsAdmin()
  @HttpCode(200)
  async finalize(@Param('id') id: string, @Body() dto: FinalizePayoutDto) {
    return ResponseUtil.success(
      await this.payouts.finalize(id, dto.otp),
      'Payout OTP submitted',
    );
  }

  @Post('admin/:id/reject')
  @IsAdmin()
  @HttpCode(200)
  async reject(
    @Param('id') id: string,
    @CurrentUser('userId') adminId: string,
    @Body() dto: RejectPayoutDto,
  ) {
    return ResponseUtil.success(
      await this.payouts.reject(id, adminId, dto.reason),
      'Payout request rejected',
    );
  }

  @Get('admin/release-reviews')
  @IsAdmin()
  async releaseReviews(@Query() query: PayoutPaginationQueryDto) {
    return ResponseUtil.success(
      await this.payouts.listReleaseReviews(query.page, query.limit),
      'Release reviews retrieved',
    );
  }

  @Post('admin/release-reviews/:orderId')
  @IsAdmin()
  @HttpCode(200)
  async reviewRelease(
    @Param('orderId') orderId: string,
    @Body() dto: ReviewReleaseDto,
  ) {
    return ResponseUtil.success(
      await this.payouts.reviewRelease(orderId, dto.approve, dto.note),
      dto.approve ? 'Earnings released' : 'Release request rejected',
    );
  }

  @Get('admin/settings')
  @IsAdmin()
  async settings() {
    return ResponseUtil.success(
      await this.payouts.getSettings(),
      'Payment settings retrieved',
    );
  }

  @Patch('admin/settings')
  @IsAdmin()
  async updateSettings(
    @CurrentUser('userId') adminId: string,
    @Body() dto: UpdatePaymentSettingsDto,
  ) {
    return ResponseUtil.success(
      await this.payouts.updateSettings(adminId, dto.commissionRate),
      'Payment settings updated',
    );
  }
}
