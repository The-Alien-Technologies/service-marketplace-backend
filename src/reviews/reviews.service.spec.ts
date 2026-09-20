import { ReviewsService } from './reviews.service';

describe('ReviewsService provider dashboard scope', () => {
  it('filters reviews and completion history to the selected market', async () => {
    const prisma = {
      review: {
        findMany: jest.fn().mockResolvedValue([]),
        count: jest.fn().mockResolvedValue(0),
        groupBy: jest.fn().mockResolvedValue([]),
        aggregate: jest.fn().mockResolvedValue({
          _avg: { rating: null },
          _count: { id: 0 },
        }),
      },
      order: { count: jest.fn().mockResolvedValue(3) },
    };
    const service = new ReviewsService(prisma as never);

    const result = await service.findByProvider('provider-1', {
      marketId: 'market-gh',
      page: 1,
      limit: 10,
    });

    const reviewWhere = {
      providerId: 'provider-1',
      order: { marketId: 'market-gh' },
    };
    expect(prisma.review.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: reviewWhere }),
    );
    expect(prisma.review.count).toHaveBeenCalledWith({ where: reviewWhere });
    expect(prisma.review.groupBy).toHaveBeenCalledWith(
      expect.objectContaining({ where: reviewWhere }),
    );
    expect(prisma.review.aggregate).toHaveBeenCalledWith(
      expect.objectContaining({ where: reviewWhere }),
    );
    expect(prisma.order.count).toHaveBeenCalledWith({
      where: {
        providerId: 'provider-1',
        marketId: 'market-gh',
        completedAt: { not: null },
      },
    });
    expect(result.summary.completedOrders).toBe(3);
  });
});
