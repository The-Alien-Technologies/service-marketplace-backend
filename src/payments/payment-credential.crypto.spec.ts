import { ConfigService } from '@nestjs/config';
import { ServiceUnavailableException } from '@nestjs/common';
import { PaymentCredentialCrypto } from './payment-credential.crypto';

describe('PaymentCredentialCrypto', () => {
  const encodedKey = Buffer.alloc(32, 7).toString('base64');
  const crypto = new PaymentCredentialCrypto(
    new ConfigService({
      PAYMENT_CREDENTIAL_ENCRYPTION_KEY: encodedKey,
    }),
  );

  it('round-trips a secret using authenticated encryption', () => {
    const encrypted = crypto.encrypt('paystack-country-secret');
    expect(encrypted.encryptedSecret).not.toContain('sk_test');
    expect(crypto.decrypt(encrypted)).toBe('paystack-country-secret');
  });

  it('rejects an invalid master-key configuration', () => {
    const unconfigured = new PaymentCredentialCrypto(new ConfigService({}));
    expect(() => unconfigured.encrypt('paystack-country-secret')).toThrow(
      ServiceUnavailableException,
    );
  });

  it('detects ciphertext tampering', () => {
    const encrypted = crypto.encrypt('paystack-country-secret');
    const bytes = Buffer.from(encrypted.encryptedSecret, 'base64');
    bytes[0] ^= 1;
    expect(() =>
      crypto.decrypt({
        ...encrypted,
        encryptedSecret: bytes.toString('base64'),
      }),
    ).toThrow();
  });
});
