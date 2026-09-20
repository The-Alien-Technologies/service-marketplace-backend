-- Snapshot and account for how each market's commission is shared between
-- the country partner and Pavodah. Existing orders use the agreed 50/50 default.
ALTER TABLE "payment_settings"
  ADD COLUMN "pavodahShareRate" DECIMAL(5,2) NOT NULL DEFAULT 50.00;

ALTER TABLE "orders"
  ADD COLUMN "pavodahShareRate" DECIMAL(5,2) NOT NULL DEFAULT 50.00;

ALTER TABLE "order_settlements"
  ADD COLUMN "pavodahShareRate" DECIMAL(5,2) NOT NULL DEFAULT 50.00,
  ADD COLUMN "pavodahAmount" DECIMAL(10,2) NOT NULL DEFAULT 0,
  ADD COLUMN "partnerAmount" DECIMAL(10,2) NOT NULL DEFAULT 0,
  ADD COLUMN "partnerStatus" "SettlementStatus" NOT NULL DEFAULT 'HELD';

ALTER TABLE "payment_credential_versions"
  ADD COLUMN "ownershipAttestedAt" TIMESTAMP(3),
  ADD COLUMN "ownershipAttestedBy" TEXT;

ALTER TABLE "provider_balance_adjustments" ADD COLUMN "refundId" TEXT;
CREATE UNIQUE INDEX "provider_balance_adjustments_refundId_key" ON "provider_balance_adjustments"("refundId");

UPDATE "order_settlements"
SET
  "pavodahAmount" = ROUND("commissionAmount" * "pavodahShareRate" / 100, 2),
  "partnerAmount" = "commissionAmount" - ROUND("commissionAmount" * "pavodahShareRate" / 100, 2);

-- Partner payouts did not exist before this migration. Previously released
-- settlements therefore become partner-eligible (never partner-paid), except
-- while an active Paystack dispute is holding the order.
UPDATE "order_settlements" AS settlement
SET "partnerStatus" = CASE
  WHEN settlement."status" = 'VOID' THEN 'VOID'::"SettlementStatus"
  WHEN settlement."status" IN ('ELIGIBLE', 'RESERVED', 'PAID')
    AND NOT EXISTS (
      SELECT 1
      FROM "external_payment_disputes" AS dispute
      WHERE dispute."orderId" = settlement."orderId"
        AND dispute."affectsOrderBalance" = TRUE
        AND dispute."status" IN ('OPEN', 'REMINDER')
    )
    THEN 'ELIGIBLE'::"SettlementStatus"
  ELSE 'HELD'::"SettlementStatus"
END;

ALTER TABLE "payment_settings"
  ADD CONSTRAINT "payment_settings_pavodah_share_rate_range"
  CHECK ("pavodahShareRate" >= 0 AND "pavodahShareRate" <= 100);

ALTER TABLE "orders"
  ADD CONSTRAINT "orders_pavodah_share_rate_range"
  CHECK ("pavodahShareRate" >= 0 AND "pavodahShareRate" <= 100);

ALTER TABLE "order_settlements"
  ADD CONSTRAINT "order_settlements_pavodah_share_rate_range"
  CHECK ("pavodahShareRate" >= 0 AND "pavodahShareRate" <= 100),
  ADD CONSTRAINT "order_settlements_commission_split_nonnegative"
  CHECK ("pavodahAmount" >= 0 AND "partnerAmount" >= 0),
  ADD CONSTRAINT "order_settlements_commission_split_total"
  CHECK ("pavodahAmount" + "partnerAmount" = "commissionAmount");

CREATE INDEX "order_settlements_marketId_partnerStatus_createdAt_idx"
  ON "order_settlements"("marketId", "partnerStatus", "createdAt");

CREATE TABLE "market_partner_payout_accounts" (
  "id" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "marketId" TEXT NOT NULL,
  "paymentIntegrationId" TEXT NOT NULL,
  "type" "PayoutDestinationType" NOT NULL,
  "recipientCode" TEXT NOT NULL,
  "institutionCode" TEXT NOT NULL,
  "institutionName" TEXT NOT NULL,
  "accountName" TEXT,
  "accountNumberLast4" TEXT NOT NULL,
  "currency" TEXT NOT NULL,
  "status" "PayoutAccountStatus" NOT NULL DEFAULT 'ACTIVE',
  "verifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "market_partner_payout_accounts_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "market_partner_payout_accounts_marketId_key" ON "market_partner_payout_accounts"("marketId");
CREATE UNIQUE INDEX "market_partner_payout_accounts_paymentIntegrationId_recipientCode_key" ON "market_partner_payout_accounts"("paymentIntegrationId", "recipientCode");

CREATE TABLE "market_partner_payouts" (
  "id" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "marketId" TEXT NOT NULL,
  "paymentIntegrationId" TEXT NOT NULL,
  "credentialVersionId" TEXT NOT NULL,
  "payoutAccountId" TEXT NOT NULL,
  "reference" TEXT NOT NULL,
  "amount" DECIMAL(10,2) NOT NULL,
  "grossCommissionAmount" DECIMAL(10,2) NOT NULL,
  "adjustmentAmount" DECIMAL(10,2) NOT NULL DEFAULT 0,
  "amountMinor" INTEGER NOT NULL,
  "currency" TEXT NOT NULL,
  "status" "ProviderPayoutStatus" NOT NULL DEFAULT 'REQUESTED',
  "transferCode" TEXT,
  "recipientCode" TEXT NOT NULL,
  "destinationType" "PayoutDestinationType" NOT NULL,
  "institutionName" TEXT NOT NULL,
  "accountName" TEXT,
  "accountNumberLast4" TEXT NOT NULL,
  "approvedAt" TIMESTAMP(3),
  "approvedBy" TEXT,
  "processedAt" TIMESTAMP(3),
  "failureMessage" TEXT,
  "providerFeeMinor" INTEGER,
  "rawData" JSONB,
  CONSTRAINT "market_partner_payouts_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "market_partner_payouts_reference_key" ON "market_partner_payouts"("reference");
CREATE INDEX "market_partner_payouts_marketId_status_createdAt_idx" ON "market_partner_payouts"("marketId", "status", "createdAt");
ALTER TABLE "market_partner_payouts" ADD CONSTRAINT "market_partner_payouts_amounts_positive" CHECK ("amount" > 0 AND "grossCommissionAmount" > 0 AND "adjustmentAmount" >= 0 AND "amountMinor" > 0);

CREATE TABLE "market_partner_payout_items" (
  "id" TEXT NOT NULL,
  "payoutId" TEXT NOT NULL,
  "settlementId" TEXT NOT NULL,
  "amount" DECIMAL(10,2) NOT NULL,
  CONSTRAINT "market_partner_payout_items_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "market_partner_payout_items_payoutId_settlementId_key" ON "market_partner_payout_items"("payoutId", "settlementId");
CREATE INDEX "market_partner_payout_items_settlementId_idx" ON "market_partner_payout_items"("settlementId");

CREATE TABLE "market_commission_adjustments" (
  "id" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "marketId" TEXT NOT NULL,
  "orderId" TEXT NOT NULL,
  "settlementId" TEXT NOT NULL,
  "refundId" TEXT,
  "externalDisputeId" TEXT,
  "partnerAmount" DECIMAL(10,2) NOT NULL DEFAULT 0,
  "pavodahAmount" DECIMAL(10,2) NOT NULL DEFAULT 0,
  "partnerRecoveredAmount" DECIMAL(10,2) NOT NULL DEFAULT 0,
  "partnerStatus" "BalanceAdjustmentStatus" NOT NULL DEFAULT 'OPEN',
  "reason" TEXT NOT NULL,
  CONSTRAINT "market_commission_adjustments_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "market_commission_adjustments_refundId_key" ON "market_commission_adjustments"("refundId");
CREATE UNIQUE INDEX "market_commission_adjustments_externalDisputeId_key" ON "market_commission_adjustments"("externalDisputeId");
CREATE INDEX "market_commission_adjustments_marketId_partnerStatus_createdAt_idx" ON "market_commission_adjustments"("marketId", "partnerStatus", "createdAt");
ALTER TABLE "market_commission_adjustments" ADD CONSTRAINT "market_commission_adjustments_amounts_nonnegative" CHECK ("partnerAmount" >= 0 AND "pavodahAmount" >= 0 AND "partnerRecoveredAmount" >= 0 AND "partnerRecoveredAmount" <= "partnerAmount");

CREATE TABLE "market_partner_payout_adjustment_items" (
  "id" TEXT NOT NULL,
  "payoutId" TEXT NOT NULL,
  "adjustmentId" TEXT NOT NULL,
  "amount" DECIMAL(10,2) NOT NULL,
  CONSTRAINT "market_partner_payout_adjustment_items_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "market_partner_payout_adjustment_items_payoutId_adjustmentId_key" ON "market_partner_payout_adjustment_items"("payoutId", "adjustmentId");
CREATE INDEX "market_partner_payout_adjustment_items_adjustmentId_idx" ON "market_partner_payout_adjustment_items"("adjustmentId");

ALTER TABLE "market_partner_payout_accounts" ADD CONSTRAINT "market_partner_payout_accounts_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "markets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "market_partner_payout_accounts" ADD CONSTRAINT "market_partner_payout_accounts_paymentIntegrationId_fkey" FOREIGN KEY ("paymentIntegrationId") REFERENCES "payment_integrations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "market_partner_payouts" ADD CONSTRAINT "market_partner_payouts_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "markets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "market_partner_payouts" ADD CONSTRAINT "market_partner_payouts_paymentIntegrationId_fkey" FOREIGN KEY ("paymentIntegrationId") REFERENCES "payment_integrations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "market_partner_payouts" ADD CONSTRAINT "market_partner_payouts_credentialVersionId_fkey" FOREIGN KEY ("credentialVersionId") REFERENCES "payment_credential_versions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "market_partner_payouts" ADD CONSTRAINT "market_partner_payouts_payoutAccountId_fkey" FOREIGN KEY ("payoutAccountId") REFERENCES "market_partner_payout_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "market_partner_payouts" ADD CONSTRAINT "market_partner_payouts_approvedBy_fkey" FOREIGN KEY ("approvedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "market_partner_payout_items" ADD CONSTRAINT "market_partner_payout_items_payoutId_fkey" FOREIGN KEY ("payoutId") REFERENCES "market_partner_payouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "market_partner_payout_items" ADD CONSTRAINT "market_partner_payout_items_settlementId_fkey" FOREIGN KEY ("settlementId") REFERENCES "order_settlements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "market_commission_adjustments" ADD CONSTRAINT "market_commission_adjustments_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "markets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "market_commission_adjustments" ADD CONSTRAINT "market_commission_adjustments_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "market_commission_adjustments" ADD CONSTRAINT "market_commission_adjustments_settlementId_fkey" FOREIGN KEY ("settlementId") REFERENCES "order_settlements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "market_partner_payout_adjustment_items" ADD CONSTRAINT "market_partner_payout_adjustment_items_payoutId_fkey" FOREIGN KEY ("payoutId") REFERENCES "market_partner_payouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "market_partner_payout_adjustment_items" ADD CONSTRAINT "market_partner_payout_adjustment_items_adjustmentId_fkey" FOREIGN KEY ("adjustmentId") REFERENCES "market_commission_adjustments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
