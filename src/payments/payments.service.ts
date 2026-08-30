import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import {
  OrderPaymentStatus,
  OrderStatus,
  BalanceAdjustmentStatus,
  BalanceAdjustmentType,
  ExternalPaymentDisputeStatus,
  PaymentRefundStatus,
  PaymentTransactionStatus,
  Prisma,
  ProviderPayoutStatus,
  SettlementStatus,
} from '../../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';
import {
  PaystackService,
  PaystackRequestException,
  PaystackRefundData,
  PaystackRefundWebhookData,
  PaystackDisputeWebhookData,
  PaystackTransferData,
  PaystackTransactionData,
} from './paystack.service';
import { SettlementsService } from '../settlements/settlements.service';
import { NotificationEventsService } from '../notifications/notification-events.service';
import {
  applyPaystackTransferState,
  eventForTransferStatus,
  PaystackTransferEvent,
} from './transfer-state';

type TransactionWithOrder = Prisma.PaymentTransactionGetPayload<{
  include: { order: true };
}>;

const ACTIVE_EXTERNAL_DISPUTE_STATUSES: ExternalPaymentDisputeStatus[] = [
  ExternalPaymentDisputeStatus.OPEN,
  ExternalPaymentDisputeStatus.REMINDER,
];

const MAX_DATABASE_MINOR_AMOUNT = 2_147_483_647;

@Injectable()
export class PaymentsService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PaymentsService.name);
  private reconciliationTimer?: ReturnType<typeof setInterval>;
  private refundReconciliationTimer?: ReturnType<typeof setInterval>;

  constructor(
    private readonly prisma: PrismaService,
    private readonly paystack: PaystackService,
    private readonly config: ConfigService,
    private readonly settlements: SettlementsService,
    private readonly notificationEvents?: NotificationEventsService,
  ) {}

  onModuleInit() {
    if (
      this.config.get<string>('REFUND_RECONCILIATION_ENABLED', 'true') ===
      'true'
    ) {
      const refundInterval = Math.max(
        60_000,
        Number(
          this.config.get<string>(
            'REFUND_RECONCILIATION_INTERVAL_MS',
            '900000',
          ),
        ) || 900_000,
      );
      this.refundReconciliationTimer = setInterval(() => {
        void this.reconcilePendingRefunds().catch((error) =>
          this.logger.error(
            `Refund reconciliation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
          ),
        );
      }, refundInterval);
      this.refundReconciliationTimer.unref?.();
    }

    if (
      this.config.get<string>('PAYOUTS_ENABLED', 'false') === 'true' &&
      this.config.get<string>('PAYOUT_RECONCILIATION_ENABLED', 'true') ===
        'true'
    ) {
      const interval = Math.max(
        60_000,
        Number(
          this.config.get<string>(
            'PAYOUT_RECONCILIATION_INTERVAL_MS',
            '900000',
          ),
        ) || 900_000,
      );
      this.reconciliationTimer = setInterval(() => {
        void this.reconcilePendingTransfers().catch((error) =>
          this.logger.error(
            `Transfer reconciliation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
          ),
        );
      }, interval);
      this.reconciliationTimer.unref?.();
    }
  }

  onModuleDestroy() {
    if (this.reconciliationTimer) clearInterval(this.reconciliationTimer);
    if (this.refundReconciliationTimer) {
      clearInterval(this.refundReconciliationTimer);
    }
  }

  async initialize(orderId: string, clientId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        client: { select: { id: true, email: true } },
        paymentTransactions: {
          where: {
            status: {
              in: [
                PaymentTransactionStatus.INITIALIZED,
                PaymentTransactionStatus.PENDING,
              ],
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    if (!order) throw new NotFoundException('Order not found');
    if (order.clientId !== clientId) {
      throw new ForbiddenException('You can only pay for your own order');
    }
    if (
      order.paymentStatus === OrderPaymentStatus.PAID ||
      order.paymentStatus === OrderPaymentStatus.REFUND_PENDING ||
      order.paymentStatus === OrderPaymentStatus.PARTIALLY_REFUNDED ||
      order.paymentStatus === OrderPaymentStatus.REFUNDED
    ) {
      throw new BadRequestException('This order is not awaiting payment');
    }
    if (
      order.status === OrderStatus.DECLINED ||
      order.status === OrderStatus.REFUNDED
    ) {
      throw new BadRequestException('This order can no longer be paid');
    }

    const reusableAfter = new Date(Date.now() - 30 * 60 * 1000);
    const initializationStaleAfter = new Date(Date.now() - 2 * 60 * 1000);
    const reusable = order.paymentTransactions[0];
    if (
      reusable?.authorizationUrl &&
      reusable.createdAt >= reusableAfter &&
      reusable.status === PaymentTransactionStatus.PENDING
    ) {
      return this.toInitializationResponse(order.id, reusable);
    }

    if (reusable) {
      const stale =
        (reusable.status === PaymentTransactionStatus.PENDING &&
          reusable.createdAt < reusableAfter) ||
        (reusable.status === PaymentTransactionStatus.INITIALIZED &&
          reusable.createdAt < initializationStaleAfter);
      if (!stale) {
        throw new ConflictException(
          'Payment checkout is already being prepared. Please try again shortly.',
        );
      }
      await this.prisma.paymentTransaction.updateMany({
        where: {
          id: reusable.id,
          status: {
            in: [
              PaymentTransactionStatus.INITIALIZED,
              PaymentTransactionStatus.PENDING,
            ],
          },
        },
        data: {
          status: PaymentTransactionStatus.ABANDONED,
          failureMessage: 'Checkout session expired before payment',
        },
      });
    }

    const scaledAmount = order.total.mul(100);
    if (!scaledAmount.isInteger() || scaledAmount.lessThanOrEqualTo(0)) {
      throw new BadRequestException('Order total is not payable');
    }

    const amountMinor = scaledAmount.toNumber();
    if (
      !Number.isSafeInteger(amountMinor) ||
      amountMinor > MAX_DATABASE_MINOR_AMOUNT
    ) {
      throw new BadRequestException('Order total exceeds the payment limit');
    }

    const reference = `PAVODAH-${randomUUID().replace(/-/g, '')}`;
    let transaction;
    try {
      transaction = await this.prisma.paymentTransaction.create({
        data: {
          orderId: order.id,
          clientId,
          reference,
          amount: order.total,
          amountMinor,
          currency: order.currency,
          status: PaymentTransactionStatus.INITIALIZED,
        },
      });
    } catch (error) {
      if ((error as { code?: string })?.code !== 'P2002') throw error;
      const active = await this.prisma.paymentTransaction.findFirst({
        where: {
          orderId: order.id,
          status: {
            in: [
              PaymentTransactionStatus.INITIALIZED,
              PaymentTransactionStatus.PENDING,
            ],
          },
        },
        orderBy: { createdAt: 'desc' },
      });
      if (
        active?.status === PaymentTransactionStatus.PENDING &&
        active.authorizationUrl
      ) {
        return this.toInitializationResponse(order.id, active);
      }
      throw new ConflictException(
        'Payment checkout is already being prepared. Please try again shortly.',
      );
    }

    const websiteUrl = this.config.get<string>(
      'WEBSITE_URL',
      'http://localhost:3001',
    );
    const callbackUrl = this.config.get<string>(
      'PAYSTACK_CALLBACK_URL',
      `${websiteUrl.replace(/\/$/, '')}/checkout/callback`,
    );

    try {
      const initialized = await this.paystack.initialize({
        email: order.client.email,
        amountMinor,
        currency: order.currency,
        reference,
        callbackUrl,
        metadata: {
          orderId: order.id,
          orderNumber: order.orderNumber,
          clientId,
          source: order.source,
          cancel_action: `${websiteUrl.replace(/\/$/, '')}/checkout?orderId=${encodeURIComponent(order.id)}`,
        },
      });

      if (initialized.reference !== reference) {
        throw new BadRequestException(
          'Payment provider returned an unexpected reference',
        );
      }

      const updated = await this.prisma.$transaction(async (tx) => {
        const paymentTransaction = await tx.paymentTransaction.update({
          where: { id: transaction.id },
          data: {
            accessCode: initialized.access_code,
            authorizationUrl: initialized.authorization_url,
            status: PaymentTransactionStatus.PENDING,
          },
        });
        const claimedOrder = await tx.order.updateMany({
          where: {
            id: order.id,
            status: { notIn: [OrderStatus.DECLINED, OrderStatus.REFUNDED] },
            paymentStatus: {
              in: [
                OrderPaymentStatus.UNPAID,
                OrderPaymentStatus.FAILED,
                OrderPaymentStatus.PROCESSING,
              ],
            },
          },
          data: { paymentStatus: OrderPaymentStatus.PROCESSING },
        });
        if (claimedOrder.count !== 1) {
          throw new ConflictException(
            'The order changed while checkout was being created',
          );
        }
        return paymentTransaction;
      });

      return this.toInitializationResponse(order.id, updated);
    } catch (error) {
      const failureMessage =
        error instanceof Error ? error.message.slice(0, 500) : 'Unknown error';
      await this.prisma.$transaction([
        this.prisma.paymentTransaction.update({
          where: { id: transaction.id },
          data: {
            status: PaymentTransactionStatus.FAILED,
            failureMessage,
          },
        }),
        this.prisma.order.updateMany({
          where: {
            id: order.id,
            paymentStatus: {
              in: [
                OrderPaymentStatus.UNPAID,
                OrderPaymentStatus.FAILED,
                OrderPaymentStatus.PROCESSING,
              ],
            },
          },
          data: { paymentStatus: OrderPaymentStatus.FAILED },
        }),
      ]);
      throw error;
    }
  }

  async verify(reference: string, clientId: string) {
    const transaction = await this.loadTransaction(reference);
    if (!transaction) {
      throw new NotFoundException('Payment reference not found');
    }
    if (transaction.clientId !== clientId) {
      throw new ForbiddenException('Payment does not belong to this user');
    }

    if (
      transaction.status === PaymentTransactionStatus.SUCCESS &&
      (
        [
          OrderPaymentStatus.PAID,
          OrderPaymentStatus.REFUND_PENDING,
          OrderPaymentStatus.PARTIALLY_REFUNDED,
          OrderPaymentStatus.REFUNDED,
        ] as OrderPaymentStatus[]
      ).includes(transaction.order.paymentStatus)
    ) {
      const duplicateRefund = !transaction.isPrimary
        ? await this.prisma.paymentRefund.findFirst({
            where: {
              transactionId: transaction.id,
              affectsOrderBalance: false,
            },
            orderBy: { createdAt: 'desc' },
            select: { status: true },
          })
        : null;
      return {
        reference: transaction.reference,
        orderId: transaction.orderId,
        paystackStatus: 'success',
        paymentStatus: transaction.order.paymentStatus,
        paidAt: transaction.paidAt ?? transaction.order.paidAt,
        duplicateCapture: !transaction.isPrimary,
        duplicateRefundStatus: duplicateRefund?.status ?? null,
      };
    }

    const data = await this.paystack.verify(reference);
    return this.reconcile(transaction, data, true);
  }

  async refund(
    orderId: string,
    reason?: string,
    amount?: Prisma.Decimal | number | string,
    disputeId?: string,
    deferSubmission = false,
  ) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        paymentTransactions: {
          where: {
            status: PaymentTransactionStatus.SUCCESS,
            isPrimary: true,
          },
          orderBy: { paidAt: 'asc' },
          take: 1,
        },
        refunds: {
          where: {
            affectsOrderBalance: true,
            status: {
              in: [
                PaymentRefundStatus.INITIALIZED,
                PaymentRefundStatus.PENDING,
                PaymentRefundStatus.PROCESSING,
                PaymentRefundStatus.NEEDS_ATTENTION,
                PaymentRefundStatus.PROCESSED,
              ],
            },
          },
        },
        settlement: true,
        externalDisputes: {
          where: {
            affectsOrderBalance: true,
            status: { in: ACTIVE_EXTERNAL_DISPUTE_STATUSES },
          },
          take: 1,
        },
      },
    });

    if (!order) throw new NotFoundException('Order not found');
    if (order.externalDisputes.length > 0) {
      throw new BadRequestException(
        'Resolve the Paystack payment dispute before issuing a refund',
      );
    }
    if (
      order.settlement?.acceptedAt ||
      order.settlement?.status === SettlementStatus.ELIGIBLE ||
      order.settlement?.status === SettlementStatus.RESERVED ||
      order.settlement?.status === SettlementStatus.PAID
    ) {
      throw new BadRequestException(
        'Accepted work cannot be refunded through the normal order workflow',
      );
    }
    if (order.paymentStatus === OrderPaymentStatus.REFUNDED) {
      throw new BadRequestException('This order has already been refunded');
    }
    if (
      order.refunds.some((refund) =>
        (
          [
            PaymentRefundStatus.INITIALIZED,
            PaymentRefundStatus.PENDING,
            PaymentRefundStatus.PROCESSING,
            PaymentRefundStatus.NEEDS_ATTENTION,
          ] as PaymentRefundStatus[]
        ).includes(refund.status),
      )
    ) {
      throw new BadRequestException('A refund is already in progress');
    }
    if (
      order.paymentStatus !== OrderPaymentStatus.PAID &&
      order.paymentStatus !== OrderPaymentStatus.PARTIALLY_REFUNDED
    ) {
      throw new BadRequestException('Only paid orders can be refunded');
    }

    const transaction = order.paymentTransactions[0];
    if (!transaction) {
      throw new NotFoundException('Successful payment transaction not found');
    }

    const processedAmount = order.refunds
      .filter((refund) => refund.status === PaymentRefundStatus.PROCESSED)
      .reduce((sum, refund) => sum.add(refund.amount), new Prisma.Decimal(0));
    const availableAmount = order.total.minus(processedAmount);
    const requestedAmount =
      amount === undefined ? availableAmount : new Prisma.Decimal(amount);
    if (
      requestedAmount.lessThanOrEqualTo(0) ||
      requestedAmount.greaterThan(availableAmount)
    ) {
      throw new BadRequestException(
        `Refund amount must be between 0.01 and ${availableAmount.toFixed(2)} ${order.currency}`,
      );
    }
    const amountMinorDecimal = requestedAmount.mul(100);
    if (
      !amountMinorDecimal.isInteger() ||
      !Number.isSafeInteger(amountMinorDecimal.toNumber()) ||
      amountMinorDecimal.greaterThan(MAX_DATABASE_MINOR_AMOUNT)
    ) {
      throw new BadRequestException('Refund amount is invalid');
    }

    const refundRecord = await this.prisma.$transaction(
      async (tx) => {
        const activeRefund = await tx.paymentRefund.findFirst({
          where: {
            orderId: order.id,
            affectsOrderBalance: true,
            status: {
              in: [
                PaymentRefundStatus.INITIALIZED,
                PaymentRefundStatus.PENDING,
                PaymentRefundStatus.PROCESSING,
                PaymentRefundStatus.NEEDS_ATTENTION,
              ],
            },
          },
          select: { id: true },
        });
        if (activeRefund) {
          throw new BadRequestException('A refund is already in progress');
        }
        const claimedOrder = await tx.order.updateMany({
          where: {
            id: order.id,
            paymentStatus: {
              in: [
                OrderPaymentStatus.PAID,
                OrderPaymentStatus.PARTIALLY_REFUNDED,
              ],
            },
            settlement: {
              is: {
                status: SettlementStatus.HELD,
                acceptedAt: null,
              },
            },
            externalDisputes: {
              none: {
                affectsOrderBalance: true,
                status: { in: ACTIVE_EXTERNAL_DISPUTE_STATUSES },
              },
            },
          },
          data: { paymentStatus: OrderPaymentStatus.REFUND_PENDING },
        });
        if (claimedOrder.count !== 1) {
          throw new BadRequestException(
            'The order changed before the refund could be reserved',
          );
        }
        return tx.paymentRefund.create({
          data: {
            transactionId: transaction.id,
            orderId: order.id,
            disputeId,
            reference: `pavodah-refund-${randomUUID().replace(/-/g, '')}`,
            amount: requestedAmount,
            amountMinor: amountMinorDecimal.toNumber(),
            currency: transaction.currency,
            affectsOrderBalance: true,
            reason: reason?.trim() || null,
          },
        });
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
    );

    if (deferSubmission) {
      return {
        orderId: order.id,
        transactionReference: transaction.reference,
        refundId: refundRecord.id,
        refundStatus: 'initialized',
        refundAmount: requestedAmount,
        paymentStatus: OrderPaymentStatus.REFUND_PENDING,
      };
    }

    const submitted = await this.submitPreparedRefund(refundRecord.id);
    const currentOrder = await this.prisma.order.findUniqueOrThrow({
      where: { id: order.id },
      select: { paymentStatus: true },
    });

    return {
      orderId: order.id,
      transactionReference: transaction.reference,
      refundId: submitted.providerRefundId ?? submitted.id,
      refundStatus: submitted.status.toLowerCase().replace('_', '-'),
      refundAmount: requestedAmount,
      paymentStatus: currentOrder.paymentStatus,
    };
  }

  async handleWebhook(event: {
    event?: string;
    data?:
      | PaystackTransactionData
      | PaystackRefundWebhookData
      | PaystackTransferData
      | PaystackDisputeWebhookData;
  }): Promise<void> {
    const eventType = event?.event;
    if (!eventType || !event.data) {
      this.logger.warn('Ignoring Paystack webhook without event/data');
      return;
    }

    if (eventType.startsWith('refund.')) {
      await this.handleRefundWebhook(
        eventType,
        event.data as PaystackRefundWebhookData,
      );
      return;
    }

    if (eventType.startsWith('transfer.')) {
      await this.handleTransferWebhook(
        eventType,
        event.data as PaystackTransferData,
      );
      return;
    }

    if (eventType.startsWith('charge.dispute.')) {
      await this.handleExternalDisputeWebhook(
        eventType,
        event.data as PaystackDisputeWebhookData,
      );
      return;
    }

    const chargeData = event.data as PaystackTransactionData;
    const reference = chargeData.reference;
    if (!reference) {
      this.logger.warn('Ignoring Paystack charge webhook without reference');
      return;
    }

    const transaction = await this.loadTransaction(reference);
    if (!transaction) {
      this.logger.warn(
        `Ignoring Paystack webhook for unknown reference ${reference}`,
      );
      return;
    }

    if (eventType === 'charge.success') {
      await this.reconcile(
        transaction,
        { ...chargeData, status: 'success' },
        false,
      );
      return;
    }

    if (eventType === 'charge.failed') {
      await this.markFailed(transaction, chargeData, 'failed');
      return;
    }

    this.logger.log(
      `Paystack webhook acknowledged without action: ${eventType}`,
    );
  }

  private async handleRefundWebhook(
    eventType: string,
    data: PaystackRefundWebhookData,
  ) {
    const transactionReference = data.transaction_reference;
    if (!transactionReference) {
      this.logger.warn(`Ignoring ${eventType} without transaction reference`);
      return;
    }

    const transaction = await this.loadTransaction(transactionReference);
    if (!transaction) {
      this.logger.warn(
        `Ignoring ${eventType} for unknown ${transactionReference}`,
      );
      return;
    }

    const refundStatus = eventType.replace('refund.', '');
    const mappedStatus = this.mapRefundStatus(refundStatus);
    const refundData = data as unknown as Prisma.InputJsonValue;
    const providerRefundId =
      data.id === undefined ? undefined : String(data.id);
    const amountMinor = Number(data.amount);
    if (
      !Number.isSafeInteger(amountMinor) ||
      amountMinor <= 0 ||
      amountMinor > transaction.amountMinor ||
      data.currency !== transaction.currency
    ) {
      this.logger.error(
        `Invalid refund amount or currency for ${transactionReference}`,
      );
      return;
    }
    let refund = data.refund_reference
      ? await this.prisma.paymentRefund.findUnique({
          where: { providerRefundReference: data.refund_reference },
        })
      : null;
    if (!refund && providerRefundId) {
      refund = await this.prisma.paymentRefund.findUnique({
        where: { providerRefundId },
      });
    }
    if (!refund) {
      refund = await this.prisma.paymentRefund.findFirst({
        where: {
          transactionId: transaction.id,
          amountMinor,
          status: {
            in: [
              PaymentRefundStatus.INITIALIZED,
              PaymentRefundStatus.PENDING,
              PaymentRefundStatus.PROCESSING,
              PaymentRefundStatus.NEEDS_ATTENTION,
            ],
          },
        },
        orderBy: { createdAt: 'desc' },
      });
    }
    if (
      !refund &&
      !data.refund_reference &&
      !providerRefundId &&
      (mappedStatus === PaymentRefundStatus.PROCESSED ||
        mappedStatus === PaymentRefundStatus.FAILED)
    ) {
      // Paystack's documented refund webhook may omit both identifiers. Match
      // a previously applied terminal event before considering it external;
      // otherwise a webhook retry would count the same refund twice.
      refund = await this.prisma.paymentRefund.findFirst({
        where: {
          transactionId: transaction.id,
          amountMinor,
          currency: data.currency,
          status: mappedStatus,
        },
        orderBy: { updatedAt: 'desc' },
      });
    }
    if (!refund) {
      try {
        refund = await this.prisma.paymentRefund.create({
          data: {
            transactionId: transaction.id,
            orderId: transaction.orderId,
            reference: `pavodah-refund-external-${randomUUID().replace(/-/g, '')}`,
            providerRefundId,
            providerRefundReference: data.refund_reference ?? undefined,
            amount: new Prisma.Decimal(amountMinor).div(100),
            amountMinor,
            currency: data.currency,
            affectsOrderBalance: transaction.isPrimary,
            reason:
              'Refund initiated outside Pavodah and reconciled by webhook',
            status: PaymentRefundStatus.INITIALIZED,
            rawData: refundData,
          },
        });
        this.logger.warn(
          `Reconciled an externally initiated refund for ${transactionReference}`,
        );
      } catch (error) {
        if ((error as { code?: string })?.code !== 'P2002') throw error;
        refund = data.refund_reference
          ? await this.prisma.paymentRefund.findUnique({
              where: { providerRefundReference: data.refund_reference },
            })
          : providerRefundId
            ? await this.prisma.paymentRefund.findUnique({
                where: { providerRefundId },
              })
            : null;
        if (!refund) throw error;
      }
    }
    if (
      refund.transactionId !== transaction.id ||
      amountMinor !== refund.amountMinor ||
      data.currency !== refund.currency
    ) {
      this.logger.error(
        `Refund mismatch for ${refund.reference}: expected ${refund.amountMinor} ${refund.currency}, received ${data.amount} ${data.currency}`,
      );
      return;
    }

    const processedAt =
      mappedStatus === PaymentRefundStatus.PROCESSED
        ? data.refunded_at
          ? new Date(data.refunded_at)
          : new Date()
        : undefined;

    const changed = await this.prisma.$transaction(
      async (tx) => {
        const claimedRefund = await tx.paymentRefund.updateMany({
          where: {
            id: refund.id,
            status: { in: this.refundSourceStatuses(mappedStatus) },
          },
          data: {
            providerRefundId,
            providerRefundReference: data.refund_reference ?? undefined,
            status: mappedStatus,
            processedAt,
            rawData: refundData,
            failureMessage:
              mappedStatus === PaymentRefundStatus.FAILED
                ? 'Paystack reported that the refund failed'
                : null,
          },
        });
        if (claimedRefund.count !== 1) return false;
        await tx.paymentTransaction.update({
          where: { id: transaction.id },
          data: {
            refundId: providerRefundId,
            refundReference: data.refund_reference ?? undefined,
            refundStatus,
            refundedAt: processedAt,
            refundData,
          },
        });

        if (mappedStatus === PaymentRefundStatus.PROCESSED) {
          if (refund.affectsOrderBalance) {
            await this.settlements.recalculateAfterRefund(
              tx,
              transaction.orderId,
              {
                refundId: refund.id,
                disputeId: refund.disputeId,
                refundAmount: refund.amount,
                releaseRemainder: Boolean(refund.disputeId),
              },
            );
          }
          return true;
        }

        if (mappedStatus === PaymentRefundStatus.FAILED) {
          if (!refund.affectsOrderBalance) return true;
          const processed = await tx.paymentRefund.count({
            where: {
              orderId: transaction.orderId,
              status: PaymentRefundStatus.PROCESSED,
              affectsOrderBalance: true,
            },
          });
          await tx.order.update({
            where: { id: transaction.orderId },
            data: {
              paymentStatus:
                processed > 0
                  ? OrderPaymentStatus.PARTIALLY_REFUNDED
                  : OrderPaymentStatus.PAID,
            },
          });
          if (refund.disputeId) {
            await tx.dispute.updateMany({
              where: {
                id: refund.disputeId,
                status: 'INVESTIGATING',
                resolutionRequestedAt: { not: null },
              },
              data: {
                resolutionType: null,
                resolutionRefundAmount: null,
                resolutionRequestedAt: null,
              },
            });
          }
        } else {
          if (refund.affectsOrderBalance) {
            await tx.order.update({
              where: { id: transaction.orderId },
              data: { paymentStatus: OrderPaymentStatus.REFUND_PENDING },
            });
          }
        }
        return true;
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
    );

    if (changed) {
      await this.notificationEvents?.refundUpdated({
        ...refund,
        status: mappedStatus,
        updatedAt: processedAt ?? new Date(),
        clientId: transaction.order.clientId,
      });
    }
  }

  private mapRefundStatus(status: string): PaymentRefundStatus {
    switch (status.toLowerCase()) {
      case 'processed':
        return PaymentRefundStatus.PROCESSED;
      case 'processing':
        return PaymentRefundStatus.PROCESSING;
      case 'needs-attention':
      case 'needs_attention':
        return PaymentRefundStatus.NEEDS_ATTENTION;
      case 'failed':
        return PaymentRefundStatus.FAILED;
      default:
        return PaymentRefundStatus.PENDING;
    }
  }

  private refundSourceStatuses(next: PaymentRefundStatus) {
    switch (next) {
      case PaymentRefundStatus.PENDING:
        return [PaymentRefundStatus.INITIALIZED, PaymentRefundStatus.PENDING];
      case PaymentRefundStatus.PROCESSING:
        return [
          PaymentRefundStatus.INITIALIZED,
          PaymentRefundStatus.PENDING,
          PaymentRefundStatus.PROCESSING,
        ];
      case PaymentRefundStatus.NEEDS_ATTENTION:
      case PaymentRefundStatus.PROCESSED:
      case PaymentRefundStatus.FAILED:
        return [
          PaymentRefundStatus.INITIALIZED,
          PaymentRefundStatus.PENDING,
          PaymentRefundStatus.PROCESSING,
          PaymentRefundStatus.NEEDS_ATTENTION,
        ];
      default:
        return [PaymentRefundStatus.INITIALIZED];
    }
  }

  private async handleTransferWebhook(
    eventType: string,
    data: PaystackTransferData,
  ) {
    if (
      eventType !== 'transfer.success' &&
      eventType !== 'transfer.failed' &&
      eventType !== 'transfer.reversed'
    ) {
      return;
    }
    const payout = await applyPaystackTransferState(
      this.prisma,
      eventType as PaystackTransferEvent,
      data,
      { logger: this.logger },
    );
    if (payout) await this.notificationEvents?.payoutUpdated(payout);
  }

  private async handleExternalDisputeWebhook(
    eventType: string,
    data: PaystackDisputeWebhookData,
  ) {
    const reference = data.transaction?.reference;
    if (!reference) {
      this.logger.warn(`Ignoring ${eventType} without transaction reference`);
      return;
    }
    const transaction = await this.prisma.paymentTransaction.findUnique({
      where: { reference },
      include: { order: { include: { settlement: true } } },
    });
    if (!transaction) {
      this.logger.warn(`Ignoring ${eventType} for unknown ${reference}`);
      return;
    }
    const providerDisputeId = String(data.id);
    const refundMinor = Number(data.refund_amount || 0);
    const currency = data.currency || transaction.currency;
    if (
      !Number.isSafeInteger(refundMinor) ||
      refundMinor < 0 ||
      currency !== transaction.currency
    ) {
      this.logger.error(`Invalid external dispute amount for ${reference}`);
      return;
    }
    const refundAmount = new Prisma.Decimal(refundMinor).div(100);
    const rawData = data as unknown as Prisma.InputJsonValue;

    if (
      eventType === 'charge.dispute.create' ||
      eventType === 'charge.dispute.remind'
    ) {
      await this.prisma.$transaction(
        async (tx) => {
          const external = await tx.externalPaymentDispute.upsert({
            where: { providerDisputeId },
            create: {
              providerDisputeId,
              transactionId: transaction.id,
              orderId: transaction.orderId,
              status:
                eventType === 'charge.dispute.remind'
                  ? ExternalPaymentDisputeStatus.REMINDER
                  : ExternalPaymentDisputeStatus.OPEN,
              refundAmount,
              currency,
              affectsOrderBalance: transaction.isPrimary,
              resolution: data.resolution,
              rawData,
            },
            update: {
              refundAmount,
              resolution: data.resolution,
              rawData,
            },
          });
          if (
            external.status === ExternalPaymentDisputeStatus.RESOLVED_LOST ||
            external.status === ExternalPaymentDisputeStatus.RESOLVED_WON
          ) {
            return;
          }
          await tx.externalPaymentDispute.updateMany({
            where: {
              id: external.id,
              status: {
                in: [
                  ExternalPaymentDisputeStatus.OPEN,
                  ExternalPaymentDisputeStatus.REMINDER,
                ],
              },
            },
            data: {
              status:
                eventType === 'charge.dispute.remind'
                  ? ExternalPaymentDisputeStatus.REMINDER
                  : ExternalPaymentDisputeStatus.OPEN,
            },
          });
          if (!external.affectsOrderBalance) return;
          const settlement = await tx.orderSettlement.findUnique({
            where: { orderId: transaction.orderId },
          });
          if (settlement?.status === SettlementStatus.RESERVED) {
            const payoutItem = await tx.providerPayoutItem.findFirst({
              where: {
                settlementId: settlement.id,
                payout: { status: ProviderPayoutStatus.REQUESTED },
              },
              include: {
                payout: { include: { items: true, adjustmentItems: true } },
              },
            });
            if (payoutItem) {
              await Promise.all([
                tx.providerPayout.update({
                  where: { id: payoutItem.payout.id },
                  data: {
                    status: ProviderPayoutStatus.REJECTED,
                    rejectedAt: new Date(),
                    rejectionReason:
                      'Automatically cancelled because Paystack opened a payment dispute',
                  },
                }),
                tx.orderSettlement.updateMany({
                  where: {
                    id: {
                      in: payoutItem.payout.items.map(
                        (item) => item.settlementId,
                      ),
                    },
                    status: SettlementStatus.RESERVED,
                    order: {
                      externalDisputes: {
                        none: {
                          affectsOrderBalance: true,
                          status: { in: ACTIVE_EXTERNAL_DISPUTE_STATUSES },
                        },
                      },
                    },
                  },
                  data: { status: SettlementStatus.ELIGIBLE },
                }),
                tx.orderSettlement.updateMany({
                  where: {
                    id: {
                      in: payoutItem.payout.items.map(
                        (item) => item.settlementId,
                      ),
                    },
                    status: SettlementStatus.RESERVED,
                    order: {
                      externalDisputes: {
                        some: {
                          affectsOrderBalance: true,
                          status: { in: ACTIVE_EXTERNAL_DISPUTE_STATUSES },
                        },
                      },
                    },
                  },
                  data: { status: SettlementStatus.HELD },
                }),
                tx.providerBalanceAdjustment.updateMany({
                  where: {
                    id: {
                      in: payoutItem.payout.adjustmentItems.map(
                        (item) => item.adjustmentId,
                      ),
                    },
                    status: BalanceAdjustmentStatus.RESERVED,
                  },
                  data: { status: BalanceAdjustmentStatus.OPEN },
                }),
              ]);
              await tx.orderSettlement.update({
                where: { id: settlement.id },
                data: { status: SettlementStatus.HELD },
              });
            }
          } else if (settlement?.status === SettlementStatus.ELIGIBLE) {
            await tx.orderSettlement.update({
              where: { id: settlement.id },
              data: { status: SettlementStatus.HELD },
            });
          }
        },
        { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
      );
      await this.notificationEvents?.adminAlert({
        key: `paystack-dispute:${providerDisputeId}:${eventType}`,
        title: 'Paystack dispute requires review',
        message: `A payment dispute was opened for order ${transaction.order.orderNumber}.`,
        actionUrl: '/dashboard/payouts',
        entityType: 'externalPaymentDispute',
        entityId: providerDisputeId,
        critical: true,
      });
      return;
    }

    if (eventType !== 'charge.dispute.resolve') return;
    const resolution = data.resolution?.toLowerCase();
    if (resolution !== 'merchant-accepted' && resolution !== 'declined') {
      this.logger.error(
        `Ignoring unresolved outcome for Paystack dispute ${providerDisputeId}`,
      );
      await this.prisma.$transaction(
        async (tx) => {
          const external = await tx.externalPaymentDispute.upsert({
            where: { providerDisputeId },
            create: {
              providerDisputeId,
              transactionId: transaction.id,
              orderId: transaction.orderId,
              status: ExternalPaymentDisputeStatus.REMINDER,
              refundAmount,
              currency,
              affectsOrderBalance: transaction.isPrimary,
              resolution: data.resolution,
              rawData,
            },
            update: {
              refundAmount,
              resolution: data.resolution,
              rawData,
            },
          });
          await tx.externalPaymentDispute.updateMany({
            where: {
              id: external.id,
              status: { in: ACTIVE_EXTERNAL_DISPUTE_STATUSES },
            },
            data: { status: ExternalPaymentDisputeStatus.REMINDER },
          });
        },
        { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
      );
      return;
    }
    const providerLost = resolution === 'merchant-accepted';
    if (providerLost && refundAmount.lessThanOrEqualTo(0)) {
      this.logger.error(
        `Ignoring lost Paystack dispute ${providerDisputeId} without a positive refund amount`,
      );
      return;
    }
    await this.prisma.$transaction(
      async (tx) => {
        await tx.externalPaymentDispute.upsert({
          where: { providerDisputeId },
          create: {
            providerDisputeId,
            transactionId: transaction.id,
            orderId: transaction.orderId,
            status: ExternalPaymentDisputeStatus.REMINDER,
            refundAmount,
            currency,
            affectsOrderBalance: transaction.isPrimary,
            resolution: data.resolution,
            rawData,
          },
          update: {
            refundAmount,
            resolution: data.resolution,
            rawData,
          },
        });
        const claimed = await tx.externalPaymentDispute.updateMany({
          where: {
            providerDisputeId,
            status: {
              in: [
                ExternalPaymentDisputeStatus.OPEN,
                ExternalPaymentDisputeStatus.REMINDER,
              ],
            },
          },
          data: {
            status: providerLost
              ? ExternalPaymentDisputeStatus.RESOLVED_LOST
              : ExternalPaymentDisputeStatus.RESOLVED_WON,
            resolvedAt: new Date(),
          },
        });
        if (claimed.count !== 1) return;
        const external = await tx.externalPaymentDispute.findUniqueOrThrow({
          where: { providerDisputeId },
        });
        if (!external.affectsOrderBalance) return;
        const settlement = await tx.orderSettlement.findUnique({
          where: { orderId: transaction.orderId },
        });
        if (!settlement) return;

        if (!providerLost) {
          if (
            settlement.status === SettlementStatus.HELD &&
            settlement.acceptedAt
          ) {
            await tx.orderSettlement.update({
              where: { id: settlement.id },
              data: { status: SettlementStatus.ELIGIBLE },
            });
          }
          return;
        }

        const disputedAmount = Prisma.Decimal.min(
          settlement.grossAmount,
          Prisma.Decimal.max(refundAmount, new Prisma.Decimal(0)),
        );
        const providerShare = disputedAmount
          .mul(new Prisma.Decimal(100).minus(settlement.commissionRate))
          .div(100)
          .toDecimalPlaces(2);
        if (
          settlement.status === SettlementStatus.PAID ||
          settlement.status === SettlementStatus.RESERVED
        ) {
          await tx.providerBalanceAdjustment.upsert({
            where: { externalDisputeId: external.id },
            create: {
              providerId: settlement.providerId,
              orderId: settlement.orderId,
              externalDisputeId: external.id,
              type: BalanceAdjustmentType.CHARGEBACK,
              amount: providerShare,
              reason: `Paystack chargeback for order ${transaction.order.orderNumber}`,
            },
            update: { amount: providerShare },
          });
          return;
        }

        const refundedAmount = Prisma.Decimal.min(
          settlement.grossAmount,
          settlement.refundedAmount.add(disputedAmount),
        );
        const amounts = this.settlements.calculate(
          settlement.grossAmount,
          refundedAmount,
          settlement.commissionRate,
        );
        const fullyRefunded = amounts.retainedAmount.lessThanOrEqualTo(0);
        await Promise.all([
          tx.orderSettlement.update({
            where: { id: settlement.id },
            data: {
              refundedAmount,
              ...amounts,
              status: fullyRefunded
                ? SettlementStatus.VOID
                : settlement.acceptedAt
                  ? SettlementStatus.ELIGIBLE
                  : SettlementStatus.HELD,
            },
          }),
          tx.order.update({
            where: { id: transaction.orderId },
            data: fullyRefunded
              ? {
                  paymentStatus: OrderPaymentStatus.REFUNDED,
                  status: OrderStatus.REFUNDED,
                }
              : { paymentStatus: OrderPaymentStatus.PARTIALLY_REFUNDED },
          }),
        ]);
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
    );
    await this.notificationEvents?.adminAlert({
      key: `paystack-dispute-resolved:${providerDisputeId}:${resolution}`,
      title: 'Paystack dispute resolved',
      message: `The payment dispute for order ${transaction.order.orderNumber} was resolved.`,
      actionUrl: '/dashboard/payouts',
      entityType: 'externalPaymentDispute',
      entityId: providerDisputeId,
      critical: providerLost,
    });
  }

  async getOrderPayment(orderId: string, userId: string, role: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      select: {
        id: true,
        clientId: true,
        providerId: true,
        orderNumber: true,
        total: true,
        currency: true,
        paymentStatus: true,
        paidAt: true,
        settlement: true,
        refunds: {
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            amount: true,
            currency: true,
            status: true,
            reason: true,
            processedAt: true,
            createdAt: true,
          },
        },
        paymentTransactions: {
          orderBy: { createdAt: 'desc' },
          take: 10,
          select: {
            id: true,
            reference: true,
            amount: true,
            currency: true,
            status: true,
            channel: true,
            failureMessage: true,
            paidAt: true,
            createdAt: true,
          },
        },
      },
    });

    if (!order) throw new NotFoundException('Order not found');
    if (
      role !== 'ADMIN' &&
      order.clientId !== userId &&
      order.providerId !== userId
    ) {
      throw new ForbiddenException('You do not have access to this payment');
    }
    return order;
  }

  async listForAdmin(page = 1, limit = 20, search?: string) {
    const safePage = Math.max(1, page);
    const safeLimit = Math.min(100, Math.max(1, limit));
    const skip = (safePage - 1) * safeLimit;
    const term = search?.trim();
    const where: Prisma.PaymentTransactionWhereInput = term
      ? {
          OR: [
            { reference: { contains: term, mode: 'insensitive' } },
            {
              client: {
                OR: [
                  { email: { contains: term, mode: 'insensitive' } },
                  { firstName: { contains: term, mode: 'insensitive' } },
                  { lastName: { contains: term, mode: 'insensitive' } },
                  { displayName: { contains: term, mode: 'insensitive' } },
                ],
              },
            },
            {
              order: {
                OR: [
                  { orderNumber: { contains: term, mode: 'insensitive' } },
                  {
                    service: {
                      title: { contains: term, mode: 'insensitive' },
                    },
                  },
                ],
              },
            },
          ],
        }
      : {};
    const [transactions, total] = await Promise.all([
      this.prisma.paymentTransaction.findMany({
        where,
        skip,
        take: safeLimit,
        orderBy: { createdAt: 'desc' },
        include: {
          client: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              displayName: true,
              email: true,
              avatar: true,
            },
          },
          order: {
            select: {
              id: true,
              orderNumber: true,
              paymentStatus: true,
              service: { select: { id: true, title: true } },
            },
          },
        },
      }),
      this.prisma.paymentTransaction.count({ where }),
    ]);

    return {
      data: transactions,
      pagination: {
        page: safePage,
        limit: safeLimit,
        total,
        pages: Math.ceil(total / safeLimit),
      },
    };
  }

  async listRefundsForAdmin(
    page = 1,
    limit = 20,
    status?: PaymentRefundStatus,
  ) {
    const safePage = Math.max(1, page);
    const safeLimit = Math.min(100, Math.max(1, limit));
    const where: Prisma.PaymentRefundWhereInput = { status };
    const [data, total] = await Promise.all([
      this.prisma.paymentRefund.findMany({
        where,
        skip: (safePage - 1) * safeLimit,
        take: safeLimit,
        orderBy: { createdAt: 'desc' },
        include: {
          transaction: {
            select: { id: true, reference: true, providerTransactionId: true },
          },
          order: {
            select: {
              id: true,
              orderNumber: true,
              paymentStatus: true,
              client: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  displayName: true,
                  email: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.paymentRefund.count({ where }),
    ]);
    return {
      data,
      pagination: {
        page: safePage,
        limit: safeLimit,
        total,
        pages: Math.ceil(total / safeLimit),
      },
    };
  }

  async retryRefund(
    refundId: string,
    details: { currency: string; accountNumber: string; bankCode: string },
  ) {
    let refund = await this.prisma.paymentRefund.findUnique({
      where: { id: refundId },
    });
    if (!refund) throw new NotFoundException('Refund not found');
    if (refund.status !== PaymentRefundStatus.NEEDS_ATTENTION) {
      throw new BadRequestException(
        'Only a refund that needs customer details can be retried',
      );
    }
    if (refund.currency !== details.currency) {
      throw new BadRequestException('Refund account currency does not match');
    }
    if (!refund.providerRefundId) {
      await this.reconcilePendingRefunds();
      refund = await this.prisma.paymentRefund.findUniqueOrThrow({
        where: { id: refundId },
      });
    }
    if (!refund.providerRefundId) {
      throw new BadRequestException(
        'Paystack has not exposed the refund identifier yet. Reconcile again later.',
      );
    }
    const resolved = await this.resolveRefundAccount(
      details.accountNumber,
      details.bankCode,
    );
    const claimed = await this.prisma.paymentRefund.updateMany({
      where: {
        id: refund.id,
        status: PaymentRefundStatus.NEEDS_ATTENTION,
      },
      data: {
        status: PaymentRefundStatus.PENDING,
        failureMessage: null,
      },
    });
    if (claimed.count !== 1) {
      throw new BadRequestException('This refund retry is already in progress');
    }
    try {
      const providerRefund = await this.paystack.retryRefund(
        refund.providerRefundId,
        {
          currency: details.currency,
          accountNumber: details.accountNumber,
          bankId: resolved.bankId,
        },
      );
      return this.applyRefundProviderData(refund.id, providerRefund);
    } catch (error) {
      if (error instanceof PaystackRequestException && !error.outcomeUnknown) {
        await this.prisma.paymentRefund.updateMany({
          where: { id: refund.id, status: PaymentRefundStatus.PENDING },
          data: {
            status: PaymentRefundStatus.NEEDS_ATTENTION,
            failureMessage: error.providerMessage.slice(0, 500),
          },
        });
      }
      throw error;
    }
  }

  async listRefundInstitutions() {
    const institutions = await this.paystack.listInstitutions('ghipss');
    return institutions
      .filter(
        (institution) =>
          institution.active !== false && institution.id !== undefined,
      )
      .map((institution) => ({
        id: String(institution.id),
        name: institution.name,
        code: institution.code,
      }));
  }

  async resolveRefundAccount(accountNumber: string, bankCode: string) {
    const institutions = await this.listRefundInstitutions();
    const institution = institutions.find((item) => item.code === bankCode);
    if (!institution) {
      throw new BadRequestException('Select a supported refund bank');
    }
    const account = await this.paystack.resolveAccount(accountNumber, bankCode);
    if (account.account_number !== accountNumber || !account.account_name) {
      throw new BadRequestException(
        'Paystack could not verify this refund account',
      );
    }
    return {
      accountNumber: account.account_number,
      accountName: account.account_name,
      bankCode,
      bankName: institution.name,
      bankId: String(account.bank_id ?? institution.id),
    };
  }

  async reattemptExcessRefund(refundId: string) {
    const refund = await this.prisma.paymentRefund.findUnique({
      where: { id: refundId },
    });
    if (!refund) throw new NotFoundException('Refund not found');
    if (refund.affectsOrderBalance) {
      throw new BadRequestException(
        'Retry this order refund from the order payment controls',
      );
    }
    const claimed = await this.prisma.paymentRefund.updateMany({
      where: { id: refund.id, status: PaymentRefundStatus.FAILED },
      data: {
        status: PaymentRefundStatus.INITIALIZED,
        failureMessage: null,
        processedAt: null,
      },
    });
    if (claimed.count !== 1) {
      throw new BadRequestException(
        'Only a failed duplicate-charge refund can be reattempted',
      );
    }
    return this.submitPreparedRefund(refund.id);
  }

  private async submitPreparedRefund(refundId: string) {
    let refund = await this.prisma.paymentRefund.findUnique({
      where: { id: refundId },
      include: { transaction: true },
    });
    if (!refund) throw new NotFoundException('Refund not found');

    const claimed = await this.prisma.paymentRefund.updateMany({
      where: { id: refund.id, status: PaymentRefundStatus.INITIALIZED },
      data: {
        status: PaymentRefundStatus.PENDING,
        failureMessage: null,
      },
    });
    if (claimed.count !== 1) {
      return this.prisma.paymentRefund.findUniqueOrThrow({
        where: { id: refund.id },
      });
    }
    refund = { ...refund, status: PaymentRefundStatus.PENDING };

    let providerRefund: PaystackRefundData;
    try {
      providerRefund = await this.paystack.refund({
        reference: refund.transaction.reference,
        amountMinor: refund.amountMinor,
        currency: refund.currency,
        reason: refund.reason ?? undefined,
      });
    } catch (error) {
      const outcomeUnknown =
        error instanceof PaystackRequestException && error.outcomeUnknown;
      await this.prisma.$transaction(async (tx) => {
        const failed = await tx.paymentRefund.updateMany({
          where: { id: refund.id, status: PaymentRefundStatus.PENDING },
          data: {
            status: outcomeUnknown
              ? PaymentRefundStatus.NEEDS_ATTENTION
              : PaymentRefundStatus.FAILED,
            failureMessage: outcomeUnknown
              ? 'Paystack may have accepted this refund. Awaiting webhook reconciliation.'
              : error instanceof PaystackRequestException
                ? error.providerMessage.slice(0, 500)
                : error instanceof Error
                  ? error.message.slice(0, 500)
                  : 'Refund failed',
          },
        });
        if (
          failed.count !== 1 ||
          !refund.affectsOrderBalance ||
          outcomeUnknown
        ) {
          return;
        }
        const processed = await tx.paymentRefund.aggregate({
          where: {
            orderId: refund.orderId,
            affectsOrderBalance: true,
            status: PaymentRefundStatus.PROCESSED,
          },
          _sum: { amount: true },
        });
        await tx.order.updateMany({
          where: {
            id: refund.orderId,
            paymentStatus: OrderPaymentStatus.REFUND_PENDING,
          },
          data: {
            paymentStatus: (
              processed._sum.amount ?? new Prisma.Decimal(0)
            ).greaterThan(0)
              ? OrderPaymentStatus.PARTIALLY_REFUNDED
              : OrderPaymentStatus.PAID,
          },
        });
        if (refund.disputeId) {
          await tx.dispute.updateMany({
            where: {
              id: refund.disputeId,
              status: 'INVESTIGATING',
              resolutionRequestedAt: { not: null },
            },
            data: {
              resolutionType: null,
              resolutionRefundAmount: null,
              resolutionRequestedAt: null,
            },
          });
        }
      });
      throw error;
    }

    // Once Paystack accepts the request, never make the refund retryable just
    // because persisting its response fails. The PENDING record is durable and
    // reconciliation can bind it to the provider refund without submitting a
    // second refund.
    return this.applyRefundProviderData(refund.id, providerRefund);
  }

  async reconcilePendingRefunds() {
    const staleBefore = new Date(Date.now() - 60_000);
    const refunds = await this.prisma.paymentRefund.findMany({
      where: {
        status: {
          in: [
            PaymentRefundStatus.INITIALIZED,
            PaymentRefundStatus.PENDING,
            PaymentRefundStatus.PROCESSING,
            PaymentRefundStatus.NEEDS_ATTENTION,
          ],
        },
        updatedAt: { lte: staleBefore },
      },
      orderBy: { updatedAt: 'asc' },
      take: 100,
      include: {
        transaction: {
          select: { providerTransactionId: true, reference: true },
        },
      },
    });
    let reconciled = 0;
    for (const refund of refunds) {
      try {
        let providerRefund;
        if (refund.providerRefundId) {
          providerRefund = await this.paystack.fetchRefund(
            refund.providerRefundId,
          );
        } else if (refund.transaction.providerTransactionId) {
          const candidates = (
            await this.paystack.listRefunds(
              refund.transaction.providerTransactionId,
            )
          ).filter(
            (candidate) =>
              Number(candidate.amount) === refund.amountMinor &&
              candidate.currency === refund.currency,
          );
          const bound = await this.prisma.paymentRefund.findMany({
            where: {
              providerRefundId: {
                in: candidates.map((candidate) => String(candidate.id)),
              },
            },
            select: { providerRefundId: true },
          });
          const boundIds = new Set(
            bound.map((item) => item.providerRefundId).filter(Boolean),
          );
          const unbound = candidates.filter(
            (candidate) => !boundIds.has(String(candidate.id)),
          );
          if (unbound.length === 1) providerRefund = unbound[0];
        }
        if (
          !providerRefund &&
          refund.status === PaymentRefundStatus.INITIALIZED
        ) {
          await this.submitPreparedRefund(refund.id);
          reconciled += 1;
          continue;
        }
        if (!providerRefund) continue;
        await this.applyRefundProviderData(refund.id, providerRefund);
        reconciled += 1;
      } catch (error) {
        this.logger.warn(
          `Could not reconcile refund ${refund.reference}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
      }
    }
    return {
      checked: refunds.length,
      reconciled,
      attention: refunds.filter(
        (refund) => refund.status === PaymentRefundStatus.NEEDS_ATTENTION,
      ).length,
    };
  }

  private async applyRefundProviderData(
    refundId: string,
    data: PaystackRefundData,
  ) {
    const refund = await this.prisma.paymentRefund.findUnique({
      where: { id: refundId },
      include: {
        transaction: true,
        order: { select: { clientId: true } },
      },
    });
    if (!refund) throw new NotFoundException('Refund not found');
    if (
      Number(data.amount) !== refund.amountMinor ||
      data.currency !== refund.currency
    ) {
      throw new BadRequestException(
        'Paystack refund amount or currency mismatch',
      );
    }

    const status = this.mapRefundStatus(data.status);
    const processedAt =
      status === PaymentRefundStatus.PROCESSED
        ? data.refunded_at
          ? new Date(data.refunded_at)
          : new Date()
        : undefined;
    const rawData = data as unknown as Prisma.InputJsonValue;

    const updatedRefund = await this.prisma.$transaction(
      async (tx) => {
        const claimed = await tx.paymentRefund.updateMany({
          where: {
            id: refund.id,
            status: { in: this.refundSourceStatuses(status) },
          },
          data: {
            providerRefundId: String(data.id),
            providerRefundReference: data.refund_reference ?? undefined,
            status,
            processedAt,
            rawData,
            failureMessage:
              status === PaymentRefundStatus.FAILED
                ? 'Paystack reported that the refund failed'
                : null,
          },
        });
        if (claimed.count !== 1) {
          return tx.paymentRefund.findUniqueOrThrow({
            where: { id: refund.id },
          });
        }
        await tx.paymentTransaction.update({
          where: { id: refund.transactionId },
          data: {
            refundId: String(data.id),
            refundReference: data.refund_reference ?? undefined,
            refundStatus: data.status,
            refundedAt: processedAt,
            refundData: rawData,
          },
        });

        if (refund.affectsOrderBalance) {
          if (status === PaymentRefundStatus.PROCESSED) {
            await this.settlements.recalculateAfterRefund(tx, refund.orderId, {
              refundId: refund.id,
              disputeId: refund.disputeId,
              refundAmount: refund.amount,
              releaseRemainder: Boolean(refund.disputeId),
            });
          } else if (status === PaymentRefundStatus.FAILED) {
            const processed = await tx.paymentRefund.aggregate({
              where: {
                orderId: refund.orderId,
                affectsOrderBalance: true,
                status: PaymentRefundStatus.PROCESSED,
              },
              _sum: { amount: true },
            });
            await tx.order.update({
              where: { id: refund.orderId },
              data: {
                paymentStatus: (
                  processed._sum.amount ?? new Prisma.Decimal(0)
                ).greaterThan(0)
                  ? OrderPaymentStatus.PARTIALLY_REFUNDED
                  : OrderPaymentStatus.PAID,
              },
            });
            if (refund.disputeId) {
              await tx.dispute.updateMany({
                where: {
                  id: refund.disputeId,
                  status: 'INVESTIGATING',
                  resolutionRequestedAt: { not: null },
                },
                data: {
                  resolutionType: null,
                  resolutionRefundAmount: null,
                  resolutionRequestedAt: null,
                },
              });
            }
          } else {
            await tx.order.update({
              where: { id: refund.orderId },
              data: { paymentStatus: OrderPaymentStatus.REFUND_PENDING },
            });
          }
        }
        return tx.paymentRefund.findUniqueOrThrow({ where: { id: refund.id } });
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
    );
    await this.notificationEvents?.refundUpdated({
      ...updatedRefund,
      clientId: refund.order.clientId,
    });
    return updatedRefund;
  }

  async listExternalDisputes(page = 1, limit = 20) {
    const safePage = Math.max(1, page);
    const safeLimit = Math.min(100, Math.max(1, limit));
    const [data, total] = await Promise.all([
      this.prisma.externalPaymentDispute.findMany({
        skip: (safePage - 1) * safeLimit,
        take: safeLimit,
        orderBy: { createdAt: 'desc' },
        include: {
          order: {
            include: {
              client: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  displayName: true,
                  email: true,
                },
              },
              provider: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  displayName: true,
                  email: true,
                },
              },
              settlement: true,
            },
          },
          balanceAdjustment: true,
        },
      }),
      this.prisma.externalPaymentDispute.count(),
    ]);
    return {
      data,
      pagination: {
        page: safePage,
        limit: safeLimit,
        total,
        pages: Math.ceil(total / safeLimit),
      },
    };
  }

  async reconcilePendingTransfers() {
    const staleBefore = new Date(Date.now() - 5 * 60 * 1000);
    const payouts = await this.prisma.providerPayout.findMany({
      where: {
        status: {
          in: [
            ProviderPayoutStatus.PROCESSING,
            ProviderPayoutStatus.OTP_REQUIRED,
          ],
        },
        updatedAt: { lte: staleBefore },
      },
      orderBy: { updatedAt: 'asc' },
      take: 100,
      select: { reference: true },
    });
    let reconciled = 0;
    for (const payout of payouts) {
      try {
        const transfer = await this.paystack.verifyTransfer(payout.reference);
        await applyPaystackTransferState(
          this.prisma,
          eventForTransferStatus(transfer.status),
          transfer,
          { logger: this.logger },
        );
        reconciled += 1;
      } catch (error) {
        this.logger.warn(
          `Could not reconcile payout ${payout.reference}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
      }
    }
    return { checked: payouts.length, reconciled };
  }

  private loadTransaction(reference: string) {
    return this.prisma.paymentTransaction.findUnique({
      where: { reference },
      include: { order: true },
    });
  }

  private async reconcile(
    transaction: TransactionWithOrder,
    data: PaystackTransactionData,
    throwOnMismatch: boolean,
  ) {
    if (data.reference !== transaction.reference) {
      throw new BadRequestException('Payment reference mismatch');
    }

    if (data.status === 'success') {
      if (
        data.amount !== transaction.amountMinor ||
        data.currency !== transaction.currency
      ) {
        const recorded = await this.recordAmountMismatch(transaction, data);
        if (!recorded) {
          return this.currentVerificationResponse(transaction.id);
        }
        if (throwOnMismatch) {
          throw new BadRequestException(
            'Payment amount or currency does not match the order',
          );
        }
        return this.toVerificationResponse(transaction, 'AMOUNT_MISMATCH');
      }
      return this.finalizeSuccess(transaction, data, throwOnMismatch);
    }

    if (data.status === 'failed' || data.status === 'abandoned') {
      await this.markFailed(transaction, data, data.status);
      return this.toVerificationResponse(
        transaction,
        data.status.toUpperCase(),
      );
    }

    const newerActiveCheckout = await this.prisma.paymentTransaction.findFirst({
      where: {
        orderId: transaction.orderId,
        id: { not: transaction.id },
        status: {
          in: [
            PaymentTransactionStatus.INITIALIZED,
            PaymentTransactionStatus.PENDING,
          ],
        },
      },
      select: { id: true },
    });
    if (newerActiveCheckout) {
      const currentOrder = await this.prisma.order.findUniqueOrThrow({
        where: { id: transaction.orderId },
        select: { paymentStatus: true },
      });
      return {
        reference: transaction.reference,
        orderId: transaction.orderId,
        paystackStatus: 'processing',
        paymentStatus: currentOrder.paymentStatus,
        paidAt: null,
      };
    }

    const updated = await this.prisma.paymentTransaction.updateMany({
      where: {
        id: transaction.id,
        status: {
          in: [
            PaymentTransactionStatus.INITIALIZED,
            PaymentTransactionStatus.PENDING,
          ],
        },
      },
      data: {
        status: PaymentTransactionStatus.PENDING,
        verifiedAt: new Date(),
        rawData: data as unknown as Prisma.InputJsonValue,
      },
    });
    if (updated.count !== 1) {
      return this.currentVerificationResponse(transaction.id);
    }
    return this.toVerificationResponse(transaction, 'PROCESSING');
  }

  private async finalizeSuccess(
    transaction: TransactionWithOrder,
    data: PaystackTransactionData,
    submitAutomaticRefundsImmediately: boolean,
  ) {
    const paidAt = data.paid_at ? new Date(data.paid_at) : new Date();

    const finalized = await this.prisma.$transaction(
      async (tx) => {
        // Serialize every successful capture for an order. A Paystack checkout
        // URL can still succeed after Pavodah has abandoned it, so the active
        // checkout index alone cannot prevent duplicate captures.
        await tx.$queryRaw<Array<{ id: string }>>(Prisma.sql`
          SELECT "id"
          FROM "orders"
          WHERE "id" = ${transaction.orderId}
          FOR UPDATE
        `);

        const primary = await tx.paymentTransaction.findFirst({
          where: {
            orderId: transaction.orderId,
            isPrimary: true,
          },
          select: { id: true },
        });
        const isDuplicateCapture = Boolean(
          primary && primary.id !== transaction.id,
        );

        await tx.paymentTransaction.update({
          where: { id: transaction.id },
          data: {
            status: PaymentTransactionStatus.SUCCESS,
            isPrimary: primary ? primary.id === transaction.id : true,
            channel: data.channel,
            providerTransactionId:
              data.id === undefined ? undefined : String(data.id),
            paidAt,
            verifiedAt: new Date(),
            rawData: data as unknown as Prisma.InputJsonValue,
            providerFeeMinor: data.fees,
            failureMessage: null,
          },
        });

        if (!isDuplicateCapture) {
          const updated = await tx.order.updateMany({
            where: {
              id: transaction.orderId,
              paymentStatus: {
                notIn: [
                  OrderPaymentStatus.PAID,
                  OrderPaymentStatus.REFUND_PENDING,
                  OrderPaymentStatus.PARTIALLY_REFUNDED,
                  OrderPaymentStatus.REFUNDED,
                ],
              },
            },
            data: {
              paymentStatus: OrderPaymentStatus.PAID,
              paidAt,
            },
          });

          if (updated.count === 0) {
            this.logger.warn(
              `Order ${transaction.orderId} was already finalized when ${transaction.reference} succeeded`,
            );
          }

          await this.settlements.ensureForPaidOrder(tx, transaction.order);
        }
        const currentOrder = await tx.order.findUniqueOrThrow({
          where: { id: transaction.orderId },
          select: { paymentStatus: true, status: true },
        });
        return { ...currentOrder, isDuplicateCapture };
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
    );

    let paymentStatus = finalized.paymentStatus;
    let duplicateRefundStatus: PaymentRefundStatus | null = null;
    if (finalized.isDuplicateCapture) {
      const duplicateRefund = await this.refundDuplicatePayment(
        transaction.id,
        !submitAutomaticRefundsImmediately,
      );
      duplicateRefundStatus = duplicateRefund.status;
      if (
        !submitAutomaticRefundsImmediately &&
        duplicateRefund.status === PaymentRefundStatus.INITIALIZED
      ) {
        this.scheduleRefundSubmission(duplicateRefund.id);
      }
      if (
        duplicateRefund.status === PaymentRefundStatus.NEEDS_ATTENTION ||
        duplicateRefund.status === PaymentRefundStatus.FAILED
      ) {
        this.logger.error(
          `Duplicate capture ${transaction.reference} requires refund attention`,
        );
      }
    } else if (finalized.status === OrderStatus.DECLINED) {
      try {
        const refund = await this.refund(
          transaction.orderId,
          'Automatic refund because payment completed after order cancellation',
          undefined,
          undefined,
          !submitAutomaticRefundsImmediately,
        );
        paymentStatus = refund.paymentStatus;
        if (
          !submitAutomaticRefundsImmediately &&
          refund.refundStatus === 'initialized'
        ) {
          this.scheduleRefundSubmission(refund.refundId);
        }
      } catch (error) {
        this.logger.error(
          `Late payment ${transaction.reference} needs refund attention: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
      }
    }

    if (
      !finalized.isDuplicateCapture &&
      finalized.status !== OrderStatus.DECLINED &&
      paymentStatus === OrderPaymentStatus.PAID
    ) {
      await this.notificationEvents?.orderPaid({
        id: transaction.order.id,
        orderNumber: transaction.order.orderNumber,
        planTitle: transaction.order.planTitle,
        clientId: transaction.order.clientId,
        providerId: transaction.order.providerId,
        paymentReference: transaction.reference,
      });
    }

    return {
      reference: transaction.reference,
      orderId: transaction.orderId,
      paystackStatus: 'success',
      paymentStatus,
      paidAt,
      duplicateCapture: finalized.isDuplicateCapture,
      duplicateRefundStatus,
    };
  }

  private async refundDuplicatePayment(
    transactionId: string,
    deferSubmission = false,
  ) {
    const transaction = await this.prisma.paymentTransaction.findUnique({
      where: { id: transactionId },
      include: { order: { select: { orderNumber: true } } },
    });
    if (
      !transaction ||
      transaction.status !== PaymentTransactionStatus.SUCCESS
    ) {
      throw new NotFoundException('Duplicate payment transaction not found');
    }

    const existing = await this.prisma.paymentRefund.findFirst({
      where: { transactionId, affectsOrderBalance: false },
      orderBy: { createdAt: 'desc' },
    });
    if (existing) return existing;

    let refundRecord;
    try {
      refundRecord = await this.prisma.paymentRefund.create({
        data: {
          transactionId,
          orderId: transaction.orderId,
          reference: `pavodah-excess-refund-${randomUUID().replace(/-/g, '')}`,
          amount: transaction.amount,
          amountMinor: transaction.amountMinor,
          currency: transaction.currency,
          affectsOrderBalance: false,
          reason: `Automatic refund for duplicate payment on order ${transaction.order.orderNumber}`,
        },
      });
    } catch (error) {
      if ((error as { code?: string })?.code !== 'P2002') throw error;
      return this.prisma.paymentRefund.findFirstOrThrow({
        where: { transactionId, affectsOrderBalance: false },
        orderBy: { createdAt: 'desc' },
      });
    }

    if (deferSubmission) return refundRecord;
    try {
      return await this.submitPreparedRefund(refundRecord.id);
    } catch {
      return this.prisma.paymentRefund.findUniqueOrThrow({
        where: { id: refundRecord.id },
      });
    }
  }

  private scheduleRefundSubmission(refundId: string) {
    setImmediate(() => {
      void this.submitPreparedRefund(refundId).catch((error) =>
        this.logger.error(
          `Automatic refund ${refundId} needs reconciliation: ${error instanceof Error ? error.message : 'Unknown error'}`,
        ),
      );
    });
  }

  private async markFailed(
    transaction: TransactionWithOrder,
    data: PaystackTransactionData,
    status: 'failed' | 'abandoned',
  ) {
    if (transaction.status === PaymentTransactionStatus.SUCCESS) return;
    if (
      (
        [
          OrderPaymentStatus.PAID,
          OrderPaymentStatus.REFUND_PENDING,
          OrderPaymentStatus.PARTIALLY_REFUNDED,
          OrderPaymentStatus.REFUNDED,
        ] as OrderPaymentStatus[]
      ).includes(transaction.order.paymentStatus)
    ) {
      return;
    }

    const transactionStatus =
      status === 'abandoned'
        ? PaymentTransactionStatus.ABANDONED
        : PaymentTransactionStatus.FAILED;

    const failed = await this.prisma.$transaction(async (tx) => {
      const claimed = await tx.paymentTransaction.updateMany({
        where: {
          id: transaction.id,
          status: {
            in: [
              PaymentTransactionStatus.INITIALIZED,
              PaymentTransactionStatus.PENDING,
            ],
          },
        },
        data: {
          status: transactionStatus,
          verifiedAt: new Date(),
          failureMessage: data.message ?? data.gateway_response,
          rawData: data as unknown as Prisma.InputJsonValue,
        },
      });
      if (claimed.count !== 1) return false;
      await tx.order.updateMany({
        where: {
          id: transaction.orderId,
          paymentTransactions: {
            none: {
              id: { not: transaction.id },
              status: {
                in: [
                  PaymentTransactionStatus.INITIALIZED,
                  PaymentTransactionStatus.PENDING,
                ],
              },
            },
          },
          paymentStatus: {
            notIn: [
              OrderPaymentStatus.PAID,
              OrderPaymentStatus.REFUND_PENDING,
              OrderPaymentStatus.PARTIALLY_REFUNDED,
              OrderPaymentStatus.REFUNDED,
            ],
          },
        },
        data: { paymentStatus: OrderPaymentStatus.FAILED },
      });
      return true;
    });
    if (failed) {
      await this.notificationEvents?.paymentFailed({
        id: transaction.order.id,
        orderNumber: transaction.order.orderNumber,
        clientId: transaction.order.clientId,
        paymentReference: transaction.reference,
      });
    }
  }

  private async recordAmountMismatch(
    transaction: TransactionWithOrder,
    data: PaystackTransactionData,
  ) {
    this.logger.error(
      `Payment mismatch for ${transaction.reference}: expected ${transaction.amountMinor} ${transaction.currency}, received ${data.amount} ${data.currency}`,
    );
    const claimed = await this.prisma.paymentTransaction.updateMany({
      where: {
        id: transaction.id,
        status: { not: PaymentTransactionStatus.SUCCESS },
      },
      data: {
        status: PaymentTransactionStatus.AMOUNT_MISMATCH,
        failureMessage: 'Paystack amount or currency did not match the order',
        verifiedAt: new Date(),
        rawData: data as unknown as Prisma.InputJsonValue,
      },
    });
    return claimed.count === 1;
  }

  private async currentVerificationResponse(transactionId: string) {
    const current = await this.prisma.paymentTransaction.findUniqueOrThrow({
      where: { id: transactionId },
      include: { order: true },
    });
    const duplicateRefund =
      current.status === PaymentTransactionStatus.SUCCESS && !current.isPrimary
        ? await this.prisma.paymentRefund.findFirst({
            where: {
              transactionId: current.id,
              affectsOrderBalance: false,
            },
            orderBy: { createdAt: 'desc' },
            select: { status: true },
          })
        : null;
    return {
      reference: current.reference,
      orderId: current.orderId,
      paystackStatus: current.status.toLowerCase(),
      paymentStatus: current.order.paymentStatus,
      paidAt: current.paidAt ?? current.order.paidAt,
      duplicateCapture:
        current.status === PaymentTransactionStatus.SUCCESS &&
        !current.isPrimary,
      duplicateRefundStatus: duplicateRefund?.status ?? null,
    };
  }

  private toInitializationResponse(
    orderId: string,
    transaction: {
      reference: string;
      authorizationUrl: string | null;
      accessCode: string | null;
      amount: Prisma.Decimal;
      currency: string;
    },
  ) {
    return {
      orderId,
      reference: transaction.reference,
      authorizationUrl: transaction.authorizationUrl,
      accessCode: transaction.accessCode,
      amount: transaction.amount,
      currency: transaction.currency,
    };
  }

  private toVerificationResponse(
    transaction: TransactionWithOrder,
    status: string,
  ) {
    return {
      reference: transaction.reference,
      orderId: transaction.orderId,
      paystackStatus: status.toLowerCase(),
      paymentStatus:
        status === 'PROCESSING'
          ? OrderPaymentStatus.PROCESSING
          : OrderPaymentStatus.FAILED,
      paidAt: null,
    };
  }
}
