-- Support customer order history, paid-date spending charts, and completion trends.
CREATE INDEX "orders_clientId_createdAt_idx"
ON "orders"("clientId", "createdAt");

CREATE INDEX "orders_clientId_paymentStatus_status_createdAt_idx"
ON "orders"("clientId", "paymentStatus", "status", "createdAt");

CREATE INDEX "orders_clientId_paidAt_idx"
ON "orders"("clientId", "paidAt");

CREATE INDEX "orders_clientId_completedAt_idx"
ON "orders"("clientId", "completedAt");
