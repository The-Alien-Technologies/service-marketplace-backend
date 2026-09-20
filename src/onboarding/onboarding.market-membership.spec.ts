import { Role, UserStatus } from '../../generated/prisma';
import { OnboardingService } from './onboarding.service';

describe('OnboardingService market membership', () => {
  it('keeps only the location market as the provider primary membership', async () => {
    const user = {
      id: 'provider-1',
      role: Role.SERVICE_PROVIDER,
      status: UserStatus.PENDING,
      providerApplicationSubmittedAt: null,
      selectedMarketId: 'market-gh',
    };
    const address = { id: 'address-1', userId: user.id, isPrimary: true };
    const tx = {
      $queryRaw: jest.fn().mockResolvedValue([{ id: user.id }]),
      user: {
        findUnique: jest.fn().mockResolvedValue(user),
        update: jest.fn().mockResolvedValue(user),
      },
      userAddress: {
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
        findFirst: jest.fn().mockResolvedValue(address),
        update: jest.fn().mockResolvedValue(address),
      },
      market: {
        findUnique: jest.fn().mockResolvedValue({ id: 'market-za' }),
      },
      providerMarketMembership: {
        deleteMany: jest.fn().mockResolvedValue({ count: 1 }),
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
        upsert: jest.fn().mockResolvedValue({}),
      },
      verifiedPhone: { findUnique: jest.fn() },
    };
    const prisma = {
      $queryRaw: jest.fn().mockResolvedValue([{ id: user.id }]),
      $transaction: jest.fn((callback: (client: unknown) => unknown) =>
        callback(tx),
      ),
    };
    const service = new OnboardingService(prisma as never, {} as never);
    jest
      .spyOn(service as never, 'updateProfileCompleteness')
      .mockResolvedValue(undefined as never);

    await service.updateLocation(user.id, {
      country: 'South Africa',
      countryIso2: 'ZA',
      state: 'Gauteng',
      city: 'Johannesburg',
      addressName: 'Home',
      formattedAddress: '1 Main Street, Johannesburg',
      latitude: -26.2041,
      longitude: 28.0473,
      isPrimary: true,
    });

    expect(tx.providerMarketMembership.deleteMany).toHaveBeenCalledWith({
      where: {
        providerId: user.id,
        marketId: { not: 'market-za' },
        status: 'PENDING',
      },
    });
    expect(tx.providerMarketMembership.updateMany).toHaveBeenCalledWith({
      where: {
        providerId: user.id,
        isPrimary: true,
        marketId: { not: 'market-za' },
      },
      data: { isPrimary: false },
    });
    expect(tx.user.update).toHaveBeenCalledWith({
      where: { id: user.id },
      data: {
        homeMarketId: 'market-za',
        selectedMarketId: 'market-za',
      },
    });
    expect(tx.providerMarketMembership.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          providerId_marketId: {
            providerId: user.id,
            marketId: 'market-za',
          },
        },
        update: {
          status: 'PENDING',
          isPrimary: true,
          reviewedAt: null,
          reviewedBy: null,
          rejectionReason: null,
        },
      }),
    );
  });
});
