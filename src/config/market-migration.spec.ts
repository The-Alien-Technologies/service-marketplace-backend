import { readFileSync } from 'fs';
import { join } from 'path';

describe('country market migration', () => {
  it('removes the legacy settings singleton before adding required marketId', () => {
    const sql = readFileSync(
      join(
        process.cwd(),
        'prisma/migrations/20260905160000_add_country_markets_and_payment_credentials/migration.sql',
      ),
      'utf8',
    );
    const deleteLegacy = sql.indexOf('DELETE FROM "payment_settings"');
    const addMarketId = sql.indexOf(
      'ALTER TABLE "payment_settings" ADD COLUMN     "marketId" TEXT NOT NULL',
    );

    expect(deleteLegacy).toBeGreaterThan(-1);
    expect(addMarketId).toBeGreaterThan(deleteLegacy);
  });
});
