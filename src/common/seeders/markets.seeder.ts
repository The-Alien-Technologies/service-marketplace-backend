import { Injectable, Logger } from '@nestjs/common';
import {
  MarketStatus,
  PaymentIntegrationStatus,
  PaymentProvider,
} from '../../../generated/prisma';
import { PrismaService } from '../../prisma/prisma.service';

const DEFAULT_MARKETS = [
  {
    code: 'GH',
    name: 'Ghana',
    currency: 'GHS',
    locale: 'en-GH',
    paystackCountry: 'ghana',
    sortOrder: 10,
  },
  {
    code: 'ZA',
    name: 'South Africa',
    currency: 'ZAR',
    locale: 'en-ZA',
    paystackCountry: 'south-africa',
    sortOrder: 20,
  },
] as const;

@Injectable()
export class MarketsSeeder {
  private readonly logger = new Logger(MarketsSeeder.name);

  constructor(private readonly prisma: PrismaService) {}

  async seed() {
    for (const definition of DEFAULT_MARKETS) {
      const market = await this.prisma.market.upsert({
        where: { code: definition.code },
        create: { ...definition, status: MarketStatus.ACTIVE },
        update: definition,
      });

      await this.prisma.paymentSetting.upsert({
        where: { marketId: market.id },
        create: { marketId: market.id, commissionRate: 10 },
        update: {},
      });

      await this.prisma.paymentIntegration.upsert({
        where: {
          marketId_provider: {
            marketId: market.id,
            provider: PaymentProvider.PAYSTACK,
          },
        },
        create: {
          marketId: market.id,
          provider: PaymentProvider.PAYSTACK,
          status: PaymentIntegrationStatus.ACTIVE,
        },
        update: {},
      });
    }
    this.logger.log('Ghana and South Africa market configuration is ready');
  }
}
