import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  OrderPaymentStatus,
  OrderStatus,
  PaymentRefundStatus,
  Prisma,
  ProviderPayoutStatus,
  Role,
  UserStatus,
} from '../../generated/prisma';

const MONTH_NAMES = [
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

const ACTIVE_ORDER_STATUSES = [
  OrderStatus.PENDING,
  OrderStatus.AWAITING,
  OrderStatus.IN_PROGRESS,
];

const ACTIVE_ORDER_PAYMENT_STATUSES = [
  OrderPaymentStatus.PAID,
  OrderPaymentStatus.PARTIALLY_REFUNDED,
];

const ACTIVE_ORDER_WHERE: Prisma.OrderWhereInput = {
  status: { in: ACTIVE_ORDER_STATUSES },
  paymentStatus: { in: ACTIVE_ORDER_PAYMENT_STATUSES },
};

function monthRange(monthKey: string) {
  const [year, month] = monthKey.split('-').map(Number);
  return {
    start: new Date(Date.UTC(year, month - 1, 1)),
    end: new Date(Date.UTC(year, month, 1)),
  };
}

function percentageChange(current: number, previous: number) {
  if (previous === 0) return current === 0 ? 0 : null;
  return Math.round(((current - previous) / previous) * 1000) / 10;
}

function trend(current: number, previous: number) {
  return {
    current,
    previous,
    changePercent: percentageChange(current, previous),
  };
}

function money(value: unknown) {
  return Math.round(Number(value ?? 0) * 100) / 100;
}

function availableMonthKeys(
  earliest: Date | null | undefined,
  now: Date,
  selected: string,
) {
  const currentSerial = now.getUTCFullYear() * 12 + now.getUTCMonth();
  const earliestSerial = earliest
    ? earliest.getUTCFullYear() * 12 + earliest.getUTCMonth()
    : currentSerial;
  const firstSerial = Math.max(
    2000 * 12,
    Math.min(earliestSerial, currentSerial),
  );
  const months = new Set<string>([selected]);

  for (let serial = currentSerial; serial >= firstSerial; serial -= 1) {
    const year = Math.floor(serial / 12);
    const month = (serial % 12) + 1;
    months.add(`${year}-${String(month).padStart(2, '0')}`);
  }

  return Array.from(months).sort((a, b) => b.localeCompare(a));
}

function availableYearValues(
  earliest: Date | null | undefined,
  now: Date,
  selected: number,
) {
  const currentYear = now.getUTCFullYear();
  const earliestYear = earliest?.getUTCFullYear() ?? currentYear;
  return Array.from(
    new Set([
      selected,
      ...Array.from(
        { length: currentYear - Math.min(earliestYear, currentYear) + 1 },
        (_, index) => currentYear - index,
      ),
    ]),
  ).sort((a, b) => b - a);
}

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getProviderDashboard(
    providerId: string,
    year?: number,
    orderMonth?: string,
  ) {
    const now = new Date();
    const selectedYear = year ?? now.getUTCFullYear();
    const selectedOrderMonth =
      orderMonth ??
      `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}`;
    const previousYearStart = new Date(Date.UTC(selectedYear - 1, 0, 1));
    const selectedYearEnd = new Date(Date.UTC(selectedYear + 1, 0, 1));
    const currentMonthStart = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1),
    );
    const nextMonthStart = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1),
    );
    const previousMonthStart = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1),
    );
    const selectedOrderRange = monthRange(selectedOrderMonth);
    const previousOrderMonthStart = new Date(
      Date.UTC(
        selectedOrderRange.start.getUTCFullYear(),
        selectedOrderRange.start.getUTCMonth() - 1,
        1,
      ),
    );
    const providerOrderWhere: Prisma.OrderWhereInput = {
      providerId,
      OR: [
        { paymentStatus: { in: ACTIVE_ORDER_PAYMENT_STATUSES } },
        {
          status: OrderStatus.REFUNDED,
          paymentStatus: OrderPaymentStatus.REFUNDED,
        },
      ],
    };

    const [
      orderStatusCounts,
      selectedOrderStatusCounts,
      ratingData,
      recentOrders,
      completedOrders,
      totalEarnings,
      currentEarnings,
      previousEarnings,
      chartSettlements,
      earliestEarningOrder,
      earliestProviderOrder,
      currentNewPaidOrders,
      previousNewPaidOrders,
      currentCompletedOrders,
      previousCompletedOrders,
      previousSelectedOrders,
    ] = await Promise.all([
      this.prisma.order.groupBy({
        by: ['status'],
        where: providerOrderWhere,
        _count: { _all: true },
      }),
      this.prisma.order.groupBy({
        by: ['status'],
        where: {
          ...providerOrderWhere,
          createdAt: {
            gte: selectedOrderRange.start,
            lt: selectedOrderRange.end,
          },
        },
        _count: { _all: true },
      }),
      this.prisma.review.aggregate({
        where: { providerId },
        _avg: { rating: true },
        _count: { id: true },
      }),
      this.prisma.order.findMany({
        where: providerOrderWhere,
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
      this.prisma.order.count({
        where: { providerId, completedAt: { not: null } },
      }),
      this.prisma.orderSettlement.aggregate({
        where: { providerId },
        _sum: { providerAmount: true },
      }),
      this.prisma.orderSettlement.aggregate({
        where: {
          providerId,
          order: { paidAt: { gte: currentMonthStart, lt: nextMonthStart } },
        },
        _sum: { providerAmount: true },
      }),
      this.prisma.orderSettlement.aggregate({
        where: {
          providerId,
          order: {
            paidAt: { gte: previousMonthStart, lt: currentMonthStart },
          },
        },
        _sum: { providerAmount: true },
      }),
      this.prisma.orderSettlement.findMany({
        where: {
          providerId,
          order: {
            paidAt: { gte: previousYearStart, lt: selectedYearEnd },
          },
        },
        select: {
          providerAmount: true,
          order: { select: { paidAt: true } },
        },
      }),
      this.prisma.order.findFirst({
        where: {
          providerId,
          paidAt: { not: null },
          settlement: { isNot: null },
        },
        orderBy: { paidAt: 'asc' },
        select: { paidAt: true },
      }),
      this.prisma.order.findFirst({
        where: providerOrderWhere,
        orderBy: { createdAt: 'asc' },
        select: { createdAt: true },
      }),
      this.prisma.order.count({
        where: {
          providerId,
          paidAt: { gte: currentMonthStart, lt: nextMonthStart },
          settlement: { isNot: null },
        },
      }),
      this.prisma.order.count({
        where: {
          providerId,
          paidAt: { gte: previousMonthStart, lt: currentMonthStart },
          settlement: { isNot: null },
        },
      }),
      this.prisma.order.count({
        where: {
          providerId,
          completedAt: { gte: currentMonthStart, lt: nextMonthStart },
        },
      }),
      this.prisma.order.count({
        where: {
          providerId,
          completedAt: { gte: previousMonthStart, lt: currentMonthStart },
        },
      }),
      this.prisma.order.count({
        where: {
          ...providerOrderWhere,
          createdAt: {
            gte: previousOrderMonthStart,
            lt: selectedOrderRange.start,
          },
        },
      }),
    ]);

    const statusValue = (
      counts: typeof orderStatusCounts,
      status: OrderStatus,
    ) => counts.find((item) => item.status === status)?._count._all ?? 0;
    const allStatusValue = (status: OrderStatus) =>
      statusValue(orderStatusCounts, status);
    const selectedStatusValue = (status: OrderStatus) =>
      statusValue(selectedOrderStatusCounts, status);
    const activeOrders = ACTIVE_ORDER_STATUSES.reduce(
      (sum, status) => sum + allStatusValue(status),
      0,
    );
    const totalOrders = orderStatusCounts.reduce(
      (sum, item) => sum + item._count._all,
      0,
    );
    const orderStatusBreakdown = [
      {
        name: 'Awaiting',
        value:
          selectedStatusValue(OrderStatus.PENDING) +
          selectedStatusValue(OrderStatus.AWAITING),
      },
      {
        name: 'In-progress',
        value: selectedStatusValue(OrderStatus.IN_PROGRESS),
      },
      {
        name: 'Declined',
        value: selectedStatusValue(OrderStatus.DECLINED),
      },
      {
        name: 'Refunded',
        value: selectedStatusValue(OrderStatus.REFUNDED),
      },
      {
        name: 'Completed',
        value: selectedStatusValue(OrderStatus.COMPLETED),
      },
    ];
    const selectedOrderTotal = orderStatusBreakdown.reduce(
      (sum, item) => sum + item.value,
      0,
    );
    const avgRating = ratingData._avg.rating ?? 0;
    const earningsChart = MONTH_NAMES.map((name) => ({
      name,
      current: 0,
      previous: 0,
    }));
    chartSettlements.forEach((settlement) => {
      const paidAt = settlement.order.paidAt;
      if (!paidAt) return;
      const bucket = earningsChart[paidAt.getUTCMonth()];
      const amount = Number(settlement.providerAmount);
      if (paidAt.getUTCFullYear() === selectedYear) {
        bucket.current += amount;
      } else if (paidAt.getUTCFullYear() === selectedYear - 1) {
        bucket.previous += amount;
      }
    });
    earningsChart.forEach((item) => {
      item.current = money(item.current);
      item.previous = money(item.previous);
    });
    const bestMonth = earningsChart.reduce<
      (typeof earningsChart)[number] | null
    >(
      (best, item) =>
        item.current > 0 && (!best || item.current > best.current)
          ? item
          : best,
      null,
    );

    return {
      currency: 'GHS',
      generatedAt: now.toISOString(),
      stats: {
        earnings: money(totalEarnings._sum.providerAmount),
        activeOrders,
        completedOrders,
        totalOrders,
        averageRating: Math.round(avgRating * 10) / 10,
        reviewCount: ratingData._count.id,
      },
      trends: {
        earnings: trend(
          money(currentEarnings._sum.providerAmount),
          money(previousEarnings._sum.providerAmount),
        ),
        newPaidOrders: trend(currentNewPaidOrders, previousNewPaidOrders),
        completedOrders: trend(currentCompletedOrders, previousCompletedOrders),
      },
      selectedYear,
      availableYears: availableYearValues(
        earliestEarningOrder?.paidAt,
        now,
        selectedYear,
      ),
      earningsSummary: {
        total: money(
          earningsChart.reduce((sum, item) => sum + item.current, 0),
        ),
        bestMonth: bestMonth
          ? { name: bestMonth.name, earnings: bestMonth.current }
          : null,
      },
      earningsChart,
      orderMonth: selectedOrderMonth,
      availableOrderMonths: availableMonthKeys(
        earliestProviderOrder?.createdAt,
        now,
        selectedOrderMonth,
      ),
      orderSummary: {
        total: selectedOrderTotal,
        trend: trend(selectedOrderTotal, previousSelectedOrders),
        breakdown: orderStatusBreakdown,
      },
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
    };
  }

  async getUserDashboard(userId: string, year?: number) {
    const now = new Date();
    const selectedYear = year ?? now.getUTCFullYear();
    const previousYearStart = new Date(Date.UTC(selectedYear - 1, 0, 1));
    const selectedYearEnd = new Date(Date.UTC(selectedYear + 1, 0, 1));
    const currentMonthStart = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1),
    );
    const nextMonthStart = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1),
    );
    const previousMonthStart = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1),
    );
    const userOrderWhere: Prisma.OrderWhereInput = {
      clientId: userId,
      OR: [
        { paymentStatus: { in: ACTIVE_ORDER_PAYMENT_STATUSES } },
        {
          status: OrderStatus.REFUNDED,
          paymentStatus: OrderPaymentStatus.REFUNDED,
        },
      ],
    };
    const processedRefundWhere: Prisma.PaymentRefundWhereInput = {
      status: PaymentRefundStatus.PROCESSED,
      affectsOrderBalance: true,
    };

    const [
      orderStatusCounts,
      recentOrders,
      completedOrders,
      totalGross,
      totalRefunds,
      currentGross,
      currentRefunds,
      previousGross,
      previousRefunds,
      chartSettlements,
      earliestPaidOrder,
      currentNewPaidOrders,
      previousNewPaidOrders,
      currentCompletedOrders,
      previousCompletedOrders,
    ] = await Promise.all([
      this.prisma.order.groupBy({
        by: ['status'],
        where: userOrderWhere,
        _count: { _all: true },
      }),
      this.prisma.order.findMany({
        where: userOrderWhere,
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
          provider: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              displayName: true,
              avatar: true,
            },
          },
          service: { select: { title: true } },
          refunds: {
            where: processedRefundWhere,
            select: { amount: true },
          },
        },
      }),
      this.prisma.order.count({
        where: { clientId: userId, completedAt: { not: null } },
      }),
      this.prisma.orderSettlement.aggregate({
        where: { order: { clientId: userId } },
        _sum: { grossAmount: true },
      }),
      this.prisma.paymentRefund.aggregate({
        where: { ...processedRefundWhere, order: { clientId: userId } },
        _sum: { amount: true },
      }),
      this.prisma.orderSettlement.aggregate({
        where: {
          order: {
            clientId: userId,
            paidAt: { gte: currentMonthStart, lt: nextMonthStart },
          },
        },
        _sum: { grossAmount: true },
      }),
      this.prisma.paymentRefund.aggregate({
        where: {
          ...processedRefundWhere,
          order: {
            clientId: userId,
            paidAt: { gte: currentMonthStart, lt: nextMonthStart },
          },
        },
        _sum: { amount: true },
      }),
      this.prisma.orderSettlement.aggregate({
        where: {
          order: {
            clientId: userId,
            paidAt: { gte: previousMonthStart, lt: currentMonthStart },
          },
        },
        _sum: { grossAmount: true },
      }),
      this.prisma.paymentRefund.aggregate({
        where: {
          ...processedRefundWhere,
          order: {
            clientId: userId,
            paidAt: { gte: previousMonthStart, lt: currentMonthStart },
          },
        },
        _sum: { amount: true },
      }),
      this.prisma.orderSettlement.findMany({
        where: {
          order: {
            clientId: userId,
            paidAt: { gte: previousYearStart, lt: selectedYearEnd },
          },
        },
        select: {
          grossAmount: true,
          order: {
            select: {
              paidAt: true,
              refunds: {
                where: processedRefundWhere,
                select: { amount: true },
              },
            },
          },
        },
      }),
      this.prisma.order.findFirst({
        where: {
          clientId: userId,
          paidAt: { not: null },
          settlement: { isNot: null },
        },
        orderBy: { paidAt: 'asc' },
        select: { paidAt: true },
      }),
      this.prisma.order.count({
        where: {
          clientId: userId,
          paidAt: { gte: currentMonthStart, lt: nextMonthStart },
          settlement: { isNot: null },
        },
      }),
      this.prisma.order.count({
        where: {
          clientId: userId,
          paidAt: { gte: previousMonthStart, lt: currentMonthStart },
          settlement: { isNot: null },
        },
      }),
      this.prisma.order.count({
        where: {
          clientId: userId,
          completedAt: { gte: currentMonthStart, lt: nextMonthStart },
        },
      }),
      this.prisma.order.count({
        where: {
          clientId: userId,
          completedAt: { gte: previousMonthStart, lt: currentMonthStart },
        },
      }),
    ]);

    const statusValue = (status: OrderStatus) =>
      orderStatusCounts.find((item) => item.status === status)?._count._all ??
      0;
    const activeOrders = ACTIVE_ORDER_STATUSES.reduce(
      (sum, status) => sum + statusValue(status),
      0,
    );
    const orderStatusBreakdown = [
      {
        name: 'Awaiting',
        value:
          statusValue(OrderStatus.PENDING) + statusValue(OrderStatus.AWAITING),
      },
      { name: 'In-progress', value: statusValue(OrderStatus.IN_PROGRESS) },
      { name: 'Declined', value: statusValue(OrderStatus.DECLINED) },
      { name: 'Refunded', value: statusValue(OrderStatus.REFUNDED) },
      { name: 'Completed', value: statusValue(OrderStatus.COMPLETED) },
    ];
    const totalOrders = orderStatusBreakdown.reduce(
      (sum, item) => sum + item.value,
      0,
    );
    const netSpend = (gross: unknown, refunded: unknown) =>
      money(Math.max(0, Number(gross ?? 0) - Number(refunded ?? 0)));
    const totalSpent = netSpend(
      totalGross._sum.grossAmount,
      totalRefunds._sum.amount,
    );
    const currentSpending = netSpend(
      currentGross._sum.grossAmount,
      currentRefunds._sum.amount,
    );
    const previousSpending = netSpend(
      previousGross._sum.grossAmount,
      previousRefunds._sum.amount,
    );
    const spendingChart = MONTH_NAMES.map((name) => ({
      name,
      current: 0,
      previous: 0,
    }));
    chartSettlements.forEach((settlement) => {
      const paidAt = settlement.order.paidAt;
      if (!paidAt) return;
      const refunded = settlement.order.refunds.reduce(
        (sum, refund) => sum + Number(refund.amount),
        0,
      );
      const amount = netSpend(settlement.grossAmount, refunded);
      const bucket = spendingChart[paidAt.getUTCMonth()];
      if (paidAt.getUTCFullYear() === selectedYear) {
        bucket.current += amount;
      } else if (paidAt.getUTCFullYear() === selectedYear - 1) {
        bucket.previous += amount;
      }
    });
    spendingChart.forEach((item) => {
      item.current = money(item.current);
      item.previous = money(item.previous);
    });
    const bestMonth = spendingChart.reduce<
      (typeof spendingChart)[number] | null
    >(
      (best, item) =>
        item.current > 0 && (!best || item.current > best.current)
          ? item
          : best,
      null,
    );

    return {
      currency: 'GHS',
      generatedAt: now.toISOString(),
      stats: {
        activeOrders,
        completedOrders,
        totalOrders,
        totalSpent,
      },
      trends: {
        spending: trend(currentSpending, previousSpending),
        newPaidOrders: trend(currentNewPaidOrders, previousNewPaidOrders),
        completedOrders: trend(currentCompletedOrders, previousCompletedOrders),
      },
      selectedYear,
      availableYears: availableYearValues(
        earliestPaidOrder?.paidAt,
        now,
        selectedYear,
      ),
      spendingSummary: {
        total: money(
          spendingChart.reduce((sum, item) => sum + item.current, 0),
        ),
        bestMonth: bestMonth
          ? { name: bestMonth.name, spending: bestMonth.current }
          : null,
      },
      spendingChart,
      orderStatusBreakdown,
      recentOrders: recentOrders.map((o) => ({
        id: o.id,
        orderNumber: `#${o.orderNumber}`,
        providerName: o.provider
          ? o.provider.displayName ||
            `${o.provider.firstName} ${o.provider.lastName}`.trim()
          : 'Unknown',
        providerAvatar: o.provider?.avatar || null,
        plan: o.planTitle ?? '—',
        serviceTitle: o.service?.title ?? '—',
        status: o.status,
        createdAt: o.createdAt,
        currency: o.currency,
        netTotal: netSpend(
          o.total,
          o.refunds.reduce((sum, refund) => sum + Number(refund.amount), 0),
        ),
      })),
    };
  }

  async getAdminDashboard(year?: number, categoryMonth?: string) {
    const now = new Date();
    const selectedYear = year ?? now.getUTCFullYear();
    const selectedCategoryMonth =
      categoryMonth ??
      `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}`;
    const selectedYearStart = new Date(Date.UTC(selectedYear, 0, 1));
    const selectedYearEnd = new Date(Date.UTC(selectedYear + 1, 0, 1));
    const currentMonthStart = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1),
    );
    const nextMonthStart = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1),
    );
    const previousMonthStart = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1),
    );
    const categoryRange = monthRange(selectedCategoryMonth);

    const [
      totalUsers,
      activeProviders,
      activeOrders,
      orderStatusCounts,
      totalRevenue,
      currentUsers,
      previousUsers,
      currentProviders,
      previousProviders,
      currentActiveOrders,
      previousActiveOrders,
      currentRevenue,
      previousRevenue,
      yearlySettlements,
      yearlyPayouts,
      topCategoryCounts,
      earliestRevenueOrder,
      earliestService,
    ] = await Promise.all([
      this.prisma.user.count({
        where: { status: { not: UserStatus.DELETED } },
      }),
      this.prisma.user.count({
        where: {
          role: Role.SERVICE_PROVIDER,
          status: UserStatus.ACTIVE,
        },
      }),
      this.prisma.order.count({
        where: ACTIVE_ORDER_WHERE,
      }),
      this.prisma.order.groupBy({
        by: ['status'],
        _count: { _all: true },
      }),
      this.prisma.orderSettlement.aggregate({
        _sum: { retainedAmount: true },
      }),
      this.prisma.user.count({
        where: {
          status: { not: UserStatus.DELETED },
          createdAt: { gte: currentMonthStart, lt: nextMonthStart },
        },
      }),
      this.prisma.user.count({
        where: {
          status: { not: UserStatus.DELETED },
          createdAt: { gte: previousMonthStart, lt: currentMonthStart },
        },
      }),
      this.prisma.user.count({
        where: {
          role: Role.SERVICE_PROVIDER,
          status: UserStatus.ACTIVE,
          createdAt: { gte: currentMonthStart, lt: nextMonthStart },
        },
      }),
      this.prisma.user.count({
        where: {
          role: Role.SERVICE_PROVIDER,
          status: UserStatus.ACTIVE,
          createdAt: { gte: previousMonthStart, lt: currentMonthStart },
        },
      }),
      this.prisma.order.count({
        where: {
          ...ACTIVE_ORDER_WHERE,
          createdAt: { gte: currentMonthStart, lt: nextMonthStart },
        },
      }),
      this.prisma.order.count({
        where: {
          ...ACTIVE_ORDER_WHERE,
          createdAt: { gte: previousMonthStart, lt: currentMonthStart },
        },
      }),
      this.prisma.orderSettlement.aggregate({
        where: {
          order: { paidAt: { gte: currentMonthStart, lt: nextMonthStart } },
        },
        _sum: { retainedAmount: true },
      }),
      this.prisma.orderSettlement.aggregate({
        where: {
          order: {
            paidAt: { gte: previousMonthStart, lt: currentMonthStart },
          },
        },
        _sum: { retainedAmount: true },
      }),
      this.prisma.orderSettlement.findMany({
        where: {
          order: { paidAt: { gte: selectedYearStart, lt: selectedYearEnd } },
        },
        select: {
          retainedAmount: true,
          commissionAmount: true,
          order: { select: { paidAt: true } },
        },
      }),
      this.prisma.providerPayout.findMany({
        where: {
          status: ProviderPayoutStatus.SUCCESS,
          processedAt: { gte: selectedYearStart, lt: selectedYearEnd },
        },
        select: { processedAt: true, amount: true },
      }),
      this.prisma.service.groupBy({
        by: ['categoryId'],
        where: {
          createdAt: { gte: categoryRange.start, lt: categoryRange.end },
        },
        _count: { _all: true },
        orderBy: { _count: { categoryId: 'desc' } },
        take: 5,
      }),
      this.prisma.order.findFirst({
        where: { paidAt: { not: null }, settlement: { isNot: null } },
        orderBy: { paidAt: 'asc' },
        select: { paidAt: true },
      }),
      this.prisma.service.aggregate({
        _min: { createdAt: true },
      }),
    ]);

    const categoryIds = topCategoryCounts.map(
      (category) => category.categoryId,
    );
    const categories = categoryIds.length
      ? await this.prisma.category.findMany({
          where: { id: { in: categoryIds } },
          select: { id: true, name: true, imageUrl: true },
        })
      : [];
    const categoriesById = new Map(
      categories.map((category) => [category.id, category]),
    );

    const statusValue = (status: OrderStatus) =>
      orderStatusCounts.find((item) => item.status === status)?._count._all ??
      0;
    const orderStatusBreakdown = [
      { name: 'Completed', value: statusValue(OrderStatus.COMPLETED) },
      { name: 'Pending', value: statusValue(OrderStatus.PENDING) },
      { name: 'Awaiting', value: statusValue(OrderStatus.AWAITING) },
      { name: 'In progress', value: statusValue(OrderStatus.IN_PROGRESS) },
      { name: 'Declined', value: statusValue(OrderStatus.DECLINED) },
      { name: 'Refunded', value: statusValue(OrderStatus.REFUNDED) },
    ];
    const totalOrders = orderStatusBreakdown.reduce(
      (sum, item) => sum + item.value,
      0,
    );

    const revenueChart = MONTH_NAMES.map((name) => ({
      name,
      revenue: 0,
      commission: 0,
      payout: 0,
    }));
    yearlySettlements.forEach((settlement) => {
      if (!settlement.order.paidAt) return;
      const bucket = revenueChart[settlement.order.paidAt.getUTCMonth()];
      bucket.revenue += Number(settlement.retainedAmount);
      bucket.commission += Number(settlement.commissionAmount);
    });
    yearlyPayouts.forEach((payout) => {
      if (!payout.processedAt) return;
      revenueChart[payout.processedAt.getUTCMonth()].payout += Number(
        payout.amount,
      );
    });
    revenueChart.forEach((item) => {
      item.revenue = money(item.revenue);
      item.commission = money(item.commission);
      item.payout = money(item.payout);
    });

    const bestMonth = revenueChart.reduce<(typeof revenueChart)[number] | null>(
      (best, item) =>
        item.revenue > 0 && (!best || item.revenue > best.revenue)
          ? item
          : best,
      null,
    );
    const currentYear = now.getUTCFullYear();
    const earliestYear =
      earliestRevenueOrder?.paidAt?.getUTCFullYear() ?? currentYear;
    const availableYears = Array.from(
      new Set([
        selectedYear,
        ...Array.from(
          { length: currentYear - Math.min(earliestYear, currentYear) + 1 },
          (_, index) => currentYear - index,
        ),
      ]),
    ).sort((a, b) => b - a);

    const currentRevenueValue = money(currentRevenue._sum.retainedAmount);
    const previousRevenueValue = money(previousRevenue._sum.retainedAmount);

    return {
      currency: 'GHS',
      generatedAt: now.toISOString(),
      stats: {
        totalUsers,
        activeProviders,
        activeOrders,
        revenue: money(totalRevenue._sum.retainedAmount),
      },
      trends: {
        totalUsers: trend(currentUsers, previousUsers),
        activeProviders: trend(currentProviders, previousProviders),
        activeOrders: trend(currentActiveOrders, previousActiveOrders),
        revenue: trend(currentRevenueValue, previousRevenueValue),
      },
      orderStatusBreakdown,
      totalOrders,
      topCategories: topCategoryCounts.flatMap((count) => {
        const category = categoriesById.get(count.categoryId);
        return category
          ? [
              {
                id: category.id,
                name: category.name,
                imageUrl: category.imageUrl,
                count: count._count._all,
              },
            ]
          : [];
      }),
      categoryMonth: selectedCategoryMonth,
      availableCategoryMonths: availableMonthKeys(
        earliestService._min.createdAt,
        now,
        selectedCategoryMonth,
      ),
      selectedYear,
      availableYears,
      revenueSummary: {
        total: money(revenueChart.reduce((sum, item) => sum + item.revenue, 0)),
        bestMonth: bestMonth
          ? { name: bestMonth.name, revenue: bestMonth.revenue }
          : null,
      },
      revenueChart,
    };
  }
}
