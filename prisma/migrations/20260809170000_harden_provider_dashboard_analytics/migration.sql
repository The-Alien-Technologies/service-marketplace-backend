-- Preserve lifecycle dates needed for truthful provider analytics.
ALTER TABLE "orders"
ADD COLUMN "startedAt" TIMESTAMP(3),
ADD COLUMN "completedAt" TIMESTAMP(3);

-- Existing records predate lifecycle timestamps. updatedAt is the closest
-- available historical approximation; all future transitions write exact times.
UPDATE "orders"
SET "startedAt" = "updatedAt"
WHERE "status" IN ('IN_PROGRESS', 'COMPLETED');

UPDATE "orders"
SET "completedAt" = "updatedAt"
WHERE "status" = 'COMPLETED';

-- Support provider lists, status summaries, trend windows, and paid-date charts.
CREATE INDEX "orders_providerId_createdAt_idx"
ON "orders"("providerId", "createdAt");

CREATE INDEX "orders_providerId_paymentStatus_status_createdAt_idx"
ON "orders"("providerId", "paymentStatus", "status", "createdAt");

CREATE INDEX "orders_providerId_paidAt_idx"
ON "orders"("providerId", "paidAt");

CREATE INDEX "orders_providerId_completedAt_idx"
ON "orders"("providerId", "completedAt");

CREATE INDEX "orders_paidAt_idx"
ON "orders"("paidAt");
