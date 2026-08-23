import { validateEnvironment } from './environment';

describe('validateEnvironment', () => {
  it('allows local development without Paystack credentials', () => {
    expect(validateEnvironment({ NODE_ENV: 'development' })).toEqual({
      NODE_ENV: 'development',
    });
  });

  it('requires payment configuration in production', () => {
    expect(() => validateEnvironment({ NODE_ENV: 'production' })).toThrow(
      'PAYSTACK_SECRET_KEY is required',
    );
  });

  it('requires HTTPS production URLs', () => {
    expect(() =>
      validateEnvironment({
        NODE_ENV: 'production',
        PAYSTACK_SECRET_KEY: 'sk_live_valid',
        PAYSTACK_CALLBACK_URL: 'http://api.example.com/callback',
        WEBSITE_URL: 'https://example.com',
      }),
    ).toThrow('PAYSTACK_CALLBACK_URL must be a valid HTTPS URL');
  });

  it('accepts complete production payment configuration', () => {
    const config = {
      NODE_ENV: 'production',
      PAYSTACK_SECRET_KEY: 'sk_live_valid',
      PAYSTACK_CALLBACK_URL: 'https://example.com/checkout/callback',
      PAYSTACK_BASE_URL: 'https://api.paystack.co',
      WEBSITE_URL: 'https://example.com',
      CORS_ORIGINS: 'https://example.com,https://admin.example.com',
      PAYOUTS_ENABLED: 'false',
    };
    expect(validateEnvironment(config)).toBe(config);
  });
});
