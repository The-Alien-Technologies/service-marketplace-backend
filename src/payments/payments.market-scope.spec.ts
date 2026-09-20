import { BadRequestException } from '@nestjs/common';
import { PaymentRefundStatus, Role } from '../../generated/prisma';
import { MarketAccessService } from '../markets/market-access.service';
import { PaymentsService } from './payments.service';

describe('PaymentsService market scoping', () => {
  const config = { get: jest.fn((_key: string, fallback: string) => fallback) };
  const settlements = {};
  const defaultCredentials = {
    resolveActive: jest.fn().mockResolvedValue({
      integrationId: 'integration-gh',
      credentialVersionId: 'credential-gh',
      secretKey: 'paystack-country-secret',
    }),
    resolveByCredentialId: jest
      .fn()
      .mockResolvedValue('paystack-country-secret'),
    resolveForMarket: jest.fn().mockResolvedValue({
      integrationId: 'integration-gh',
      credentialVersionId: 'credential-gh',
      secretKey: 'paystack-country-secret',
    }),
  };

  it('uses the country admin assignment when listing refund institutions', async () => {
    const prisma = {
      market: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'market-gh',
          code: 'GH',
          currency: 'GHS',
          paystackCountry: 'ghana',
        }),
      },
    };
    const paystack = { listInstitutions: jest.fn().mockResolvedValue([]) };
    const credentials = {
      resolveForMarket: jest.fn().mockResolvedValue({ secretKey: 'secret' }),
    };
    const service = new PaymentsService(
      prisma as never,
      paystack as never,
      config as never,
      settlements as never,
      credentials as never,
      new MarketAccessService(),
    );

    await service.listRefundInstitutions(undefined, {
      id: 'admin-1',
      role: Role.ADMIN,
      adminMarketId: 'market-gh',
    });

    expect(prisma.market.findUnique).toHaveBeenCalledWith({
      where: { id: 'market-gh' },
    });
    expect(credentials.resolveForMarket).toHaveBeenCalledWith('market-gh');
  });

  it('limits implicit refund reconciliation to the refund market', async () => {
    const refund = {
      id: 'refund-1',
      providerRefundId: null,
      status: PaymentRefundStatus.NEEDS_ATTENTION,
      currency: 'GHS',
      order: { marketId: 'market-gh' },
      transaction: {},
    };
    const prisma = {
      paymentRefund: {
        findUnique: jest.fn().mockResolvedValue(refund),
        findUniqueOrThrow: jest.fn().mockResolvedValue(refund),
      },
    };
    const service = new PaymentsService(
      prisma as never,
      {} as never,
      config as never,
      settlements as never,
      defaultCredentials as never,
    );
    const reconcile = jest
      .spyOn(service, 'reconcilePendingRefunds')
      .mockResolvedValue({ checked: 0, reconciled: 0, attention: 0 });

    await expect(
      service.retryRefund('refund-1', {
        currency: 'GHS',
        accountNumber: '0123456789',
        bankCode: 'bank',
      }),
    ).rejects.toThrow(BadRequestException);
    expect(reconcile).toHaveBeenCalledWith('market-gh');
  });

  it('does not claim a refund retry when its pinned credential is unavailable', async () => {
    const updateMany = jest.fn();
    const refund = {
      id: 'refund-1',
      providerRefundId: 'refund-provider-1',
      status: PaymentRefundStatus.NEEDS_ATTENTION,
      currency: 'GHS',
      order: { marketId: 'market-gh' },
      transaction: { credentialVersionId: 'credential-1' },
    };
    const prisma = {
      paymentRefund: {
        findUnique: jest.fn().mockResolvedValue(refund),
        updateMany,
      },
    };
    const paystack = { retryRefund: jest.fn() };
    const credentials = {
      resolveByCredentialId: jest
        .fn()
        .mockRejectedValue(new Error('Credential has been revoked')),
    };
    const service = new PaymentsService(
      prisma as never,
      paystack as never,
      config as never,
      settlements as never,
      credentials as never,
    );
    jest.spyOn(service, 'resolveRefundAccount').mockResolvedValue({
      accountNumber: '0123456789',
      accountName: 'Test User',
      bankId: 'bank-1',
      bankCode: 'bank',
      bankName: 'Test Bank',
    });

    await expect(
      service.retryRefund('refund-1', {
        currency: 'GHS',
        accountNumber: '0123456789',
        bankCode: 'bank',
      }),
    ).rejects.toThrow('Credential has been revoked');
    expect(updateMany).not.toHaveBeenCalled();
    expect(paystack.retryRefund).not.toHaveBeenCalled();
  });
});
