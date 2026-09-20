import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { PaystackService } from './paystack.service';
import { PaystackWebhookGuard } from './paystack-webhook.guard';
import { SettlementsModule } from '../settlements/settlements.module';
import { PaymentCredentialCrypto } from './payment-credential.crypto';
import { PaymentCredentialsService } from './payment-credentials.service';
import { PaymentCredentialsController } from './payment-credentials.controller';
import { MarketsModule } from '../markets/markets.module';

@Module({
  imports: [PrismaModule, SettlementsModule, MarketsModule],
  controllers: [PaymentsController, PaymentCredentialsController],
  providers: [
    PaymentsService,
    PaystackService,
    PaystackWebhookGuard,
    PaymentCredentialCrypto,
    PaymentCredentialsService,
  ],
  exports: [PaymentsService, PaystackService, PaymentCredentialsService],
})
export class PaymentsModule {}
