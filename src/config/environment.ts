const REQUIRED_PRODUCTION_VALUES = [
  'PAYSTACK_SECRET_KEY',
  'PAYSTACK_CALLBACK_URL',
  'WEBSITE_URL',
] as const;

function requireHttpsUrl(config: Record<string, unknown>, key: string) {
  const value = String(config[key] ?? '');
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') throw new Error();
  } catch {
    throw new Error(`${key} must be a valid HTTPS URL in production`);
  }
}

export function validateEnvironment(config: Record<string, unknown>) {
  const booleanKeys = [
    'PAYOUTS_ENABLED',
    'PAYOUT_RECONCILIATION_ENABLED',
    'REFUND_RECONCILIATION_ENABLED',
  ];
  for (const key of booleanKeys) {
    const value = config[key];
    if (value !== undefined && value !== 'true' && value !== 'false') {
      throw new Error(`${key} must be either "true" or "false"`);
    }
  }

  if (config.NODE_ENV !== 'production') return config;

  for (const key of REQUIRED_PRODUCTION_VALUES) {
    const value = String(config[key] ?? '').trim();
    if (!value || /replace|\.\.\./i.test(value)) {
      throw new Error(`${key} is required in production`);
    }
  }
  if (!String(config.PAYSTACK_SECRET_KEY).startsWith('sk_')) {
    throw new Error('PAYSTACK_SECRET_KEY must be a Paystack secret key');
  }
  requireHttpsUrl(config, 'PAYSTACK_CALLBACK_URL');
  requireHttpsUrl(config, 'WEBSITE_URL');
  if (config.PAYSTACK_BASE_URL) requireHttpsUrl(config, 'PAYSTACK_BASE_URL');

  const origins = String(config.CORS_ORIGINS ?? config.WEBSITE_URL)
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
  if (origins.length === 0) {
    throw new Error('CORS_ORIGINS must include the production web origin');
  }
  for (const origin of origins) {
    try {
      const url = new URL(origin);
      if (url.protocol !== 'https:' || url.origin !== origin) throw new Error();
    } catch {
      throw new Error(`Invalid production CORS origin: ${origin}`);
    }
  }

  return config;
}
