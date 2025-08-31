import { ArgumentsHost, ExceptionFilter, HttpException, HttpStatus, Catch, Inject, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

export interface IResponse {
  message: string;
  data?: any;
  error?: any;
  stack?: string;
}

@Catch()
export class ApplicationExceptionFilter implements ExceptionFilter {
  private environment = this.configService.get<string>('NODE_ENV');

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly configService: ConfigService,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const ctxResponse = ctx.getResponse();

    let statusCode: number, serverMsg: string;
    let devErrorResponse: IResponse, prodErrorResponse: IResponse;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      let response = exception.getResponse() as unknown as IResponse;

      response = {
        message: Array.isArray(response.message) ? response.message[0] : response.message,
        error: response.error,
      };
      if (!response?.error) delete response['error'];

      devErrorResponse = response;
      prodErrorResponse = response;
    } else {
      const message = (exception as Error)?.message;
      const stack = (exception as Error)?.stack;
      if ((exception as Error).message?.includes('E11000')) {
        statusCode = HttpStatus.BAD_REQUEST;
        prodErrorResponse = {
          message: 'Resource exist already',
        };
      } else {
        prodErrorResponse = {
          message: 'Internal server error',
        };
        this.logger.error(exception);
      }

      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      devErrorResponse = {
        message,
        stack,
      };
    }

    ctxResponse.status(statusCode).json(this.environment === 'development' ? devErrorResponse : prodErrorResponse);
  }
}
