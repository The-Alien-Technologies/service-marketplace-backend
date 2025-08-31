// User-related enums matching Prisma schema

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
  TRIAL = 'TRIAL',
  PAUSED = 'PAUSED',
}

export enum SubscriptionTier {
  BASIC = 'basic',
  PREMIUM = 'premium',
  PRO = 'pro',
}

export enum ThemePreference {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
  SYSTEM = 'SYSTEM',
}

export enum PreferredUnits {
  METRIC = 'METRIC',
  IMPERIAL = 'IMPERIAL',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  DELETED = 'DELETED',
}

export enum ExperienceLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  EXPERT = 'EXPERT',
}

export enum UserInterestType {
  INTEREST = 'INTEREST',
  SERVICE = 'SERVICE',
}

export enum DocumentType {
  CERTIFICATION = 'CERTIFICATION',
  LICENSE = 'LICENSE',
  TRAINING_CERTIFICATE = 'TRAINING_CERTIFICATE',
  ID_DOCUMENT = 'ID_DOCUMENT',
  OTHER = 'OTHER',
}

export enum DocumentStatus {
  UPLOADED = 'UPLOADED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}
