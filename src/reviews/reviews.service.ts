import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { CreateReviewResponseDto } from './dto/create-review-response.dto';
import { OrderStatus } from '../../generated/prisma';
import { NotificationEventsService } from '../notifications/notification-events.service';

const REVIEW_INCLUDE = {
  client: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      displayName: true,
      avatar: true,
    },
  },
  provider: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      displayName: true,
      avatar: true,
    },
  },
  service: {
    select: { id: true, title: true },
  },
  response: true,
};

@Injectable()
export class ReviewsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationEvents?: NotificationEventsService,
  ) {}

  // ─── Create Review (client only, on completed order) ─────────────────────────
  async create(clientId: string, dto: CreateReviewDto) {
    const order = await this.prisma.order.findUnique({
      where: { id: dto.orderId },
    });

    if (!order) throw new NotFoundException('Order not found');
    if (order.clientId !== clientId)
      throw new ForbiddenException('You can only review your own orders');
    if (order.status !== OrderStatus.COMPLETED)
      throw new ForbiddenException('You can only review completed orders');

    const existing = await this.prisma.review.findUnique({
      where: { orderId: dto.orderId },
    });
    if (existing)
      throw new ConflictException('You have already reviewed this order');

    const review = await this.prisma.review.create({
      data: {
        orderId: dto.orderId,
        clientId,
        providerId: order.providerId,
        serviceId: order.serviceId,
        rating: dto.rating,
        comment: dto.comment,
      },
      include: REVIEW_INCLUDE,
    });
    await this.notificationEvents?.reviewReceived(review);
    return review;
  }

  // ─── Get reviews for a service (public) ──────────────────────────────────────
  async findByService(
    serviceId: string,
    options?: { rating?: number; sort?: string; page?: number; limit?: number },
  ) {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const skip = (page - 1) * limit;

    const where: any = { serviceId };
    if (options?.rating) where.rating = options.rating;

    let orderBy: any = { createdAt: 'desc' };
    if (options?.sort === 'highest') orderBy = { rating: 'desc' };
    if (options?.sort === 'lowest') orderBy = { rating: 'asc' };

    const [reviews, total] = await Promise.all([
      this.prisma.review.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: REVIEW_INCLUDE,
      }),
      this.prisma.review.count({ where }),
    ]);

    // Rating breakdown (1-5)
    const breakdown = await this.prisma.review.groupBy({
      by: ['rating'],
      where: { serviceId },
      _count: { rating: true },
    });

    const ratingCounts: Record<number, number> = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
    for (const b of breakdown) ratingCounts[b.rating] = b._count.rating;

    const avgResult = await this.prisma.review.aggregate({
      where: { serviceId },
      _avg: { rating: true },
      _count: { id: true },
    });

    return {
      data: reviews,
      summary: {
        average: avgResult._avg.rating
          ? Number(avgResult._avg.rating.toFixed(1))
          : 0,
        total: avgResult._count.id,
        breakdown: ratingCounts,
      },
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  // ─── Get reviews received by a provider (their dashboard) ────────────────────
  async findByProvider(
    providerId: string,
    options?: { rating?: number; sort?: string; page?: number; limit?: number },
  ) {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const skip = (page - 1) * limit;

    const where: any = { providerId };
    if (options?.rating) where.rating = options.rating;

    let orderBy: any = { createdAt: 'desc' };
    if (options?.sort === 'highest') orderBy = { rating: 'desc' };
    if (options?.sort === 'lowest') orderBy = { rating: 'asc' };

    const [reviews, total] = await Promise.all([
      this.prisma.review.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: REVIEW_INCLUDE,
      }),
      this.prisma.review.count({ where }),
    ]);

    const breakdown = await this.prisma.review.groupBy({
      by: ['rating'],
      where: { providerId },
      _count: { rating: true },
    });

    const ratingCounts: Record<number, number> = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
    for (const b of breakdown) ratingCounts[b.rating] = b._count.rating;

    const avgResult = await this.prisma.review.aggregate({
      where: { providerId },
      _avg: { rating: true },
      _count: { id: true },
    });

    // Count completed orders for the provider
    const completedOrders = await this.prisma.order.count({
      where: { providerId, status: OrderStatus.COMPLETED },
    });

    return {
      data: reviews,
      summary: {
        average: avgResult._avg.rating
          ? Number(avgResult._avg.rating.toFixed(1))
          : 0,
        total: avgResult._count.id,
        breakdown: ratingCounts,
        completedOrders,
      },
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  // ─── Provider responds to a review ───────────────────────────────────────────
  async respond(
    reviewId: string,
    providerId: string,
    dto: CreateReviewResponseDto,
  ) {
    const review = await this.prisma.review.findUnique({
      where: { id: reviewId },
    });
    if (!review) throw new NotFoundException('Review not found');
    if (review.providerId !== providerId)
      throw new ForbiddenException('You can only respond to reviews about you');

    const existing = await this.prisma.reviewResponse.findUnique({
      where: { reviewId },
    });
    let response;
    if (existing) {
      // Update existing response
      response = await this.prisma.reviewResponse.update({
        where: { reviewId },
        data: { comment: dto.comment },
      });
    } else {
      response = await this.prisma.reviewResponse.create({
        data: { reviewId, comment: dto.comment },
      });
    }

    await this.notificationEvents?.reviewResponse({
      id: review.id,
      clientId: review.clientId,
      orderId: review.orderId,
      updatedAt: response.updatedAt,
    });
    return response;
  }

  // ─── Check if an order already has a review ──────────────────────────────────
  async findByOrder(orderId: string) {
    return this.prisma.review.findUnique({
      where: { orderId },
      include: REVIEW_INCLUDE,
    });
  }
}
