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
