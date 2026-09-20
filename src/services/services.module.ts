import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { FileUploadService } from '../common/services/file-upload.service';
import { MarketsModule } from '../markets/markets.module';

@Module({
  imports: [PrismaModule, MarketsModule],
  controllers: [ServicesController],
  providers: [ServicesService, FileUploadService],
  exports: [ServicesService],
})
export class ServicesModule {}
