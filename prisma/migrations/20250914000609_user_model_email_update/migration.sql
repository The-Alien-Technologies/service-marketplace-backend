-- AlterTable
ALTER TABLE "users" ADD COLUMN     "emailVerificationAttempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "emailVerificationExpires" TIMESTAMP(3),
ADD COLUMN     "emailVerificationOtp" TEXT;
