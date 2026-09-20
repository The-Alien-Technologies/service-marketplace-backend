import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { MarketAccessService } from './market-access.service';
import { MarketsController } from './markets.controller';
import { MarketsService } from './markets.service';

@Module({
  imports: [PrismaModule],
  controllers: [MarketsController],
  providers: [MarketsService, MarketAccessService],
  exports: [MarketsService, MarketAccessService],
})
export class MarketsModule {}
