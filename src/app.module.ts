import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OnboardingModule } from './onboarding/onboarding.module';
import { CategoriesModule } from './categories/categories.module';
import { ServicesModule } from './services/services.module';
import { OrdersModule } from './orders/orders.module';
import { ReviewsModule } from './reviews/reviews.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { AppController } from './app.controller';
import { APP_GUARD, APP_FILTER } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as path from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { ApplicationExceptionFilter } from './common/filters/http-filter.filter';
import { SeederModule } from './common/seeders/seeder.module';
import { ChatModule } from './chat/chat.module';
import { QuoteModule } from './quote/quote.module';
import { DisputeModule } from './dispute/dispute.module';
import { BotChatController } from './botChat/botChat.controller';
import { BotChatModule } from './botChat/botChat.module';
import { SupportChatModule } from './supportChat/supportChat.module';

@Module({
  imports: [
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          dirname: path.join(__dirname, './../log/info/'),
          filename: 'info.log',
          level: 'info',
        }),
        new winston.transports.File({
          dirname: path.join(__dirname, './../log/error/'),
          filename: 'error.log',
          level: 'error',
        }),
      ],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UsersModule,
    OnboardingModule,
    CategoriesModule,
    ServicesModule,
    OrdersModule,
    ReviewsModule,
    AnalyticsModule,
    PrismaModule,
    SeederModule,
    ChatModule,
    QuoteModule,
    DisputeModule,
    BotChatModule,
    SupportChatModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: ApplicationExceptionFilter,
    },
  ],
})
export class AppModule {}
