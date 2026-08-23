import { Prisma } from '../../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';
import { AnalyticsService } from './analytics.service';

describe('AnalyticsService dashboards', () => {
  const prisma = {
    user: { count: jest.fn() },
    order: {
      count: jest.fn(),
      groupBy: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
    },
    orderSettlement: { aggregate: jest.fn(), findMany: jest.fn() },
    paymentRefund: { aggregate: jest.fn() },
    review: { aggregate: jest.fn() },
    providerPayout: { findMany: jest.fn() },
    service: { groupBy: jest.fn(), aggregate: jest.fn() },
    category: { findMany: jest.fn() },
  };

  let service: AnalyticsService;

  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2026-08-09T12:00:00Z'));
    jest.clearAllMocks();
    service = new AnalyticsService(prisma as unknown as PrismaService);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('builds provider earnings, paid-order summaries, and filters from persisted data', async () => {
    prisma.order.groupBy
      .mockResolvedValueOnce([
        { status: 'PENDING', _count: { _all: 1 } },
        { status: 'AWAITING', _count: { _all: 2 } },
        { status: 'IN_PROGRESS', _count: { _all: 1 } },
        { status: 'COMPLETED', _count: { _all: 4 } },
        { status: 'REFUNDED', _count: { _all: 1 } },
      ])
      .mockResolvedValueOnce([
        { status: 'PENDING', _count: { _all: 1 } },
        { status: 'COMPLETED', _count: { _all: 2 } },
        { status: 'REFUNDED', _count: { _all: 1 } },
      ]);
    prisma.review.aggregate.mockResolvedValue({
      _avg: { rating: 4.26 },
      _count: { id: 7 },
    });
    prisma.order.findMany.mockResolvedValue([
      {
        id: 'order-1',
        orderNumber: 'ORD-1001',
        planTitle: 'Basic plan',
        status: 'PENDING',
        createdAt: new Date('2026-08-08T00:00:00Z'),
        client: {
          firstName: 'Ama',
          lastName: 'Mensah',
          displayName: null,
          avatar: null,
        },
        service: { title: 'Home tutoring' },
      },
    ]);
    prisma.orderSettlement.aggregate
      .mockResolvedValueOnce({
        _sum: { providerAmount: new Prisma.Decimal('2350') },
      })
      .mockResolvedValueOnce({
        _sum: { providerAmount: new Prisma.Decimal('500') },
      })
      .mockResolvedValueOnce({
        _sum: { providerAmount: new Prisma.Decimal('400') },
      });
    prisma.orderSettlement.findMany.mockResolvedValue([
      {
        providerAmount: new Prisma.Decimal('120'),
        order: { paidAt: new Date('2025-01-12T00:00:00Z') },
      },
      {
        providerAmount: new Prisma.Decimal('300'),
        order: { paidAt: new Date('2026-01-10T00:00:00Z') },
      },
      {
        providerAmount: new Prisma.Decimal('200'),
        order: { paidAt: new Date('2026-08-05T00:00:00Z') },
      },
    ]);
    prisma.order.findFirst
      .mockResolvedValueOnce({
        paidAt: new Date('2025-01-12T00:00:00Z'),
      })
      .mockResolvedValueOnce({
        createdAt: new Date('2026-06-03T00:00:00Z'),
      });
    prisma.order.count
      .mockResolvedValueOnce(4)
      .mockResolvedValueOnce(2)
      .mockResolvedValueOnce(1)
      .mockResolvedValueOnce(2)
      .mockResolvedValueOnce(4)
      .mockResolvedValueOnce(2);

    const result = await service.getProviderDashboard(
      'provider-1',
      2026,
      '2026-08',
    );

    expect(result.stats).toEqual({
      earnings: 2350,
      activeOrders: 4,
      completedOrders: 4,
      totalOrders: 9,
      averageRating: 4.3,
      reviewCount: 7,
    });
    expect(result.trends).toEqual({
      earnings: { current: 500, previous: 400, changePercent: 25 },
      newPaidOrders: { current: 2, previous: 1, changePercent: 100 },
      completedOrders: { current: 2, previous: 4, changePercent: -50 },
    });
    expect(result.orderSummary).toEqual({
      total: 4,
      trend: { current: 4, previous: 2, changePercent: 100 },
      breakdown: [
        { name: 'Awaiting', value: 1 },
        { name: 'In-progress', value: 0 },
        { name: 'Declined', value: 0 },
        { name: 'Refunded', value: 1 },
        { name: 'Completed', value: 2 },
      ],
    });
    expect(result.earningsChart[0]).toEqual({
      name: 'Jan',
      current: 300,
      previous: 120,
    });
    expect(result.earningsChart[7]).toEqual({
      name: 'Aug',
      current: 200,
      previous: 0,
    });
    expect(result.earningsSummary).toEqual({
      total: 500,
      bestMonth: { name: 'Jan', earnings: 300 },
    });
    expect(result.availableYears).toEqual([2026, 2025]);
    expect(result.availableOrderMonths).toEqual([
      '2026-08',
      '2026-07',
      '2026-06',
    ]);
    expect(result.recentOrders[0]).toEqual(
      expect.objectContaining({
        orderNumber: '#ORD-1001',
        clientName: 'Ama Mensah',
        status: 'PENDING',
      }),
    );
    expect(prisma.order.groupBy).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        where: {
          providerId: 'provider-1',
          OR: [
            { paymentStatus: { in: ['PAID', 'PARTIALLY_REFUNDED'] } },
            { status: 'REFUNDED', paymentStatus: 'REFUNDED' },
          ],
        },
      }),
    );
    expect(prisma.orderSettlement.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          providerId: 'provider-1',
          order: {
            paidAt: {
              gte: new Date('2025-01-01T00:00:00Z'),
              lt: new Date('2027-01-01T00:00:00Z'),
            },
          },
        },
      }),
    );
    expect(prisma.order.count).toHaveBeenNthCalledWith(2, {
      where: {
        providerId: 'provider-1',
        paidAt: {
          gte: new Date('2026-08-01T00:00:00Z'),
          lt: new Date('2026-09-01T00:00:00Z'),
        },
        settlement: { isNot: null },
      },
    });
    expect(prisma.order.count).toHaveBeenNthCalledWith(4, {
      where: {
        providerId: 'provider-1',
        completedAt: {
          gte: new Date('2026-08-01T00:00:00Z'),
          lt: new Date('2026-09-01T00:00:00Z'),
        },
      },
    });
  });

  it('builds user spending and lifecycle analytics from paid orders and processed refunds', async () => {
    prisma.order.groupBy.mockResolvedValue([
      { status: 'PENDING', _count: { _all: 1 } },
      { status: 'AWAITING', _count: { _all: 1 } },
      { status: 'IN_PROGRESS', _count: { _all: 1 } },
      { status: 'COMPLETED', _count: { _all: 5 } },
      { status: 'REFUNDED', _count: { _all: 1 } },
    ]);
    prisma.order.findMany.mockResolvedValue([
      {
        id: 'order-1',
        orderNumber: 'ORD-1001',
        planTitle: 'Basic plan',
        status: 'COMPLETED',
        createdAt: new Date('2026-08-08T00:00:00Z'),
        total: new Prisma.Decimal('100'),
        currency: 'GHS',
        refunds: [{ amount: new Prisma.Decimal('10') }],
        provider: {
          firstName: 'Efua',
          lastName: 'Owusu',
          displayName: null,
          avatar: null,
        },
        service: { title: 'Dress design' },
      },
    ]);
    prisma.order.count
      .mockResolvedValueOnce(5)
      .mockResolvedValueOnce(2)
      .mockResolvedValueOnce(1)
      .mockResolvedValueOnce(1)
      .mockResolvedValueOnce(2);
    prisma.orderSettlement.aggregate
      .mockResolvedValueOnce({
        _sum: { grossAmount: new Prisma.Decimal('300') },
      })
      .mockResolvedValueOnce({
        _sum: { grossAmount: new Prisma.Decimal('100') },
      })
      .mockResolvedValueOnce({
        _sum: { grossAmount: new Prisma.Decimal('80') },
      });
    prisma.paymentRefund.aggregate
      .mockResolvedValueOnce({
        _sum: { amount: new Prisma.Decimal('50') },
      })
      .mockResolvedValueOnce({
        _sum: { amount: new Prisma.Decimal('10') },
      })
      .mockResolvedValueOnce({
        _sum: { amount: new Prisma.Decimal('0') },
      });
    prisma.orderSettlement.findMany.mockResolvedValue([
      {
        grossAmount: new Prisma.Decimal('120'),
        order: {
          paidAt: new Date('2025-01-12T00:00:00Z'),
          refunds: [{ amount: new Prisma.Decimal('20') }],
        },
      },
      {
        grossAmount: new Prisma.Decimal('200'),
        order: {
          paidAt: new Date('2026-01-10T00:00:00Z'),
          refunds: [{ amount: new Prisma.Decimal('50') }],
        },
      },
      {
        grossAmount: new Prisma.Decimal('100'),
        order: {
          paidAt: new Date('2026-08-05T00:00:00Z'),
          refunds: [{ amount: new Prisma.Decimal('10') }],
        },
      },
    ]);
    prisma.order.findFirst.mockResolvedValue({
      paidAt: new Date('2025-01-12T00:00:00Z'),
    });

    const result = await service.getUserDashboard('client-1', 2026);

    expect(result.stats).toEqual({
      activeOrders: 3,
      completedOrders: 5,
      totalOrders: 9,
      totalSpent: 250,
    });
    expect(result.trends).toEqual({
      spending: { current: 90, previous: 80, changePercent: 12.5 },
      newPaidOrders: { current: 2, previous: 1, changePercent: 100 },
      completedOrders: { current: 1, previous: 2, changePercent: -50 },
    });
    expect(result.orderStatusBreakdown).toEqual([
      { name: 'Awaiting', value: 2 },
      { name: 'In-progress', value: 1 },
      { name: 'Declined', value: 0 },
      { name: 'Refunded', value: 1 },
      { name: 'Completed', value: 5 },
    ]);
    expect(result.spendingChart[0]).toEqual({
      name: 'Jan',
      current: 150,
      previous: 100,
    });
    expect(result.spendingChart[7]).toEqual({
      name: 'Aug',
      current: 90,
      previous: 0,
    });
    expect(result.spendingSummary).toEqual({
      total: 240,
      bestMonth: { name: 'Jan', spending: 150 },
    });
    expect(result.availableYears).toEqual([2026, 2025]);
    expect(result.recentOrders[0]).toEqual(
      expect.objectContaining({
        providerName: 'Efua Owusu',
        netTotal: 90,
        currency: 'GHS',
      }),
    );
    expect(prisma.order.groupBy).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          clientId: 'client-1',
          OR: [
            { paymentStatus: { in: ['PAID', 'PARTIALLY_REFUNDED'] } },
            { status: 'REFUNDED', paymentStatus: 'REFUNDED' },
          ],
        },
      }),
    );
    expect(prisma.paymentRefund.aggregate).toHaveBeenNthCalledWith(1, {
      where: {
        status: 'PROCESSED',
        affectsOrderBalance: true,
        order: { clientId: 'client-1' },
      },
      _sum: { amount: true },
    });
    expect(prisma.order.count).toHaveBeenNthCalledWith(4, {
      where: {
        clientId: 'client-1',
        completedAt: {
          gte: new Date('2026-08-01T00:00:00Z'),
          lt: new Date('2026-09-01T00:00:00Z'),
        },
      },
    });
  });

  it('builds the filtered dashboard entirely from persisted aggregates', async () => {
    prisma.user.count
      .mockResolvedValueOnce(120)
      .mockResolvedValueOnce(18)
      .mockResolvedValueOnce(12)
      .mockResolvedValueOnce(10)
      .mockResolvedValueOnce(3)
      .mockResolvedValueOnce(1);
    prisma.order.count
      .mockResolvedValueOnce(7)
      .mockResolvedValueOnce(4)
      .mockResolvedValueOnce(2);
    prisma.order.groupBy.mockResolvedValue([
      { status: 'COMPLETED', _count: { _all: 4 } },
      { status: 'PENDING', _count: { _all: 1 } },
      { status: 'AWAITING', _count: { _all: 2 } },
      { status: 'IN_PROGRESS', _count: { _all: 5 } },
      { status: 'DECLINED', _count: { _all: 1 } },
      { status: 'REFUNDED', _count: { _all: 1 } },
    ]);
    prisma.orderSettlement.aggregate
      .mockResolvedValueOnce({
        _sum: { retainedAmount: new Prisma.Decimal('1000.50') },
      })
      .mockResolvedValueOnce({
        _sum: { retainedAmount: new Prisma.Decimal('300') },
      })
      .mockResolvedValueOnce({
        _sum: { retainedAmount: new Prisma.Decimal('200') },
      });
    prisma.orderSettlement.findMany.mockResolvedValue([
      {
        retainedAmount: new Prisma.Decimal('200'),
        commissionAmount: new Prisma.Decimal('20'),
        order: { paidAt: new Date('2026-01-10T00:00:00Z') },
      },
      {
        retainedAmount: new Prisma.Decimal('100.50'),
        commissionAmount: new Prisma.Decimal('10.05'),
        order: { paidAt: new Date('2026-08-05T00:00:00Z') },
      },
    ]);
    prisma.providerPayout.findMany.mockResolvedValue([
      {
        processedAt: new Date('2026-08-06T00:00:00Z'),
        amount: new Prisma.Decimal('75.25'),
      },
    ]);
    prisma.service.groupBy.mockResolvedValue([
      { categoryId: 'category-2', _count: { _all: 5 } },
      { categoryId: 'category-1', _count: { _all: 2 } },
    ]);
    prisma.order.findFirst.mockResolvedValue({
      paidAt: new Date('2025-04-10T00:00:00Z'),
    });
    prisma.service.aggregate.mockResolvedValue({
      _min: { createdAt: new Date('2026-06-03T00:00:00Z') },
    });
    prisma.category.findMany.mockResolvedValue([
      { id: 'category-1', name: 'Electrical', imageUrl: null },
      {
        id: 'category-2',
        name: 'Tutoring',
        imageUrl: 'https://img.test/tutoring.png',
      },
    ]);

    const result = await service.getAdminDashboard(2026, '2026-08');

    expect(result.stats).toEqual({
      totalUsers: 120,
      activeProviders: 18,
      activeOrders: 7,
      revenue: 1000.5,
    });
    expect(result.trends.totalUsers).toEqual({
      current: 12,
      previous: 10,
      changePercent: 20,
    });
    expect(result.trends.revenue.changePercent).toBe(50);
    expect(result.totalOrders).toBe(14);
    expect(result.orderStatusBreakdown).toEqual([
      { name: 'Completed', value: 4 },
      { name: 'Pending', value: 1 },
      { name: 'Awaiting', value: 2 },
      { name: 'In progress', value: 5 },
      { name: 'Declined', value: 1 },
      { name: 'Refunded', value: 1 },
    ]);
    expect(result.revenueChart[0]).toEqual({
      name: 'Jan',
      revenue: 200,
      commission: 20,
      payout: 0,
    });
    expect(result.revenueChart[7]).toEqual({
      name: 'Aug',
      revenue: 100.5,
      commission: 10.05,
      payout: 75.25,
    });
    expect(result.revenueSummary).toEqual({
      total: 300.5,
      bestMonth: { name: 'Jan', revenue: 200 },
    });
    expect(result.availableYears).toEqual([2026, 2025]);
    expect(result.availableCategoryMonths).toEqual([
      '2026-08',
      '2026-07',
      '2026-06',
    ]);
    expect(result.topCategories).toEqual([
      {
        id: 'category-2',
        name: 'Tutoring',
        imageUrl: 'https://img.test/tutoring.png',
        count: 5,
      },
      {
        id: 'category-1',
        name: 'Electrical',
        imageUrl: null,
        count: 2,
      },
    ]);
    expect(prisma.orderSettlement.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          order: {
            paidAt: {
              gte: new Date('2026-01-01T00:00:00Z'),
              lt: new Date('2027-01-01T00:00:00Z'),
            },
          },
        },
      }),
    );
    expect(prisma.order.count).toHaveBeenNthCalledWith(1, {
      where: {
        status: { in: ['PENDING', 'AWAITING', 'IN_PROGRESS'] },
        paymentStatus: { in: ['PAID', 'PARTIALLY_REFUNDED'] },
      },
    });
    expect(prisma.service.groupBy).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          createdAt: {
            gte: new Date('2026-08-01T00:00:00Z'),
            lt: new Date('2026-09-01T00:00:00Z'),
          },
        },
      }),
    );
  });
});
