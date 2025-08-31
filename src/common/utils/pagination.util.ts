import { PaginatedResult, PaginationInfo } from '../types/pagination.type';

export class PaginationUtil {
  /**
   * Creates a paginated result with pagination metadata
   */
  static createPaginatedResult<T>(docs: T[], total: number, page: number, limit: number): PaginatedResult<T> {
    // Handle limit: -1 case (return all records)
    if (limit === -1) {
      const pagination: PaginationInfo = {
        page: 1,
        limit: -1,
        total,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      };

      return {
        docs,
        pagination,
      };
    }

    // Regular pagination
    const totalPages = Math.ceil(total / limit);

    const pagination: PaginationInfo = {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };

    return {
      docs,
      pagination,
    };
  }

  /**
   * Validates pagination parameters and returns safe values
   */
  static validatePagination(page: number = 1, limit: number = 15): { page: number; limit: number } {
    const safePage = Math.max(1, Math.floor(page));

    // Handle limit: -1 case (return all records)
    if (limit === -1) {
      return {
        page: 1, // Always page 1 when returning all records
        limit: -1,
      };
    }

    const safeLimit = Math.min(100, Math.max(1, Math.floor(limit)));

    return {
      page: safePage,
      limit: safeLimit,
    };
  }

  /**
   * Calculates skip value for database queries
   */
  static getSkip(page: number, limit: number): number {
    if (limit === -1) {
      return 0; // No skip when returning all records
    }
    return (page - 1) * limit;
  }

  /**
   * Builds order by clause for Prisma queries
   */
  static buildOrderBy(sortBy?: string, orderBy: 'asc' | 'desc' = 'desc'): Record<string, 'asc' | 'desc'> {
    if (!sortBy) {
      return { createdAt: orderBy };
    }

    return { [sortBy]: orderBy };
  }
}
