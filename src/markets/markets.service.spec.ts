import { BadRequestException, ForbiddenException } from '@nestjs/common';
import {
  MarketStatus,
  ProviderMarketMembershipStatus,
  Role,
  ServiceStatus,
} from '../../generated/prisma';
import { MarketAccessService } from './market-access.service';
import { MarketsService } from './markets.service';

describe('MarketsService membership lifecycle', () => {
  it('lists only the country administrator market with pagination and search', async () => {
    const prisma = {
      providerMarketMembership: {
        findMany: jest.fn().mockResolvedValue([{ id: 'membership-1' }]),
        count: jest.fn().mockResolvedValue(11),
      },
    };
    const service = new MarketsService(
      prisma as never,
      new MarketAccessService(),
    );

    const result = await service.listMembershipApplications(
      { id: 'admin-1', role: Role.ADMIN, adminMarketId: 'market-gh' },
      { search: 'Ama', page: 2, limit: 10 },
    );

    expect(prisma.providerMarketMembership.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          marketId: 'market-gh',
          status: ProviderMarketMembershipStatus.PENDING,
          provider: expect.any(Object),
        }),
        skip: 10,
        take: 10,
      }),
    );
    expect(prisma.providerMarketMembership.count).toHaveBeenCalledWith({
      where: expect.objectContaining({ marketId: 'market-gh' }),
    });
    expect(result).toEqual(
      expect.objectContaining({
        applications: [{ id: 'membership-1' }],
        total: 11,
        page: 2,
        limit: 10,
        totalPages: 2,
      }),
    );
  });

  it('rejects a country administrator reviewing another market', async () => {
    const prisma = {
      providerMarketMembership: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'membership-za',
          providerId: 'provider-1',
          marketId: 'market-za',
        }),
      },
      $transaction: jest.fn(),
    };
    const service = new MarketsService(
      prisma as never,
      new MarketAccessService(),
    );

    await expect(
      service.reviewMembership(
        'membership-za',
        { id: 'admin-gh', role: Role.ADMIN, adminMarketId: 'market-gh' },
        ProviderMarketMembershipStatus.ACTIVE,
      ),
    ).rejects.toThrow(ForbiddenException);
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it('does not let an active provider reset their membership to pending', async () => {
    const prisma = {
      user: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'provider-1',
          role: Role.SERVICE_PROVIDER,
        }),
      },
      market: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'market-gh',
          status: MarketStatus.ACTIVE,
          providerOnboardingEnabled: true,
        }),
      },
      providerMarketMembership: {
        findUnique: jest.fn().mockResolvedValue({
          status: ProviderMarketMembershipStatus.ACTIVE,
        }),
        upsert: jest.fn(),
      },
    };
    const service = new MarketsService(
      prisma as never,
      new MarketAccessService(),
    );

    await expect(service.apply('provider-1', 'market-gh')).rejects.toThrow(
      BadRequestException,
    );
    expect(prisma.providerMarketMembership.upsert).not.toHaveBeenCalled();
  });

  it('suspends published services when market access is removed', async () => {
    const membership = {
      id: 'membership-1',
      providerId: 'provider-1',
      marketId: 'market-gh',
      provider: { isServiceProviderVerified: true },
    };
    const tx = {
      providerMarketMembership: {
        update: jest.fn().mockResolvedValue({ ...membership }),
      },
      service: { updateMany: jest.fn().mockResolvedValue({ count: 2 }) },
      adminAuditLog: { create: jest.fn().mockResolvedValue({}) },
    };
    const prisma = {
      providerMarketMembership: {
        findUnique: jest.fn().mockResolvedValue(membership),
      },
      $transaction: jest.fn((callback: (client: unknown) => unknown) =>
        callback(tx),
      ),
    };
    const service = new MarketsService(
      prisma as never,
      new MarketAccessService(),
    );

    await service.reviewMembership(
      'membership-1',
      { id: 'super-1', role: Role.SUPER_ADMIN },
      ProviderMarketMembershipStatus.SUSPENDED,
    );

    expect(tx.service.updateMany).toHaveBeenCalledWith({
      where: {
        providerId: 'provider-1',
        marketId: 'market-gh',
        status: ServiceStatus.PUBLISHED,
      },
      data: { status: ServiceStatus.SUSPENDED },
    });
  });

  it('does not activate market access for an unverified provider', async () => {
    const prisma = {
      providerMarketMembership: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'membership-1',
          providerId: 'provider-1',
          marketId: 'market-gh',
          provider: { isServiceProviderVerified: false },
        }),
      },
      $transaction: jest.fn(),
    };
    const service = new MarketsService(
      prisma as never,
      new MarketAccessService(),
    );

    await expect(
      service.reviewMembership(
        'membership-1',
        { id: 'admin-1', role: Role.ADMIN, adminMarketId: 'market-gh' },
        ProviderMarketMembershipStatus.ACTIVE,
      ),
    ).rejects.toThrow(BadRequestException);
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it('does not convert a service provider account into a country admin', async () => {
    const prisma = {
      user: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'provider-1',
          role: Role.SERVICE_PROVIDER,
        }),
      },
      market: {
        findUnique: jest.fn().mockResolvedValue({ id: 'market-gh' }),
      },
      $transaction: jest.fn(),
    };
    const service = new MarketsService(
      prisma as never,
      new MarketAccessService(),
    );

    await expect(
      service.assignCountryAdmin('provider-1', 'market-gh', 'super-1'),
    ).rejects.toThrow(BadRequestException);
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it('removes country access without deleting the account', async () => {
    const tx = {
      user: { update: jest.fn().mockResolvedValue({ id: 'admin-1' }) },
      adminAuditLog: { create: jest.fn().mockResolvedValue({}) },
    };
    const prisma = {
      user: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'admin-1',
          role: Role.ADMIN,
          adminMarketId: 'market-gh',
        }),
      },
      $transaction: jest.fn((callback: (client: unknown) => unknown) =>
        callback(tx),
      ),
    };
    const service = new MarketsService(
      prisma as never,
      new MarketAccessService(),
    );

    await service.removeCountryAdmin('admin-1', 'super-1');

    expect(tx.user.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'admin-1' },
        data: { role: Role.USER, adminMarketId: null },
      }),
    );
  });
});
