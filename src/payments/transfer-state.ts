import { BadRequestException, Logger } from '@nestjs/common';
import {
  BalanceAdjustmentStatus,
  ExternalPaymentDisputeStatus,
  Prisma,
  ProviderPayoutStatus,
  SettlementStatus,
} from '../../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';
import { PaystackTransferData } from './paystack.service';

const ACTIVE_EXTERNAL_DISPUTE_STATUSES: ExternalPaymentDisputeStatus[] = [
  ExternalPaymentDisputeStatus.OPEN,
  ExternalPaymentDisputeStatus.REMINDER,
];

const FAILED_TRANSFER_STATUSES = new Set([
  'abandoned',
  'blocked',
  'failed',
  'rejected',
]);

export type PaystackTransferEvent =
  | 'transfer.pending'
  | 'transfer.otp'
  | 'transfer.success'
  | 'transfer.failed'
  | 'transfer.reversed';

export function eventForTransferStatus(status: string): PaystackTransferEvent {
  const normalized = status.toLowerCase();
  if (normalized === 'success') return 'transfer.success';
  if (normalized === 'reversed') return 'transfer.reversed';
  if (FAILED_TRANSFER_STATUSES.has(normalized)) return 'transfer.failed';
  if (normalized === 'otp') return 'transfer.otp';
  return 'transfer.pending';
}

export async function applyPaystackTransferState(
  prisma: PrismaService,
  eventType: PaystackTransferEvent,
  data: PaystackTransferData,
  options: { logger?: Logger; strict?: boolean } = {},
) {
  if (!data.reference) {
    if (options.strict) {
      throw new BadRequestException(
        'Paystack returned a transfer without its reference',
      );
    }
    options.logger?.warn(`Ignoring ${eventType} without transfer reference`);
    return null;
  }

  return prisma.$transaction(
    async (tx) => {
      const locked = await tx.$queryRaw<Array<{ id: string }>>(Prisma.sql`
        SELECT "id"
        FROM "provider_payouts"
        WHERE "reference" = ${data.reference}
        FOR UPDATE
      `);
      if (locked.length === 0) {
        if (options.strict) {
          throw new BadRequestException(
            'Paystack returned an unknown transfer',
          );
        }
        options.logger?.warn(
          `Ignoring ${eventType} for unknown ${data.reference}`,
        );
        return null;
      }

      const payout = await tx.providerPayout.findUnique({
        where: { id: locked[0].id },
        include: { items: true, adjustmentItems: true },
      });
      if (!payout) return null;

      if (
        !Number.isSafeInteger(Number(data.amount)) ||
        Number(data.amount) !== payout.amountMinor ||
        data.currency !== payout.currency
      ) {
        const message = `Transfer mismatch for ${data.reference}: expected ${payout.amountMinor} ${payout.currency}, received ${data.amount} ${data.currency}`;
        if (options.strict) throw new BadRequestException(message);
        options.logger?.error(message);
        return null;
      }

      if (eventType === 'transfer.success') {
        if (payout.status === ProviderPayoutStatus.SUCCESS) {
          return options.strict ? payout : null;
        }
        if (
          payout.status !== ProviderPayoutStatus.PROCESSING &&
          payout.status !== ProviderPayoutStatus.OTP_REQUIRED
        ) {
          return options.strict ? payout : null;
        }

        await tx.providerPayout.update({
          where: { id: payout.id },
          data: {
            status: ProviderPayoutStatus.SUCCESS,
            transferCode: data.transfer_code,
            providerFeeMinor: data.fees,
            processedAt: data.transferred_at
              ? new Date(data.transferred_at)
              : new Date(),
            rawData: data as unknown as Prisma.InputJsonValue,
            failureMessage: null,
          },
        });
        await tx.orderSettlement.updateMany({
          where: {
            id: { in: payout.items.map((item) => item.settlementId) },
            status: SettlementStatus.RESERVED,
          },
          data: { status: SettlementStatus.PAID },
        });
        for (const item of payout.adjustmentItems) {
          await tx.providerBalanceAdjustment.updateMany({
            where: {
              id: item.adjustmentId,
              status: BalanceAdjustmentStatus.RESERVED,
            },
            data: {
              recoveredAmount: { increment: item.amount },
              status: BalanceAdjustmentStatus.RECOVERED,
            },
          });
        }
        return tx.providerPayout.findUnique({ where: { id: payout.id } });
      }

      if (
        eventType === 'transfer.failed' ||
        eventType === 'transfer.reversed'
      ) {
        const reversed = eventType === 'transfer.reversed';
        const wasSuccessful = payout.status === ProviderPayoutStatus.SUCCESS;
        const canApply = reversed
          ? wasSuccessful ||
            payout.status === ProviderPayoutStatus.PROCESSING ||
            payout.status === ProviderPayoutStatus.OTP_REQUIRED
          : payout.status === ProviderPayoutStatus.PROCESSING ||
            payout.status === ProviderPayoutStatus.OTP_REQUIRED;
        if (!canApply) return options.strict ? payout : null;

        await tx.providerPayout.update({
          where: { id: payout.id },
          data: {
            status: reversed
              ? ProviderPayoutStatus.REVERSED
              : ProviderPayoutStatus.FAILED,
            transferCode: data.transfer_code,
            processedAt: new Date(),
            failureMessage:
              data.failure_reason ||
              data.reason ||
              `Paystack concluded the transfer as ${data.status}`,
            rawData: data as unknown as Prisma.InputJsonValue,
          },
        });
        await Promise.all([
          tx.orderSettlement.updateMany({
            where: {
              id: { in: payout.items.map((item) => item.settlementId) },
              status: reversed
                ? { in: [SettlementStatus.RESERVED, SettlementStatus.PAID] }
                : SettlementStatus.RESERVED,
              order: {
                externalDisputes: {
                  none: {
                    affectsOrderBalance: true,
                    status: { in: ACTIVE_EXTERNAL_DISPUTE_STATUSES },
                  },
                },
              },
            },
            data: { status: SettlementStatus.ELIGIBLE },
          }),
          tx.orderSettlement.updateMany({
            where: {
              id: { in: payout.items.map((item) => item.settlementId) },
              status: reversed
                ? { in: [SettlementStatus.RESERVED, SettlementStatus.PAID] }
                : SettlementStatus.RESERVED,
              order: {
                externalDisputes: {
                  some: {
                    affectsOrderBalance: true,
                    status: { in: ACTIVE_EXTERNAL_DISPUTE_STATUSES },
                  },
                },
              },
            },
            data: { status: SettlementStatus.HELD },
          }),
          wasSuccessful
            ? Promise.resolve()
            : tx.providerBalanceAdjustment.updateMany({
                where: {
                  id: {
                    in: payout.adjustmentItems.map((item) => item.adjustmentId),
                  },
                  status: BalanceAdjustmentStatus.RESERVED,
                },
                data: { status: BalanceAdjustmentStatus.OPEN },
              }),
        ]);
        if (wasSuccessful) {
          for (const item of payout.adjustmentItems) {
            await tx.providerBalanceAdjustment.updateMany({
              where: {
                id: item.adjustmentId,
                status: BalanceAdjustmentStatus.RECOVERED,
                recoveredAmount: { gte: item.amount },
              },
              data: {
                recoveredAmount: { decrement: item.amount },
                status: BalanceAdjustmentStatus.OPEN,
              },
            });
          }
        }
        return tx.providerPayout.findUnique({ where: { id: payout.id } });
      }

      if (
        payout.status !== ProviderPayoutStatus.PROCESSING &&
        payout.status !== ProviderPayoutStatus.OTP_REQUIRED
      ) {
        return options.strict ? payout : null;
      }
      return tx.providerPayout.update({
        where: { id: payout.id },
        data: {
          status:
            eventType === 'transfer.otp'
              ? ProviderPayoutStatus.OTP_REQUIRED
              : ProviderPayoutStatus.PROCESSING,
          transferCode: data.transfer_code,
          providerFeeMinor: data.fees,
          rawData: data as unknown as Prisma.InputJsonValue,
        },
      });
    },
    { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
  );
}
