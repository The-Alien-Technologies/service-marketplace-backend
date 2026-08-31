import {
  Prisma,
  Role,
  ServiceStatus,
  UserStatus,
} from '../../generated/prisma';
import { BadRequestException } from '@nestjs/common';
import { OrdersService } from './orders.service';

describe('OrdersService payment pricing', () => {
  const settlements = {
    getCommissionRate: jest.fn().mockResolvedValue(new Prisma.Decimal(10)),
  };
  it('builds the payable total from database plan and add-on prices', async () => {
    const prisma = {
      order: {
        findUnique: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockImplementation(async ({ data }) => data),
      },
      service: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'service-1',
          providerId: 'provider-1',
          status: ServiceStatus.PUBLISHED,
          provider: {
            role: Role.SERVICE_PROVIDER,
            status: UserStatus.ACTIVE,
            isServiceProviderVerified: true,
          },
          plans: [
            {
              id: 'plan-1',
              title: 'Standard',
              price: new Prisma.Decimal('100.00'),
              inclusions: 'The agreed service',
            },
          ],
          addons: [
            {
              id: 'addon-1',
              title: 'Priority delivery',
              description: 'Faster turnaround',
              price: new Prisma.Decimal('25.50'),
            },
          ],
        }),
      },
    };
    const service = new OrdersService(prisma as never, settlements as never);

    await service.create('client-1', {
      serviceId: 'service-1',
      planId: 'plan-1',
      addOnIds: ['addon-1'],
      checkoutKey: '20aa425a-0f14-4baf-8cf8-41d1201768b5',
    });

    expect(prisma.order.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          planPrice: new Prisma.Decimal('100.00'),
          addOnsTotal: new Prisma.Decimal('25.50'),
          subtotal: new Prisma.Decimal('125.50'),
          total: new Prisma.Decimal('125.50'),
          couponDiscount: 0,
          currency: 'GHS',
          commissionRate: new Prisma.Decimal(10),
        }),
      }),
    );
  });

  it('rejects add-ons that were not returned for the selected service', async () => {
    const prisma = {
      order: { findUnique: jest.fn().mockResolvedValue(null) },
      service: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'service-1',
          providerId: 'provider-1',
          status: ServiceStatus.PUBLISHED,
          provider: {
            role: Role.SERVICE_PROVIDER,
            status: UserStatus.ACTIVE,
            isServiceProviderVerified: true,
          },
          plans: [
            {
              id: 'plan-1',
              title: 'Standard',
              price: new Prisma.Decimal('100.00'),
              inclusions: 'The agreed service',
            },
          ],
          addons: [],
        }),
      },
    };
    const service = new OrdersService(prisma as never, settlements as never);

    await expect(
      service.create('client-1', {
        serviceId: 'service-1',
        planId: 'plan-1',
        addOnIds: ['addon-from-another-service'],
        checkoutKey: '20aa425a-0f14-4baf-8cf8-41d1201768b5',
      }),
    ).rejects.toThrow(
      'One or more selected add-ons do not belong to this service',
    );
  });

  it('rejects orders for a provider whose approval is no longer active', async () => {
    const prisma = {
      order: { findUnique: jest.fn().mockResolvedValue(null) },
      service: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'service-1',
          providerId: 'provider-1',
          status: ServiceStatus.PUBLISHED,
          provider: {
            role: Role.SERVICE_PROVIDER,
            status: UserStatus.PENDING,
            isServiceProviderVerified: false,
          },
          plans: [],
          addons: [],
        }),
      },
    };
    const service = new OrdersService(prisma as never, settlements as never);

    await expect(
      service.create('client-1', {
        serviceId: 'service-1',
        planId: 'plan-1',
        checkoutKey: '20aa425a-0f14-4baf-8cf8-41d1201768b5',
      }),
    ).rejects.toThrow(BadRequestException);
  });
});
