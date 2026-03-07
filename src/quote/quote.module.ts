import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { FileUploadService } from '../common/services/file-upload.service';

@Module({
  imports: [PrismaModule, ConfigModule],
  providers: [QuoteService, FileUploadService],
  controllers: [QuoteController],
})
export class QuoteModule {}
