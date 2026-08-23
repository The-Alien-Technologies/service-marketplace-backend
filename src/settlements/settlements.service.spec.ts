import {
  DisputeStatus,
  OrderPaymentStatus,
  OrderStatus,
  Prisma,
  SettlementStatus,
} from '../../generated/prisma';
import { SettlementsService } from './settlements.service';

describe('SettlementsService', () => {
  it('recalculates the 90/10 split over the retained amount', () => {
    const service = new SettlementsService({} as never);

    const result = service.calculate(
      new Prisma.Decimal('100.00'),
      new Prisma.Decimal('25.00'),
      new Prisma.Decimal('10.00'),
    );

    expect(result.retainedAmount.toFixed(2)).toBe('75.00');
    expect(result.commissionAmount.toFixed(2)).toBe('7.50');
    expect(result.providerAmount.toFixed(2)).toBe('67.50');
  });

  it('makes held earnings eligible only when the customer accepts completed work', async () => {
    const settlement = {
      id: 'settlement-1',
      status: SettlementStatus.HELD,
    };
    const tx = {
      order: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'order-1',
          clientId: 'client-1',
          status: OrderStatus.COMPLETED,
          paymentStatus: OrderPaymentStatus.PAID,
          settlement,
          dispute: null,
          externalDisputes: [],
        }),
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
      orderSettlement: {
        update: jest.fn().mockImplementation(async ({ data }) => ({
          ...settlement,
          ...data,
        })),
      },
    };
    const prisma = {
      $transaction: jest.fn((callback: (client: unknown) => unknown) =>
        callback(tx),
      ),
    };
    const service = new SettlementsService(prisma as never);

    const result = await service.acceptByCustomer('order-1', 'client-1');

    expect(result.status).toBe(SettlementStatus.ELIGIBLE);
    expect(tx.orderSettlement.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: SettlementStatus.ELIGIBLE }),
      }),
    );
  });

  it('keeps earnings held while a marketplace dispute is open', async () => {
    const tx = {
      order: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'order-1',
          clientId: 'client-1',
          status: OrderStatus.COMPLETED,
          paymentStatus: OrderPaymentStatus.PAID,
          settlement: { id: 'settlement-1', status: SettlementStatus.HELD },
          dispute: { status: DisputeStatus.OPEN },
          externalDisputes: [],
        }),
      },
    };
    const prisma = {
      $transaction: jest.fn((callback: (client: unknown) => unknown) =>
        callback(tx),
      ),
    };
    const service = new SettlementsService(prisma as never);

    await expect(
      service.acceptByCustomer('order-1', 'client-1'),
    ).rejects.toThrow('Resolve the open dispute');
  });

  it('keeps the retained balance held after a normal partial refund', async () => {
    const settlement = {
      id: 'settlement-1',
      providerId: 'provider-1',
      status: SettlementStatus.HELD,
      refundedAmount: new Prisma.Decimal(0),
      acceptedAt: null,
      acceptedBy: null,
    };
    const db = {
      order: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'order-1',
          total: new Prisma.Decimal('100.00'),
          commissionRate: new Prisma.Decimal('10.00'),
          settlement,
          dispute: null,
        }),
        update: jest.fn().mockResolvedValue({}),
      },
      paymentRefund: {
        aggregate: jest.fn().mockResolvedValue({
          _sum: { amount: new Prisma.Decimal('25.00') },
        }),
      },
      orderSettlement: {
        update: jest.fn().mockImplementation(async ({ data }) => ({
          ...settlement,
          ...data,
        })),
      },
      providerBalanceAdjustment: { create: jest.fn() },
    };
    const service = new SettlementsService({} as never);

    const result = await service.recalculateAfterRefund(
      db as never,
      'order-1',
      {
        refundId: 'refund-1',
        refundAmount: new Prisma.Decimal('25.00'),
      },
    );

    expect(result.status).toBe(SettlementStatus.HELD);
    expect(result.acceptedAt).toBeNull();
    expect(db.providerBalanceAdjustment.create).not.toHaveBeenCalled();
  });

  it('records provider recovery instead of rewriting a paid settlement', async () => {
    const settlement = {
      id: 'settlement-1',
      providerId: 'provider-1',
      status: SettlementStatus.PAID,
      refundedAmount: new Prisma.Decimal(0),
      acceptedAt: new Date(),
      acceptedBy: 'CUSTOMER',
    };
    const db = {
      order: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'order-1',
          total: new Prisma.Decimal('100.00'),
          commissionRate: new Prisma.Decimal('10.00'),
          settlement,
          dispute: null,
        }),
        update: jest.fn().mockResolvedValue({}),
      },
      paymentRefund: {
        aggregate: jest.fn().mockResolvedValue({
          _sum: { amount: new Prisma.Decimal('25.00') },
        }),
      },
      orderSettlement: { update: jest.fn() },
      providerBalanceAdjustment: {
        create: jest.fn().mockResolvedValue({}),
      },
    };
    const service = new SettlementsService({} as never);

    const result = await service.recalculateAfterRefund(
      db as never,
      'order-1',
      {
        refundId: 'refund-1',
        refundAmount: new Prisma.Decimal('25.00'),
      },
    );

    expect(result).toBe(settlement);
    expect(db.orderSettlement.update).not.toHaveBeenCalled();
    expect(db.providerBalanceAdjustment.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          amount: new Prisma.Decimal('22.50'),
        }),
      }),
    );
  });
});
