import { Role, UserInterestType } from '../../generated/prisma';
import { OnboardingStatusService } from './onboarding-status.service';

describe('OnboardingStatusService', () => {
  const service = new OnboardingStatusService();

  const provider = {
    role: Role.SERVICE_PROVIDER,
    emailVerified: true,
    firstName: 'Ama',
    lastName: 'Mensah',
    phoneNumber: '+233200000000',
    phoneVerified: true,
    addresses: [{ id: 'address-1' }],
    interests: [{ id: 'interest-1', type: UserInterestType.SERVICE }],
    serviceProviderExperienceLevel: 'EXPERT',
    verificationDocuments: [{ id: 'document-1' }],
  } as any;

  it('does not report onboarding complete until the phone is verified', () => {
    const status = service.getOnboardingStatus({
      ...provider,
      phoneVerified: false,
    });

    expect(status.isComplete).toBe(false);
    expect(status.nextRequiredStep).toBe('basic_profile');
  });

  it('reports a fully verified provider application as complete', () => {
    expect(service.getOnboardingStatus(provider).isComplete).toBe(true);
  });

  it('returns incomplete provider steps in the same order as the provider flow', () => {
    const status = service.getOnboardingStatus({
      ...provider,
      firstName: null,
      lastName: null,
      phoneNumber: null,
      phoneVerified: false,
      addresses: [],
      interests: [],
      serviceProviderExperienceLevel: null,
      verificationDocuments: [],
    });

    expect(status.requiredSteps).toEqual([
      'email_verification',
      'basic_profile',
      'interests',
      'experience',
      'location',
      'verification_documents',
    ]);
    expect(status.nextRequiredStep).toBe('basic_profile');
  });

  it('does not count a client interest as a provider service category', () => {
    const status = service.getOnboardingStatus({
      ...provider,
      interests: [{ id: 'interest-1', type: UserInterestType.INTEREST }],
    });

    expect(status.isComplete).toBe(false);
    expect(status.nextRequiredStep).toBe('interests');
  });
});
