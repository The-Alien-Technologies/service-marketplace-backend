import { IsOptional, IsInt, Min, Max, IsString, IsIn } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Page must be an integer' })
  @Min(1, { message: 'Page must be at least 1' })
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Limit must be an integer' })
  @Min(-1, { message: 'Limit must be at least -1 (use -1 for all records)' })
  @Max(100, { message: 'Limit cannot exceed 100' })
  limit: number = 15;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  search?: string;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsIn(['asc', 'desc', 'ASC', 'DESC'], {
    message: 'Order must be either asc or desc',
  })
  @Transform(({ value }) => value?.toLowerCase())
  orderBy: 'asc' | 'desc' = 'desc';

  // Helper method to get skip value for database queries
  getSkip(): number {
    if (this.limit === -1) {
      return 0; // No skip when returning all records
    }
    return (this.page - 1) * this.limit;
  }

  // Helper method to get take value for database queries
  getTake(): number | undefined {
    if (this.limit === -1) {
      return undefined; // No limit - return all records
    }
    return this.limit;
  }

  // Helper method to check if all records should be returned
  isReturnAll(): boolean {
    return this.limit === -1;
  }
}
