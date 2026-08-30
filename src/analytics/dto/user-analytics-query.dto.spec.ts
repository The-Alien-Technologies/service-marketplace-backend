import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { UserAnalyticsQueryDto } from './user-analytics-query.dto';

describe('UserAnalyticsQueryDto', () => {
  it('converts and accepts a supported year', async () => {
    const dto = plainToInstance(UserAnalyticsQueryDto, { year: '2026' });

    await expect(validate(dto)).resolves.toHaveLength(0);
    expect(dto.year).toBe(2026);
  });

  it.each(['1999', '2101', 'not-a-year'])(
    'rejects the unsupported year %s',
    async (year) => {
      const dto = plainToInstance(UserAnalyticsQueryDto, { year });

      await expect(validate(dto)).resolves.not.toHaveLength(0);
    },
  );
});
