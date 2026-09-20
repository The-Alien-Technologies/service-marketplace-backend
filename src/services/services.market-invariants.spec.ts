import { BadRequestException } from '@nestjs/common';
import {
  MarketStatus,
  ProviderMarketMembershipStatus,
  ServiceStatus,
} from '../../generated/prisma';
import { ServicesService } from './services.service';

describe('ServicesService market invariants', () => {
  const baseService = {
    id: 'service-1',
    providerId: 'provider-1',
    marketId: 'market-gh',
    coverImage: null,
    plans: [{ id: 'plan-1' }],
  };

  it('does not let an update move a service between markets', async () => {
    const prisma = {
      service: {
        findUnique: jest.fn().mockResolvedValue(baseService),
        update: jest.fn(),
      },
    };
    const service = new ServicesService(prisma as never, {} as never);

    await expect(
      service.update('service-1', 'provider-1', {
        marketId: 'market-za',
      }),
    ).rejects.toThrow(BadRequestException);
    expect(prisma.service.update).not.toHaveBeenCalled();
  });

  it('rejects a category that is disabled in the service market', async () => {
    const prisma = {
      service: {
        findUnique: jest.fn().mockResolvedValue(baseService),
        update: jest.fn(),
      },
      marketCategory: {
        findUnique: jest.fn().mockResolvedValue({ isActive: false }),
      },
    };
    const service = new ServicesService(prisma as never, {} as never);

    await expect(
      service.update('service-1', 'provider-1', {
        categoryId: 'disabled-category',
      }),
    ).rejects.toThrow('This category is unavailable in the market');
    expect(prisma.service.update).not.toHaveBeenCalled();
  });

  it('applies market membership checks when publishing through update', async () => {
    const prisma = {
      service: {
        findUnique: jest
          .fn()
          .mockResolvedValueOnce(baseService)
          .mockResolvedValueOnce({
            ...baseService,
            market: {
              status: MarketStatus.ACTIVE,
              servicePublishingEnabled: true,
            },
            provider: {
              providerMarketMemberships: [
                {
                  marketId: 'market-gh',
                  status: ProviderMarketMembershipStatus.SUSPENDED,
                },
              ],
            },
          }),
        update: jest.fn(),
      },
    };
    const service = new ServicesService(prisma as never, {} as never);

    await expect(
      service.update('service-1', 'provider-1', {
        status: ServiceStatus.PUBLISHED,
      }),
    ).rejects.toThrow('cannot be published');
    expect(prisma.service.update).not.toHaveBeenCalled();
  });
});
