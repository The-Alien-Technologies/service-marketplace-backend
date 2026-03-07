import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { FileUploadService } from 'src/common/services/file-upload.service';

@Module({
  imports: [JwtModule, ConfigModule, PrismaModule],
  providers: [ChatService, ChatGateway, FileUploadService],
  controllers: [ChatController],
})
export class ChatModule {}
