import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash } from 'crypto';
import {
  PaymentCredentialStatus,
  PaymentIntegrationStatus,
  PaymentProvider,
  PayoutAccountStatus,
  Prisma,
} from '../../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentCredentialCrypto } from './payment-credential.crypto';
import { PaystackService } from './paystack.service';

const CREDENTIAL_SELECT = {
  id: true,
  integrationId: true,
  version: true,
  fingerprint: true,
  status: true,
  validatedAt: true,
  activatedAt: true,
  retiringAt: true,
  expiresAt: true,
  revokedAt: true,
  createdAt: true,
  createdBy: {
    select: { id: true, firstName: true, lastName: true, email: true },
  },
} as const;

@Injectable()
export class PaymentCredentialsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly crypto: PaymentCredentialCrypto,
    private readonly paystack: PaystackService,
  ) {}

  listIntegrations() {
    return this.prisma.paymentIntegration.findMany({
      include: {
        market: true,
        credentials: {
          select: CREDENTIAL_SELECT,
          orderBy: { version: 'desc' },
        },
      },
      orderBy: [{ market: { sortOrder: 'asc' } }],
    });
  }

  async stage(integrationId: string, secretKey: string, actorId: string) {
    const integration = await this.prisma.paymentIntegration.findUnique({
      where: { id: integrationId },
      include: { market: true },
    });
    if (!integration)
      throw new NotFoundException('Payment integration not found');
    const type = integration.market.code === 'ZA' ? 'basa' : 'ghipss';
    await this.paystack.listInstitutions(type, {
      country: integration.market.paystackCountry,
      currency: integration.market.currency,
      secretKey,
    });

    const encrypted = this.crypto.encrypt(secretKey);
    const fingerprint = createHash('sha256')
      .update(secretKey)
      .digest('hex')
      .slice(0, 16);

    return this.prisma.$transaction(
      async (tx) => {
        const latest = await tx.paymentCredentialVersion.findFirst({
          where: { integrationId },
          orderBy: { version: 'desc' },
          select: { version: true },
        });
        const credential = await tx.paymentCredentialVersion.create({
          data: {
            integrationId,
            version: (latest?.version ?? 0) + 1,
            ...encrypted,
            fingerprint,
            status: PaymentCredentialStatus.STAGED,
            validatedAt: new Date(),
            createdById: actorId,
          },
          select: CREDENTIAL_SELECT,
        });
        await tx.adminAuditLog.create({
          data: {
            actorId,
            marketId: integration.marketId,
            action: 'PAYMENT_CREDENTIAL_STAGED',
            entityType: 'PaymentCredentialVersion',
            entityId: credential.id,
            metadata: {
              integrationId,
              fingerprint,
              version: credential.version,
            },
          },
        });
        return credential;
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
    );
  }

  async activate(credentialId: string, actorId: string) {
    const candidate = await this.prisma.paymentCredentialVersion.findUnique({
      where: { id: credentialId },
      include: { integration: true },
    });
    if (!candidate) throw new NotFoundException('Payment credential not found');
    if (candidate.status !== PaymentCredentialStatus.STAGED) {
      throw new BadRequestException(
        'Only a staged credential can be activated',
      );
    }
    const now = new Date();
    const retirementHours = Math.max(
      1,
      Number(this.config.get('PAYMENT_CREDENTIAL_RETIREMENT_HOURS', '72')) ||
        72,
    );
    const expiresAt = new Date(now.getTime() + retirementHours * 3_600_000);
    return this.prisma.$transaction(
      async (tx) => {
        const claimed = await tx.paymentCredentialVersion.updateMany({
          where: {
            id: credentialId,
            status: PaymentCredentialStatus.STAGED,
          },
          data: {
            status: PaymentCredentialStatus.ACTIVE,
            activatedAt: now,
            retiringAt: null,
            expiresAt: null,
          },
        });
        if (claimed.count !== 1) {
          throw new BadRequestException('This credential is no longer staged');
        }
        await tx.paymentCredentialVersion.updateMany({
          where: {
            integrationId: candidate.integrationId,
            status: PaymentCredentialStatus.ACTIVE,
            id: { not: credentialId },
          },
          data: {
            status: PaymentCredentialStatus.RETIRING,
            retiringAt: now,
            expiresAt,
          },
        });
        const invalidatedAccounts = await tx.providerPayoutAccount.updateMany({
          where: {
            paymentIntegrationId: candidate.integrationId,
            status: PayoutAccountStatus.ACTIVE,
          },
          data: { status: PayoutAccountStatus.INACTIVE },
        });
        const activated = await tx.paymentCredentialVersion.findUniqueOrThrow({
          where: { id: credentialId },
          select: CREDENTIAL_SELECT,
        });
        await tx.adminAuditLog.create({
          data: {
            actorId,
            marketId: candidate.integration.marketId,
            action: 'PAYMENT_CREDENTIAL_ACTIVATED',
            entityType: 'PaymentCredentialVersion',
            entityId: credentialId,
            metadata: {
              integrationId: candidate.integrationId,
              version: candidate.version,
              invalidatedPayoutAccounts: invalidatedAccounts.count,
            },
          },
        });
        return activated;
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
    );
  }

  async revoke(credentialId: string, actorId: string) {
    const credential = await this.prisma.paymentCredentialVersion.findUnique({
      where: { id: credentialId },
      include: { integration: true },
    });
    if (!credential)
      throw new NotFoundException('Payment credential not found');
    if (credential.status === PaymentCredentialStatus.ACTIVE) {
      throw new BadRequestException(
        'Activate a replacement before revoking this key',
      );
    }
    const revoked = await this.prisma.paymentCredentialVersion.update({
      where: { id: credentialId },
      data: { status: PaymentCredentialStatus.REVOKED, revokedAt: new Date() },
      select: CREDENTIAL_SELECT,
    });
    await this.prisma.adminAuditLog.create({
      data: {
        actorId,
        marketId: credential.integration.marketId,
        action: 'PAYMENT_CREDENTIAL_REVOKED',
        entityType: 'PaymentCredentialVersion',
        entityId: credentialId,
        metadata: { version: credential.version },
      },
    });
    return revoked;
  }

  async resolveForMarket(marketId: string) {
    const integration = await this.prisma.paymentIntegration.findUnique({
      where: {
        marketId_provider: {
          marketId,
          provider: PaymentProvider.PAYSTACK,
        },
      },
    });
    if (
      !integration ||
      integration.status !== PaymentIntegrationStatus.ACTIVE
    ) {
      throw new ServiceUnavailableException(
        'Payments are not configured for this market',
      );
    }
    return this.resolveActive(integration.id);
  }

  async resolveActive(integrationId: string) {
    const credential = await this.prisma.paymentCredentialVersion.findFirst({
      where: {
        integrationId,
        status: PaymentCredentialStatus.ACTIVE,
      },
      orderBy: { version: 'desc' },
    });
    if (!credential) {
      throw new ServiceUnavailableException(
        'Payments are not configured for this market',
      );
    }
    return {
      integrationId,
      credentialVersionId: credential.id,
      secretKey: this.crypto.decrypt(credential),
    };
  }

  async resolveByCredentialId(credentialVersionId: string) {
    const credential = await this.prisma.paymentCredentialVersion.findUnique({
      where: { id: credentialVersionId },
    });
    if (!credential || credential.status === PaymentCredentialStatus.REVOKED) {
      throw new ServiceUnavailableException(
        'Payment credential is unavailable',
      );
    }
    return this.crypto.decrypt(credential);
  }

  async webhookCandidates(webhookKey: string) {
    const integration = await this.prisma.paymentIntegration.findFirst({
      where: {
        webhookKey,
        status: { not: PaymentIntegrationStatus.RETIRED },
      },
      include: {
        credentials: {
          where: {
            OR: [
              { status: PaymentCredentialStatus.ACTIVE },
              {
                status: PaymentCredentialStatus.RETIRING,
                expiresAt: { gt: new Date() },
              },
            ],
          },
          orderBy: { version: 'desc' },
        },
      },
    });
    if (!integration)
      throw new NotFoundException('Webhook integration not found');
    return {
      integration,
      credentials: integration.credentials.map((credential) => ({
        id: credential.id,
        secretKey: this.crypto.decrypt(credential),
      })),
    };
  }
}
