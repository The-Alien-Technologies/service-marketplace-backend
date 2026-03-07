import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDisputeDto, UpdateDisputeStatusDto } from './dto/dispute.dto';
import {
  DisputePriority,
  DisputeIssueType,
  OrderStatus,
} from '../../generated/prisma';

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
  constructor(private readonly prisma: PrismaService) {}

  async create(clientId: string, dto: CreateDisputeDto) {
    // Verify order exists and belongs to this client
    const order = await this.prisma.order.findUnique({
      where: { id: dto.orderId },
    });

    if (!order) throw new NotFoundException('Order not found');
    if (order.clientId !== clientId) {
      throw new ForbiddenException('You can only dispute your own orders');
    }
    if (order.status !== OrderStatus.COMPLETED) {
      throw new ForbiddenException('You can only dispute completed orders');
    }

    // Check for existing dispute
    const existing = await this.prisma.dispute.findUnique({
      where: { orderId: dto.orderId },
    });
    if (existing) {
      throw new ConflictException('A dispute already exists for this order');
    }

    const priority = PRIORITY_MAP[dto.issueType];

    return this.prisma.dispute.create({
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

  async findByClient(clientId: string) {
    return this.prisma.dispute.findMany({
      where: { clientId },
      orderBy: { createdAt: 'desc' },
      include: {
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
            createdAt: true,
            service: { select: { title: true } },
          },
        },
      },
    });

    if (!dispute) throw new NotFoundException('Dispute not found');
    if (!isAdmin && dispute.clientId !== requesterId) {
      throw new ForbiddenException('Access denied');
    }

    return dispute;
  }

  async updateStatus(id: string, dto: UpdateDisputeStatusDto) {
    const dispute = await this.prisma.dispute.findUnique({ where: { id } });
    if (!dispute) throw new NotFoundException('Dispute not found');

    return this.prisma.dispute.update({
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
  }
}
