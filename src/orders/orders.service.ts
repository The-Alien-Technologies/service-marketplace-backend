import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import {
  OrderPaymentStatus,
  OrderSource,
  OrderStatus,
  Prisma,
  QuoteStatus,
  ServiceStatus,
} from '../../generated/prisma';
import { SettlementsService } from '../settlements/settlements.service';
import { NotificationEventsService } from '../notifications/notification-events.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly settlements: SettlementsService,
    private readonly notificationEvents?: NotificationEventsService,
  ) {}

  // Generate a unique order number like #WJ0BEWBFO
  private generateOrderNumber(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  private async createUniqueOrderNumber(): Promise<string> {
    let orderNumber = this.generateOrderNumber();
    while (await this.prisma.order.findUnique({ where: { orderNumber } })) {
      orderNumber = this.generateOrderNumber();
    }
    return orderNumber;
  }

  async create(clientId: string, createOrderDto: CreateOrderDto) {
    const existingOrder = await this.prisma.order.findUnique({
      where: { checkoutKey: createOrderDto.checkoutKey },
    });

    if (existingOrder) {
      if (existingOrder.clientId !== clientId) {
        throw new ForbiddenException('Checkout key belongs to another user');
      }
      return this.findOne(existingOrder.id, clientId);
    }

    const requestedAddOnIds = createOrderDto.addOnIds ?? [];
    const service = await this.prisma.service.findUnique({
      where: { id: createOrderDto.serviceId },
      include: {
        plans: { where: { id: createOrderDto.planId } },
        addons: {
          where: { id: { in: requestedAddOnIds } },
        },
      },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    if (service.status !== ServiceStatus.PUBLISHED) {
      throw new BadRequestException('This service is not available to order');
    }

    if (service.providerId === clientId) {
      throw new ForbiddenException('You cannot order your own service');
    }

    const plan = service.plans[0];
    if (!plan) {
      throw new BadRequestException(
        'The selected plan does not belong to this service',
      );
    }

    if (service.addons.length !== requestedAddOnIds.length) {
      throw new BadRequestException(
        'One or more selected add-ons do not belong to this service',
      );
    }

    const addOnsTotal = service.addons.reduce(
      (total, addon) => total.add(addon.price),
      new Prisma.Decimal(0),
    );
    const subtotal = plan.price.add(addOnsTotal);
    const orderNumber = await this.createUniqueOrderNumber();
    const commissionRate = await this.settlements.getCommissionRate();

    const order = await this.prisma.order.create({
      data: {
        orderNumber,
        checkoutKey: createOrderDto.checkoutKey,
        clientId,
        providerId: service.providerId,
        serviceId: createOrderDto.serviceId,
        planId: plan.id,
        planTitle: plan.title,
        planPrice: plan.price,
        planInclusions: plan.inclusions,
        subtotal,
        addOnsTotal,
        couponDiscount: 0,
        total: subtotal,
        currency: 'GHS',
        commissionRate,
        paymentStatus: OrderPaymentStatus.UNPAID,
        source: OrderSource.SERVICE_PLAN,
        status: OrderStatus.PENDING,
        addOns: service.addons.length
          ? {
              create: service.addons.map((addon) => ({
                addonId: addon.id,
                title: addon.title,
                description: addon.description,
                price: addon.price,
              })),
            }
          : undefined,
      },
      include: {
        addOns: true,
        paymentTransactions: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          select: {
            id: true,
            reference: true,
            status: true,
            amount: true,
            currency: true,
            channel: true,
            paidAt: true,
            createdAt: true,
          },
        },
        service: {
          include: {
            category: true,
            provider: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                displayName: true,
                avatar: true,
              },
            },
          },
        },
        client: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            displayName: true,
            avatar: true,
          },
        },
      },
    });

    return order;
  }

  async createFromAcceptedQuote(quoteId: string, clientId: string) {
    const quote = await this.prisma.quoteRequest.findUnique({
      where: { id: quoteId },
      include: { order: true },
    });

    if (!quote) throw new NotFoundException('Quote request not found');
    if (quote.clientId !== clientId) {
      throw new ForbiddenException('Only the client can accept this offer');
    }
    if (quote.order) return quote.order;
    if (quote.status !== QuoteStatus.PENDING) {
      throw new BadRequestException('This quote does not have an active offer');
    }
    if (!quote.serviceId) {
      throw new BadRequestException(
        'This quote must be linked to a service before payment',
      );
    }
    if (quote.currency !== 'GHS') {
      throw new BadRequestException('Only GHS quote payments are supported');
    }
    if (quote.budget.lessThanOrEqualTo(0)) {
      throw new BadRequestException('Quote amount must be greater than zero');
    }

    const orderNumber = await this.createUniqueOrderNumber();
    const commissionRate = await this.settlements.getCommissionRate();

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.quoteRequest.updateMany({
        where: {
          id: quote.id,
          clientId,
          status: QuoteStatus.PENDING,
        },
        data: { status: QuoteStatus.ACCEPTED },
      });

      if (updated.count !== 1) {
        throw new BadRequestException('This quote has already been handled');
      }

      return tx.order.create({
        data: {
          orderNumber,
          clientId,
          providerId: quote.providerId,
          serviceId: quote.serviceId,
          quoteRequestId: quote.id,
          planTitle: quote.projectTitle,
          planPrice: quote.budget,
          planInclusions: quote.description,
          subtotal: quote.budget,
          addOnsTotal: 0,
          couponDiscount: 0,
          total: quote.budget,
          currency: quote.currency,
          commissionRate,
          status: OrderStatus.PENDING,
          paymentStatus: OrderPaymentStatus.UNPAID,
          source: OrderSource.QUOTE,
        },
      });
    });
  }

  async findClientOrders(
    clientId: string,
    options?: {
      status?: OrderStatus | OrderStatus[];
      page?: number;
      limit?: number;
    },
  ) {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const skip = (page - 1) * limit;

    const where: any = { clientId };
    if (options?.status) {
      if (Array.isArray(options.status)) {
        where.status = { in: options.status };
      } else {
        where.status = options.status;
      }
    }

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          settlement: true,
          addOns: true,
          service: {
            include: {
              category: true,
              provider: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  displayName: true,
                  avatar: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.order.count({ where }),
    ]);

    return {
      data: orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findProviderOrders(
    providerId: string,
    options?: {
      status?: OrderStatus | OrderStatus[];
      page?: number;
      limit?: number;
    },
  ) {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const skip = (page - 1) * limit;

    const where: any = {
      providerId,
      OR: [
        {
          paymentStatus: {
            in: [
              OrderPaymentStatus.PAID,
              OrderPaymentStatus.PARTIALLY_REFUNDED,
            ],
          },
        },
        {
          status: OrderStatus.REFUNDED,
          paymentStatus: OrderPaymentStatus.REFUNDED,
        },
      ],
    };
    if (options?.status) {
      if (Array.isArray(options.status)) {
        where.status = { in: options.status };
      } else {
        where.status = options.status;
      }
    }

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          settlement: true,
          addOns: true,
          service: {
            include: {
              category: true,
            },
          },
          client: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              displayName: true,
              avatar: true,
            },
          },
        },
      }),
      this.prisma.order.count({ where }),
    ]);

    return {
      data: orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findAll(options?: {
    status?: OrderStatus;
    page?: number;
    limit?: number;
    search?: string;
  }) {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (options?.status) {
      where.status = options.status;
    }

    if (options?.search) {
      where.OR = [
        { orderNumber: { contains: options.search, mode: 'insensitive' } },
        {
          client: {
            OR: [
              { firstName: { contains: options.search, mode: 'insensitive' } },
              { lastName: { contains: options.search, mode: 'insensitive' } },
              {
                displayName: { contains: options.search, mode: 'insensitive' },
              },
            ],
          },
        },
        {
          service: {
            provider: {
              OR: [
                {
                  firstName: { contains: options.search, mode: 'insensitive' },
                },
                { lastName: { contains: options.search, mode: 'insensitive' } },
                {
                  displayName: {
                    contains: options.search,
                    mode: 'insensitive',
                  },
                },
              ],
            },
          },
        },
      ];
    }

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          settlement: true,
          addOns: true,
          service: {
            include: {
              category: true,
              provider: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  displayName: true,
                  avatar: true,
                },
              },
            },
          },
          client: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              displayName: true,
              avatar: true,
            },
          },
        },
      }),
      this.prisma.order.count({ where }),
    ]);

    return {
      data: orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string, userId: string, isAdmin = false) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        settlement: true,
        refunds: {
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            amount: true,
            currency: true,
            status: true,
            affectsOrderBalance: true,
            reason: true,
            failureMessage: true,
            processedAt: true,
            createdAt: true,
          },
        },
        addOns: true,
        paymentTransactions: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          select: {
            id: true,
            reference: true,
            status: true,
            amount: true,
            currency: true,
            channel: true,
            paidAt: true,
            createdAt: true,
          },
        },
        service: {
          include: {
            category: true,
            provider: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                displayName: true,
                avatar: true,
              },
            },
          },
        },
        client: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            displayName: true,
            avatar: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Check if user is client or provider
    if (!isAdmin && order.clientId !== userId && order.providerId !== userId) {
      throw new ForbiddenException('You do not have access to this order');
    }

    return order;
  }

  async updateStatus(id: string, userId: string, status: OrderStatus) {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Only provider can accept/decline/complete, client can cancel
    const isProvider = order.providerId === userId;
    const isClient = order.clientId === userId;

    if (!isProvider && !isClient) {
      throw new ForbiddenException('You do not have access to this order');
    }

    const transitionAt = new Date();

    // Validate status transitions — provider takes priority over client
    if (isProvider) {
      if (
        order.paymentStatus !== OrderPaymentStatus.PAID &&
        order.paymentStatus !== OrderPaymentStatus.PARTIALLY_REFUNDED
      ) {
        throw new ForbiddenException(
          'The order must be paid before work can begin',
        );
      }

      // A paid decline needs a refund workflow so money and fulfillment
      // cannot silently drift apart.
      if (status === OrderStatus.DECLINED) {
        throw new BadRequestException(
          'Paid orders must be refunded before they can be declined',
        );
      }

      if (
        status !== OrderStatus.IN_PROGRESS &&
        status !== OrderStatus.COMPLETED
      ) {
        throw new ForbiddenException('Invalid status transition');
      }
      if (
        status === OrderStatus.IN_PROGRESS &&
        order.status !== OrderStatus.PENDING &&
        order.status !== OrderStatus.AWAITING
      ) {
        throw new BadRequestException('This order cannot be started now');
      }
      if (
        status === OrderStatus.COMPLETED &&
        order.status !== OrderStatus.IN_PROGRESS
      ) {
        throw new BadRequestException(
          'Only an in-progress order can be completed',
        );
      }

      const claimed = await this.prisma.order.updateMany({
        where: {
          id,
          providerId: userId,
          status:
            status === OrderStatus.IN_PROGRESS
              ? { in: [OrderStatus.PENDING, OrderStatus.AWAITING] }
              : OrderStatus.IN_PROGRESS,
          paymentStatus: {
            in: [
              OrderPaymentStatus.PAID,
              OrderPaymentStatus.PARTIALLY_REFUNDED,
            ],
          },
        },
        data: {
          status,
          ...(status === OrderStatus.IN_PROGRESS && {
            startedAt: transitionAt,
          }),
          ...(status === OrderStatus.COMPLETED && {
            completedAt: transitionAt,
          }),
        },
      });
      if (claimed.count !== 1) {
        throw new BadRequestException(
          'The order changed before its status could be updated',
        );
      }
    } else if (isClient) {
      // Client can only cancel (decline) pending/awaiting orders
      if (status !== OrderStatus.DECLINED) {
        throw new ForbiddenException('You can only cancel your order');
      }
      if (
        order.status !== OrderStatus.PENDING &&
        order.status !== OrderStatus.AWAITING
      ) {
        throw new ForbiddenException('Cannot cancel order in current status');
      }
      if (
        order.paymentStatus === OrderPaymentStatus.PROCESSING ||
        order.paymentStatus === OrderPaymentStatus.PAID ||
        order.paymentStatus === OrderPaymentStatus.REFUND_PENDING ||
        order.paymentStatus === OrderPaymentStatus.PARTIALLY_REFUNDED ||
        order.paymentStatus === OrderPaymentStatus.REFUNDED
      ) {
        throw new BadRequestException(
          'Active or paid orders cannot be cancelled from this screen',
        );
      }

      const claimed = await this.prisma.order.updateMany({
        where: {
          id,
          clientId: userId,
          status: { in: [OrderStatus.PENDING, OrderStatus.AWAITING] },
          paymentStatus: {
            in: [OrderPaymentStatus.UNPAID, OrderPaymentStatus.FAILED],
          },
        },
        data: { status: OrderStatus.DECLINED },
      });
      if (claimed.count !== 1) {
        throw new BadRequestException(
          'The order changed before it could be cancelled',
        );
      }
    }

    const updated = await this.prisma.order.findUnique({
      where: { id },
      include: {
        addOns: true,
        service: {
          include: {
            category: true,
            provider: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                displayName: true,
                avatar: true,
              },
            },
          },
        },
        client: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            displayName: true,
            avatar: true,
          },
        },
      },
    });

    if (!updated) {
      throw new NotFoundException('Order not found');
    }

    await this.notificationEvents?.orderStatusChanged({
      id: updated.id,
      orderNumber: updated.orderNumber,
      clientId: updated.clientId,
      providerId: updated.providerId,
      actorId: userId,
      status: updated.status,
      updatedAt: updated.updatedAt,
    });

    return updated;
  }

  acceptWork(id: string, clientId: string) {
    return this.settlements.acceptByCustomer(id, clientId);
  }

  requestReleaseReview(id: string, providerId: string, note?: string) {
    return this.settlements.requestReleaseReview(id, providerId, note);
  }

  async delete(id: string, userId: string, isAdmin: boolean) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        paymentTransactions: { select: { id: true }, take: 1 },
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (
      order.paymentTransactions.length > 0 ||
      order.paymentStatus !== OrderPaymentStatus.UNPAID
    ) {
      throw new BadRequestException(
        'Orders with payment activity cannot be deleted',
      );
    }

    // Admin can delete unpaid orders with no payment attempts.
    if (isAdmin) {
      await this.prisma.order.delete({ where: { id } });
      return { message: 'Order deleted successfully' };
    }

    // Client can only delete their own orders
    if (order.clientId !== userId) {
      throw new ForbiddenException('You can only delete your own orders');
    }

    // Client can only delete PENDING or AWAITING orders
    if (
      order.status !== OrderStatus.PENDING &&
      order.status !== OrderStatus.AWAITING
    ) {
      throw new ForbiddenException(
        'Can only delete orders with PENDING or AWAITING status',
      );
    }

    await this.prisma.order.delete({ where: { id } });
    return { message: 'Order deleted successfully' };
  }
}
