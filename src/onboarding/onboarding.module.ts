import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { OnboardingController } from './onboarding.controller';
import { OnboardingService } from './onboarding.service';
import { OnboardingStatusService } from './onboarding-status.service';
import { FileUploadService } from '../common/services/file-upload.service';
import { PrismaModule } from '../prisma/prisma.module';
import { memoryStorage } from 'multer';

@Module({
  imports: [
    PrismaModule,
    MulterModule.register({
      storage: memoryStorage(),
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
      },
    }),
  ],
  controllers: [OnboardingController],
  providers: [OnboardingService, OnboardingStatusService, FileUploadService],
  exports: [OnboardingService, OnboardingStatusService],
})
export class OnboardingModule {}
