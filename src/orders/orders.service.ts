import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from '../../generated/prisma';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  // Generate a unique order number like #WJ0BEWBFO
  private generateOrderNumber(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  async create(clientId: string, createOrderDto: CreateOrderDto) {
    // Get the service to find the provider
    const service = await this.prisma.service.findUnique({
      where: { id: createOrderDto.serviceId },
      include: { provider: true },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    if (service.providerId === clientId) {
      throw new ForbiddenException('You cannot order your own service');
    }

    // Generate unique order number
    let orderNumber = this.generateOrderNumber();
    let isUnique = false;
    while (!isUnique) {
      const existing = await this.prisma.order.findUnique({
        where: { orderNumber },
      });
      if (!existing) {
        isUnique = true;
      } else {
        orderNumber = this.generateOrderNumber();
      }
    }

    // Create the order with add-ons
    const order = await this.prisma.order.create({
      data: {
        orderNumber,
        clientId,
        providerId: service.providerId,
        serviceId: createOrderDto.serviceId,
        planId: createOrderDto.planId,
        planTitle: createOrderDto.planTitle,
        planPrice: createOrderDto.planPrice,
        planInclusions: createOrderDto.planInclusions,
        subtotal: createOrderDto.subtotal,
        addOnsTotal: createOrderDto.addOnsTotal,
        couponCode: createOrderDto.couponCode,
        couponDiscount: createOrderDto.couponDiscount || 0,
        total: createOrderDto.total,
        status: OrderStatus.PENDING,
        addOns: createOrderDto.addOns
          ? {
              create: createOrderDto.addOns.map((addon) => ({
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

    const where: any = { providerId };
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

  async findOne(id: string, userId: string) {
    const order = await this.prisma.order.findUnique({
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

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Check if user is client or provider
    if (order.clientId !== userId && order.providerId !== userId) {
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

    // Validate status transitions — provider takes priority over client
    if (isProvider) {
      // Provider can accept (IN_PROGRESS), decline, or complete
      if (
        status !== OrderStatus.IN_PROGRESS &&
        status !== OrderStatus.DECLINED &&
        status !== OrderStatus.COMPLETED
      ) {
        throw new ForbiddenException('Invalid status transition');
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
    }

    const updated = await this.prisma.order.update({
      where: { id },
      data: { status },
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

    return updated;
  }

  async delete(id: string, userId: string, isAdmin: boolean) {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Admin can delete any order
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
