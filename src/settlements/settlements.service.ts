import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  BalanceAdjustmentType,
  DisputeStatus,
  ExternalPaymentDisputeStatus,
  OrderPaymentStatus,
  OrderStatus,
  Prisma,
  ReleaseReviewStatus,
  SettlementAcceptedBy,
  SettlementStatus,
} from '../../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';

type DbClient = PrismaService | Prisma.TransactionClient;

@Injectable()
export class SettlementsService {
  constructor(private readonly prisma: PrismaService) {}

  async getCommissionRate(db: DbClient = this.prisma) {
    const setting = await db.paymentSetting.upsert({
      where: { id: 'default' },
      create: { id: 'default', commissionRate: new Prisma.Decimal(10) },
      update: {},
    });
    return setting.commissionRate;
  }

  calculate(
    grossAmount: Prisma.Decimal,
    refundedAmount: Prisma.Decimal,
    commissionRate: Prisma.Decimal,
  ) {
    const retainedAmount = Prisma.Decimal.max(
      grossAmount.minus(refundedAmount),
      new Prisma.Decimal(0),
    );
    const commissionAmount = retainedAmount
      .mul(commissionRate)
      .div(100)
      .toDecimalPlaces(2);
    return {
      retainedAmount,
      commissionAmount,
      providerAmount: retainedAmount.minus(commissionAmount),
    };
  }

  async ensureForPaidOrder(
    db: DbClient,
    order: {
      id: string;
      providerId: string;
      total: Prisma.Decimal;
      commissionRate: Prisma.Decimal;
    },
  ) {
    const amounts = this.calculate(
      order.total,
      new Prisma.Decimal(0),
      order.commissionRate,
    );
    return db.orderSettlement.upsert({
      where: { orderId: order.id },
      create: {
        orderId: order.id,
        providerId: order.providerId,
        grossAmount: order.total,
        refundedAmount: 0,
        commissionRate: order.commissionRate,
        ...amounts,
      },
      update: {},
    });
  }

  async acceptByCustomer(orderId: string, clientId: string) {
    return this.prisma.$transaction(
      async (tx) => {
        const order = await tx.order.findUnique({
          where: { id: orderId },
          include: {
            settlement: true,
            dispute: true,
            externalDisputes: {
              where: {
                affectsOrderBalance: true,
                status: {
                  in: [
                    ExternalPaymentDisputeStatus.OPEN,
                    ExternalPaymentDisputeStatus.REMINDER,
                  ],
                },
              },
              take: 1,
            },
          },
        });
        if (!order) throw new NotFoundException('Order not found');
        if (order.clientId !== clientId) {
          throw new ForbiddenException(
            'Only the customer can accept this work',
          );
        }
        if (
          order.status !== OrderStatus.COMPLETED ||
          !(
            [
              OrderPaymentStatus.PAID,
              OrderPaymentStatus.PARTIALLY_REFUNDED,
            ] as OrderPaymentStatus[]
          ).includes(order.paymentStatus)
        ) {
          throw new BadRequestException(
            'Only completed work with retained payment can be accepted',
          );
        }
        if (order.externalDisputes.length > 0) {
          throw new BadRequestException(
            'Paystack is reviewing this payment, so its earnings remain held',
          );
        }
        if (
          order.dispute &&
          order.dispute.status !== DisputeStatus.RESOLVED &&
          order.dispute.status !== DisputeStatus.CLOSED
        ) {
          throw new BadRequestException(
            'Resolve the open dispute before accepting this work',
          );
        }

        const settlement =
          order.settlement ?? (await this.ensureForPaidOrder(tx, order));
        if (
          settlement.status === SettlementStatus.RESERVED ||
          settlement.status === SettlementStatus.PAID ||
          settlement.status === SettlementStatus.ELIGIBLE
        ) {
          return settlement;
        }
        if (settlement.status === SettlementStatus.VOID) {
          throw new BadRequestException('This order has no payable earnings');
        }

        const acceptedAt = new Date();
        const claimedOrder = await tx.order.updateMany({
          where: {
            id: order.id,
            status: OrderStatus.COMPLETED,
            paymentStatus: {
              in: [
                OrderPaymentStatus.PAID,
                OrderPaymentStatus.PARTIALLY_REFUNDED,
              ],
            },
            settlement: {
              is: {
                id: settlement.id,
                status: SettlementStatus.HELD,
                acceptedAt: null,
              },
            },
            externalDisputes: {
              none: {
                affectsOrderBalance: true,
                status: {
                  in: [
                    ExternalPaymentDisputeStatus.OPEN,
                    ExternalPaymentDisputeStatus.REMINDER,
                  ],
                },
              },
            },
          },
          data: { updatedAt: acceptedAt },
        });
        if (claimedOrder.count !== 1) {
          throw new BadRequestException(
            'The order changed before the earnings could be released',
          );
        }

        return tx.orderSettlement.update({
          where: { id: settlement.id },
          data: {
            status: SettlementStatus.ELIGIBLE,
            acceptedAt,
            acceptedBy: SettlementAcceptedBy.CUSTOMER,
            releaseReviewStatus: ReleaseReviewStatus.NONE,
            releaseReviewNote: null,
          },
        });
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
    );
  }

  async requestReleaseReview(
    orderId: string,
    providerId: string,
    note?: string,
  ) {
    return this.prisma.$transaction(
      async (tx) => {
        const order = await tx.order.findUnique({
          where: { id: orderId },
          include: {
            settlement: true,
            dispute: true,
            externalDisputes: {
              where: {
                affectsOrderBalance: true,
                status: {
                  in: [
                    ExternalPaymentDisputeStatus.OPEN,
                    ExternalPaymentDisputeStatus.REMINDER,
                  ],
                },
              },
              take: 1,
            },
          },
        });
        if (!order) throw new NotFoundException('Order not found');
        if (order.providerId !== providerId) {
          throw new ForbiddenException(
            'Only the assigned provider can request a release review',
          );
        }
        if (
          order.status !== OrderStatus.COMPLETED ||
          !(
            [
              OrderPaymentStatus.PAID,
              OrderPaymentStatus.PARTIALLY_REFUNDED,
            ] as OrderPaymentStatus[]
          ).includes(order.paymentStatus)
        ) {
          throw new BadRequestException(
            'Only completed work with retained payment can be reviewed for release',
          );
        }
        if (order.externalDisputes.length > 0) {
          throw new BadRequestException(
            'A Paystack payment dispute must be resolved before release review',
          );
        }
        if (
          order.dispute &&
          order.dispute.status !== DisputeStatus.RESOLVED &&
          order.dispute.status !== DisputeStatus.CLOSED
        ) {
          throw new BadRequestException(
            'A release review cannot be requested while a dispute is open',
          );
        }
        const settlement =
          order.settlement ?? (await this.ensureForPaidOrder(tx, order));
        if (settlement.status !== SettlementStatus.HELD) {
          throw new BadRequestException('These earnings are no longer held');
        }
        if (settlement.releaseReviewStatus === ReleaseReviewStatus.REQUESTED) {
          return settlement;
        }
        return tx.orderSettlement.update({
          where: { id: settlement.id },
          data: {
            releaseReviewStatus: ReleaseReviewStatus.REQUESTED,
            releaseReviewRequestedAt: new Date(),
            releaseReviewNote: note?.trim() || null,
          },
        });
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
    );
  }

  async reviewRelease(orderId: string, approve: boolean, note?: string) {
    return this.prisma.$transaction(
      async (tx) => {
        const settlement = await tx.orderSettlement.findUnique({
          where: { orderId },
          include: {
            order: {
              include: {
                dispute: true,
                externalDisputes: {
                  where: {
                    affectsOrderBalance: true,
                    status: {
                      in: [
                        ExternalPaymentDisputeStatus.OPEN,
                        ExternalPaymentDisputeStatus.REMINDER,
                      ],
                    },
                  },
                  take: 1,
                },
              },
            },
          },
        });
        if (!settlement) throw new NotFoundException('Settlement not found');
        if (settlement.releaseReviewStatus !== ReleaseReviewStatus.REQUESTED) {
          throw new BadRequestException('No release review is pending');
        }
        if (
          settlement.status !== SettlementStatus.HELD ||
          settlement.acceptedAt ||
          settlement.order.status !== OrderStatus.COMPLETED ||
          !(
            [
              OrderPaymentStatus.PAID,
              OrderPaymentStatus.PARTIALLY_REFUNDED,
            ] as OrderPaymentStatus[]
          ).includes(settlement.order.paymentStatus)
        ) {
          throw new BadRequestException(
            'These earnings are no longer eligible for release review',
          );
        }
        if (
          settlement.order.dispute &&
          settlement.order.dispute.status !== DisputeStatus.RESOLVED &&
          settlement.order.dispute.status !== DisputeStatus.CLOSED
        ) {
          throw new BadRequestException(
            'Resolve the open dispute before releasing earnings',
          );
        }
        if (settlement.order.externalDisputes.length > 0) {
          throw new BadRequestException(
            'A Paystack payment dispute must be resolved before releasing earnings',
          );
        }

        const reviewedAt = new Date();
        if (approve) {
          const claimedOrder = await tx.order.updateMany({
            where: {
              id: settlement.orderId,
              status: OrderStatus.COMPLETED,
              paymentStatus: {
                in: [
                  OrderPaymentStatus.PAID,
                  OrderPaymentStatus.PARTIALLY_REFUNDED,
                ],
              },
              settlement: {
                is: {
                  id: settlement.id,
                  status: SettlementStatus.HELD,
                  acceptedAt: null,
                  releaseReviewStatus: ReleaseReviewStatus.REQUESTED,
                },
              },
              externalDisputes: {
                none: {
                  affectsOrderBalance: true,
                  status: {
                    in: [
                      ExternalPaymentDisputeStatus.OPEN,
                      ExternalPaymentDisputeStatus.REMINDER,
                    ],
                  },
                },
              },
            },
            data: { updatedAt: reviewedAt },
          });
          if (claimedOrder.count !== 1) {
            throw new BadRequestException(
              'The order changed before the earnings could be released',
            );
          }
        }

        const updated = await tx.orderSettlement.updateMany({
          where: {
            id: settlement.id,
            status: SettlementStatus.HELD,
            releaseReviewStatus: ReleaseReviewStatus.REQUESTED,
          },
          data: approve
            ? {
                status: SettlementStatus.ELIGIBLE,
                acceptedAt: reviewedAt,
                acceptedBy: SettlementAcceptedBy.ADMIN,
                releaseReviewStatus: ReleaseReviewStatus.APPROVED,
                releaseReviewNote: note?.trim() || null,
              }
            : {
                releaseReviewStatus: ReleaseReviewStatus.REJECTED,
                releaseReviewNote: note?.trim() || null,
              },
        });
        if (updated.count !== 1) {
          throw new BadRequestException(
            'The release review changed before it could be completed',
          );
        }
        return tx.orderSettlement.findUniqueOrThrow({
          where: { id: settlement.id },
        });
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
    );
  }

  async recalculateAfterRefund(
    db: Prisma.TransactionClient,
    orderId: string,
    context?: {
      refundId?: string;
      disputeId?: string | null;
      refundAmount?: Prisma.Decimal;
      releaseRemainder?: boolean;
    },
  ) {
    const [order, processed] = await Promise.all([
      db.order.findUnique({
        where: { id: orderId },
        include: { settlement: true, dispute: true },
      }),
      db.paymentRefund.aggregate({
        where: {
          orderId,
          status: 'PROCESSED',
          affectsOrderBalance: true,
        },
        _sum: { amount: true },
      }),
    ]);
    if (!order) throw new NotFoundException('Order not found');
    const refundedAmount = processed._sum.amount ?? new Prisma.Decimal(0);
    const amounts = this.calculate(
      order.total,
      refundedAmount,
      order.commissionRate,
    );
    const fullyRefunded = amounts.retainedAmount.lessThanOrEqualTo(0);
    const settlement =
      order.settlement ?? (await this.ensureForPaidOrder(db, order));

    await db.order.update({
      where: { id: orderId },
      data: fullyRefunded
        ? {
            paymentStatus: OrderPaymentStatus.REFUNDED,
            status: OrderStatus.REFUNDED,
          }
        : { paymentStatus: OrderPaymentStatus.PARTIALLY_REFUNDED },
    });

    if (
      settlement.status === SettlementStatus.RESERVED ||
      settlement.status === SettlementStatus.PAID
    ) {
      const previousRefundedAmount = context?.refundAmount
        ? Prisma.Decimal.max(
            refundedAmount.minus(context.refundAmount),
            new Prisma.Decimal(0),
          )
        : settlement.refundedAmount;
      const previousAmounts = this.calculate(
        order.total,
        previousRefundedAmount,
        order.commissionRate,
      );
      const providerLoss = Prisma.Decimal.max(
        previousAmounts.providerAmount.minus(amounts.providerAmount),
        new Prisma.Decimal(0),
      );
      if (providerLoss.greaterThan(0)) {
        await db.providerBalanceAdjustment.create({
          data: {
            providerId: settlement.providerId,
            orderId,
            type: BalanceAdjustmentType.ADMIN,
            amount: providerLoss,
            reason: `Provider recovery for Paystack refund ${context?.refundId || 'recorded after payout'}`,
          },
        });
      }
      if (context?.disputeId && order.dispute?.id === context.disputeId) {
        await db.dispute.update({
          where: { id: context.disputeId },
          data: {
            status: DisputeStatus.RESOLVED,
            resolvedAt: new Date(),
          },
        });
      }
      return settlement;
    }

    const updated = await db.orderSettlement.update({
      where: { id: settlement.id },
      data: {
        refundedAmount,
        ...amounts,
        status: fullyRefunded
          ? SettlementStatus.VOID
          : context?.releaseRemainder ||
              settlement.status === SettlementStatus.ELIGIBLE
            ? SettlementStatus.ELIGIBLE
            : SettlementStatus.HELD,
        acceptedAt: fullyRefunded
          ? null
          : context?.releaseRemainder
            ? new Date()
            : settlement.acceptedAt,
        acceptedBy: fullyRefunded
          ? null
          : context?.releaseRemainder
            ? SettlementAcceptedBy.ADMIN
            : settlement.acceptedBy,
        releaseReviewStatus: ReleaseReviewStatus.NONE,
        releaseReviewRequestedAt: null,
        releaseReviewNote: null,
      },
    });

    if (context?.disputeId && order.dispute?.id === context.disputeId) {
      await db.dispute.update({
        where: { id: context.disputeId },
        data: {
          status: DisputeStatus.RESOLVED,
          resolvedAt: new Date(),
        },
      });
    }
    return updated;
  }
}
