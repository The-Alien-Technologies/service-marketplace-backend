ALTER TABLE "users"
ADD COLUMN "providerApplicationSubmittedAt" TIMESTAMP(3),
ADD COLUMN "providerApplicationReviewedAt" TIMESTAMP(3),
ADD COLUMN "providerApplicationReviewedBy" TEXT,
ADD COLUMN "providerApplicationRejectionReason" TEXT;

UPDATE "users"
SET
  "status" = 'PENDING',
  "isServiceProviderVerified" = false,
  "serviceProviderVerifiedAt" = NULL,
  "providerApplicationSubmittedAt" = CASE
    WHEN "hasCompletedOnboarding" THEN COALESCE("onboardingCompletedAt", "updatedAt")
    ELSE NULL
  END,
  "providerApplicationReviewedAt" = NULL,
  "providerApplicationReviewedBy" = NULL,
  "providerApplicationRejectionReason" = NULL
WHERE "role" = 'SERVICE_PROVIDER'
  AND "status" = 'ACTIVE';

CREATE INDEX "users_role_status_providerApplicationSubmittedAt_idx"
ON "users"("role", "status", "providerApplicationSubmittedAt");
