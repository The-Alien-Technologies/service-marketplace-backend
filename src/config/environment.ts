const REQUIRED_PRODUCTION_VALUES = [
  'PAYMENT_CREDENTIAL_ENCRYPTION_KEY',
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

function requireValues(config: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = String(config[key] ?? '').trim();
    if (!value || /replace|\.\.\./i.test(value)) {
      throw new Error(`${key} is required in production`);
    }
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
  const encryptionKey = String(config.PAYMENT_CREDENTIAL_ENCRYPTION_KEY ?? '');
  if (Buffer.from(encryptionKey, 'base64').length !== 32) {
    throw new Error(
      'PAYMENT_CREDENTIAL_ENCRYPTION_KEY must decode to 32 bytes',
    );
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

  const emailProvider = String(config.EMAIL_PROVIDER ?? '').trim();
  if (!['AWS', 'RESEND', 'ZEPTO'].includes(emailProvider)) {
    throw new Error(
      'EMAIL_PROVIDER must be AWS, RESEND, or ZEPTO in production',
    );
  }
  if (emailProvider === 'AWS') {
    requireValues(config, [
      'AWS_REGION',
      'AWS_ACCESS_KEY_ID',
      'AWS_SECRET_ACCESS_KEY',
      'FROM_EMAIL',
    ]);
  } else if (emailProvider === 'RESEND') {
    requireValues(config, ['RESEND_API_KEY', 'RESEND_FROM_EMAIL']);
  } else {
    requireValues(config, ['ZEPTO_API_KEY', 'SUPPORT_EMAIL']);
  }

  const smsProvider = String(config.SMS_PROVIDER ?? '').trim();
  if (!['HUBTEL', 'ARKESEL', 'AFRICASTALKING'].includes(smsProvider)) {
    throw new Error(
      'SMS_PROVIDER must be HUBTEL, ARKESEL, or AFRICASTALKING in production',
    );
  }
  if (smsProvider === 'HUBTEL') {
    requireValues(config, ['HUBTEL_CLIENT_ID', 'HUBTEL_CLIENT_SECRET']);
  } else if (smsProvider === 'ARKESEL') {
    requireValues(config, ['ARKESEL_API_KEY']);
  } else {
    requireValues(config, [
      'AFRICASTALKING_USERNAME',
      'AFRICASTALKING_API_KEY',
    ]);
  }

  const uploadProvider = String(config.FILE_UPLOAD_PROVIDER ?? '').trim();
  if (!['AWS_S3', 'SUPABASE', 'CLOUDINARY'].includes(uploadProvider)) {
    throw new Error(
      'FILE_UPLOAD_PROVIDER must be AWS_S3, SUPABASE, or CLOUDINARY in production',
    );
  }
  if (uploadProvider === 'AWS_S3') {
    requireValues(config, [
      'AWS_REGION',
      'AWS_ACCESS_KEY_ID',
      'AWS_SECRET_ACCESS_KEY',
      'AWS_S3_BUCKET_NAME',
    ]);
  } else if (uploadProvider === 'SUPABASE') {
    requireValues(config, [
      'SUPABASE_URL',
      'SUPABASE_KEY',
      'SUPABASE_BUCKET_NAME',
    ]);
  } else {
    requireValues(config, [
      'CLOUDINARY_CLOUD_NAME',
      'CLOUDINARY_API_KEY',
      'CLOUDINARY_API_SECRETE',
    ]);
  }

  requireValues(config, ['OPEN_AI_KEY', 'BACKEND_URL']);
  requireHttpsUrl(config, 'BACKEND_URL');

  return config;
}
