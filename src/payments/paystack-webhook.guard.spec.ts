import { UnauthorizedException } from '@nestjs/common';
import * as crypto from 'crypto';
import { PaystackWebhookGuard } from './paystack-webhook.guard';

describe('PaystackWebhookGuard', () => {
  const secret = 'test-secret';
  const config = { getOrThrow: jest.fn(() => secret) };

  const contextFor = (request: Record<string, unknown>) =>
    ({
      switchToHttp: () => ({ getRequest: () => request }),
    }) as never;

  it('accepts a valid HMAC-SHA512 signature over the raw body', () => {
    const rawBody = Buffer.from(
      JSON.stringify({ event: 'charge.success', data: { reference: 'ref-1' } }),
    );
    const signature = crypto
      .createHmac('sha512', secret)
      .update(rawBody)
      .digest('hex');
    const guard = new PaystackWebhookGuard(config as never);

    expect(
      guard.canActivate(
        contextFor({
          rawBody,
          headers: { 'x-paystack-signature': signature },
        }),
      ),
    ).toBe(true);
  });

  it('rejects an invalid signature', () => {
    const guard = new PaystackWebhookGuard(config as never);

    expect(() =>
      guard.canActivate(
        contextFor({
          rawBody: Buffer.from('{}'),
          headers: { 'x-paystack-signature': 'invalid' },
        }),
      ),
    ).toThrow(UnauthorizedException);
  });
});
