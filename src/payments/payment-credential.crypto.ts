import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

export interface EncryptedCredential {
  encryptedSecret: string;
  encryptionIv: string;
  encryptionAuthTag: string;
}

@Injectable()
export class PaymentCredentialCrypto {
  constructor(private readonly config: ConfigService) {}

  encrypt(secret: string): EncryptedCredential {
    const key = this.key();
    const iv = randomBytes(12);
    const cipher = createCipheriv('aes-256-gcm', key, iv);
    const encrypted = Buffer.concat([
      cipher.update(secret, 'utf8'),
      cipher.final(),
    ]);
    return {
      encryptedSecret: encrypted.toString('base64'),
      encryptionIv: iv.toString('base64'),
      encryptionAuthTag: cipher.getAuthTag().toString('base64'),
    };
  }

  decrypt(value: EncryptedCredential): string {
    const decipher = createDecipheriv(
      'aes-256-gcm',
      this.key(),
      Buffer.from(value.encryptionIv, 'base64'),
    );
    decipher.setAuthTag(Buffer.from(value.encryptionAuthTag, 'base64'));
    return Buffer.concat([
      decipher.update(Buffer.from(value.encryptedSecret, 'base64')),
      decipher.final(),
    ]).toString('utf8');
  }

  private key() {
    const encoded = this.config.get<string>(
      'PAYMENT_CREDENTIAL_ENCRYPTION_KEY',
      '',
    );
    const key = Buffer.from(encoded, 'base64');
    if (key.length !== 32) {
      throw new ServiceUnavailableException(
        'Payment credential encryption is not configured',
      );
    }
    return key;
  }
}
