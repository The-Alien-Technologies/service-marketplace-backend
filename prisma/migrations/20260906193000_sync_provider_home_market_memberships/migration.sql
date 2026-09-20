-- Provider application approval originally activated the user without
-- activating the membership created from the onboarding country. Repair only
-- missing/pending home-market memberships; rejected or suspended memberships
-- remain untouched.
INSERT INTO "provider_market_memberships" (
    "id",
    "createdAt",
    "updatedAt",
    "providerId",
    "marketId",
    "status",
    "isPrimary",
    "reviewedAt",
    "reviewedBy",
    "rejectionReason"
)
SELECT
    'repair_' || md5(u."id" || ':' || u."homeMarketId"),
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    u."id",
    u."homeMarketId",
    'ACTIVE'::"ProviderMarketMembershipStatus",
    true,
    u."providerApplicationReviewedAt",
    u."providerApplicationReviewedBy",
    NULL
FROM "users" u
WHERE u."role" = 'SERVICE_PROVIDER'
  AND u."status" = 'ACTIVE'
  AND u."isServiceProviderVerified" = true
  AND u."homeMarketId" IS NOT NULL
ON CONFLICT ("providerId", "marketId") DO UPDATE
SET
    "status" = 'ACTIVE'::"ProviderMarketMembershipStatus",
    "isPrimary" = true,
    "reviewedAt" = COALESCE(
        "provider_market_memberships"."reviewedAt",
        EXCLUDED."reviewedAt"
    ),
    "reviewedBy" = COALESCE(
        "provider_market_memberships"."reviewedBy",
        EXCLUDED."reviewedBy"
    ),
    "rejectionReason" = NULL,
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "provider_market_memberships"."status" = 'PENDING';

-- A provider dashboard must open in a market where the provider is active.
-- Preserve a deliberate selection whenever it already has active membership.
UPDATE "users" u
SET
    "selectedMarketId" = u."homeMarketId",
    "updatedAt" = CURRENT_TIMESTAMP
WHERE u."role" = 'SERVICE_PROVIDER'
  AND u."status" = 'ACTIVE'
  AND u."homeMarketId" IS NOT NULL
  AND EXISTS (
      SELECT 1
      FROM "provider_market_memberships" home_membership
      WHERE home_membership."providerId" = u."id"
        AND home_membership."marketId" = u."homeMarketId"
        AND home_membership."status" = 'ACTIVE'
  )
  AND NOT EXISTS (
      SELECT 1
      FROM "provider_market_memberships" membership
      WHERE membership."providerId" = u."id"
        AND membership."marketId" = u."selectedMarketId"
        AND membership."status" = 'ACTIVE'
  );
