-- This pre-launch migration expects transactional marketplace tables to be empty.
-- Run `npm run prisma:reset` in development if the required-column checks fail.

-- CreateEnum
CREATE TYPE "MarketStatus" AS ENUM ('ACTIVE', 'PAUSED', 'INACTIVE');

-- CreateEnum
CREATE TYPE "ProviderMarketMembershipStatus" AS ENUM ('PENDING', 'ACTIVE', 'REJECTED', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "ServiceAvailability" AS ENUM ('MARKET', 'GLOBAL');

-- CreateEnum
CREATE TYPE "PaymentProvider" AS ENUM ('PAYSTACK');

-- CreateEnum
CREATE TYPE "PaymentIntegrationStatus" AS ENUM ('ACTIVE', 'PAUSED', 'RETIRED');

-- CreateEnum
CREATE TYPE "PaymentCredentialStatus" AS ENUM ('STAGED', 'ACTIVE', 'RETIRING', 'REVOKED');

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'SUPER_ADMIN';

-- AlterEnum
ALTER TYPE "PayoutDestinationType" ADD VALUE 'BASA';

-- DropIndex
DROP INDEX "provider_payout_accounts_providerId_key";

-- DropIndex
DROP INDEX "provider_payout_accounts_recipientCode_key";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "adminMarketId" TEXT,
ADD COLUMN     "homeMarketId" TEXT,
ADD COLUMN     "selectedMarketId" TEXT;

-- AlterTable
ALTER TABLE "user_addresses" ADD COLUMN     "countryIso2" TEXT;

-- AlterTable
ALTER TABLE "services" ADD COLUMN     "availability" "ServiceAvailability" NOT NULL DEFAULT 'MARKET',
ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "marketId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "marketId" TEXT NOT NULL,
ADD COLUMN     "paymentIntegrationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "payment_transactions" ADD COLUMN     "credentialVersionId" TEXT NOT NULL,
ADD COLUMN     "paymentIntegrationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "support_conversations" ADD COLUMN     "marketId" TEXT;

-- AlterTable
ALTER TABLE "quote_requests" ADD COLUMN     "marketId" TEXT NOT NULL;

-- AlterTable
-- The previous payout migration always creates a singleton settings row.
-- Country settings replace that legacy row and are seeded after startup.
DELETE FROM "payment_settings";

ALTER TABLE "payment_settings" ADD COLUMN     "marketId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "order_settlements" ADD COLUMN     "marketId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "provider_payout_accounts" ADD COLUMN     "marketId" TEXT NOT NULL,
ADD COLUMN     "paymentIntegrationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "provider_payouts" ADD COLUMN     "credentialVersionId" TEXT,
ADD COLUMN     "marketId" TEXT NOT NULL,
ADD COLUMN     "paymentIntegrationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "provider_balance_adjustments" ADD COLUMN     "marketId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "markets" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "minorUnit" INTEGER NOT NULL DEFAULT 2,
    "paystackCountry" TEXT NOT NULL,
    "status" "MarketStatus" NOT NULL DEFAULT 'ACTIVE',
    "checkoutEnabled" BOOLEAN NOT NULL DEFAULT true,
    "providerOnboardingEnabled" BOOLEAN NOT NULL DEFAULT true,
    "servicePublishingEnabled" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "markets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provider_market_memberships" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "providerId" TEXT NOT NULL,
    "marketId" TEXT NOT NULL,
    "status" "ProviderMarketMembershipStatus" NOT NULL DEFAULT 'PENDING',
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "reviewedAt" TIMESTAMP(3),
    "reviewedBy" TEXT,
    "rejectionReason" TEXT,

    CONSTRAINT "provider_market_memberships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "market_categories" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "marketId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "market_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_integrations" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "marketId" TEXT NOT NULL,
    "provider" "PaymentProvider" NOT NULL DEFAULT 'PAYSTACK',
    "webhookKey" TEXT NOT NULL,
    "status" "PaymentIntegrationStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "payment_integrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_credential_versions" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "integrationId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "encryptedSecret" TEXT NOT NULL,
    "encryptionIv" TEXT NOT NULL,
    "encryptionAuthTag" TEXT NOT NULL,
    "fingerprint" TEXT NOT NULL,
    "status" "PaymentCredentialStatus" NOT NULL DEFAULT 'STAGED',
    "validatedAt" TIMESTAMP(3),
    "activatedAt" TIMESTAMP(3),
    "retiringAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "revokedAt" TIMESTAMP(3),
    "createdById" TEXT NOT NULL,

    CONSTRAINT "payment_credential_versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_audit_logs" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actorId" TEXT NOT NULL,
    "marketId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT,
    "metadata" JSONB,

    CONSTRAINT "admin_audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "markets_code_key" ON "markets"("code");

-- CreateIndex
CREATE INDEX "markets_status_sortOrder_idx" ON "markets"("status", "sortOrder");

-- CreateIndex
CREATE INDEX "provider_market_memberships_marketId_status_createdAt_idx" ON "provider_market_memberships"("marketId", "status", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "provider_market_memberships_providerId_marketId_key" ON "provider_market_memberships"("providerId", "marketId");

-- CreateIndex
CREATE INDEX "market_categories_marketId_isActive_featured_sortOrder_idx" ON "market_categories"("marketId", "isActive", "featured", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "market_categories_marketId_categoryId_key" ON "market_categories"("marketId", "categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "payment_integrations_webhookKey_key" ON "payment_integrations"("webhookKey");

-- CreateIndex
CREATE INDEX "payment_integrations_status_idx" ON "payment_integrations"("status");

-- CreateIndex
CREATE UNIQUE INDEX "payment_integrations_marketId_provider_key" ON "payment_integrations"("marketId", "provider");

-- CreateIndex
CREATE INDEX "payment_credential_versions_integrationId_status_createdAt_idx" ON "payment_credential_versions"("integrationId", "status", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "payment_credential_versions_integrationId_version_key" ON "payment_credential_versions"("integrationId", "version");

-- CreateIndex
CREATE INDEX "admin_audit_logs_marketId_createdAt_idx" ON "admin_audit_logs"("marketId", "createdAt");

-- CreateIndex
CREATE INDEX "admin_audit_logs_actorId_createdAt_idx" ON "admin_audit_logs"("actorId", "createdAt");

-- CreateIndex
CREATE INDEX "users_homeMarketId_role_status_idx" ON "users"("homeMarketId", "role", "status");

-- CreateIndex
CREATE INDEX "users_adminMarketId_role_idx" ON "users"("adminMarketId", "role");

-- CreateIndex
CREATE INDEX "services_marketId_status_createdAt_idx" ON "services"("marketId", "status", "createdAt");

-- CreateIndex
CREATE INDEX "services_marketId_categoryId_status_idx" ON "services"("marketId", "categoryId", "status");

-- CreateIndex
CREATE INDEX "orders_marketId_createdAt_idx" ON "orders"("marketId", "createdAt");

-- CreateIndex
CREATE INDEX "orders_marketId_paymentStatus_status_createdAt_idx" ON "orders"("marketId", "paymentStatus", "status", "createdAt");

-- CreateIndex
CREATE INDEX "payment_transactions_paymentIntegrationId_status_createdAt_idx" ON "payment_transactions"("paymentIntegrationId", "status", "createdAt");

-- CreateIndex
CREATE INDEX "support_conversations_marketId_status_createdAt_idx" ON "support_conversations"("marketId", "status", "createdAt");

-- CreateIndex
CREATE INDEX "quote_requests_marketId_status_createdAt_idx" ON "quote_requests"("marketId", "status", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "payment_settings_marketId_key" ON "payment_settings"("marketId");

-- CreateIndex
CREATE INDEX "order_settlements_marketId_status_createdAt_idx" ON "order_settlements"("marketId", "status", "createdAt");

-- CreateIndex
CREATE INDEX "provider_payout_accounts_marketId_status_idx" ON "provider_payout_accounts"("marketId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "provider_payout_accounts_providerId_marketId_key" ON "provider_payout_accounts"("providerId", "marketId");

-- CreateIndex
CREATE UNIQUE INDEX "provider_payout_accounts_paymentIntegrationId_recipientCode_key" ON "provider_payout_accounts"("paymentIntegrationId", "recipientCode");

-- CreateIndex
CREATE INDEX "provider_payouts_marketId_status_createdAt_idx" ON "provider_payouts"("marketId", "status", "createdAt");

-- CreateIndex
CREATE INDEX "provider_balance_adjustments_marketId_status_createdAt_idx" ON "provider_balance_adjustments"("marketId", "status", "createdAt");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_homeMarketId_fkey" FOREIGN KEY ("homeMarketId") REFERENCES "markets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_selectedMarketId_fkey" FOREIGN KEY ("selectedMarketId") REFERENCES "markets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_adminMarketId_fkey" FOREIGN KEY ("adminMarketId") REFERENCES "markets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provider_market_memberships" ADD CONSTRAINT "provider_market_memberships_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provider_market_memberships" ADD CONSTRAINT "provider_market_memberships_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "markets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provider_market_memberships" ADD CONSTRAINT "provider_market_memberships_reviewedBy_fkey" FOREIGN KEY ("reviewedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "market_categories" ADD CONSTRAINT "market_categories_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "markets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "market_categories" ADD CONSTRAINT "market_categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "markets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "markets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_paymentIntegrationId_fkey" FOREIGN KEY ("paymentIntegrationId") REFERENCES "payment_integrations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_transactions" ADD CONSTRAINT "payment_transactions_paymentIntegrationId_fkey" FOREIGN KEY ("paymentIntegrationId") REFERENCES "payment_integrations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_transactions" ADD CONSTRAINT "payment_transactions_credentialVersionId_fkey" FOREIGN KEY ("credentialVersionId") REFERENCES "payment_credential_versions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "support_conversations" ADD CONSTRAINT "support_conversations_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "markets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_requests" ADD CONSTRAINT "quote_requests_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "markets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_settings" ADD CONSTRAINT "payment_settings_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "markets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_integrations" ADD CONSTRAINT "payment_integrations_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "markets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_credential_versions" ADD CONSTRAINT "payment_credential_versions_integrationId_fkey" FOREIGN KEY ("integrationId") REFERENCES "payment_integrations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_credential_versions" ADD CONSTRAINT "payment_credential_versions_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_audit_logs" ADD CONSTRAINT "admin_audit_logs_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_audit_logs" ADD CONSTRAINT "admin_audit_logs_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "markets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_settlements" ADD CONSTRAINT "order_settlements_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "markets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provider_payout_accounts" ADD CONSTRAINT "provider_payout_accounts_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "markets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provider_payout_accounts" ADD CONSTRAINT "provider_payout_accounts_paymentIntegrationId_fkey" FOREIGN KEY ("paymentIntegrationId") REFERENCES "payment_integrations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provider_payouts" ADD CONSTRAINT "provider_payouts_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "markets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provider_payouts" ADD CONSTRAINT "provider_payouts_paymentIntegrationId_fkey" FOREIGN KEY ("paymentIntegrationId") REFERENCES "payment_integrations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provider_payouts" ADD CONSTRAINT "provider_payouts_credentialVersionId_fkey" FOREIGN KEY ("credentialVersionId") REFERENCES "payment_credential_versions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provider_balance_adjustments" ADD CONSTRAINT "provider_balance_adjustments_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "markets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
