import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PaymentsModule } from '../payments/payments.module';
import { PrismaModule } from '../prisma/prisma.module';
import { SettlementsModule } from '../settlements/settlements.module';
import { PayoutsController } from './payouts.controller';
import { PayoutsService } from './payouts.service';
import { MarketsModule } from '../markets/markets.module';

@Module({
  imports: [
    PrismaModule,
    PaymentsModule,
    AuthModule,
    SettlementsModule,
    MarketsModule,
  ],
  controllers: [PayoutsController],
  providers: [PayoutsService],
  exports: [PayoutsService],
})
export class PayoutsModule {}
