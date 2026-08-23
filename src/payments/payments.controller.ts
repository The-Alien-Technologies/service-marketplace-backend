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

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

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
  ) {
    const payment = await this.paymentsService.getOrderPayment(
      orderId,
      userId,
      role,
    );
    return ResponseUtil.success(payment, 'Order payment retrieved');
  }

  @Get('admin')
  @UseGuards(RolesGuard)
  @IsAdmin()
  async listForAdmin(@Query() query: PaymentListQueryDto) {
    const payments = await this.paymentsService.listForAdmin(
      query.page,
      query.limit,
      query.search,
    );
    return ResponseUtil.success(payments, 'Payments retrieved successfully');
  }

  @Get('admin/external-disputes')
  @UseGuards(RolesGuard)
  @IsAdmin()
  async externalDisputes(@Query() query: PaymentPaginationQueryDto) {
    return ResponseUtil.success(
      await this.paymentsService.listExternalDisputes(query.page, query.limit),
      'External payment disputes retrieved',
    );
  }

  @Post('admin/reconcile-transfers')
  @UseGuards(RolesGuard)
  @IsAdmin()
  @HttpCode(HttpStatus.OK)
  async reconcileTransfers() {
    return ResponseUtil.success(
      await this.paymentsService.reconcilePendingTransfers(),
      'Pending transfers reconciled',
    );
  }

  @Get('admin/refunds')
  @UseGuards(RolesGuard)
  @IsAdmin()
  async refunds(@Query() query: RefundListQueryDto) {
    return ResponseUtil.success(
      await this.paymentsService.listRefundsForAdmin(
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
  async reconcileRefunds() {
    return ResponseUtil.success(
      await this.paymentsService.reconcilePendingRefunds(),
      'Pending refunds reconciled',
    );
  }

  @Post('admin/refunds/:id/retry')
  @UseGuards(RolesGuard)
  @IsAdmin()
  @HttpCode(HttpStatus.OK)
  async retryRefund(@Param('id') id: string, @Body() dto: RetryRefundDto) {
    return ResponseUtil.success(
      await this.paymentsService.retryRefund(id, dto),
      'Refund retry submitted',
    );
  }

  @Post('admin/refunds/:id/reattempt')
  @UseGuards(RolesGuard)
  @IsAdmin()
  @HttpCode(HttpStatus.OK)
  async reattemptRefund(@Param('id') id: string) {
    return ResponseUtil.success(
      await this.paymentsService.reattemptExcessRefund(id),
      'Duplicate-charge refund reattempted',
    );
  }

  @Get('admin/refund-institutions')
  @UseGuards(RolesGuard)
  @IsAdmin()
  async refundInstitutions() {
    return ResponseUtil.success(
      await this.paymentsService.listRefundInstitutions(),
      'Refund banks retrieved',
    );
  }

  @Post('admin/refund-account/resolve')
  @UseGuards(RolesGuard)
  @IsAdmin()
  @HttpCode(HttpStatus.OK)
  async resolveRefundAccount(@Body() dto: ResolveRefundAccountDto) {
    return ResponseUtil.success(
      await this.paymentsService.resolveRefundAccount(
        dto.accountNumber,
        dto.bankCode,
      ),
      'Refund account verified',
    );
  }

  @Post('orders/:orderId/refund')
  @UseGuards(RolesGuard)
  @IsAdmin()
  @HttpCode(HttpStatus.OK)
  async refund(
    @Param('orderId') orderId: string,
    @Body() dto: RefundPaymentDto,
  ) {
    const refund = await this.paymentsService.refund(
      orderId,
      dto.reason,
      dto.amount,
    );
    return ResponseUtil.success(refund, 'Refund initiated successfully');
  }

  @Public()
  @Post('paystack/webhook')
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
    );
    return { received: true };
  }
}
