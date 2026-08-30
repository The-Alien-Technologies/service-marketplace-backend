import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { PaystackService } from './paystack.service';
import { PaystackWebhookGuard } from './paystack-webhook.guard';
import { SettlementsModule } from '../settlements/settlements.module';

@Module({
  imports: [PrismaModule, SettlementsModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaystackService, PaystackWebhookGuard],
  exports: [PaymentsService, PaystackService],
})
export class PaymentsModule {}
