import {
  Controller,
  Put,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OnboardingService } from './onboarding.service';
import { OnboardingStatusService } from './onboarding-status.service';
import {
  UpdateLocationDto,
  UpdateProfileDto,
  UpdateInterestsDto,
  UpdateExperienceDto,
  UploadDocumentDto,
} from './dto';
import { ResponseUtil } from '../common/utils/response.util';

@Controller('onboarding')
@UseGuards(JwtAuthGuard)
export class OnboardingController {
  constructor(
    private readonly onboardingService: OnboardingService,
    private readonly onboardingStatusService: OnboardingStatusService,
  ) {}

  @Get('status')
  async getOnboardingStatus(@Req() req: Request) {
    const user = await this.onboardingService.getUserWithRelations(req.currentUser.id);
    const status = this.onboardingStatusService.getOnboardingStatus(user);
    return ResponseUtil.success(status, 'Onboarding status retrieved successfully');
  }

  @Put('location')
  async updateLocation(@Req() req: Request, @Body() locationDto: UpdateLocationDto) {
      const address = await this.onboardingService.updateLocation(req.currentUser.id, locationDto);
      return ResponseUtil.success(address, 'Location updated successfully');
  }

  @Put('profile')
  @UseInterceptors(FileInterceptor('avatar'))
  async updateProfile(
    @Req() req: Request,
    @Body() profileDto: UpdateProfileDto,
    @UploadedFile() avatarFile?: Express.Multer.File,
  ) {
      const user = await this.onboardingService.updateProfileWithAvatar(
        req.currentUser.id,
        profileDto,
        avatarFile,
      );
      return ResponseUtil.success(
        {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          displayName: user.displayName,
          username: user.username,
          bio: user.bio,
          dateOfBirth: user.dateOfBirth,
          phoneNumber: user.phoneNumber,
          countryCode: user.countryCode,
          preferredLanguage: user.preferredLanguage,
          avatar: user.avatar,
          profileCompleteness: user.profileCompleteness,
        },
        'Profile updated successfully',
      );
  }

  @Put('interests')
  async updateInterests(@Req() req: Request, @Body() interestsDto: UpdateInterestsDto) {
      const interests = await this.onboardingService.updateInterests(req.currentUser.id, interestsDto);
      return ResponseUtil.success(interests, 'Interests updated successfully');
  }

  @Put('experience')
  async updateExperience(@Req() req: Request, @Body() experienceDto: UpdateExperienceDto) {
      const user = await this.onboardingService.updateExperience(req.currentUser.id, experienceDto);
      return ResponseUtil.success(
        {
          id: user.id,
          serviceProviderExperienceLevel: user.serviceProviderExperienceLevel,
          profileCompleteness: user.profileCompleteness,
        },
        'Experience level updated successfully',
      );
  }

  @Post('documents')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
    @Body() documentDto: UploadDocumentDto,
  ) {
      if (!file) {
        throw new BadRequestException('File is required');
      }

      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        throw new BadRequestException('File size cannot exceed 10MB');
      }

      // Validate file type (documents and images only)
      const allowedTypes = [
        'application/pdf',
        'image/jpeg',
        'image/jpg',
        'image/png',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];

      if (!allowedTypes.includes(file.mimetype)) {
        throw new BadRequestException('Invalid file type. Only PDF, DOC, DOCX, and images are allowed');
      }

      const document = await this.onboardingService.uploadDocument(req.currentUser.id, file, documentDto);

      return ResponseUtil.success(document, 'Document uploaded successfully');
  }

  @Get('documents')
  async getUserDocuments(@Req() req: Request) {
      const documents = await this.onboardingService.getUserDocuments(req.currentUser.id);
      return ResponseUtil.success(documents, 'Documents retrieved successfully');
  }

  @Delete('documents/:id')
  async deleteDocument(@Req() req: Request, @Param('id') documentId: string) {
      await this.onboardingService.deleteDocument(req.currentUser.id, documentId);
      return ResponseUtil.success(null, 'Document deleted successfully');
  }

  @Post('complete')
  async completeOnboarding(@Req() req: Request) {
      const user = await this.onboardingService.completeOnboarding(req.currentUser.id);
      return ResponseUtil.success(
        {
          id: user.id,
          hasCompletedOnboarding: user.hasCompletedOnboarding,
          onboardingCompletedAt: user.onboardingCompletedAt,
          profileCompleteness: user.profileCompleteness,
        },
        'Onboarding completed successfully',
      );
  }

}
