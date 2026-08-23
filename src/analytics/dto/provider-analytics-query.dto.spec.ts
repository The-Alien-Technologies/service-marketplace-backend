import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ProviderAnalyticsQueryDto } from './provider-analytics-query.dto';

describe('ProviderAnalyticsQueryDto', () => {
  it('converts and accepts a supported year', async () => {
    const dto = plainToInstance(ProviderAnalyticsQueryDto, { year: '2026' });

    await expect(validate(dto)).resolves.toHaveLength(0);
    expect(dto.year).toBe(2026);
  });

  it.each(['1999', '2101', 'not-a-year'])(
    'rejects the unsupported year %s',
    async (year) => {
      const dto = plainToInstance(ProviderAnalyticsQueryDto, { year });

      await expect(validate(dto)).resolves.not.toHaveLength(0);
    },
  );

  it.each(['2000-01', '2026-08', '2100-12'])(
    'accepts the supported order month %s',
    async (orderMonth) => {
      const dto = plainToInstance(ProviderAnalyticsQueryDto, { orderMonth });

      await expect(validate(dto)).resolves.toHaveLength(0);
    },
  );

  it.each(['1999-12', '2101-01', '2026-00', '2026-13', '2026-8'])(
    'rejects the unsupported order month %s',
    async (orderMonth) => {
      const dto = plainToInstance(ProviderAnalyticsQueryDto, { orderMonth });

      await expect(validate(dto)).resolves.not.toHaveLength(0);
    },
  );
});
