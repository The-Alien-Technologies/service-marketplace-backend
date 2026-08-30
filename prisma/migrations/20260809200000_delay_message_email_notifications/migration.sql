-- AlterEnum
ALTER TYPE "NotificationDeliveryStatus" ADD VALUE 'CANCELLED';

-- AlterTable
ALTER TABLE "notification_deliveries"
ADD COLUMN "collapseKey" TEXT,
ADD COLUMN "cancelIfRead" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "notification_deliveries_collapseKey_key" ON "notification_deliveries"("collapseKey");
