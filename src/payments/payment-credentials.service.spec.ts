import { ConfigService } from '@nestjs/config';
import {
  PaymentCredentialStatus,
  PayoutAccountStatus,
} from '../../generated/prisma';
import { PaymentCredentialsService } from './payment-credentials.service';

describe('PaymentCredentialsService', () => {
  it('invalidates payout destinations when a new credential is activated', async () => {
    const candidate = {
      id: 'credential-2',
      integrationId: 'integration-gh',
      version: 2,
      status: PaymentCredentialStatus.STAGED,
      integration: { marketId: 'market-gh' },
    };
    const tx = {
      paymentCredentialVersion: {
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
        findUniqueOrThrow: jest.fn().mockResolvedValue(candidate),
      },
      providerPayoutAccount: {
        updateMany: jest.fn().mockResolvedValue({ count: 3 }),
      },
      marketPartnerPayoutAccount: {
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
      adminAuditLog: { create: jest.fn().mockResolvedValue({}) },
    };
    const prisma = {
      paymentCredentialVersion: {
        findUnique: jest.fn().mockResolvedValue(candidate),
      },
      $transaction: jest.fn((callback: (client: unknown) => unknown) =>
        callback(tx),
      ),
    };
    const service = new PaymentCredentialsService(
      prisma as never,
      new ConfigService({ PAYMENT_CREDENTIAL_RETIREMENT_HOURS: '72' }),
      {} as never,
      {} as never,
    );

    await service.activate('credential-2', 'super-1', true);

    expect(tx.providerPayoutAccount.updateMany).toHaveBeenCalledWith({
      where: {
        paymentIntegrationId: 'integration-gh',
        status: PayoutAccountStatus.ACTIVE,
      },
      data: { status: PayoutAccountStatus.INACTIVE },
    });
    expect(tx.adminAuditLog.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          metadata: expect.objectContaining({
            invalidatedPayoutAccounts: 3,
            invalidatedPartnerPayoutAccounts: 1,
            pavodahOwnershipAttested: true,
          }),
        }),
      }),
    );
  });
});
