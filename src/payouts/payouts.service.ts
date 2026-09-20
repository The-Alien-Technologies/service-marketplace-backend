import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import {
  BalanceAdjustmentStatus,
  ExternalPaymentDisputeStatus,
  PayoutAccountStatus,
  PayoutDestinationType,
  Prisma,
  ProviderPayoutStatus,
  ReleaseReviewStatus,
  Role,
  SettlementStatus,
  ProviderMarketMembershipStatus,
} from '../../generated/prisma';
import { AuthService } from '../auth/auth.service';
import {
  PaystackService,
  PaystackRequestException,
  PaystackTransferData,
} from '../payments/paystack.service';
import {
  applyPaystackTransferState,
  eventForTransferStatus,
} from '../payments/transfer-state';
import { PrismaService } from '../prisma/prisma.service';
import { SettlementsService } from '../settlements/settlements.service';
import { PayoutListQueryDto, UpdatePayoutAccountDto } from './dto/payouts.dto';
import { NotificationEventsService } from '../notifications/notification-events.service';
import { PaymentCredentialsService } from '../payments/payment-credentials.service';
import {
  MarketAccessService,
  MarketActor,
} from '../markets/market-access.service';

const ACTIVE_PAYOUT_STATUSES: ProviderPayoutStatus[] = [
  ProviderPayoutStatus.REQUESTED,
  ProviderPayoutStatus.PROCESSING,
  ProviderPayoutStatus.OTP_REQUIRED,
];

const MAX_DATABASE_MINOR_AMOUNT = 2_147_483_647;

const ACTIVE_EXTERNAL_DISPUTE_STATUSES: ExternalPaymentDisputeStatus[] = [
  ExternalPaymentDisputeStatus.OPEN,
  ExternalPaymentDisputeStatus.REMINDER,
];

@Injectable()
export class PayoutsService {
  private readonly logger = new Logger(PayoutsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly paystack: PaystackService,
    private readonly auth: AuthService,
    private readonly settlements: SettlementsService,
    private readonly config: ConfigService,
    private readonly credentials: PaymentCredentialsService,
    private readonly marketAccess: MarketAccessService = {
      assertResource: () => undefined,
      marketForAdmin: (_actor: MarketActor, marketId?: string) => marketId,
      isStaff: () => true,
    } as unknown as MarketAccessService,
    private readonly notificationEvents?: NotificationEventsService,
  ) {}

  private assertEnabled() {
    if (this.config.get<string>('PAYOUTS_ENABLED', 'false') !== 'true') {
      throw new BadRequestException(
        'Provider payouts are not enabled yet. Your earnings remain safely recorded.',
      );
    }
  }

  async listInstitutions(type: PayoutDestinationType, marketId: string) {
    if (!marketId) throw new BadRequestException('Choose a market');
    const market = await this.prisma.market.findUnique({
      where: { id: marketId },
    });
    if (!market) throw new NotFoundException('Market not found');
    if (
      (market.code === 'ZA' && type !== PayoutDestinationType.BASA) ||
      (market.code !== 'ZA' && type === PayoutDestinationType.BASA)
    ) {
      throw new BadRequestException('Destination type is not supported here');
    }
    const credential = await this.credentials.resolveForMarket(marketId);
    const paystackType =
      type === PayoutDestinationType.GHIPSS
        ? 'ghipss'
        : type === PayoutDestinationType.BASA
          ? 'basa'
          : 'mobile_money';
    const institutions = await this.paystack.listInstitutions(paystackType, {
      country: market.paystackCountry,
      currency: market.currency,
      secretKey: credential.secretKey,
    });
    return institutions
      .filter((institution) => institution.active !== false)
      .map((institution) => ({
        name: institution.name,
        code: institution.code,
        type,
      }));
  }

  sendAccountOtp(providerId: string) {
    return this.auth.sendPayoutAccountOtp(providerId);
  }

  async getAccount(providerId: string, marketId: string) {
    return this.prisma.providerPayoutAccount.findUnique({
      where: { providerId_marketId: { providerId, marketId } },
      select: {
        id: true,
        type: true,
        institutionCode: true,
        institutionName: true,
        accountName: true,
        accountNumberLast4: true,
        currency: true,
        status: true,
        verifiedAt: true,
        updatedAt: true,
      },
    });
  }

  async updateAccount(providerId: string, dto: UpdatePayoutAccountDto) {
    const provider = await this.prisma.user.findUnique({
      where: { id: providerId },
      select: {
        id: true,
        role: true,
        firstName: true,
        lastName: true,
        displayName: true,
      },
    });
    if (!provider) throw new NotFoundException('Provider not found');
    if (provider.role !== Role.SERVICE_PROVIDER) {
      throw new ForbiddenException(
        'Only service providers can receive payouts',
      );
    }
    const membership = await this.prisma.providerMarketMembership.findUnique({
      where: {
        providerId_marketId: { providerId, marketId: dto.marketId },
      },
      include: { market: true },
    });
    if (membership?.status !== ProviderMarketMembershipStatus.ACTIVE) {
      throw new ForbiddenException('You are not active in this market');
    }
    const credential = await this.credentials.resolveForMarket(dto.marketId);

    const activePayout = await this.prisma.providerPayout.findFirst({
      where: {
        providerId,
        marketId: dto.marketId,
        status: { in: ACTIVE_PAYOUT_STATUSES },
      },
      select: { id: true },
    });
    if (activePayout) {
      throw new BadRequestException(
        'You cannot change the payout destination while a payout is pending',
      );
    }

    const institutions = await this.listInstitutions(dto.type, dto.marketId);
    const institution = institutions.find(
      (item) => item.code === dto.institutionCode,
    );
    if (!institution) {
      throw new BadRequestException('Select a supported payout institution');
    }

    const verified = await this.auth.verifyPayoutAccountOtp(
      providerId,
      dto.otpCode,
    );
    if (!verified) {
      throw new BadRequestException(
        'The verification code is invalid or expired',
      );
    }

    const name =
      dto.accountName.trim() ||
      provider.displayName ||
      [provider.firstName, provider.lastName].filter(Boolean).join(' ');
    const paystackType =
      dto.type === PayoutDestinationType.GHIPSS
        ? 'ghipss'
        : dto.type === PayoutDestinationType.BASA
          ? 'basa'
          : 'mobile_money';
    let recipient: Awaited<
      ReturnType<PaystackService['createTransferRecipient']>
    >;
    try {
      recipient = await this.paystack.createTransferRecipient(
        {
          type: paystackType,
          name,
          accountNumber: dto.accountNumber,
          institutionCode: dto.institutionCode,
          currency: membership.market.currency,
          metadata: { providerId, marketId: dto.marketId },
        },
        credential.secretKey,
      );
    } catch (error) {
      await this.auth.restorePayoutAccountOtp(providerId, dto.otpCode);
      throw error;
    }
    if (!recipient.active || !recipient.recipient_code) {
      await this.auth.restorePayoutAccountOtp(providerId, dto.otpCode);
      throw new BadRequestException(
        'Paystack could not verify this destination',
      );
    }

    let saved;
    try {
      saved = await this.prisma.$transaction(
        async (tx) => {
          await tx.$queryRaw<Array<{ id: string }>>(Prisma.sql`
            SELECT "id" FROM "users" WHERE "id" = ${providerId} FOR UPDATE
          `);
          const active = await tx.providerPayout.findFirst({
            where: {
              providerId,
              marketId: dto.marketId,
              status: { in: ACTIVE_PAYOUT_STATUSES },
            },
            select: { id: true },
          });
          if (active) {
            throw new BadRequestException(
              'You cannot change the payout destination while a payout is pending',
            );
          }

          const previous = await tx.providerPayoutAccount.findUnique({
            where: {
              providerId_marketId: { providerId, marketId: dto.marketId },
            },
            select: { recipientCode: true },
          });
          const account = await tx.providerPayoutAccount.upsert({
            where: {
              providerId_marketId: { providerId, marketId: dto.marketId },
            },
            create: {
              providerId,
              marketId: dto.marketId,
              paymentIntegrationId: credential.integrationId,
              type: dto.type,
              recipientCode: recipient.recipient_code,
              institutionCode: dto.institutionCode,
              institutionName: recipient.details?.bank_name || institution.name,
              accountName:
                recipient.details?.account_name || recipient.name || name,
              accountNumberLast4: dto.accountNumber.slice(-4),
              currency: membership.market.currency,
              status: PayoutAccountStatus.ACTIVE,
            },
            update: {
              type: dto.type,
              recipientCode: recipient.recipient_code,
              institutionCode: dto.institutionCode,
              institutionName: recipient.details?.bank_name || institution.name,
              accountName:
                recipient.details?.account_name || recipient.name || name,
              accountNumberLast4: dto.accountNumber.slice(-4),
              status: PayoutAccountStatus.ACTIVE,
              verifiedAt: new Date(),
              paymentIntegrationId: credential.integrationId,
              currency: membership.market.currency,
            },
            select: {
              id: true,
              type: true,
              institutionCode: true,
              institutionName: true,
              accountName: true,
              accountNumberLast4: true,
              currency: true,
              status: true,
              verifiedAt: true,
              updatedAt: true,
            },
          });
          return { account, previousRecipientCode: previous?.recipientCode };
        },
        { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
      );
    } catch (error) {
      try {
        await this.paystack.deactivateTransferRecipient(
          recipient.recipient_code,
          credential.secretKey,
        );
      } catch (cleanupError) {
        this.logger.warn(
          `Could not deactivate unused Paystack recipient ending ${recipient.recipient_code.slice(-6)}: ${cleanupError instanceof Error ? cleanupError.message : 'unknown error'}`,
        );
      }
      await this.auth.restorePayoutAccountOtp(providerId, dto.otpCode);
      throw error;
    }

    if (
      saved.previousRecipientCode &&
      saved.previousRecipientCode !== recipient.recipient_code
    ) {
      try {
        await this.paystack.deactivateTransferRecipient(
          saved.previousRecipientCode,
          credential.secretKey,
        );
      } catch (error) {
        this.logger.warn(
          `Could not deactivate superseded Paystack recipient ending ${saved.previousRecipientCode.slice(-6)}: ${error instanceof Error ? error.message : 'unknown error'}`,
        );
      }
    }
    return saved.account;
  }

  async getSummary(providerId: string, marketId: string) {
    const market = await this.prisma.market.findUnique({
      where: { id: marketId },
    });
    if (!market) throw new NotFoundException('Market not found');
    const [settlements, adjustments, account, activePayout] = await Promise.all(
      [
        this.prisma.orderSettlement.groupBy({
          by: ['status'],
          where: { providerId, marketId },
          _sum: { providerAmount: true },
        }),
        this.prisma.providerBalanceAdjustment.findMany({
          where: {
            providerId,
            marketId,
            status: {
              in: [
                BalanceAdjustmentStatus.OPEN,
                BalanceAdjustmentStatus.RESERVED,
              ],
            },
          },
          select: { amount: true, recoveredAmount: true, status: true },
        }),
        this.getAccount(providerId, marketId),
        this.prisma.providerPayout.findFirst({
          where: {
            providerId,
            marketId,
            status: { in: ACTIVE_PAYOUT_STATUSES },
          },
          orderBy: { createdAt: 'desc' },
          select: { id: true, amount: true, status: true, requestedAt: true },
        }),
      ],
    );

    const totalFor = (status: SettlementStatus) =>
      settlements.find((item) => item.status === status)?._sum.providerAmount ??
      new Prisma.Decimal(0);
    const openDebt = adjustments
      .filter((item) => item.status === BalanceAdjustmentStatus.OPEN)
      .reduce(
        (sum, item) => sum.add(item.amount.minus(item.recoveredAmount)),
        new Prisma.Decimal(0),
      );
    const eligible = totalFor(SettlementStatus.ELIGIBLE);

    return {
      currency: market.currency,
      held: totalFor(SettlementStatus.HELD),
      eligible,
      reserved: activePayout?.amount ?? totalFor(SettlementStatus.RESERVED),
      paid: totalFor(SettlementStatus.PAID),
      adjustmentBalance: openDebt,
      available: Prisma.Decimal.max(eligible.minus(openDebt), 0),
      negativeBalance: Prisma.Decimal.max(openDebt.minus(eligible), 0),
      payoutsEnabled:
        this.config.get<string>('PAYOUTS_ENABLED', 'false') === 'true',
      account,
      activePayout,
    };
  }

  async listEarnings(
    providerId: string,
    marketId: string,
    page = 1,
    limit = 20,
  ) {
    const safePage = Math.max(1, page);
    const safeLimit = Math.min(100, Math.max(1, limit));
    const where = { providerId, marketId };
    const [data, total] = await Promise.all([
      this.prisma.orderSettlement.findMany({
        where,
        skip: (safePage - 1) * safeLimit,
        take: safeLimit,
        orderBy: { createdAt: 'desc' },
        include: {
          order: {
            select: {
              id: true,
              orderNumber: true,
              planTitle: true,
              status: true,
              paymentStatus: true,
              service: { select: { id: true, title: true } },
            },
          },
        },
      }),
      this.prisma.orderSettlement.count({ where }),
    ]);
    return {
      data,
      pagination: {
        page: safePage,
        limit: safeLimit,
        total,
        pages: Math.ceil(total / safeLimit),
      },
    };
  }

  async requestPayout(providerId: string, marketId: string) {
    this.assertEnabled();
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      try {
        const payout = await this.createPayoutRequest(providerId, marketId);
        await this.notificationEvents?.payoutRequested({
          id: payout.id,
          providerId: payout.providerId,
          reference: payout.reference,
          amount: payout.amount.toFixed(2),
          currency: payout.currency,
          marketId: payout.marketId,
        });
        return payout;
      } catch (error) {
        if (!this.isSerializationConflict(error) || attempt === 3) {
          throw error;
        }
      }
    }

    throw new BadRequestException('Please retry the payout request');
  }

  private async createPayoutRequest(providerId: string, marketId: string) {
    const credential = await this.credentials.resolveForMarket(marketId);
    return this.prisma.$transaction(
      async (tx) => {
        await tx.$queryRaw<Array<{ id: string }>>(Prisma.sql`
          SELECT "id" FROM "users" WHERE "id" = ${providerId} FOR UPDATE
        `);
        const account = await tx.providerPayoutAccount.findUnique({
          where: { providerId_marketId: { providerId, marketId } },
        });
        if (!account || account.status !== PayoutAccountStatus.ACTIVE) {
          throw new BadRequestException(
            'Set up a verified payout destination before withdrawing',
          );
        }
        const active = await tx.providerPayout.findFirst({
          where: {
            providerId,
            marketId,
            status: { in: ACTIVE_PAYOUT_STATUSES },
          },
        });
        if (active) {
          throw new BadRequestException('A payout request is already active');
        }

        const [eligibleSettlements, adjustments] = await Promise.all([
          tx.orderSettlement.findMany({
            where: {
              providerId,
              marketId,
              status: SettlementStatus.ELIGIBLE,
              order: {
                externalDisputes: {
                  none: {
                    affectsOrderBalance: true,
                    status: { in: ACTIVE_EXTERNAL_DISPUTE_STATUSES },
                  },
                },
              },
            },
            orderBy: { createdAt: 'asc' },
          }),
          tx.providerBalanceAdjustment.findMany({
            where: {
              providerId,
              marketId,
              status: BalanceAdjustmentStatus.OPEN,
            },
            orderBy: { createdAt: 'asc' },
          }),
        ]);
        const gross = eligibleSettlements.reduce(
          (sum, settlement) => sum.add(settlement.providerAmount),
          new Prisma.Decimal(0),
        );
        const adjustmentAmount = adjustments.reduce(
          (sum, adjustment) =>
            sum.add(adjustment.amount.minus(adjustment.recoveredAmount)),
          new Prisma.Decimal(0),
        );
        const amount = gross.minus(adjustmentAmount);
        if (gross.lessThanOrEqualTo(0) || amount.lessThanOrEqualTo(0)) {
          throw new BadRequestException(
            'There is no positive eligible balance',
          );
        }
        const amountMinor = amount.mul(100);
        if (
          !amountMinor.isInteger() ||
          !Number.isSafeInteger(amountMinor.toNumber()) ||
          amountMinor.greaterThan(MAX_DATABASE_MINOR_AMOUNT)
        ) {
          throw new BadRequestException('The payout amount is invalid');
        }

        const payout = await tx.providerPayout.create({
          data: {
            providerId,
            marketId,
            paymentIntegrationId: credential.integrationId,
            credentialVersionId: credential.credentialVersionId,
            payoutAccountId: account.id,
            reference: `pavodah-payout-${randomUUID().replace(/-/g, '')}`,
            amount,
            grossEarningsAmount: gross,
            adjustmentAmount,
            amountMinor: amountMinor.toNumber(),
            recipientCode: account.recipientCode,
            destinationType: account.type,
            institutionName: account.institutionName,
            accountName: account.accountName,
            accountNumberLast4: account.accountNumberLast4,
            currency: account.currency,
            items: {
              create: eligibleSettlements.map((settlement) => ({
                settlementId: settlement.id,
                amount: settlement.providerAmount,
              })),
            },
            adjustmentItems: adjustments.length
              ? {
                  create: adjustments.map((adjustment) => ({
                    adjustmentId: adjustment.id,
                    amount: adjustment.amount.minus(adjustment.recoveredAmount),
                  })),
                }
              : undefined,
          },
          include: { items: true, adjustmentItems: true },
        });

        const reservedSettlements = await tx.orderSettlement.updateMany({
          where: {
            id: { in: eligibleSettlements.map((item) => item.id) },
            status: SettlementStatus.ELIGIBLE,
            order: {
              externalDisputes: {
                none: {
                  affectsOrderBalance: true,
                  status: { in: ACTIVE_EXTERNAL_DISPUTE_STATUSES },
                },
              },
            },
          },
          data: { status: SettlementStatus.RESERVED },
        });
        if (reservedSettlements.count !== eligibleSettlements.length) {
          throw new BadRequestException(
            'The eligible balance changed while the payout was being reserved',
          );
        }
        if (adjustments.length) {
          const reservedAdjustments =
            await tx.providerBalanceAdjustment.updateMany({
              where: {
                id: { in: adjustments.map((item) => item.id) },
                status: BalanceAdjustmentStatus.OPEN,
              },
              data: { status: BalanceAdjustmentStatus.RESERVED },
            });
          if (reservedAdjustments.count !== adjustments.length) {
            throw new BadRequestException(
              'The balance adjustment changed while the payout was being reserved',
            );
          }
        }
        return payout;
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
    );
  }

  private isSerializationConflict(error: unknown) {
    return (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code?: string }).code === 'P2034'
    );
  }

  async listProviderPayouts(
    providerId: string,
    marketId: string,
    page = 1,
    limit = 20,
  ) {
    return this.listPayouts({ providerId, marketId }, page, limit);
  }

  async listForAdmin(actor: MarketActor, query: PayoutListQueryDto) {
    const marketId = this.marketAccess.marketForAdmin(actor, query.marketId);
    const where: Prisma.ProviderPayoutWhereInput = {
      status: query.status,
      marketId,
    };
    const term = query.search?.trim();
    if (term) {
      where.OR = [
        { reference: { contains: term, mode: 'insensitive' } },
        { institutionName: { contains: term, mode: 'insensitive' } },
        {
          provider: {
            OR: [
              { email: { contains: term, mode: 'insensitive' } },
              { firstName: { contains: term, mode: 'insensitive' } },
              { lastName: { contains: term, mode: 'insensitive' } },
              { displayName: { contains: term, mode: 'insensitive' } },
            ],
          },
        },
      ];
    }
    return this.listPayouts(where, query.page, query.limit);
  }

  private async listPayouts(
    where: Prisma.ProviderPayoutWhereInput,
    page = 1,
    limit = 20,
  ) {
    const safePage = Math.max(1, page);
    const safeLimit = Math.min(100, Math.max(1, limit));
    const [data, total] = await Promise.all([
      this.prisma.providerPayout.findMany({
        where,
        skip: (safePage - 1) * safeLimit,
        take: safeLimit,
        orderBy: { createdAt: 'desc' },
        include: {
          provider: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              displayName: true,
              email: true,
              avatar: true,
            },
          },
          items: {
            include: {
              settlement: {
                include: {
                  order: {
                    select: { id: true, orderNumber: true, planTitle: true },
                  },
                },
              },
            },
          },
        },
      }),
      this.prisma.providerPayout.count({ where }),
    ]);
    return {
      data,
      pagination: {
        page: safePage,
        limit: safeLimit,
        total,
        pages: Math.ceil(total / safeLimit),
      },
    };
  }

  async approve(payoutId: string, actor: MarketActor | string) {
    const adminActor = this.asActor(actor);
    this.assertEnabled();
    const payout = await this.prisma.providerPayout.findUnique({
      where: { id: payoutId },
      include: { provider: { select: { displayName: true, firstName: true } } },
    });
    if (!payout) throw new NotFoundException('Payout request not found');
    this.marketAccess.assertResource(adminActor, payout.marketId);
    if (payout.status === ProviderPayoutStatus.SUCCESS) return payout;
    if (
      payout.status === ProviderPayoutStatus.PROCESSING ||
      payout.status === ProviderPayoutStatus.OTP_REQUIRED
    ) {
      return payout;
    }
    if (payout.status !== ProviderPayoutStatus.REQUESTED) {
      throw new BadRequestException('This payout can no longer be approved');
    }
    if (!payout.credentialVersionId) {
      throw new BadRequestException('Payout payment credential is missing');
    }
    // Resolve the pinned credential before claiming the payout. If the
    // credential has been revoked or cannot be decrypted, the request must
    // remain retryable instead of becoming stranded in PROCESSING.
    const secretKey = await this.credentials.resolveByCredentialId(
      payout.credentialVersionId,
    );

    const claimed = await this.prisma.providerPayout.updateMany({
      where: {
        id: payoutId,
        status: ProviderPayoutStatus.REQUESTED,
        provider: {
          balanceAdjustments: {
            none: { status: BalanceAdjustmentStatus.OPEN },
          },
        },
        items: {
          some: {},
          every: {
            settlement: {
              status: SettlementStatus.RESERVED,
              order: {
                externalDisputes: {
                  none: {
                    affectsOrderBalance: true,
                    status: { in: ACTIVE_EXTERNAL_DISPUTE_STATUSES },
                  },
                },
              },
            },
          },
        },
        adjustmentItems: {
          every: {
            adjustment: { status: BalanceAdjustmentStatus.RESERVED },
          },
        },
      },
      data: {
        status: ProviderPayoutStatus.PROCESSING,
        approvedAt: new Date(),
        approvedBy: adminActor.id,
        failureMessage: null,
      },
    });
    if (claimed.count !== 1) {
      const current = await this.prisma.providerPayout.findUnique({
        where: { id: payoutId },
      });
      if (current?.status === ProviderPayoutStatus.REQUESTED) {
        throw new BadRequestException(
          'This payout contains earnings that are no longer eligible for transfer',
        );
      }
      return current;
    }

    try {
      const transfer = await this.paystack.initiateTransfer(
        {
          amountMinor: payout.amountMinor,
          recipientCode: payout.recipientCode,
          reference: payout.reference,
          reason: `Pavodah earnings payout to ${payout.provider.displayName || payout.provider.firstName || 'provider'}`,
          currency: payout.currency,
        },
        secretKey,
      );
      return this.saveTransferResponse(payout.id, transfer);
    } catch (error) {
      if (error instanceof PaystackRequestException && !error.outcomeUnknown) {
        await this.releaseApprovalClaim(payout.id, error.providerMessage);
        throw error;
      }
      try {
        const verified = await this.paystack.verifyTransfer(
          payout.reference,
          secretKey,
        );
        return this.saveTransferResponse(payout.id, verified);
      } catch (verificationError) {
        if (
          verificationError instanceof PaystackRequestException &&
          !verificationError.outcomeUnknown
        ) {
          await this.releaseApprovalClaim(
            payout.id,
            error instanceof PaystackRequestException
              ? error.providerMessage
              : 'Paystack did not create the transfer',
          );
          throw error;
        }
        // A timeout can happen after Paystack accepts the stable reference.
        // Keep the payout claimed so reconciliation can establish a conclusive
        // state without creating another transfer attempt.
      }
      await this.prisma.providerPayout.updateMany({
        where: {
          id: payout.id,
          status: {
            in: [
              ProviderPayoutStatus.PROCESSING,
              ProviderPayoutStatus.OTP_REQUIRED,
            ],
          },
        },
        data: {
          status: ProviderPayoutStatus.PROCESSING,
          failureMessage:
            'Transfer result is uncertain. Automatic reconciliation will verify the stable reference.',
        },
      });
      throw error;
    }
  }

  private releaseApprovalClaim(payoutId: string, failureMessage: string) {
    return this.prisma.providerPayout.updateMany({
      where: { id: payoutId, status: ProviderPayoutStatus.PROCESSING },
      data: {
        status: ProviderPayoutStatus.REQUESTED,
        approvedAt: null,
        approvedBy: null,
        failureMessage: failureMessage.slice(0, 500),
      },
    });
  }

  async finalize(payoutId: string, otp: string, actor?: MarketActor) {
    const payout = await this.prisma.providerPayout.findUnique({
      where: { id: payoutId },
    });
    if (!payout) throw new NotFoundException('Payout request not found');
    if (actor) this.marketAccess.assertResource(actor, payout.marketId);
    if (
      payout.status !== ProviderPayoutStatus.OTP_REQUIRED ||
      !payout.transferCode
    ) {
      throw new BadRequestException('This payout is not waiting for an OTP');
    }
    // As with approval, do not claim the OTP submission until its pinned
    // credential is known to be usable.
    if (!payout.credentialVersionId) {
      throw new BadRequestException('Payout payment credential is missing');
    }
    const secretKey = await this.credentials.resolveByCredentialId(
      payout.credentialVersionId,
    );
    const claimed = await this.prisma.providerPayout.updateMany({
      where: {
        id: payout.id,
        status: ProviderPayoutStatus.OTP_REQUIRED,
        transferCode: payout.transferCode,
      },
      data: {
        status: ProviderPayoutStatus.PROCESSING,
        failureMessage: null,
      },
    });
    if (claimed.count !== 1) {
      throw new BadRequestException(
        'This payout OTP is already being submitted',
      );
    }

    try {
      const transfer = await this.paystack.finalizeTransfer(
        payout.transferCode,
        otp,
        secretKey,
      );
      return this.saveTransferResponse(payout.id, transfer);
    } catch (error) {
      if (error instanceof PaystackRequestException && !error.outcomeUnknown) {
        await this.prisma.providerPayout.updateMany({
          where: {
            id: payout.id,
            status: ProviderPayoutStatus.PROCESSING,
          },
          data: {
            status: ProviderPayoutStatus.OTP_REQUIRED,
            failureMessage: error.providerMessage.slice(0, 500),
          },
        });
      }
      throw error;
    }
  }

  private async saveTransferResponse(
    payoutId: string,
    transfer: PaystackTransferData,
  ) {
    const current = await this.prisma.providerPayout.findUnique({
      where: { id: payoutId },
      select: { reference: true },
    });
    if (!current) throw new NotFoundException('Payout request not found');
    if (transfer.reference && transfer.reference !== current.reference) {
      throw new BadRequestException(
        'Paystack returned an unexpected transfer reference',
      );
    }
    const normalizedTransfer = {
      ...transfer,
      reference: transfer.reference || current.reference,
    };
    const payout = await applyPaystackTransferState(
      this.prisma,
      eventForTransferStatus(normalizedTransfer.status),
      normalizedTransfer,
      { logger: this.logger, strict: true },
    );
    if (payout) await this.notificationEvents?.payoutUpdated(payout);
    return payout;
  }

  private asActor(actor: MarketActor | string): MarketActor {
    return typeof actor === 'string'
      ? { id: actor, role: Role.SUPER_ADMIN }
      : actor;
  }

  async reject(payoutId: string, actor: MarketActor, reason: string) {
    const rejected = await this.prisma.$transaction(
      async (tx) => {
        const payout = await tx.providerPayout.findUnique({
          where: { id: payoutId },
          include: { items: true, adjustmentItems: true },
        });
        if (!payout) throw new NotFoundException('Payout request not found');
        this.marketAccess.assertResource(actor, payout.marketId);
        if (payout.status !== ProviderPayoutStatus.REQUESTED) {
          throw new BadRequestException(
            'Only a payout that has not been sent to Paystack can be rejected',
          );
        }
        await Promise.all([
          tx.orderSettlement.updateMany({
            where: {
              id: { in: payout.items.map((item) => item.settlementId) },
              status: SettlementStatus.RESERVED,
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
              status: SettlementStatus.RESERVED,
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
          tx.providerBalanceAdjustment.updateMany({
            where: {
              id: {
                in: payout.adjustmentItems.map((item) => item.adjustmentId),
              },
              status: BalanceAdjustmentStatus.RESERVED,
            },
            data: { status: BalanceAdjustmentStatus.OPEN },
          }),
        ]);
        return tx.providerPayout.update({
          where: { id: payout.id },
          data: {
            status: ProviderPayoutStatus.REJECTED,
            rejectedAt: new Date(),
            rejectedBy: actor.id,
            rejectionReason: reason.trim(),
          },
        });
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
    );
    await this.notificationEvents?.payoutUpdated(rejected);
    return rejected;
  }

  async listReleaseReviews(
    actor: MarketActor,
    requestedMarketId: string | undefined,
    page = 1,
    limit = 20,
  ) {
    const safePage = Math.max(1, page);
    const safeLimit = Math.min(100, Math.max(1, limit));
    const marketId = this.marketAccess.marketForAdmin(actor, requestedMarketId);
    const where = {
      releaseReviewStatus: ReleaseReviewStatus.REQUESTED,
      marketId,
    };
    const [data, total] = await Promise.all([
      this.prisma.orderSettlement.findMany({
        where,
        skip: (safePage - 1) * safeLimit,
        take: safeLimit,
        orderBy: { releaseReviewRequestedAt: 'asc' },
        include: {
          provider: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              displayName: true,
              email: true,
            },
          },
          order: {
            include: {
              client: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  displayName: true,
                  email: true,
                },
              },
              service: { select: { id: true, title: true } },
            },
          },
        },
      }),
      this.prisma.orderSettlement.count({ where }),
    ]);
    return {
      data,
      pagination: {
        page: safePage,
        limit: safeLimit,
        total,
        pages: Math.ceil(total / safeLimit),
      },
    };
  }

  async reviewRelease(
    actor: MarketActor,
    orderId: string,
    approve: boolean,
    note?: string,
  ) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      select: { marketId: true },
    });
    if (!order) throw new NotFoundException('Order not found');
    this.marketAccess.assertResource(actor, order.marketId);
    return this.settlements.reviewRelease(orderId, approve, note);
  }

  getSettings(actor: MarketActor, requestedMarketId?: string) {
    const marketId = this.marketAccess.marketForAdmin(actor, requestedMarketId);
    if (!marketId) {
      throw new BadRequestException('Choose a market');
    }
    return this.prisma.paymentSetting.upsert({
      where: { marketId },
      create: { marketId, commissionRate: 10 },
      update: {},
      include: {
        market: {
          select: { id: true, name: true, currency: true, locale: true },
        },
      },
    });
  }

  updateSettings(
    actor: MarketActor,
    requestedMarketId: string | undefined,
    commissionRate: number,
  ) {
    const marketId = this.marketAccess.marketForAdmin(actor, requestedMarketId);
    if (!marketId) throw new BadRequestException('Choose a market');
    return this.prisma.paymentSetting.upsert({
      where: { marketId },
      create: { marketId, commissionRate, updatedBy: actor.id },
      update: { commissionRate, updatedBy: actor.id },
      include: {
        market: {
          select: { id: true, name: true, currency: true, locale: true },
        },
      },
    });
  }
}
