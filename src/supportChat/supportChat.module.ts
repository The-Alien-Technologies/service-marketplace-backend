  import { Module } from '@nestjs/common';
  import { JwtModule } from '@nestjs/jwt';
  import { ConfigModule } from '@nestjs/config';
  import { PrismaModule } from '../prisma/prisma.module';
  import { SupportChatService } from './supportChat.service';
  import { SupportChatGateway } from './supportChat.gateway';
  import { SupportChatController } from './supportChat.controller';

  @Module({
    imports: [JwtModule, ConfigModule, PrismaModule],
    providers: [SupportChatService, SupportChatGateway],
    controllers: [SupportChatController],
  })
  export class SupportChatModule {}