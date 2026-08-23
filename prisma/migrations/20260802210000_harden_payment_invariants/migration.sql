-- Keep the newest active checkout per order and retire any older sessions
-- before enforcing the one-active-checkout invariant.
WITH ranked_active AS (
  SELECT
    "id",
    ROW_NUMBER() OVER (
      PARTITION BY "orderId"
      ORDER BY "createdAt" DESC, "id" DESC
    ) AS active_rank
  FROM "payment_transactions"
  WHERE "status" IN ('INITIALIZED', 'PENDING')
)
UPDATE "payment_transactions" AS payment
SET
  "status" = 'ABANDONED',
  "failureMessage" = COALESCE(
    payment."failureMessage",
    'Superseded while enforcing one active checkout per order'
  ),
  "updatedAt" = CURRENT_TIMESTAMP
FROM ranked_active
WHERE payment."id" = ranked_active."id"
  AND ranked_active.active_rank > 1;

CREATE UNIQUE INDEX "payment_transactions_one_active_per_order_idx"
ON "payment_transactions" ("orderId")
WHERE "status" IN ('INITIALIZED', 'PENDING');

-- Paystack refund ids are globally stable and let duplicate webhook deliveries
-- reconcile the same refund even when a refund reference is absent.
WITH ranked_refunds AS (
  SELECT
    "id",
    ROW_NUMBER() OVER (
      PARTITION BY "providerRefundId"
      ORDER BY "createdAt" DESC, "id" DESC
    ) AS refund_rank
  FROM "payment_refunds"
  WHERE "providerRefundId" IS NOT NULL
)
UPDATE "payment_refunds" AS refund
SET "providerRefundId" = NULL
FROM ranked_refunds
WHERE refund."id" = ranked_refunds."id"
  AND ranked_refunds.refund_rank > 1;

CREATE UNIQUE INDEX "payment_refunds_providerRefundId_key"
ON "payment_refunds" ("providerRefundId");
