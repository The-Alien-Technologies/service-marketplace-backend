import { UnauthorizedException } from '@nestjs/common';
import * as crypto from 'crypto';
import { PaystackWebhookGuard } from './paystack-webhook.guard';

describe('PaystackWebhookGuard', () => {
  const secret = 'test-secret';
  const credentials = {
    webhookCandidates: jest.fn().mockResolvedValue({
      integration: { id: 'integration-gh' },
      credentials: [{ id: 'credential-gh', secretKey: secret }],
    }),
  };

  const contextFor = (request: Record<string, unknown>) =>
    ({
      switchToHttp: () => ({ getRequest: () => request }),
    }) as never;

  beforeEach(() => jest.clearAllMocks());

  it('accepts a valid HMAC-SHA512 signature over the raw body', async () => {
    const rawBody = Buffer.from(
      JSON.stringify({ event: 'charge.success', data: { reference: 'ref-1' } }),
    );
    const signature = crypto
      .createHmac('sha512', secret)
      .update(rawBody)
      .digest('hex');
    const guard = new PaystackWebhookGuard(credentials as never);

    await expect(
      guard.canActivate(
        contextFor({
          rawBody,
          headers: { 'x-paystack-signature': signature },
          params: { integrationKey: 'ghana-key' },
        }),
      ),
    ).resolves.toBe(true);
    expect(credentials.webhookCandidates).toHaveBeenCalledWith('ghana-key');
  });

  it('rejects an invalid signature', async () => {
    const guard = new PaystackWebhookGuard(credentials as never);

    await expect(
      guard.canActivate(
        contextFor({
          rawBody: Buffer.from('{}'),
          headers: { 'x-paystack-signature': 'invalid' },
          params: { integrationKey: 'ghana-key' },
        }),
      ),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('rejects webhooks without a country integration key', () => {
    const guard = new PaystackWebhookGuard(credentials as never);
    expect(() =>
      guard.canActivate(
        contextFor({
          rawBody: Buffer.from('{}'),
          headers: { 'x-paystack-signature': 'signature' },
          params: {},
        }),
      ),
    ).toThrow('Missing payment integration key');
  });
});
