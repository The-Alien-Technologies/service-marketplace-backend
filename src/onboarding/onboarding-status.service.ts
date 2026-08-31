import { Injectable } from '@nestjs/common';
import {
  Role,
  User,
  UserAddress,
  UserInterest,
  UserInterestType,
  VerificationDocument,
} from '../../generated/prisma';

// Extended User type with relations
type UserWithRelations = User & {
  addresses?: UserAddress[];
  interests?: UserInterest[];
  verificationDocuments?: VerificationDocument[];
};

export interface OnboardingStep {
  step: string;
  required: boolean;
  completed: boolean;
  label: string;
  description: string;
}

export interface OnboardingStatus {
  isComplete: boolean;
  nextRequiredStep?: string;
  completedSteps: string[];
  requiredSteps: string[];
  steps: OnboardingStep[];
  completionPercentage: number;
}

@Injectable()
export class OnboardingStatusService {
  /**
   * Get comprehensive onboarding status for a user
   */
  getOnboardingStatus(user: UserWithRelations): OnboardingStatus {
    const steps = this.getAllSteps(user);
    const completedSteps = steps
      .filter((step) => step.completed)
      .map((step) => step.step);
    const requiredSteps = steps
      .filter((step) => step.required)
      .map((step) => step.step);
    const nextRequiredStep = this.getNextRequiredStep(steps);
    const completionPercentage = this.calculateCompletionPercentage(steps);

    return {
      isComplete: nextRequiredStep === null,
      nextRequiredStep,
      completedSteps,
      requiredSteps,
      steps,
      completionPercentage,
    };
  }

  /**
   * Check if user has completed onboarding
   */
  isOnboardingComplete(user: UserWithRelations): boolean {
    const status = this.getOnboardingStatus(user);
    return status.isComplete;
  }

  /**
   * Get the next required step for the user
   */
  getNextStep(user: UserWithRelations): string | null {
    const status = this.getOnboardingStatus(user);
    return status.nextRequiredStep || null;
  }

  /**
   * Define all onboarding steps for a user based on their role
   */
  private getAllSteps(user: UserWithRelations): OnboardingStep[] {
    const baseSteps: OnboardingStep[] = [
      {
        step: 'email_verification',
        required: true,
        completed: this.isEmailVerificationComplete(user),
        label: 'Email Verification',
        description: 'Verify your email address',
      },
      {
        step: 'location',
        required: true,
        completed: this.isLocationComplete(user),
        label: 'Location',
        description: 'Add your location details',
      },
      {
        step: 'basic_profile',
        required: true,
        completed: this.isBasicProfileComplete(user),
        label: 'Basic Profile',
        description: 'Complete your basic profile information',
      },
      {
        step: 'interests',
        required: true,
        completed: this.isInterestsComplete(user),
        label: 'Interests',
        description: 'Select your interests and services',
      },
    ];

    // Add service provider specific steps
    if (user.role === Role.SERVICE_PROVIDER) {
      baseSteps.push(
        {
          step: 'experience',
          required: true,
          completed: this.isExperienceComplete(user),
          label: 'Experience Level',
          description: 'Set your experience level',
        },
        {
          step: 'verification_documents',
          required: true,
          completed: this.isVerificationDocumentsComplete(user),
          label: 'Verification Documents',
          description: 'Upload verification documents',
        },
      );
    }

    return baseSteps;
  }

  /**
   * Individual step validation methods
   */
  private isEmailVerificationComplete(user: UserWithRelations): boolean {
    return user.emailVerified;
  }

  private isBasicProfileComplete(user: UserWithRelations): boolean {
    return !!(
      user.firstName &&
      user.firstName.trim() !== '' &&
      user.lastName &&
      user.lastName.trim() !== '' &&
      user.phoneNumber &&
      user.phoneVerified
    );
  }

  private isLocationComplete(user: UserWithRelations): boolean {
    // Check if user has at least one address
    return !!(user.addresses && user.addresses.length > 0);
  }

  private isInterestsComplete(user: UserWithRelations): boolean {
    if (!user.interests) return false;
    if (user.role !== Role.SERVICE_PROVIDER) return user.interests.length > 0;
    return user.interests.some(
      (interest) => interest.type === UserInterestType.SERVICE,
    );
  }

  private isExperienceComplete(user: UserWithRelations): boolean {
    return !!user.serviceProviderExperienceLevel;
  }

  private isVerificationDocumentsComplete(user: UserWithRelations): boolean {
    // Check if user has uploaded at least one verification document
    return !!(
      user.verificationDocuments && user.verificationDocuments.length > 0
    );
  }

  /**
   * Get the next required step that's not completed
   */
  private getNextRequiredStep(steps: OnboardingStep[]): string | null {
    const nextStep = steps.find((step) => step.required && !step.completed);
    return nextStep ? nextStep.step : null;
  }

  /**
   * Calculate completion percentage based on required steps
   */
  private calculateCompletionPercentage(steps: OnboardingStep[]): number {
    const requiredSteps = steps.filter((step) => step.required);
    const completedRequiredSteps = requiredSteps.filter(
      (step) => step.completed,
    );

    if (requiredSteps.length === 0) return 100;

    return Math.round(
      (completedRequiredSteps.length / requiredSteps.length) * 100,
    );
  }

  /**
   * Map step names to frontend route names
   */
  getStepRoute(step: string): string {
    const stepRouteMap: Record<string, string> = {
      email_verification: 'verify-email',
      basic_profile: 'onboarding-profile',
      location: 'onboarding-location',
      interests: 'onboarding-interests',
      experience: 'onboarding-experience',
      verification_documents: 'onboarding-documents',
    };

    return stepRouteMap[step] || 'onboarding-personalize';
  }

  /**
   * Get user-friendly message for a step
   */
  getStepMessage(step: string): string {
    const stepMessageMap: Record<string, string> = {
      email_verification: 'Please verify your email address to continue.',
      basic_profile: 'Complete your basic profile information.',
      location: 'Please add your location details.',
      interests: 'Select your interests and services.',
      experience: 'Set your experience level.',
      verification_documents: 'Upload your verification documents.',
    };

    return stepMessageMap[step] || 'Please complete your profile setup.';
  }
}
