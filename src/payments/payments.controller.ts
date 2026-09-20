import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  RawBodyRequest,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Public } from '../common/decorators/is-public.decorator';
import { IsAdmin } from '../common/decorators/roles.decorator';
import { ResponseUtil } from '../common/utils/response.util';
import { RolesGuard } from '../auth/guards/roles.guard';
import { VerifyPaymentDto } from './dto/verify-payment.dto';
import { RefundPaymentDto } from './dto/refund-payment.dto';
import {
  PaymentListQueryDto,
  PaymentPaginationQueryDto,
  RefundListQueryDto,
} from './dto/payment-list-query.dto';
import {
  MarketIdQueryDto,
  ResolveRefundAccountDto,
  RetryRefundDto,
} from './dto/retry-refund.dto';
import { PaystackWebhookGuard } from './paystack-webhook.guard';
import {
  PaystackRefundWebhookData,
  PaystackDisputeWebhookData,
  PaystackTransferData,
  PaystackTransactionData,
} from './paystack.service';
import { PaymentsService } from './payments.service';
import {
  MarketAccessService,
  MarketActor,
} from '../markets/market-access.service';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly marketAccess: MarketAccessService,
  ) {}

  @Post('orders/:orderId/initialize')
  @HttpCode(HttpStatus.OK)
  async initialize(
    @Param('orderId') orderId: string,
    @CurrentUser('userId') userId: string,
  ) {
    const payment = await this.paymentsService.initialize(orderId, userId);
    return ResponseUtil.success(payment, 'Payment initialized successfully');
  }

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  async verify(
    @Body() dto: VerifyPaymentDto,
    @CurrentUser('userId') userId: string,
  ) {
    const payment = await this.paymentsService.verify(dto.reference, userId);
    return ResponseUtil.success(payment, 'Payment verified');
  }

  @Get('orders/:orderId')
  async getOrderPayment(
    @Param('orderId') orderId: string,
    @CurrentUser('userId') userId: string,
    @CurrentUser('role') role: string,
    @CurrentUser() actor: MarketActor,
  ) {
    const payment = await this.paymentsService.getOrderPayment(
      orderId,
      userId,
      role,
      actor,
    );
    return ResponseUtil.success(payment, 'Order payment retrieved');
  }

  @Get('admin')
  @UseGuards(RolesGuard)
  @IsAdmin()
  async listForAdmin(
    @CurrentUser() actor: MarketActor,
    @Query() query: PaymentListQueryDto,
  ) {
    const payments = await this.paymentsService.listForAdmin(
      actor,
      query.marketId,
      query.page,
      query.limit,
      query.search,
    );
    return ResponseUtil.success(payments, 'Payments retrieved successfully');
  }

  @Get('admin/external-disputes')
  @UseGuards(RolesGuard)
  @IsAdmin()
  async externalDisputes(
    @CurrentUser() actor: MarketActor,
    @Query() query: PaymentPaginationQueryDto,
  ) {
    return ResponseUtil.success(
      await this.paymentsService.listExternalDisputes(
        actor,
        query.marketId,
        query.page,
        query.limit,
      ),
      'External payment disputes retrieved',
    );
  }

  @Post('admin/reconcile-transfers')
  @UseGuards(RolesGuard)
  @IsAdmin()
  @HttpCode(HttpStatus.OK)
  async reconcileTransfers(
    @CurrentUser() actor: MarketActor,
    @Query('marketId') requestedMarketId?: string,
  ) {
    const marketId = this.marketAccess.marketForAdmin(actor, requestedMarketId);
    return ResponseUtil.success(
      await this.paymentsService.reconcilePendingTransfers(marketId),
      'Pending transfers reconciled',
    );
  }

  @Get('admin/refunds')
  @UseGuards(RolesGuard)
  @IsAdmin()
  async refunds(
    @CurrentUser() actor: MarketActor,
    @Query() query: RefundListQueryDto,
  ) {
    return ResponseUtil.success(
      await this.paymentsService.listRefundsForAdmin(
        actor,
        query.marketId,
        query.page,
        query.limit,
        query.status,
      ),
      'Refunds retrieved',
    );
  }

  @Post('admin/refunds/reconcile')
  @UseGuards(RolesGuard)
  @IsAdmin()
  @HttpCode(HttpStatus.OK)
  async reconcileRefunds(
    @CurrentUser() actor: MarketActor,
    @Query('marketId') requestedMarketId?: string,
  ) {
    const marketId = this.marketAccess.marketForAdmin(actor, requestedMarketId);
    return ResponseUtil.success(
      await this.paymentsService.reconcilePendingRefunds(marketId),
      'Pending refunds reconciled',
    );
  }

  @Post('admin/refunds/:id/retry')
  @UseGuards(RolesGuard)
  @IsAdmin()
  @HttpCode(HttpStatus.OK)
  async retryRefund(
    @CurrentUser() actor: MarketActor,
    @Param('id') id: string,
    @Body() dto: RetryRefundDto,
  ) {
    return ResponseUtil.success(
      await this.paymentsService.retryRefund(id, dto, actor),
      'Refund retry submitted',
    );
  }

  @Post('admin/refunds/:id/reattempt')
  @UseGuards(RolesGuard)
  @IsAdmin()
  @HttpCode(HttpStatus.OK)
  async reattemptRefund(
    @CurrentUser() actor: MarketActor,
    @Param('id') id: string,
  ) {
    return ResponseUtil.success(
      await this.paymentsService.reattemptExcessRefund(id, actor),
      'Duplicate-charge refund reattempted',
    );
  }

  @Get('admin/refund-institutions')
  @UseGuards(RolesGuard)
  @IsAdmin()
  async refundInstitutions(
    @CurrentUser() actor: MarketActor,
    @Query() query: MarketIdQueryDto,
  ) {
    return ResponseUtil.success(
      await this.paymentsService.listRefundInstitutions(query.marketId, actor),
      'Refund banks retrieved',
    );
  }

  @Post('admin/refund-account/resolve')
  @UseGuards(RolesGuard)
  @IsAdmin()
  @HttpCode(HttpStatus.OK)
  async resolveRefundAccount(
    @CurrentUser() actor: MarketActor,
    @Body() dto: ResolveRefundAccountDto,
  ) {
    return ResponseUtil.success(
      await this.paymentsService.resolveRefundAccount(
        dto.accountNumber,
        dto.bankCode,
        dto.marketId,
        actor,
      ),
      'Refund account verified',
    );
  }

  @Post('orders/:orderId/refund')
  @UseGuards(RolesGuard)
  @IsAdmin()
  @HttpCode(HttpStatus.OK)
  async refund(
    @CurrentUser() actor: MarketActor,
    @Param('orderId') orderId: string,
    @Body() dto: RefundPaymentDto,
  ) {
    const refund = await this.paymentsService.refund(
      orderId,
      dto.reason,
      dto.amount,
      undefined,
      false,
      actor,
    );
    return ResponseUtil.success(refund, 'Refund initiated successfully');
  }

  @Public()
  @Post('paystack/:integrationKey/webhook')
  @UseGuards(PaystackWebhookGuard)
  @HttpCode(HttpStatus.OK)
  async webhook(@Req() req: RawBodyRequest<Request>) {
    await this.paymentsService.handleWebhook(
      req.body as {
        event?: string;
        data?:
          | PaystackTransactionData
          | PaystackRefundWebhookData
          | PaystackTransferData
          | PaystackDisputeWebhookData;
      },
      (req as any).paymentIntegration?.id,
    );
    return { received: true };
  }
}
