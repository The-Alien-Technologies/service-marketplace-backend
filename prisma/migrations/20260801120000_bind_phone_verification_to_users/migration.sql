-- OTP attempts are short-lived and cannot be assigned safely to users retroactively.
TRUNCATE TABLE "phone_verifications";

ALTER TABLE "phone_verifications"
ADD COLUMN "userId" TEXT NOT NULL;

CREATE TABLE "verified_phones" (
    "phoneNumber" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "verifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verified_phones_pkey" PRIMARY KEY ("phoneNumber")
);

CREATE UNIQUE INDEX "verified_phones_userId_key"
ON "verified_phones"("userId");

CREATE INDEX "phone_verifications_userId_phoneNumber_createdAt_idx"
ON "phone_verifications"("userId", "phoneNumber", "createdAt");

ALTER TABLE "phone_verifications"
ADD CONSTRAINT "phone_verifications_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "users"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "verified_phones"
ADD CONSTRAINT "verified_phones_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "users"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
