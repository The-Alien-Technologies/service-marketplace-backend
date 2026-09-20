import { validateEnvironment } from './environment';

describe('validateEnvironment', () => {
  it('allows local development without Paystack credentials', () => {
    expect(validateEnvironment({ NODE_ENV: 'development' })).toEqual({
      NODE_ENV: 'development',
    });
  });

  it('requires payment configuration in production', () => {
    expect(() => validateEnvironment({ NODE_ENV: 'production' })).toThrow(
      'PAYMENT_CREDENTIAL_ENCRYPTION_KEY is required',
    );
  });

  it('requires HTTPS production URLs', () => {
    expect(() =>
      validateEnvironment({
        NODE_ENV: 'production',
        PAYMENT_CREDENTIAL_ENCRYPTION_KEY: Buffer.alloc(32).toString('base64'),
        PAYSTACK_CALLBACK_URL: 'http://api.example.com/callback',
        WEBSITE_URL: 'https://example.com',
      }),
    ).toThrow('PAYSTACK_CALLBACK_URL must be a valid HTTPS URL');
  });

  it('accepts complete production configuration', () => {
    const config = {
      NODE_ENV: 'production',
      PAYMENT_CREDENTIAL_ENCRYPTION_KEY: Buffer.alloc(32).toString('base64'),
      PAYSTACK_CALLBACK_URL: 'https://example.com/checkout/callback',
      PAYSTACK_BASE_URL: 'https://api.paystack.co',
      WEBSITE_URL: 'https://example.com',
      CORS_ORIGINS: 'https://example.com,https://admin.example.com',
      PAYOUTS_ENABLED: 'false',
      EMAIL_PROVIDER: 'RESEND',
      RESEND_API_KEY: 're_live_key',
      RESEND_FROM_EMAIL: 'Pavodah <noreply@example.com>',
      SMS_PROVIDER: 'HUBTEL',
      HUBTEL_CLIENT_ID: 'client-id',
      HUBTEL_CLIENT_SECRET: 'client-secret',
      FILE_UPLOAD_PROVIDER: 'AWS_S3',
      AWS_REGION: 'us-east-1',
      AWS_ACCESS_KEY_ID: 'access-key',
      AWS_SECRET_ACCESS_KEY: 'secret-key',
      AWS_S3_BUCKET_NAME: 'pavodah-production',
      OPEN_AI_KEY: 'openai-key',
      BACKEND_URL: 'https://api.example.com',
    };
    expect(validateEnvironment(config)).toBe(config);
  });

  it('rejects test-only SMS and local uploads in production', () => {
    const config = {
      NODE_ENV: 'production',
      PAYMENT_CREDENTIAL_ENCRYPTION_KEY: Buffer.alloc(32).toString('base64'),
      PAYSTACK_CALLBACK_URL: 'https://example.com/checkout/callback',
      WEBSITE_URL: 'https://example.com',
      EMAIL_PROVIDER: 'RESEND',
      RESEND_API_KEY: 're_live_key',
      RESEND_FROM_EMAIL: 'noreply@example.com',
      SMS_PROVIDER: 'TEST',
      FILE_UPLOAD_PROVIDER: 'LOCAL',
    };
    expect(() => validateEnvironment(config)).toThrow(
      'SMS_PROVIDER must be HUBTEL, ARKESEL, or AFRICASTALKING',
    );
  });
});
