/**
 * Standard API response format
 */
export interface ApiResponse<T> {
    message: string;
    data: T;
  }
  
  /**
   * Utility class for creating standardized API responses
   */
  export class ResponseUtil {
    /**
     * Creates a success response with the given data and message
     */
    static success<T>(data: T, message: string): ApiResponse<T> {
      return {
        message,
        data,
      };
    }

    static errorWithoutData<T>(message: string): ApiResponse<T> {
      return {
        message,
        data: null,
      };
    }
  }