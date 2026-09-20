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
  Role,
  ServiceStatus,
  UserStatus,
  MarketStatus,
  ProviderMarketMembershipStatus,
  PaymentProvider,
  PaymentIntegrationStatus,
} from '../../generated/prisma';
import { SettlementsService } from '../settlements/settlements.service';
import { NotificationEventsService } from '../notifications/notification-events.service';
import {
  MarketAccessService,
  MarketActor,
} from '../markets/market-access.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly settlements: SettlementsService,
    private readonly marketAccess: MarketAccessService = {
      assertResource: () => undefined,
      marketForAdmin: (_actor: MarketActor, marketId?: string) => marketId,
      isStaff: () => true,
    } as unknown as MarketAccessService,
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
        provider: {
          select: {
            role: true,
            status: true,
            isServiceProviderVerified: true,
          },
        },
        market: true,
      },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    if (service.status !== ServiceStatus.PUBLISHED) {
      throw new BadRequestException('This service is not available to order');
    }
    if (
      (service.market && service.market.status !== MarketStatus.ACTIVE) ||
      service.market?.checkoutEnabled === false
    ) {
      throw new BadRequestException('Checkout is paused in this market');
    }
    if ((this.prisma as any).providerMarketMembership) {
      const membership = await this.prisma.providerMarketMembership.findUnique({
        where: {
          providerId_marketId: {
            providerId: service.providerId,
            marketId: service.marketId,
          },
        },
      });
      if (membership?.status !== ProviderMarketMembershipStatus.ACTIVE) {
        throw new BadRequestException(
          'This provider is unavailable in the market',
        );
      }
    }

    if (
      service.provider.role !== Role.SERVICE_PROVIDER ||
      service.provider.status !== UserStatus.ACTIVE ||
      !service.provider.isServiceProviderVerified
    ) {
      throw new BadRequestException(
        'This provider is not available for orders',
      );
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
    const commissionRate = await this.settlements.getCommissionRate(
      service.marketId,
    );
    const paymentIntegration = await this.paymentIntegration(service.marketId);

    const order = await this.prisma.order.create({
      data: {
        orderNumber,
        checkoutKey: createOrderDto.checkoutKey,
        clientId,
        providerId: service.providerId,
        serviceId: createOrderDto.serviceId,
        marketId: service.marketId,
        paymentIntegrationId: paymentIntegration.id,
        planId: plan.id,
        planTitle: plan.title,
        planPrice: plan.price,
        planInclusions: plan.inclusions,
        subtotal,
        addOnsTotal,
        couponDiscount: 0,
        total: subtotal,
        currency: service.currency,
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
    if (quote.budget.lessThanOrEqualTo(0)) {
      throw new BadRequestException('Quote amount must be greater than zero');
    }

    const service = await this.prisma.service.findFirst({
      where: {
        id: quote.serviceId,
        providerId: quote.providerId,
        marketId: quote.marketId,
        currency: quote.currency,
        status: ServiceStatus.PUBLISHED,
        market: {
          status: MarketStatus.ACTIVE,
          checkoutEnabled: true,
        },
        provider: {
          role: Role.SERVICE_PROVIDER,
          status: UserStatus.ACTIVE,
          isServiceProviderVerified: true,
          providerMarketMemberships: {
            some: {
              marketId: quote.marketId,
              status: ProviderMarketMembershipStatus.ACTIVE,
            },
          },
        },
      },
      select: { id: true },
    });
    if (!service) {
      throw new BadRequestException(
        'This service or provider is no longer available in the market',
      );
    }

    const orderNumber = await this.createUniqueOrderNumber();
    const commissionRate = await this.settlements.getCommissionRate(
      quote.marketId,
    );
    const paymentIntegration = await this.paymentIntegration(quote.marketId);

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
          marketId: quote.marketId,
          paymentIntegrationId: paymentIntegration.id,
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

  private async paymentIntegration(marketId: string) {
    if (!(this.prisma as any).paymentIntegration) {
      return { id: 'legacy-integration' };
    }
    const integration = await this.prisma.paymentIntegration.findUnique({
      where: {
        marketId_provider: {
          marketId,
          provider: PaymentProvider.PAYSTACK,
        },
      },
    });
    if (
      !integration ||
      integration.status !== PaymentIntegrationStatus.ACTIVE
    ) {
      throw new BadRequestException('Payments are unavailable in this market');
    }
    return integration;
  }

  async findClientOrders(
    clientId: string,
    options?: {
      status?: OrderStatus | OrderStatus[];
      page?: number;
      limit?: number;
      marketId?: string;
      paidOnly?: boolean;
      spendingOnly?: boolean;
      completedHistory?: boolean;
    },
  ) {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const skip = (page - 1) * limit;

    const where: any = { clientId };
    if (options?.marketId) where.marketId = options.marketId;
    if (options?.paidOnly) {
      where.OR = [
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
      ];
    }
    if (options?.spendingOnly) {
      where.paidAt = { not: null };
      where.settlement = { isNot: null };
    }
    if (options?.completedHistory) {
      where.completedAt = { not: null };
    }
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
      marketId?: string;
      completedHistory?: boolean;
      createdMonth?: string;
    },
  ) {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const skip = (page - 1) * limit;

    const where: any = { providerId };
    if (!options?.completedHistory) {
      where.OR = [
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
      ];
    }
    if (options?.marketId) where.marketId = options.marketId;
    if (options?.completedHistory) {
      where.completedAt = { not: null };
    } else if (options?.status) {
      if (Array.isArray(options.status)) {
        where.status = { in: options.status };
      } else {
        where.status = options.status;
      }
    }
    if (options?.createdMonth) {
      if (!/^(?:20\d{2}|2100)-(?:0[1-9]|1[0-2])$/.test(options.createdMonth)) {
        throw new BadRequestException(
          'createdMonth must be between 2000-01 and 2100-12',
        );
      }
      const [year, month] = options.createdMonth.split('-').map(Number);
      where.createdAt = {
        gte: new Date(Date.UTC(year, month - 1, 1)),
        lt: new Date(Date.UTC(year, month, 1)),
      };
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
    status?: OrderStatus | OrderStatus[];
    page?: number;
    limit?: number;
    search?: string;
    marketId?: string;
    actor?: MarketActor;
    paidOnly?: boolean;
    settledOnly?: boolean;
  }) {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (options?.actor) {
      const marketId = this.marketAccess.marketForAdmin(
        options.actor,
        options.marketId,
      );
      if (marketId) where.marketId = marketId;
    }
    if (options?.status) {
      where.status = Array.isArray(options.status)
        ? { in: options.status }
        : options.status;
    }
    if (options?.paidOnly) {
      where.paymentStatus = {
        in: [OrderPaymentStatus.PAID, OrderPaymentStatus.PARTIALLY_REFUNDED],
      };
    }
    if (options?.settledOnly) {
      where.settlement = { isNot: null };
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
            OR: [
              { title: { contains: options.search, mode: 'insensitive' } },
              {
                provider: {
                  OR: [
                    {
                      firstName: {
                        contains: options.search,
                        mode: 'insensitive',
                      },
                    },
                    {
                      lastName: {
                        contains: options.search,
                        mode: 'insensitive',
                      },
                    },
                    {
                      displayName: {
                        contains: options.search,
                        mode: 'insensitive',
                      },
                    },
                  ],
                },
              },
            ],
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

  async findOne(id: string, userId: string, adminActor?: MarketActor) {
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
    if (adminActor) {
      this.marketAccess.assertResource(adminActor, order.marketId);
    } else if (order.clientId !== userId && order.providerId !== userId) {
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

  async delete(id: string, userId: string, adminActor?: MarketActor) {
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
    if (adminActor) {
      this.marketAccess.assertResource(adminActor, order.marketId);
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
