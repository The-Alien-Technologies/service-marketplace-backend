-- CreateEnum
CREATE TYPE "OrderPaymentStatus" AS ENUM (
  'UNPAID',
  'PROCESSING',
  'PAID',
  'FAILED',
  'REFUND_PENDING',
  'REFUNDED'
);

-- CreateEnum
CREATE TYPE "PaymentTransactionStatus" AS ENUM (
  'INITIALIZED',
  'PENDING',
  'SUCCESS',
  'FAILED',
  'ABANDONED',
  'AMOUNT_MISMATCH'
);

-- CreateEnum
CREATE TYPE "OrderSource" AS ENUM ('SERVICE_PLAN', 'QUOTE');

-- AlterTable
ALTER TABLE "orders"
  ADD COLUMN "currency" TEXT NOT NULL DEFAULT 'GHS',
  ADD COLUMN "paymentStatus" "OrderPaymentStatus" NOT NULL DEFAULT 'UNPAID',
  ADD COLUMN "source" "OrderSource" NOT NULL DEFAULT 'SERVICE_PLAN',
  ADD COLUMN "checkoutKey" TEXT,
  ADD COLUMN "quoteRequestId" TEXT,
  ADD COLUMN "paidAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "payment_transactions" (
  "id" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "orderId" TEXT NOT NULL,
  "clientId" TEXT NOT NULL,
  "reference" TEXT NOT NULL,
  "accessCode" TEXT,
  "authorizationUrl" TEXT,
  "amount" DECIMAL(10,2) NOT NULL,
  "amountMinor" INTEGER NOT NULL,
  "currency" TEXT NOT NULL DEFAULT 'GHS',
  "status" "PaymentTransactionStatus" NOT NULL DEFAULT 'INITIALIZED',
  "channel" TEXT,
  "providerTransactionId" TEXT,
  "failureMessage" TEXT,
  "paidAt" TIMESTAMP(3),
  "verifiedAt" TIMESTAMP(3),
  "rawData" JSONB,
  "refundId" TEXT,
  "refundReference" TEXT,
  "refundStatus" TEXT,
  "refundedAt" TIMESTAMP(3),
  "refundData" JSONB,

  CONSTRAINT "payment_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orders_checkoutKey_key" ON "orders"("checkoutKey");

-- CreateIndex
CREATE UNIQUE INDEX "orders_quoteRequestId_key" ON "orders"("quoteRequestId");

-- CreateIndex
CREATE UNIQUE INDEX "payment_transactions_reference_key" ON "payment_transactions"("reference");

-- CreateIndex
CREATE INDEX "payment_transactions_orderId_createdAt_idx" ON "payment_transactions"("orderId", "createdAt");

-- CreateIndex
CREATE INDEX "payment_transactions_clientId_createdAt_idx" ON "payment_transactions"("clientId", "createdAt");

-- CreateIndex
CREATE INDEX "payment_transactions_status_createdAt_idx" ON "payment_transactions"("status", "createdAt");

-- AddForeignKey
ALTER TABLE "orders"
  ADD CONSTRAINT "orders_quoteRequestId_fkey"
  FOREIGN KEY ("quoteRequestId") REFERENCES "quote_requests"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_transactions"
  ADD CONSTRAINT "payment_transactions_orderId_fkey"
  FOREIGN KEY ("orderId") REFERENCES "orders"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_transactions"
  ADD CONSTRAINT "payment_transactions_clientId_fkey"
  FOREIGN KEY ("clientId") REFERENCES "users"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE;
