import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Catch,
  Inject,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Request } from 'express';

const SENSITIVE_LOG_KEYS = new Set([
  'accountnumber',
  'authorization',
  'accesstoken',
  'refreshtoken',
  'idtoken',
  'otp',
  'otpcode',
  'password',
  'phonenumber',
  'secret',
  'token',
]);

function redactForLog(value: unknown, depth = 0): unknown {
  if (depth > 8) return '[TRUNCATED]';
  if (Array.isArray(value)) {
    return value.map((item) => redactForLog(item, depth + 1));
  }
  if (!value || typeof value !== 'object') return value;

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).map(([key, item]) => [
      key,
      SENSITIVE_LOG_KEYS.has(key.toLowerCase())
        ? '[REDACTED]'
        : redactForLog(item, depth + 1),
    ]),
  );
}

export interface IResponse {
  message: string;
  data?: any;
  error?: any;
  stack?: string;
  attemptsLeft?: number;
}

@Catch()
export class ApplicationExceptionFilter implements ExceptionFilter {
  private environment = this.configService.get<string>('NODE_ENV');
  private readonly consoleLogger = new Logger('ExceptionFilter');

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly configService: ConfigService,
  ) {}

  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const ctxResponse = ctx.getResponse();
    const request = ctx.getRequest<Request>();

    let statusCode: number;
    let devErrorResponse: IResponse, prodErrorResponse: IResponse;

    // Log all errors with context
    const errorContext = {
      method: request?.method,
      url: request?.url,
      body: redactForLog(request?.body),
      params: request?.params,
      query: request?.query,
      timestamp: new Date().toISOString(),
    };

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      let response = exception.getResponse() as unknown as IResponse;

      response = {
        message: Array.isArray(response.message)
          ? response.message[0]
          : response.message,
        error: response.error,
        attemptsLeft: response.attemptsLeft,
      };
      if (!response?.error) delete response['error'];
      if (response.attemptsLeft === undefined) delete response['attemptsLeft'];

      devErrorResponse = response;
      prodErrorResponse = response;

      // Log HTTP exceptions (4xx and 5xx)
      if (statusCode >= 400) {
        this.consoleLogger.warn(
          `[${statusCode}] ${request?.method} ${request?.url} - ${response.message}`,
        );
        if (statusCode >= 500) {
          this.consoleLogger.error(
            `Server Error Details:`,
            JSON.stringify({ ...errorContext, response }, null, 2),
          );
          this.logger.error(exception);
        }
      }
    } else {
      const message = (exception as Error)?.message;
      const stack = (exception as Error)?.stack;
      const errorName = (exception as Error)?.name || 'UnknownError';

      // Always log non-HTTP exceptions
      this.consoleLogger.error(
        `[${errorName}] ${request?.method} ${request?.url}`,
      );
      this.consoleLogger.error(`Message: ${message}`);
      this.consoleLogger.error(`Stack: ${stack}`);
      this.consoleLogger.error(
        `Context: ${JSON.stringify(errorContext, null, 2)}`,
      );

      // Handle Prisma errors
      if (exception?.code?.startsWith?.('P')) {
        const prismaCode = exception.code;
        const prismaMeta = exception.meta;
        this.consoleLogger.error(
          `Prisma Error [${prismaCode}]: ${JSON.stringify(prismaMeta)}`,
        );

        // Provide user-friendly messages for common Prisma errors
        if (prismaCode === 'P2002') {
          statusCode = HttpStatus.CONFLICT;
          prodErrorResponse = {
            message: `A record with this ${prismaMeta?.target?.[0] || 'value'} already exists`,
          };
        } else if (prismaCode === 'P2003') {
          statusCode = HttpStatus.BAD_REQUEST;
          prodErrorResponse = {
            message: `Invalid reference: ${prismaMeta?.constraint || 'foreign key constraint failed'}`,
          };
        } else if (prismaCode === 'P2025') {
          statusCode = HttpStatus.NOT_FOUND;
          prodErrorResponse = { message: 'Record not found' };
        } else {
          statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
          prodErrorResponse = { message: 'Database error occurred' };
        }
      } else if (message?.includes('E11000')) {
        statusCode = HttpStatus.BAD_REQUEST;
        prodErrorResponse = {
          message: 'Resource exist already',
        };
      } else {
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        prodErrorResponse = {
          message: 'Internal server error',
        };
      }

      this.logger.error(exception);

      devErrorResponse = {
        message,
        stack,
        error: errorName,
      };
    }

    ctxResponse
      .status(statusCode)
      .json(
        this.environment === 'development'
          ? devErrorResponse
          : prodErrorResponse,
      );
  }
}
