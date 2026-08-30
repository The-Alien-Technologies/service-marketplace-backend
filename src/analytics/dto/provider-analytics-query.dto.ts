import { Type } from 'class-transformer';
import { IsInt, IsOptional, Matches, Max, Min } from 'class-validator';

export class ProviderAnalyticsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(2000)
  @Max(2100)
  year?: number;

  @IsOptional()
  @Matches(/^(?:20\d{2}|2100)-(?:0[1-9]|1[0-2])$/, {
    message: 'orderMonth must be between 2000-01 and 2100-12',
  })
  orderMonth?: string;
}
