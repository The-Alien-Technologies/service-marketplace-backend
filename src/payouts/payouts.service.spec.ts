import {
  BalanceAdjustmentStatus,
  PayoutAccountStatus,
  PayoutDestinationType,
  Prisma,
  ProviderPayoutStatus,
  SettlementStatus,
} from '../../generated/prisma';
import { PayoutsService } from './payouts.service';

describe('PayoutsService', () => {
  type ServiceArguments = ConstructorParameters<typeof PayoutsService>;
  const defaultCredentials = {
    resolveForMarket: jest.fn().mockResolvedValue({
      integrationId: 'integration-gh',
      credentialVersionId: 'credential-gh',
      secretKey: 'paystack-country-secret',
    }),
    resolveByCredentialId: jest
      .fn()
      .mockResolvedValue('paystack-country-secret'),
  };
  const makeService = (
    prisma: ServiceArguments[0],
    paystack: ServiceArguments[1],
    auth: ServiceArguments[2],
    settlements: ServiceArguments[3],
    config: ServiceArguments[4],
    credentials: ServiceArguments[5] = defaultCredentials as never,
    marketAccess?: ServiceArguments[6],
    notificationEvents?: ServiceArguments[7],
  ) =>
    new PayoutsService(
      prisma,
      paystack,
      auth,
      settlements,
      config,
      credentials,
      marketAccess,
      notificationEvents,
    );

  it('atomically reserves the full eligible balance less open adjustments', async () => {
    const settlements = [
      {
        id: 'settlement-1',
        providerAmount: new Prisma.Decimal('100.00'),
      },
      {
        id: 'settlement-2',
        providerAmount: new Prisma.Decimal('50.00'),
      },
    ];
    const adjustments = [
      {
        id: 'adjustment-1',
        amount: new Prisma.Decimal('20.00'),
        recoveredAmount: new Prisma.Decimal('5.00'),
      },
    ];
    const tx = {
      $queryRaw: jest.fn().mockResolvedValue([{ id: 'provider-1' }]),
      providerPayoutAccount: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'account-1',
          providerId: 'provider-1',
          status: PayoutAccountStatus.ACTIVE,
          type: PayoutDestinationType.MOBILE_MONEY,
          recipientCode: 'RCP_test',
          institutionName: 'MTN',
          accountName: 'Test Provider',
          accountNumberLast4: '4567',
        }),
      },
      providerPayout: {
        findFirst: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockImplementation(async ({ data }) => ({
          id: 'payout-1',
          ...data,
        })),
      },
      orderSettlement: {
        findMany: jest.fn().mockResolvedValue(settlements),
        updateMany: jest.fn().mockResolvedValue({ count: 2 }),
      },
      providerBalanceAdjustment: {
        findMany: jest.fn().mockResolvedValue(adjustments),
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
    };
    const prisma = {
      $transaction: jest.fn((callback: (client: unknown) => unknown) =>
        callback(tx),
      ),
    };
    const service = makeService(
      prisma as never,
      {} as never,
      {} as never,
      {} as never,
      { get: jest.fn().mockReturnValue('true') } as never,
    );

    const payout = await service.requestPayout('provider-1', 'market-gh');

    expect(Number(payout.amount)).toBe(135);
    expect(payout.amountMinor).toBe(13500);
    expect(tx.providerPayout.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          grossEarningsAmount: new Prisma.Decimal('150.00'),
          adjustmentAmount: new Prisma.Decimal('15.00'),
          amount: new Prisma.Decimal('135.00'),
          reference: expect.stringMatching(/^pavodah-payout-/),
          items: {
            create: expect.arrayContaining([
              expect.objectContaining({ settlementId: 'settlement-1' }),
              expect.objectContaining({ settlementId: 'settlement-2' }),
            ]),
          },
        }),
      }),
    );
    expect(tx.orderSettlement.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({ data: { status: SettlementStatus.RESERVED } }),
    );
    expect(tx.providerBalanceAdjustment.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { status: BalanceAdjustmentStatus.RESERVED },
      }),
    );
  });

  it('does not allow a withdrawal when payouts are disabled', async () => {
    const service = makeService(
      {} as never,
      {} as never,
      {} as never,
      {} as never,
      { get: jest.fn().mockReturnValue('false') } as never,
    );

    await expect(
      service.requestPayout('provider-1', 'market-gh'),
    ).rejects.toThrow('Provider payouts are not enabled yet');
  });

  it('refuses approval when a reserved settlement is no longer eligible', async () => {
    const payout = {
      id: 'payout-1',
      providerId: 'provider-1',
      credentialVersionId: 'credential-1',
      status: ProviderPayoutStatus.REQUESTED,
      amountMinor: 10000,
      recipientCode: 'RCP_test',
      reference: 'pavodah-payout-1',
      provider: { displayName: 'Provider', firstName: 'Test' },
    };
    const prisma = {
      providerPayout: {
        findUnique: jest.fn().mockResolvedValue(payout),
        updateMany: jest.fn().mockResolvedValue({ count: 0 }),
      },
    };
    const paystack = { initiateTransfer: jest.fn() };
    const service = makeService(
      prisma as never,
      paystack as never,
      {} as never,
      {} as never,
      { get: jest.fn().mockReturnValue('true') } as never,
    );

    await expect(service.approve('payout-1', 'admin-1')).rejects.toThrow(
      'earnings that are no longer eligible',
    );
    expect(paystack.initiateTransfer).not.toHaveBeenCalled();
    expect(prisma.providerPayout.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          items: expect.objectContaining({ every: expect.any(Object) }),
        }),
      }),
    );
  });

  it('does not claim a payout that has no pinned payment credential', async () => {
    const updateMany = jest.fn();
    const prisma = {
      providerPayout: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'legacy-payout',
          marketId: 'market-gh',
          status: ProviderPayoutStatus.REQUESTED,
          credentialVersionId: null,
          provider: { displayName: 'Provider', firstName: 'Test' },
        }),
        updateMany,
      },
    };
    const service = makeService(
      prisma as never,
      {} as never,
      {} as never,
      {} as never,
      { get: jest.fn().mockReturnValue('true') } as never,
    );

    await expect(service.approve('legacy-payout', 'admin-1')).rejects.toThrow(
      'Payout payment credential is missing',
    );
    expect(updateMany).not.toHaveBeenCalled();
  });

  it('does not claim a payout when its pinned credential is unavailable', async () => {
    const updateMany = jest.fn();
    const credentials = {
      resolveByCredentialId: jest
        .fn()
        .mockRejectedValue(new Error('Credential has been revoked')),
    };
    const prisma = {
      providerPayout: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'payout-1',
          marketId: 'market-gh',
          status: ProviderPayoutStatus.REQUESTED,
          credentialVersionId: 'credential-1',
          provider: { displayName: 'Provider', firstName: 'Test' },
        }),
        updateMany,
      },
    };
    const paystack = { initiateTransfer: jest.fn() };
    const service = makeService(
      prisma as never,
      paystack as never,
      {} as never,
      {} as never,
      { get: jest.fn().mockReturnValue('true') } as never,
      credentials as never,
    );

    await expect(service.approve('payout-1', 'admin-1')).rejects.toThrow(
      'Credential has been revoked',
    );
    expect(updateMany).not.toHaveBeenCalled();
    expect(paystack.initiateTransfer).not.toHaveBeenCalled();
  });

  it('treats a blocked Paystack transfer as failed and releases its reservations', async () => {
    const payout = {
      id: 'payout-1',
      status: ProviderPayoutStatus.OTP_REQUIRED,
      transferCode: 'TRF_test',
      credentialVersionId: 'credential-gh',
      reference: 'pavodah-payout-1',
      amountMinor: 10000,
      currency: 'GHS',
      items: [{ settlementId: 'settlement-1' }],
      adjustmentItems: [{ adjustmentId: 'adjustment-1' }],
    };
    const tx = {
      $queryRaw: jest.fn().mockResolvedValue([{ id: payout.id }]),
      providerPayout: {
        findUnique: jest
          .fn()
          .mockResolvedValueOnce({
            ...payout,
            status: ProviderPayoutStatus.PROCESSING,
          })
          .mockResolvedValueOnce({
            ...payout,
            status: ProviderPayoutStatus.FAILED,
          }),
        update: jest.fn().mockImplementation(async ({ data }) => ({
          ...payout,
          ...data,
        })),
      },
      orderSettlement: {
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
      providerBalanceAdjustment: {
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
    };
    const prisma = {
      providerPayout: {
        findUnique: jest.fn().mockResolvedValue(payout),
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
      $transaction: jest.fn((callback: (client: unknown) => unknown) =>
        callback(tx),
      ),
    };
    const paystack = {
      finalizeTransfer: jest.fn().mockResolvedValue({
        amount: 10000,
        currency: 'GHS',
        reference: 'pavodah-payout-1',
        status: 'blocked',
        transfer_code: 'TRF_test',
        failure_reason: 'Recipient is unavailable',
      }),
    };
    const service = makeService(
      prisma as never,
      paystack as never,
      {} as never,
      {} as never,
      { get: jest.fn().mockReturnValue('true') } as never,
    );

    const result = await service.finalize('payout-1', '123456');

    expect(result.status).toBe(ProviderPayoutStatus.FAILED);
    expect(tx.orderSettlement.updateMany).toHaveBeenCalledTimes(2);
    expect(tx.providerBalanceAdjustment.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { status: BalanceAdjustmentStatus.OPEN },
      }),
    );
  });

  it('claims an OTP payout before calling Paystack finalize', async () => {
    const payout = {
      id: 'payout-1',
      status: ProviderPayoutStatus.OTP_REQUIRED,
      transferCode: 'TRF_test',
      credentialVersionId: 'credential-gh',
    };
    const prisma = {
      providerPayout: {
        findUnique: jest.fn().mockResolvedValue(payout),
        updateMany: jest.fn().mockResolvedValue({ count: 0 }),
      },
    };
    const paystack = { finalizeTransfer: jest.fn() };
    const service = makeService(
      prisma as never,
      paystack as never,
      {} as never,
      {} as never,
      { get: jest.fn().mockReturnValue('true') } as never,
    );

    await expect(service.finalize(payout.id, '123456')).rejects.toThrow(
      'already being submitted',
    );
    expect(paystack.finalizeTransfer).not.toHaveBeenCalled();
  });

  it('does not claim an OTP payout when its pinned credential is unavailable', async () => {
    const updateMany = jest.fn();
    const credentials = {
      resolveByCredentialId: jest
        .fn()
        .mockRejectedValue(new Error('Credential has been revoked')),
    };
    const payout = {
      id: 'payout-1',
      marketId: 'market-gh',
      status: ProviderPayoutStatus.OTP_REQUIRED,
      transferCode: 'TRF_test',
      credentialVersionId: 'credential-1',
    };
    const prisma = {
      providerPayout: {
        findUnique: jest.fn().mockResolvedValue(payout),
        updateMany,
      },
    };
    const paystack = { finalizeTransfer: jest.fn() };
    const service = makeService(
      prisma as never,
      paystack as never,
      {} as never,
      {} as never,
      { get: jest.fn().mockReturnValue('true') } as never,
      credentials as never,
    );

    await expect(service.finalize(payout.id, '123456')).rejects.toThrow(
      'Credential has been revoked',
    );
    expect(updateMany).not.toHaveBeenCalled();
    expect(paystack.finalizeTransfer).not.toHaveBeenCalled();
  });

  it('does not overwrite a webhook-successful payout with an older OTP response', async () => {
    const payout = {
      id: 'payout-1',
      status: ProviderPayoutStatus.OTP_REQUIRED,
      transferCode: 'TRF_test',
      credentialVersionId: 'credential-gh',
      reference: 'pavodah-payout-1',
      amountMinor: 10000,
      currency: 'GHS',
      items: [{ settlementId: 'settlement-1' }],
      adjustmentItems: [],
    };
    const successful = { ...payout, status: ProviderPayoutStatus.SUCCESS };
    const tx = {
      $queryRaw: jest.fn().mockResolvedValue([{ id: payout.id }]),
      providerPayout: {
        findUnique: jest.fn().mockResolvedValue(successful),
        update: jest.fn(),
      },
    };
    const prisma = {
      providerPayout: {
        findUnique: jest
          .fn()
          .mockResolvedValueOnce(payout)
          .mockResolvedValueOnce({ reference: payout.reference }),
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
      $transaction: jest.fn((callback: (client: unknown) => unknown) =>
        callback(tx),
      ),
    };
    const paystack = {
      finalizeTransfer: jest.fn().mockResolvedValue({
        amount: payout.amountMinor,
        currency: payout.currency,
        reference: payout.reference,
        status: 'pending',
        transfer_code: payout.transferCode,
      }),
    };
    const service = makeService(
      prisma as never,
      paystack as never,
      {} as never,
      {} as never,
      { get: jest.fn().mockReturnValue('true') } as never,
    );

    const result = await service.finalize(payout.id, '123456');

    expect(result?.status).toBe(ProviderPayoutStatus.SUCCESS);
    expect(tx.providerPayout.update).not.toHaveBeenCalled();
  });
});
