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
    const service = new PayoutsService(
      prisma as never,
      {} as never,
      {} as never,
      {} as never,
      { get: jest.fn().mockReturnValue('true') } as never,
    );

    const payout = await service.requestPayout('provider-1');

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
    const service = new PayoutsService(
      {} as never,
      {} as never,
      {} as never,
      {} as never,
      { get: jest.fn().mockReturnValue('false') } as never,
    );

    await expect(service.requestPayout('provider-1')).rejects.toThrow(
      'Provider payouts are not enabled yet',
    );
  });

  it('refuses approval when a reserved settlement is no longer eligible', async () => {
    const payout = {
      id: 'payout-1',
      providerId: 'provider-1',
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
    const service = new PayoutsService(
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

  it('treats a blocked Paystack transfer as failed and releases its reservations', async () => {
    const payout = {
      id: 'payout-1',
      status: ProviderPayoutStatus.OTP_REQUIRED,
      transferCode: 'TRF_test',
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
    const service = new PayoutsService(
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
    };
    const prisma = {
      providerPayout: {
        findUnique: jest.fn().mockResolvedValue(payout),
        updateMany: jest.fn().mockResolvedValue({ count: 0 }),
      },
    };
    const paystack = { finalizeTransfer: jest.fn() };
    const service = new PayoutsService(
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

  it('does not overwrite a webhook-successful payout with an older OTP response', async () => {
    const payout = {
      id: 'payout-1',
      status: ProviderPayoutStatus.OTP_REQUIRED,
      transferCode: 'TRF_test',
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
    const service = new PayoutsService(
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
