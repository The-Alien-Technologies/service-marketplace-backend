import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateDisputeDto,
  ResolveDisputeDto,
  UpdateDisputeStatusDto,
} from './dto/dispute.dto';
import {
  DisputeResolutionType,
  DisputeStatus,
  DisputePriority,
  DisputeIssueType,
  OrderPaymentStatus,
  OrderStatus,
  PaymentRefundStatus,
  Prisma,
  SettlementAcceptedBy,
  SettlementStatus,
} from '../../generated/prisma';
import { PaymentsService } from '../payments/payments.service';
import { NotificationEventsService } from '../notifications/notification-events.service';

const PRIORITY_MAP: Record<DisputeIssueType, DisputePriority> = {
  PAYMENT_DISPUTE: DisputePriority.HIGH,
  NON_DELIVERY: DisputePriority.HIGH,
  QUALITY_ISSUE: DisputePriority.MEDIUM,
  LATE_DELIVERY: DisputePriority.MEDIUM,
  MISCOMMUNICATION: DisputePriority.LOW,
  OTHER: DisputePriority.LOW,
};

const USER_SELECT = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  avatar: true,
  phoneNumber: true,
  countryCode: true,
};

@Injectable()
export class DisputeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly payments: PaymentsService,
    private readonly notificationEvents?: NotificationEventsService,
  ) {}

  async create(clientId: string, dto: CreateDisputeDto) {
    // Verify order exists and belongs to this client
    const order = await this.prisma.order.findUnique({
      where: { id: dto.orderId },
      include: { settlement: true },
    });

    if (!order) throw new NotFoundException('Order not found');
    if (order.clientId !== clientId) {
      throw new ForbiddenException('You can only dispute your own orders');
    }
    if (order.status !== OrderStatus.COMPLETED) {
      throw new ForbiddenException('You can only dispute completed orders');
    }
    if (
      order.paymentStatus !== OrderPaymentStatus.PAID &&
      order.paymentStatus !== OrderPaymentStatus.PARTIALLY_REFUNDED
    ) {
      throw new ForbiddenException('Only paid orders can be disputed');
    }
    if (
      order.settlement?.acceptedAt ||
      order.settlement?.status === SettlementStatus.ELIGIBLE ||
      order.settlement?.status === SettlementStatus.RESERVED ||
      order.settlement?.status === SettlementStatus.PAID
    ) {
      throw new ForbiddenException(
        'This order was already accepted and can no longer be disputed',
      );
    }

    // Check for existing dispute
    const existing = await this.prisma.dispute.findUnique({
      where: { orderId: dto.orderId },
    });
    if (existing) {
      throw new ConflictException('A dispute already exists for this order');
    }

    const priority = PRIORITY_MAP[dto.issueType];

    const dispute = await this.prisma.dispute.create({
      data: {
        orderId: dto.orderId,
        clientId,
        providerId: order.providerId,
        issueType: dto.issueType,
        description: dto.description,
        priority,
      },
      include: {
        client: { select: USER_SELECT },
        provider: { select: USER_SELECT },
        order: {
          select: {
            orderNumber: true,
            planTitle: true,
            total: true,
            service: { select: { title: true } },
          },
        },
      },
    });
    await this.notificationEvents?.disputeOpened(dispute);
    return this.forParticipant(dispute);
  }

  async findAll(query?: { status?: string }) {
    return this.prisma.dispute.findMany({
      where: query?.status ? { status: query.status as any } : undefined,
      orderBy: { createdAt: 'desc' },
      include: {
        client: { select: USER_SELECT },
        provider: { select: USER_SELECT },
        order: {
          select: {
            orderNumber: true,
            planTitle: true,
            total: true,
            service: { select: { title: true } },
          },
        },
      },
    });
  }

  async findByParticipant(userId: string) {
    const disputes = await this.prisma.dispute.findMany({
      where: { OR: [{ clientId: userId }, { providerId: userId }] },
      orderBy: { createdAt: 'desc' },
      include: {
        client: { select: USER_SELECT },
        provider: { select: USER_SELECT },
        order: {
          select: {
            orderNumber: true,
            planTitle: true,
            service: { select: { title: true } },
          },
        },
      },
    });
    return disputes.map((dispute) => this.forParticipant(dispute));
  }

  async findOne(id: string, requesterId: string, isAdmin: boolean) {
    const dispute = await this.prisma.dispute.findUnique({
      where: { id },
      include: {
        client: { select: USER_SELECT },
        provider: { select: USER_SELECT },
        order: {
          select: {
            orderNumber: true,
            planTitle: true,
            planPrice: true,
            total: true,
            commissionRate: true,
            createdAt: true,
            refunds: {
              where: {
                status: PaymentRefundStatus.PROCESSED,
                affectsOrderBalance: true,
              },
              select: { amount: true },
            },
            service: { select: { title: true } },
          },
        },
      },
    });

    if (!dispute) throw new NotFoundException('Dispute not found');
    if (
      !isAdmin &&
      dispute.clientId !== requesterId &&
      dispute.providerId !== requesterId
    ) {
      throw new ForbiddenException('Access denied');
    }

    return isAdmin ? dispute : this.forParticipant(dispute);
  }

  private forParticipant<
    T extends {
      adminNote: string | null;
      client: {
        email: string;
        phoneNumber: string | null;
        countryCode: string | null;
      };
      provider: {
        email: string;
        phoneNumber: string | null;
        countryCode: string | null;
      };
    },
  >(dispute: T) {
    return {
      ...dispute,
      adminNote: null,
      client: {
        ...dispute.client,
        email: null,
        phoneNumber: null,
        countryCode: null,
      },
      provider: {
        ...dispute.provider,
        email: null,
        phoneNumber: null,
        countryCode: null,
      },
    };
  }

  async updateStatus(id: string, dto: UpdateDisputeStatusDto) {
    const dispute = await this.prisma.dispute.findUnique({ where: { id } });
    if (!dispute) throw new NotFoundException('Dispute not found');

    if (dispute.resolutionType || dispute.resolutionRequestedAt) {
      throw new ConflictException(
        'This dispute already has a financial resolution in progress or completed',
      );
    }

    if (
      (dto.status === DisputeStatus.RESOLVED ||
        dto.status === DisputeStatus.CLOSED) &&
      !dispute.resolutionType
    ) {
      throw new ConflictException(
        'Choose a financial resolution before closing this dispute',
      );
    }

    const updated = await this.prisma.dispute.update({
      where: { id },
      data: {
        status: dto.status,
        adminNote: dto.adminNote,
        resolvedAt:
          dto.status === 'RESOLVED' || dto.status === 'CLOSED'
            ? new Date()
            : undefined,
      },
      include: {
        client: { select: USER_SELECT },
        provider: { select: USER_SELECT },
        order: {
          select: {
            orderNumber: true,
            planTitle: true,
            total: true,
            service: { select: { title: true } },
          },
        },
      },
    });
    await this.notificationEvents?.disputeUpdated(updated);
    return updated;
  }

  async resolve(id: string, dto: ResolveDisputeDto) {
    const dispute = await this.prisma.dispute.findUnique({
      where: { id },
      include: {
        order: {
          include: {
            settlement: true,
            externalDisputes: {
              where: {
                affectsOrderBalance: true,
                status: {
                  in: ['OPEN', 'REMINDER'],
                },
              },
              take: 1,
            },
            refunds: {
              where: {
                status: PaymentRefundStatus.PROCESSED,
                affectsOrderBalance: true,
              },
            },
          },
        },
      },
    });
    if (!dispute) throw new NotFoundException('Dispute not found');
    if (
      dispute.status === DisputeStatus.RESOLVED ||
      dispute.status === DisputeStatus.CLOSED
    ) {
      throw new ConflictException('This dispute has already been resolved');
    }
    if (dispute.resolutionRequestedAt) {
      throw new ConflictException(
        'A financial resolution is already being processed',
      );
    }
    if (!dispute.order.settlement) {
      throw new ConflictException('The order settlement is not available');
    }
    if (
      dispute.order.status !== OrderStatus.COMPLETED ||
      (dispute.order.paymentStatus !== OrderPaymentStatus.PAID &&
        dispute.order.paymentStatus !== OrderPaymentStatus.PARTIALLY_REFUNDED)
    ) {
      throw new ConflictException(
        'Only completed orders with retained payment can be resolved',
      );
    }
    if (dispute.order.externalDisputes.length > 0) {
      throw new ConflictException(
        'Resolve the Paystack payment dispute before this marketplace dispute',
      );
    }
    if (
      dispute.order.settlement.status === SettlementStatus.RESERVED ||
      dispute.order.settlement.status === SettlementStatus.PAID
    ) {
      throw new ConflictException(
        'This settlement has already entered the payout process',
      );
    }

    if (dto.resolutionType === DisputeResolutionType.RELEASE_PROVIDER) {
      const resolved = await this.prisma.$transaction(
        async (tx) => {
          const requestedAt = new Date();
          const claimed = await tx.dispute.updateMany({
            where: {
              id,
              status: {
                in: [DisputeStatus.OPEN, DisputeStatus.INVESTIGATING],
              },
              resolutionRequestedAt: null,
              resolutionType: null,
            },
            data: {
              resolutionType: dto.resolutionType,
              resolutionRefundAmount: null,
              resolutionRequestedAt: requestedAt,
              adminNote: dto.adminNote?.trim() || null,
            },
          });
          if (claimed.count !== 1) {
            throw new ConflictException(
              'This dispute is already being resolved',
            );
          }

          const claimedOrder = await tx.order.updateMany({
            where: {
              id: dispute.orderId,
              status: OrderStatus.COMPLETED,
              paymentStatus: {
                in: [
                  OrderPaymentStatus.PAID,
                  OrderPaymentStatus.PARTIALLY_REFUNDED,
                ],
              },
              settlement: {
                is: {
                  id: dispute.order.settlement!.id,
                  status: SettlementStatus.HELD,
                  acceptedAt: null,
                },
              },
              externalDisputes: {
                none: {
                  affectsOrderBalance: true,
                  status: { in: ['OPEN', 'REMINDER'] },
                },
              },
            },
            data: { updatedAt: requestedAt },
          });
          if (claimedOrder.count !== 1) {
            throw new ConflictException(
              'The order changed before it could be resolved',
            );
          }

          const released = await tx.orderSettlement.updateMany({
            where: {
              id: dispute.order.settlement!.id,
              status: SettlementStatus.HELD,
              acceptedAt: null,
              order: {
                status: OrderStatus.COMPLETED,
                paymentStatus: {
                  in: [
                    OrderPaymentStatus.PAID,
                    OrderPaymentStatus.PARTIALLY_REFUNDED,
                  ],
                },
                externalDisputes: {
                  none: {
                    affectsOrderBalance: true,
                    status: { in: ['OPEN', 'REMINDER'] },
                  },
                },
              },
            },
            data: {
              status: SettlementStatus.ELIGIBLE,
              acceptedAt: requestedAt,
              acceptedBy: SettlementAcceptedBy.ADMIN,
              releaseReviewStatus: 'NONE',
              releaseReviewRequestedAt: null,
              releaseReviewNote: null,
            },
          });
          if (released.count !== 1) {
            throw new ConflictException(
              'The settlement changed before it could be released',
            );
          }

          return tx.dispute.update({
            where: { id },
            data: {
              status: DisputeStatus.RESOLVED,
              resolvedAt: requestedAt,
            },
            include: {
              client: { select: USER_SELECT },
              provider: { select: USER_SELECT },
              order: true,
            },
          });
        },
        { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
      );
      await this.notificationEvents?.disputeUpdated(resolved);
      return resolved;
    }

    const alreadyRefunded = dispute.order.refunds.reduce(
      (sum, refund) => sum.add(refund.amount),
      new Prisma.Decimal(0),
    );
    const refundable = dispute.order.total.minus(alreadyRefunded);
    const refundAmount =
      dto.resolutionType === DisputeResolutionType.FULL_REFUND
        ? refundable
        : dto.refundAmount === undefined
          ? null
          : new Prisma.Decimal(dto.refundAmount);
    if (!refundAmount) {
      throw new ConflictException('Enter the partial refund amount');
    }
    if (
      refundAmount.lessThanOrEqualTo(0) ||
      refundAmount.greaterThan(refundable) ||
      (dto.resolutionType === DisputeResolutionType.PARTIAL_REFUND &&
        refundAmount.equals(refundable))
    ) {
      throw new ConflictException(
        `Refund amount must be less than ${refundable.toFixed(2)} ${dispute.order.currency}`,
      );
    }

    const requestedAt = new Date();
    const claimed = await this.prisma.dispute.updateMany({
      where: {
        id,
        status: { in: [DisputeStatus.OPEN, DisputeStatus.INVESTIGATING] },
        resolutionRequestedAt: null,
        resolutionType: null,
      },
      data: {
        resolutionType: dto.resolutionType,
        resolutionRefundAmount: refundAmount,
        resolutionRequestedAt: requestedAt,
        adminNote: dto.adminNote?.trim() || null,
        status: DisputeStatus.INVESTIGATING,
      },
    });
    if (claimed.count !== 1) {
      throw new ConflictException('This dispute is already being resolved');
    }

    try {
      const result = await this.payments.refund(
        dispute.orderId,
        dto.adminNote || `Resolution for dispute ${id}`,
        refundAmount,
        id,
      );
      if (result.refundStatus.toLowerCase() === 'failed') {
        await this.releaseFailedResolutionClaim(id, requestedAt);
        throw new ConflictException('Paystack rejected the refund request');
      }
      const updated = await this.prisma.dispute.findUnique({ where: { id } });
      if (updated) await this.notificationEvents?.disputeUpdated(updated);
      return result;
    } catch (error) {
      const recoverableRefund = await this.prisma.paymentRefund.findFirst({
        where: {
          disputeId: id,
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
        select: { id: true },
      });
      if (!recoverableRefund) {
        await this.releaseFailedResolutionClaim(id, requestedAt);
      }
      throw error;
    }
  }

  private releaseFailedResolutionClaim(id: string, requestedAt: Date) {
    return this.prisma.dispute.updateMany({
      where: {
        id,
        status: DisputeStatus.INVESTIGATING,
        resolutionRequestedAt: requestedAt,
      },
      data: {
        resolutionType: null,
        resolutionRefundAmount: null,
        resolutionRequestedAt: null,
      },
    });
  }
}
