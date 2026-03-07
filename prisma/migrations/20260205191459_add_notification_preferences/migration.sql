-- AlterTable
ALTER TABLE "users" ADD COLUMN     "emailNotificationsEnabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "smsNotificationsEnabled" BOOLEAN NOT NULL DEFAULT false;
