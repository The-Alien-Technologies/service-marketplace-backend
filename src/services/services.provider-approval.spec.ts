import { ServiceStatus, UserStatus } from '../../generated/prisma';
import { ServicesService } from './services.service';

describe('ServicesService provider approval visibility', () => {
  it('shows public services only for active, approved providers', async () => {
    const prisma = {
      service: {
        findMany: jest.fn().mockResolvedValue([]),
        count: jest.fn().mockResolvedValue(0),
      },
    };
    const service = new ServicesService(prisma as never, {} as never);

    await service.findAll();

    const expectedProviderFilter = {
      status: UserStatus.ACTIVE,
      isServiceProviderVerified: true,
    };
    expect(prisma.service.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ provider: expectedProviderFilter }),
      }),
    );
    expect(prisma.service.count).toHaveBeenCalledWith({
      where: expect.objectContaining({ provider: expectedProviderFilter }),
    });
  });

  it('shows public service details only when the service is published', async () => {
    const prisma = {
      service: {
        findFirst: jest.fn().mockResolvedValue({ id: 'service-1' }),
      },
    };
    const service = new ServicesService(prisma as never, {} as never);

    await service.findOne('service-1');

    expect(prisma.service.findFirst).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          id: 'service-1',
          status: ServiceStatus.PUBLISHED,
          provider: {
            status: UserStatus.ACTIVE,
            isServiceProviderVerified: true,
          },
        },
      }),
    );
  });

  it('lets an approved provider load only their own draft service', async () => {
    const prisma = {
      service: {
        findFirst: jest.fn().mockResolvedValue({ id: 'service-1' }),
      },
    };
    const service = new ServicesService(prisma as never, {} as never);

    await service.findOneForProvider('service-1', 'provider-1');

    expect(prisma.service.findFirst).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'service-1', providerId: 'provider-1' },
      }),
    );
  });
});
