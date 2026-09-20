import { BadRequestException } from '@nestjs/common';
import { Prisma, QuoteStatus } from '../../generated/prisma';
import { OrdersService } from './orders.service';

describe('OrdersService quote market invariants', () => {
  it('revalidates the linked service and provider before creating an order', async () => {
    const prisma = {
      quoteRequest: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'quote-1',
          clientId: 'client-1',
          providerId: 'provider-1',
          serviceId: 'service-1',
          marketId: 'market-gh',
          currency: 'GHS',
          status: QuoteStatus.PENDING,
          budget: new Prisma.Decimal(100),
          order: null,
        }),
      },
      service: { findFirst: jest.fn().mockResolvedValue(null) },
      order: { create: jest.fn() },
    };
    const service = new OrdersService(prisma as never, {} as never);

    await expect(
      service.createFromAcceptedQuote('quote-1', 'client-1'),
    ).rejects.toThrow(BadRequestException);
    expect(prisma.service.findFirst).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          id: 'service-1',
          marketId: 'market-gh',
          currency: 'GHS',
        }),
      }),
    );
    expect(prisma.order.create).not.toHaveBeenCalled();
  });
});
