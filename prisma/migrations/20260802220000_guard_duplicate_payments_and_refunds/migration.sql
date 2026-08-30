-- A checkout URL can still complete at Paystack after Pavodah has abandoned it.
-- Mark exactly one successful transaction as the order's primary capture so
-- later successful captures can be refunded without changing order earnings.
ALTER TABLE "payment_transactions"
  ADD COLUMN "isPrimary" BOOLEAN NOT NULL DEFAULT false;

WITH ranked_successes AS (
  SELECT
    "id",
    ROW_NUMBER() OVER (
      PARTITION BY "orderId"
      ORDER BY "paidAt" ASC NULLS LAST, "createdAt" ASC, "id" ASC
    ) AS success_rank
  FROM "payment_transactions"
  WHERE "status" = 'SUCCESS'
)
UPDATE "payment_transactions" AS payment
SET "isPrimary" = true
FROM ranked_successes
WHERE payment."id" = ranked_successes."id"
  AND ranked_successes.success_rank = 1;

CREATE UNIQUE INDEX "payment_transactions_one_primary_per_order_idx"
ON "payment_transactions" ("orderId")
WHERE "isPrimary" = true;

-- Excess-capture refunds compensate an additional charge but must not reduce
-- the order's legitimate retained balance or provider settlement twice.
ALTER TABLE "payment_refunds"
  ADD COLUMN "affectsOrderBalance" BOOLEAN NOT NULL DEFAULT true;

CREATE UNIQUE INDEX "payment_refunds_one_excess_per_transaction_idx"
ON "payment_refunds" ("transactionId")
WHERE "affectsOrderBalance" = false;

-- A dispute on a refunded excess capture belongs to the duplicate charge, not
-- to the service payment. Keep it visible without freezing legitimate earnings.
ALTER TABLE "external_payment_disputes"
  ADD COLUMN "affectsOrderBalance" BOOLEAN NOT NULL DEFAULT true;

UPDATE "external_payment_disputes" AS dispute
SET "affectsOrderBalance" = false
FROM "payment_transactions" AS payment
WHERE dispute."transactionId" = payment."id"
  AND payment."isPrimary" = false;
