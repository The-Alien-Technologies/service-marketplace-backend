import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { AdminAnalyticsQueryDto } from './admin-analytics-query.dto';

describe('AdminAnalyticsQueryDto', () => {
  it.each(['2000-01', '2026-08', '2100-12'])(
    'accepts the supported month %s',
    async (categoryMonth) => {
      const dto = plainToInstance(AdminAnalyticsQueryDto, { categoryMonth });

      await expect(validate(dto)).resolves.toHaveLength(0);
    },
  );

  it.each(['0000-01', '1999-12', '2101-01', '2026-00', '2026-13'])(
    'rejects the unsupported month %s',
    async (categoryMonth) => {
      const dto = plainToInstance(AdminAnalyticsQueryDto, { categoryMonth });

      await expect(validate(dto)).resolves.not.toHaveLength(0);
    },
  );
});
