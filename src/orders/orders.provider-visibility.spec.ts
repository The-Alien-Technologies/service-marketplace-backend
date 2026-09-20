import { OrderPaymentStatus, OrderStatus } from '../../generated/prisma';
import { OrdersService } from './orders.service';

describe('OrdersService provider visibility', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('shows paid lifecycle orders and fully refunded history without exposing unpaid checkouts', async () => {
    const prisma = {
      order: {
        findMany: jest.fn().mockResolvedValue([]),
        count: jest.fn().mockResolvedValue(0),
      },
    };
    const service = new OrdersService(prisma as never, {} as never);

    await service.findProviderOrders('provider-1', {
      status: [OrderStatus.DECLINED, OrderStatus.REFUNDED],
    });

    const expectedWhere = {
      providerId: 'provider-1',
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
      status: { in: [OrderStatus.DECLINED, OrderStatus.REFUNDED] },
    };
    expect(prisma.order.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: expectedWhere }),
    );
    expect(prisma.order.count).toHaveBeenCalledWith({ where: expectedWhere });
  });

  it('reconciles provider dashboard orders to one market and completion history', async () => {
    const prisma = {
      order: {
        findMany: jest.fn().mockResolvedValue([]),
        count: jest.fn().mockResolvedValue(0),
      },
    };
    const service = new OrdersService(prisma as never, {} as never);

    await service.findProviderOrders('provider-1', {
      marketId: 'market-gh',
      completedHistory: true,
    });

    const expectedWhere = {
      providerId: 'provider-1',
      marketId: 'market-gh',
      completedAt: { not: null },
    };
    expect(prisma.order.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: expectedWhere }),
    );
    expect(prisma.order.count).toHaveBeenCalledWith({ where: expectedWhere });
  });

  it('filters the provider dashboard order summary by creation month', async () => {
    const prisma = {
      order: {
        findMany: jest.fn().mockResolvedValue([]),
        count: jest.fn().mockResolvedValue(0),
      },
    };
    const service = new OrdersService(prisma as never, {} as never);

    await service.findProviderOrders('provider-1', {
      marketId: 'market-gh',
      createdMonth: '2026-08',
    });

    expect(prisma.order.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          marketId: 'market-gh',
          createdAt: {
            gte: new Date('2026-08-01T00:00:00.000Z'),
            lt: new Date('2026-09-01T00:00:00.000Z'),
          },
        }),
      }),
    );
  });

  it('scopes client spending history to settled payments in the selected market', async () => {
    const prisma = {
      order: {
        findMany: jest.fn().mockResolvedValue([]),
        count: jest.fn().mockResolvedValue(0),
      },
    };
    const service = new OrdersService(prisma as never, {} as never);

    await service.findClientOrders('client-1', {
      marketId: 'market-gh',
      paidOnly: true,
      spendingOnly: true,
      page: 2,
      limit: 20,
    });

    const expectedWhere = {
      clientId: 'client-1',
      marketId: 'market-gh',
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
      paidAt: { not: null },
      settlement: { isNot: null },
    };
    expect(prisma.order.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: expectedWhere, skip: 20, take: 20 }),
    );
    expect(prisma.order.count).toHaveBeenCalledWith({ where: expectedWhere });
  });

  it('uses the completion timestamp for dashboard completion history', async () => {
    const prisma = {
      order: {
        findMany: jest.fn().mockResolvedValue([]),
        count: jest.fn().mockResolvedValue(0),
      },
    };
    const service = new OrdersService(prisma as never, {} as never);

    await service.findClientOrders('client-1', {
      marketId: 'market-gh',
      completedHistory: true,
    });

    const expectedWhere = {
      clientId: 'client-1',
      marketId: 'market-gh',
      completedAt: { not: null },
    };
    expect(prisma.order.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: expectedWhere }),
    );
    expect(prisma.order.count).toHaveBeenCalledWith({ where: expectedWhere });
  });

  it('keeps admin dashboard drill-downs market-scoped across active statuses', async () => {
    const prisma = {
      order: {
        findMany: jest.fn().mockResolvedValue([]),
        count: jest.fn().mockResolvedValue(0),
      },
    };
    const marketAccess = {
      marketForAdmin: jest.fn().mockReturnValue('market-gh'),
    };
    const service = new OrdersService(
      prisma as never,
      {} as never,
      marketAccess as never,
    );

    await service.findAll({
      actor: { id: 'admin-1', role: 'ADMIN' } as never,
      marketId: 'market-gh',
      status: [
        OrderStatus.PENDING,
        OrderStatus.AWAITING,
        OrderStatus.IN_PROGRESS,
      ],
    });

    const expectedWhere = {
      marketId: 'market-gh',
      status: {
        in: [
          OrderStatus.PENDING,
          OrderStatus.AWAITING,
          OrderStatus.IN_PROGRESS,
        ],
      },
    };
    expect(prisma.order.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: expectedWhere }),
    );
    expect(prisma.order.count).toHaveBeenCalledWith({ where: expectedWhere });
  });

  it('records exact lifecycle timestamps when the provider starts and completes work', async () => {
    jest.useFakeTimers().setSystemTime(new Date('2026-08-09T16:30:00Z'));
    const prisma = {
      order: {
        findUnique: jest
          .fn()
          .mockResolvedValueOnce({
            id: 'order-1',
            providerId: 'provider-1',
            clientId: 'client-1',
            status: OrderStatus.PENDING,
            paymentStatus: OrderPaymentStatus.PAID,
          })
          .mockResolvedValueOnce({
            id: 'order-1',
            status: OrderStatus.IN_PROGRESS,
          })
          .mockResolvedValueOnce({
            id: 'order-1',
            providerId: 'provider-1',
            clientId: 'client-1',
            status: OrderStatus.IN_PROGRESS,
            paymentStatus: OrderPaymentStatus.PAID,
          })
          .mockResolvedValueOnce({
            id: 'order-1',
            status: OrderStatus.COMPLETED,
          }),
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
    };
    const service = new OrdersService(prisma as never, {} as never);

    await service.updateStatus(
      'order-1',
      'provider-1',
      OrderStatus.IN_PROGRESS,
    );
    await service.updateStatus('order-1', 'provider-1', OrderStatus.COMPLETED);

    const transitionAt = new Date('2026-08-09T16:30:00Z');
    expect(prisma.order.updateMany).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        data: { status: OrderStatus.IN_PROGRESS, startedAt: transitionAt },
      }),
    );
    expect(prisma.order.updateMany).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        data: { status: OrderStatus.COMPLETED, completedAt: transitionAt },
      }),
    );
  });

  it('rejects a stale provider transition instead of overwriting a newer status', async () => {
    const prisma = {
      order: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'order-1',
          providerId: 'provider-1',
          clientId: 'client-1',
          status: OrderStatus.PENDING,
          paymentStatus: OrderPaymentStatus.PAID,
        }),
        updateMany: jest.fn().mockResolvedValue({ count: 0 }),
      },
    };
    const service = new OrdersService(prisma as never, {} as never);

    await expect(
      service.updateStatus('order-1', 'provider-1', OrderStatus.IN_PROGRESS),
    ).rejects.toThrow('The order changed before its status could be updated');
  });
});
