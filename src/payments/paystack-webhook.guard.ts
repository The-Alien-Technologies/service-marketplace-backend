import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { PaymentCredentialsService } from './payment-credentials.service';

@Injectable()
export class PaystackWebhookGuard implements CanActivate {
  private readonly logger = new Logger(PaystackWebhookGuard.name);

  constructor(
    private readonly credentials: PaymentCredentialsService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
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

    const integrationKey = request.params?.integrationKey;
    if (!integrationKey) {
      throw new UnauthorizedException('Missing payment integration key');
    }
    return this.verifyForIntegration(
      request,
      integrationKey,
      signature,
      rawBody,
    );
  }

  private async verifyForIntegration(
    request: any,
    integrationKey: string,
    signature: string,
    rawBody: Buffer,
  ) {
    const resolved = await this.credentials.webhookCandidates(integrationKey);
    const match = resolved.credentials.find((candidate) => {
      try {
        this.assertSignature(signature, rawBody, candidate.secretKey);
        return true;
      } catch {
        return false;
      }
    });
    if (!match) throw new UnauthorizedException('Invalid Paystack signature');
    request.paymentIntegration = resolved.integration;
    request.paymentCredentialVersionId = match.id;
    return true;
  }

  private assertSignature(signature: string, rawBody: Buffer, secret: string) {
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
  }
}
