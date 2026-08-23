-- Provider settlement and Paystack transfer infrastructure.
CREATE TYPE "SettlementStatus" AS ENUM ('HELD', 'ELIGIBLE', 'RESERVED', 'PAID', 'VOID');
CREATE TYPE "SettlementAcceptedBy" AS ENUM ('CUSTOMER', 'ADMIN');
CREATE TYPE "ReleaseReviewStatus" AS ENUM ('NONE', 'REQUESTED', 'APPROVED', 'REJECTED');
CREATE TYPE "PayoutDestinationType" AS ENUM ('GHIPSS', 'MOBILE_MONEY');
CREATE TYPE "PayoutAccountStatus" AS ENUM ('ACTIVE', 'INACTIVE');
CREATE TYPE "ProviderPayoutStatus" AS ENUM ('REQUESTED', 'PROCESSING', 'OTP_REQUIRED', 'SUCCESS', 'FAILED', 'REVERSED', 'REJECTED');
CREATE TYPE "PaymentRefundStatus" AS ENUM ('INITIALIZED', 'PENDING', 'PROCESSING', 'NEEDS_ATTENTION', 'PROCESSED', 'FAILED');
CREATE TYPE "DisputeResolutionType" AS ENUM ('RELEASE_PROVIDER', 'FULL_REFUND', 'PARTIAL_REFUND');
CREATE TYPE "BalanceAdjustmentType" AS ENUM ('CHARGEBACK', 'ADMIN');
CREATE TYPE "BalanceAdjustmentStatus" AS ENUM ('OPEN', 'RESERVED', 'RECOVERED');
CREATE TYPE "ExternalPaymentDisputeStatus" AS ENUM ('OPEN', 'REMINDER', 'RESOLVED_WON', 'RESOLVED_LOST');
CREATE TYPE "PhoneVerificationPurpose" AS ENUM ('ACCOUNT_VERIFICATION', 'PAYOUT_ACCOUNT_CHANGE');

ALTER TYPE "OrderPaymentStatus" ADD VALUE 'PARTIALLY_REFUNDED';

ALTER TABLE "orders"
  ADD COLUMN "commissionRate" DECIMAL(5,2) NOT NULL DEFAULT 10.00;

ALTER TABLE "payment_transactions"
  ADD COLUMN "providerFeeMinor" INTEGER;

ALTER TABLE "disputes"
  ADD COLUMN "resolutionRefundAmount" DECIMAL(10,2),
  ADD COLUMN "resolutionRequestedAt" TIMESTAMP(3),
  ADD COLUMN "resolutionType" "DisputeResolutionType";

ALTER TABLE "phone_verifications"
  ADD COLUMN "purpose" "PhoneVerificationPurpose" NOT NULL DEFAULT 'ACCOUNT_VERIFICATION';

CREATE TABLE "payment_settings" (
  "id" TEXT NOT NULL DEFAULT 'default',
  "commissionRate" DECIMAL(5,2) NOT NULL DEFAULT 10.00,
  "updatedBy" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "payment_settings_pkey" PRIMARY KEY ("id")
);

INSERT INTO "payment_settings" ("id", "commissionRate", "updatedAt")
VALUES ('default', 10.00, CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

CREATE TABLE "order_settlements" (
  "id" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "orderId" TEXT NOT NULL,
  "providerId" TEXT NOT NULL,
  "grossAmount" DECIMAL(10,2) NOT NULL,
  "refundedAmount" DECIMAL(10,2) NOT NULL DEFAULT 0,
  "retainedAmount" DECIMAL(10,2) NOT NULL,
  "commissionRate" DECIMAL(5,2) NOT NULL,
  "commissionAmount" DECIMAL(10,2) NOT NULL,
  "providerAmount" DECIMAL(10,2) NOT NULL,
  "status" "SettlementStatus" NOT NULL DEFAULT 'HELD',
  "acceptedAt" TIMESTAMP(3),
  "acceptedBy" "SettlementAcceptedBy",
  "releaseReviewStatus" "ReleaseReviewStatus" NOT NULL DEFAULT 'NONE',
  "releaseReviewRequestedAt" TIMESTAMP(3),
  "releaseReviewNote" TEXT,
  CONSTRAINT "order_settlements_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "order_settlements_orderId_key" ON "order_settlements"("orderId");
CREATE INDEX "order_settlements_providerId_status_createdAt_idx" ON "order_settlements"("providerId", "status", "createdAt");

CREATE TABLE "provider_payout_accounts" (
  "id" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "providerId" TEXT NOT NULL,
  "type" "PayoutDestinationType" NOT NULL,
  "recipientCode" TEXT NOT NULL,
  "institutionCode" TEXT NOT NULL,
  "institutionName" TEXT NOT NULL,
  "accountName" TEXT,
  "accountNumberLast4" TEXT NOT NULL,
  "currency" TEXT NOT NULL DEFAULT 'GHS',
  "status" "PayoutAccountStatus" NOT NULL DEFAULT 'ACTIVE',
  "verifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "provider_payout_accounts_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "provider_payout_accounts_providerId_key" ON "provider_payout_accounts"("providerId");
CREATE UNIQUE INDEX "provider_payout_accounts_recipientCode_key" ON "provider_payout_accounts"("recipientCode");

CREATE TABLE "provider_payouts" (
  "id" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "providerId" TEXT NOT NULL,
  "payoutAccountId" TEXT NOT NULL,
  "reference" TEXT NOT NULL,
  "amount" DECIMAL(10,2) NOT NULL,
  "grossEarningsAmount" DECIMAL(10,2) NOT NULL,
  "adjustmentAmount" DECIMAL(10,2) NOT NULL DEFAULT 0,
  "amountMinor" INTEGER NOT NULL,
  "currency" TEXT NOT NULL DEFAULT 'GHS',
  "status" "ProviderPayoutStatus" NOT NULL DEFAULT 'REQUESTED',
  "transferCode" TEXT,
  "recipientCode" TEXT NOT NULL,
  "destinationType" "PayoutDestinationType" NOT NULL,
  "institutionName" TEXT NOT NULL,
  "accountName" TEXT,
  "accountNumberLast4" TEXT NOT NULL,
  "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "approvedAt" TIMESTAMP(3),
  "approvedBy" TEXT,
  "rejectedAt" TIMESTAMP(3),
  "rejectedBy" TEXT,
  "rejectionReason" TEXT,
  "processedAt" TIMESTAMP(3),
  "failureMessage" TEXT,
  "providerFeeMinor" INTEGER,
  "rawData" JSONB,
  CONSTRAINT "provider_payouts_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "provider_payouts_reference_key" ON "provider_payouts"("reference");
CREATE INDEX "provider_payouts_providerId_status_createdAt_idx" ON "provider_payouts"("providerId", "status", "createdAt");
CREATE INDEX "provider_payouts_status_createdAt_idx" ON "provider_payouts"("status", "createdAt");

CREATE TABLE "provider_payout_items" (
  "id" TEXT NOT NULL,
  "payoutId" TEXT NOT NULL,
  "settlementId" TEXT NOT NULL,
  "amount" DECIMAL(10,2) NOT NULL,
  CONSTRAINT "provider_payout_items_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "provider_payout_items_settlementId_idx" ON "provider_payout_items"("settlementId");
CREATE UNIQUE INDEX "provider_payout_items_payoutId_settlementId_key" ON "provider_payout_items"("payoutId", "settlementId");

CREATE TABLE "provider_balance_adjustments" (
  "id" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "providerId" TEXT NOT NULL,
  "orderId" TEXT NOT NULL,
  "externalDisputeId" TEXT,
  "type" "BalanceAdjustmentType" NOT NULL,
  "amount" DECIMAL(10,2) NOT NULL,
  "recoveredAmount" DECIMAL(10,2) NOT NULL DEFAULT 0,
  "status" "BalanceAdjustmentStatus" NOT NULL DEFAULT 'OPEN',
  "reason" TEXT NOT NULL,
  CONSTRAINT "provider_balance_adjustments_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "provider_balance_adjustments_externalDisputeId_key" ON "provider_balance_adjustments"("externalDisputeId");
CREATE INDEX "provider_balance_adjustments_providerId_status_createdAt_idx" ON "provider_balance_adjustments"("providerId", "status", "createdAt");

CREATE TABLE "provider_payout_adjustment_items" (
  "id" TEXT NOT NULL,
  "payoutId" TEXT NOT NULL,
  "adjustmentId" TEXT NOT NULL,
  "amount" DECIMAL(10,2) NOT NULL,
  CONSTRAINT "provider_payout_adjustment_items_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "provider_payout_adjustment_items_adjustmentId_idx" ON "provider_payout_adjustment_items"("adjustmentId");
CREATE UNIQUE INDEX "provider_payout_adjustment_items_payoutId_adjustmentId_key" ON "provider_payout_adjustment_items"("payoutId", "adjustmentId");

CREATE TABLE "payment_refunds" (
  "id" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "transactionId" TEXT NOT NULL,
  "orderId" TEXT NOT NULL,
  "disputeId" TEXT,
  "reference" TEXT NOT NULL,
  "providerRefundId" TEXT,
  "providerRefundReference" TEXT,
  "amount" DECIMAL(10,2) NOT NULL,
  "amountMinor" INTEGER NOT NULL,
  "currency" TEXT NOT NULL DEFAULT 'GHS',
  "reason" TEXT,
  "status" "PaymentRefundStatus" NOT NULL DEFAULT 'INITIALIZED',
  "rawData" JSONB,
  "processedAt" TIMESTAMP(3),
  "failureMessage" TEXT,
  CONSTRAINT "payment_refunds_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "payment_refunds_reference_key" ON "payment_refunds"("reference");
CREATE UNIQUE INDEX "payment_refunds_providerRefundReference_key" ON "payment_refunds"("providerRefundReference");
CREATE INDEX "payment_refunds_orderId_status_createdAt_idx" ON "payment_refunds"("orderId", "status", "createdAt");
CREATE INDEX "payment_refunds_transactionId_createdAt_idx" ON "payment_refunds"("transactionId", "createdAt");

CREATE TABLE "external_payment_disputes" (
  "id" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "providerDisputeId" TEXT NOT NULL,
  "transactionId" TEXT NOT NULL,
  "orderId" TEXT NOT NULL,
  "status" "ExternalPaymentDisputeStatus" NOT NULL DEFAULT 'OPEN',
  "refundAmount" DECIMAL(10,2) NOT NULL DEFAULT 0,
  "currency" TEXT NOT NULL,
  "resolution" TEXT,
  "rawData" JSONB,
  "resolvedAt" TIMESTAMP(3),
  CONSTRAINT "external_payment_disputes_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "external_payment_disputes_providerDisputeId_key" ON "external_payment_disputes"("providerDisputeId");
CREATE INDEX "external_payment_disputes_orderId_status_createdAt_idx" ON "external_payment_disputes"("orderId", "status", "createdAt");

ALTER TABLE "order_settlements" ADD CONSTRAINT "order_settlements_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "order_settlements" ADD CONSTRAINT "order_settlements_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "provider_payout_accounts" ADD CONSTRAINT "provider_payout_accounts_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "provider_payouts" ADD CONSTRAINT "provider_payouts_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "provider_payouts" ADD CONSTRAINT "provider_payouts_payoutAccountId_fkey" FOREIGN KEY ("payoutAccountId") REFERENCES "provider_payout_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "provider_payouts" ADD CONSTRAINT "provider_payouts_approvedBy_fkey" FOREIGN KEY ("approvedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "provider_payouts" ADD CONSTRAINT "provider_payouts_rejectedBy_fkey" FOREIGN KEY ("rejectedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "provider_payout_items" ADD CONSTRAINT "provider_payout_items_payoutId_fkey" FOREIGN KEY ("payoutId") REFERENCES "provider_payouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "provider_payout_items" ADD CONSTRAINT "provider_payout_items_settlementId_fkey" FOREIGN KEY ("settlementId") REFERENCES "order_settlements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "provider_balance_adjustments" ADD CONSTRAINT "provider_balance_adjustments_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "provider_balance_adjustments" ADD CONSTRAINT "provider_balance_adjustments_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "provider_payout_adjustment_items" ADD CONSTRAINT "provider_payout_adjustment_items_payoutId_fkey" FOREIGN KEY ("payoutId") REFERENCES "provider_payouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "provider_payout_adjustment_items" ADD CONSTRAINT "provider_payout_adjustment_items_adjustmentId_fkey" FOREIGN KEY ("adjustmentId") REFERENCES "provider_balance_adjustments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "payment_refunds" ADD CONSTRAINT "payment_refunds_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "payment_transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "payment_refunds" ADD CONSTRAINT "payment_refunds_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "payment_refunds" ADD CONSTRAINT "payment_refunds_disputeId_fkey" FOREIGN KEY ("disputeId") REFERENCES "disputes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "external_payment_disputes" ADD CONSTRAINT "external_payment_disputes_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "payment_transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "external_payment_disputes" ADD CONSTRAINT "external_payment_disputes_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "provider_balance_adjustments" ADD CONSTRAINT "provider_balance_adjustments_externalDisputeId_fkey" FOREIGN KEY ("externalDisputeId") REFERENCES "external_payment_disputes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Existing paid orders remain held until the customer or an admin accepts them.
INSERT INTO "order_settlements" (
  "id", "updatedAt", "orderId", "providerId", "grossAmount", "retainedAmount",
  "commissionRate", "commissionAmount", "providerAmount"
)
SELECT
  'settlement_' || md5(random()::text || clock_timestamp()::text || o."id"), CURRENT_TIMESTAMP,
  o."id", o."providerId", o."total", o."total", o."commissionRate",
  ROUND(o."total" * o."commissionRate" / 100, 2),
  o."total" - ROUND(o."total" * o."commissionRate" / 100, 2)
FROM "orders" o
WHERE o."paymentStatus" IN ('PAID', 'REFUND_PENDING', 'REFUNDED')
ON CONFLICT ("orderId") DO NOTHING;

-- Preserve refunds initiated by the original Paystack implementation.
INSERT INTO "payment_refunds" (
  "id", "updatedAt", "transactionId", "orderId", "reference", "providerRefundId",
  "providerRefundReference", "amount", "amountMinor", "currency", "status",
  "rawData", "processedAt"
)
SELECT
  'refund_' || md5(random()::text || clock_timestamp()::text || pt."id"), CURRENT_TIMESTAMP,
  pt."id", pt."orderId", 'legacy_refund_' || pt."id", pt."refundId",
  pt."refundReference", pt."amount", pt."amountMinor", pt."currency",
  CASE
    WHEN lower(COALESCE(pt."refundStatus", 'pending')) = 'processed' THEN 'PROCESSED'::"PaymentRefundStatus"
    WHEN lower(COALESCE(pt."refundStatus", 'pending')) = 'failed' THEN 'FAILED'::"PaymentRefundStatus"
    WHEN lower(COALESCE(pt."refundStatus", 'pending')) = 'needs-attention' THEN 'NEEDS_ATTENTION'::"PaymentRefundStatus"
    WHEN lower(COALESCE(pt."refundStatus", 'pending')) = 'processing' THEN 'PROCESSING'::"PaymentRefundStatus"
    ELSE 'PENDING'::"PaymentRefundStatus"
  END,
  pt."refundData", pt."refundedAt"
FROM "payment_transactions" pt
WHERE pt."refundId" IS NOT NULL
ON CONFLICT ("reference") DO NOTHING;

UPDATE "order_settlements" os
SET
  "refundedAmount" = o."total",
  "retainedAmount" = 0,
  "commissionAmount" = 0,
  "providerAmount" = 0,
  "status" = 'VOID'
FROM "orders" o
WHERE os."orderId" = o."id" AND o."paymentStatus" = 'REFUNDED';
