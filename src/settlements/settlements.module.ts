import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SettlementsService } from './settlements.service';

@Module({
  imports: [PrismaModule],
  providers: [SettlementsService],
  exports: [SettlementsService],
})
export class SettlementsModule {}
