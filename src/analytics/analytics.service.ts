import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderStatus, Role } from '../../generated/prisma';

// Mock monthly earnings shape (12 months)
function mockMonthlyData(seed: number) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return months.map((name, i) => ({
    name,
    current: Math.round((seed + i * 30 + Math.sin(i) * 100) * 10) / 10,
    previous: Math.round((seed + i * 25 + Math.cos(i) * 80) * 10) / 10,
  }));
}

function mockRevenueData() {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return months.map((name, i) => ({
    name,
    revenue: 600 + i * 20 + Math.round(Math.sin(i) * 50),
    commission: 380 + i * 12 + Math.round(Math.sin(i) * 30),
    payout: 100 + i * 28 + Math.round(Math.sin(i) * 20),
  }));
}

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getProviderDashboard(providerId: string) {
    const [
      activeOrders,
      completedOrders,
      awaitingOrders,
      declinedOrders,
      inProgressOrders,
      ratingData,
      recentOrders,
    ] = await Promise.all([
      // Active = AWAITING + IN_PROGRESS
      this.prisma.order.count({
        where: {
          providerId,
          status: { in: [OrderStatus.AWAITING, OrderStatus.IN_PROGRESS] },
        },
      }),
      this.prisma.order.count({
        where: { providerId, status: OrderStatus.COMPLETED },
      }),
      this.prisma.order.count({
        where: { providerId, status: OrderStatus.AWAITING },
      }),
      this.prisma.order.count({
        where: { providerId, status: OrderStatus.DECLINED },
      }),
      this.prisma.order.count({
        where: { providerId, status: OrderStatus.IN_PROGRESS },
      }),
      // Average rating from reviews
      this.prisma.review.aggregate({
        where: { providerId },
        _avg: { rating: true },
        _count: { id: true },
      }),
      // 5 most recent orders
      this.prisma.order.findMany({
        where: { providerId },
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
          client: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              displayName: true,
              avatar: true,
            },
          },
          service: { select: { title: true } },
        },
      }),
    ]);

    const totalOrders = activeOrders + completedOrders + declinedOrders;

    const avgRating = ratingData._avg.rating ?? 0;

    return {
      stats: {
        activeOrders,
        completedOrders,
        totalOrders,
        averageRating: Math.round(avgRating * 10) / 10,
        reviewCount: ratingData._count.id,
      },
      orderStatusBreakdown: [
        { name: 'Awaiting', value: awaitingOrders, color: '#facc15' },
        { name: 'In-progress', value: inProgressOrders, color: '#3b82f6' },
        { name: 'Declined', value: declinedOrders, color: '#f87171' },
        { name: 'Completed', value: completedOrders, color: '#4ade80' },
      ],
      recentOrders: recentOrders.map((o) => ({
        id: o.id,
        orderNumber: `#${o.orderNumber}`,
        clientName:
          o.client.displayName ||
          `${o.client.firstName} ${o.client.lastName}`.trim(),
        clientAvatar: o.client.avatar,
        plan: o.planTitle ?? '—',
        serviceTitle: o.service?.title ?? '—',
        status: o.status,
        createdAt: o.createdAt,
      })),
      // Mocked earnings chart — swap with real payments data later
      earningsChart: mockMonthlyData(300),
    };
  }

  async getAdminDashboard() {
    const [
      totalUsers,
      activeProviders,
      activeOrders,
      completedOrders,
      awaitingOrders,
      declinedOrders,
      inProgressOrders,
      expiredOrders,
      topCategories,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { role: Role.SERVICE_PROVIDER } }),
      this.prisma.order.count({
        where: {
          status: { in: [OrderStatus.AWAITING, OrderStatus.IN_PROGRESS] },
        },
      }),
      this.prisma.order.count({ where: { status: OrderStatus.COMPLETED } }),
      this.prisma.order.count({ where: { status: OrderStatus.AWAITING } }),
      this.prisma.order.count({ where: { status: OrderStatus.DECLINED } }),
      this.prisma.order.count({ where: { status: OrderStatus.IN_PROGRESS } }),
      // EXPIRED — use DECLINED as fallback if no EXPIRED status exists
      this.prisma.order.count({ where: { status: OrderStatus.DECLINED } }),
      // Top categories by number of services
      this.prisma.category.findMany({
        take: 5,
        orderBy: { services: { _count: 'desc' } },
        select: {
          id: true,
          name: true,
          imageUrl: true,
          services: { select: { id: true } },
        },
      }),
    ]);

    const totalOrders =
      awaitingOrders + inProgressOrders + completedOrders + declinedOrders;

    return {
      stats: {
        totalUsers,
        activeProviders,
        activeOrders,
        // Mocked revenue — no payments table yet
        revenue: 100500,
      },
      orderStatusBreakdown: [
        { name: 'Completed', value: completedOrders, color: '#4ade80' },
        { name: 'Pending', value: awaitingOrders, color: '#facc15' },
        { name: 'In-progress', value: inProgressOrders, color: '#3b82f6' },
        { name: 'Declined', value: declinedOrders, color: '#f87171' },
        { name: 'Expired', value: 0, color: '#9ca3af' },
      ],
      totalOrders,
      topCategories: topCategories.map((c) => ({
        name: c.name,
        icon: c.imageUrl ?? '📦',
        count: c.services.length,
      })),
      // Mocked revenue chart
      revenueChart: mockRevenueData(),
    };
  }
}
