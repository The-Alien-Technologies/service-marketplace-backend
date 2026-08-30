import { BadRequestException } from '@nestjs/common';
import { ProviderPayoutStatus } from '../../generated/prisma';
import { applyPaystackTransferState } from './transfer-state';

describe('applyPaystackTransferState', () => {
  const payout = {
    id: 'payout-1',
    reference: 'PO-1',
    amountMinor: 10_000,
    currency: 'GHS',
    status: ProviderPayoutStatus.PROCESSING,
    items: [],
    adjustmentItems: [],
  };

  function setup() {
    const tx = {
      $queryRaw: jest.fn().mockResolvedValue([{ id: payout.id }]),
      providerPayout: {
        findUnique: jest.fn().mockResolvedValue(payout),
        update: jest.fn(),
      },
      orderSettlement: { updateMany: jest.fn() },
      providerBalanceAdjustment: { updateMany: jest.fn() },
    };
    const prisma = {
      $transaction: jest.fn((callback: (transaction: typeof tx) => unknown) =>
        callback(tx),
      ),
    };
    const logger = { warn: jest.fn(), error: jest.fn() };
    return { prisma, tx, logger };
  }

  it.each([
    { amount: 9_999, currency: 'GHS', label: 'amount' },
    { amount: 10_000, currency: 'USD', label: 'currency' },
  ])('ignores a non-strict webhook with a mismatched $label', async (input) => {
    const { prisma, tx, logger } = setup();

    const result = await applyPaystackTransferState(
      prisma as never,
      'transfer.success',
      {
        reference: payout.reference,
        status: 'success',
        amount: input.amount,
        currency: input.currency,
      },
      { logger: logger as never },
    );

    expect(result).toBeNull();
    expect(logger.error).toHaveBeenCalled();
    expect(tx.providerPayout.update).not.toHaveBeenCalled();
    expect(tx.orderSettlement.updateMany).not.toHaveBeenCalled();
  });

  it('rejects a strict transfer amount mismatch', async () => {
    const { prisma, tx } = setup();

    await expect(
      applyPaystackTransferState(
        prisma as never,
        'transfer.success',
        {
          reference: payout.reference,
          status: 'success',
          amount: 9_999,
          currency: payout.currency,
        },
        { strict: true },
      ),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(tx.providerPayout.update).not.toHaveBeenCalled();
  });

  it('does not report an ignored non-strict state as a payout update', async () => {
    const { prisma, tx } = setup();
    tx.providerPayout.findUnique.mockResolvedValue({
      ...payout,
      status: ProviderPayoutStatus.REQUESTED,
    });

    const result = await applyPaystackTransferState(
      prisma as never,
      'transfer.success',
      {
        reference: payout.reference,
        status: 'success',
        amount: payout.amountMinor,
        currency: payout.currency,
      },
    );

    expect(result).toBeNull();
    expect(tx.providerPayout.update).not.toHaveBeenCalled();
  });
});
