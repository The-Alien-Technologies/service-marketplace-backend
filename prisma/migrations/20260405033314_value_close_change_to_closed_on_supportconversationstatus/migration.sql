/*
  Warnings:

  - The values [CLOSE] on the enum `SupportConversationStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SupportConversationStatus_new" AS ENUM ('BOT', 'AWAITING_FOR_ADMIN', 'ACTIVE_WITH_ADMIN', 'CLOSED');
ALTER TABLE "public"."support_conversations" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "support_conversations" ALTER COLUMN "status" TYPE "SupportConversationStatus_new" USING ("status"::text::"SupportConversationStatus_new");
ALTER TYPE "SupportConversationStatus" RENAME TO "SupportConversationStatus_old";
ALTER TYPE "SupportConversationStatus_new" RENAME TO "SupportConversationStatus";
DROP TYPE "public"."SupportConversationStatus_old";
ALTER TABLE "support_conversations" ALTER COLUMN "status" SET DEFAULT 'BOT';
COMMIT;
