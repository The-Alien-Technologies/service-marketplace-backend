import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class PaystackWebhookGuard implements CanActivate {
  private readonly logger = new Logger(PaystackWebhookGuard.name);

  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const signature = request.headers['x-paystack-signature'];

    if (!signature || typeof signature !== 'string') {
      throw new UnauthorizedException('Missing Paystack signature');
    }

    const rawBody: Buffer | undefined = request.rawBody;
    if (!rawBody) {
      this.logger.error(
        'Raw body is unavailable; webhook verification cannot continue',
      );
      throw new UnauthorizedException('Webhook body is unavailable');
    }

    const secret = this.config.getOrThrow<string>('PAYSTACK_SECRET_KEY');
    const expected = crypto
      .createHmac('sha512', secret)
      .update(rawBody)
      .digest('hex');
    const expectedBuffer = Buffer.from(expected, 'utf8');
    const receivedBuffer = Buffer.from(signature, 'utf8');

    if (
      expectedBuffer.length !== receivedBuffer.length ||
      !crypto.timingSafeEqual(expectedBuffer, receivedBuffer)
    ) {
      throw new UnauthorizedException('Invalid Paystack signature');
    }

    return true;
  }
}
