import { ForbiddenException } from '@nestjs/common';
import {
  DisputeIssueType,
  OrderPaymentStatus,
  OrderStatus,
} from '../../generated/prisma';
import { DisputeService } from './dispute.service';

describe('DisputeService participant privacy', () => {
  const dispute = {
    id: 'dispute-1',
    clientId: 'client-1',
    providerId: 'provider-1',
    adminNote: 'Internal investigation details',
    client: {
      id: 'client-1',
      email: 'client@example.com',
      phoneNumber: '+233200000001',
      countryCode: 'GH',
    },
    provider: {
      id: 'provider-1',
      email: 'provider@example.com',
      phoneNumber: '+233200000002',
      countryCode: 'GH',
    },
    order: { orderNumber: 'ORD-1' },
  };

  function setup() {
    const prisma = {
      dispute: {
        findUnique: jest.fn().mockResolvedValue(dispute),
        findMany: jest.fn().mockResolvedValue([dispute]),
      },
    };
    return {
      prisma,
      service: new DisputeService(prisma as never, {} as never),
    };
  }

  it('removes internal notes and contact details for a participant', async () => {
    const { service } = setup();

    const result = await service.findOne('dispute-1', 'provider-1', false);

    expect(result).toEqual(
      expect.objectContaining({
        adminNote: null,
        client: expect.objectContaining({
          email: null,
          phoneNumber: null,
          countryCode: null,
        }),
        provider: expect.objectContaining({
          email: null,
          phoneNumber: null,
          countryCode: null,
        }),
      }),
    );
  });

  it('removes private fields from every item in participant lists', async () => {
    const { service } = setup();

    const result = await service.findByParticipant('client-1');

    expect(result[0].adminNote).toBeNull();
    expect(result[0].client.email).toBeNull();
    expect(result[0].provider.email).toBeNull();
  });

  it('keeps the full record for admins and rejects unrelated users', async () => {
    const { service } = setup();

    await expect(
      service.findOne('dispute-1', 'admin-1', true),
    ).resolves.toEqual(dispute);
    await expect(
      service.findOne('dispute-1', 'stranger-1', false),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('also masks private fields in the create response', async () => {
    const { service, prisma } = setup();
    Object.assign(prisma, {
      order: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'order-1',
          clientId: 'client-1',
          providerId: 'provider-1',
          status: OrderStatus.COMPLETED,
          paymentStatus: OrderPaymentStatus.PAID,
          settlement: null,
        }),
      },
    });
    prisma.dispute.findUnique.mockResolvedValueOnce(null);
    Object.assign(prisma.dispute, {
      create: jest.fn().mockResolvedValue(dispute),
    });

    const result = await service.create('client-1', {
      orderId: 'order-1',
      issueType: DisputeIssueType.OTHER,
      description: 'The work was not as agreed.',
    });

    expect(result.adminNote).toBeNull();
    expect(result.client.email).toBeNull();
    expect(result.provider.email).toBeNull();
  });
});
