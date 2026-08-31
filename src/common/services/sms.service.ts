import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export enum SmsProvider {
  HUBTEL = 'HUBTEL',
  ARKESEL = 'ARKESEL',
  AFRICASTALKING = 'AFRICASTALKING',
  TEST = 'TEST',
}

export const TEST_OTP_CODE = '123456';

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);

  constructor(private readonly configService: ConfigService) {}

  getProvider(): SmsProvider | undefined {
    const provider = this.configService.get<string>('SMS_PROVIDER')?.trim();
    if (!provider) return undefined;
    if (!(provider in SmsProvider)) return undefined;
    return provider as SmsProvider;
  }

  async sendSms(phone: string, message: string): Promise<void> {
    switch (this.getProvider()) {
      case SmsProvider.HUBTEL:
        await this.sendWithHubtel(phone, message);
        return;
      case SmsProvider.ARKESEL:
        await this.sendWithArkesel(phone, message);
        return;
      case SmsProvider.AFRICASTALKING:
        await this.sendWithAfricasTalking(phone, message);
        return;
      case SmsProvider.TEST:
        this.logger.log(`[TEST] SMS to ${phone}: ${message}`);
        return;
      default:
        throw new Error(
          'SMS_PROVIDER is not configured. Set SMS_PROVIDER to HUBTEL, ARKESEL, AFRICASTALKING, or TEST.',
        );
    }
  }

  async sendVerificationCode(phone: string, code: string): Promise<void> {
    const appName = this.configService.get<string>('APP_NAME', 'Pavodah');
    await this.sendSms(
      phone,
      `Your ${appName} verification code is: ${code}. This code will expire in 10 minutes.`,
    );
  }

  async sendPasswordResetCode(phone: string, code: string): Promise<void> {
    const appName = this.configService.get<string>('APP_NAME', 'Pavodah');
    await this.sendSms(
      phone,
      `Your ${appName} password reset code is: ${code}. This code will expire in 10 minutes.`,
    );
  }

  private async sendWithHubtel(phone: string, message: string): Promise<void> {
    const clientId = this.configService.get<string>('HUBTEL_CLIENT_ID')?.trim();
    const clientSecret = this.configService
      .get<string>('HUBTEL_CLIENT_SECRET')
      ?.trim();
    const senderId = this.configService.get<string>('HUBTEL_SENDER_ID')?.trim();

    if (!clientId || !clientSecret) {
      throw new Error('HUBTEL_CLIENT_ID and HUBTEL_CLIENT_SECRET are required');
    }

    const url = new URL('https://smsc.hubtel.com/v1/messages/send');
    url.search = new URLSearchParams({
      clientid: clientId,
      clientsecret: clientSecret,
      from: senderId || 'Pavodah',
      to: phone.trim().replace(/^\+/, ''),
      content: message,
    }).toString();

    let response: Response;
    try {
      response = await this.fetchWithTimeout(url.toString(), { method: 'GET' });
    } catch (error) {
      this.logger.error(`Failed to send SMS to ${phone} with Hubtel:`, error);
      throw new Error(`Failed to send SMS to ${phone}`);
    }

    if (!response.ok) {
      const errorData = await this.readJsonResponse(response);
      this.logger.error(
        `Hubtel SMS API error (${response.status}):`,
        errorData,
      );
      throw new Error(
        `Hubtel SMS API returned ${response.status}: ${JSON.stringify(errorData)}`,
      );
    }

    const result = await this.readJsonResponse(response);
    const messageId =
      this.getResponseString(result, 'messageId') ??
      this.getResponseString(result, 'MessageId') ??
      'unknown';
    this.logger.log(
      `SMS sent successfully to ${phone} via Hubtel. MessageId: ${messageId}`,
    );
  }

  private async sendWithArkesel(phone: string, message: string): Promise<void> {
    const apiKey = this.configService.get<string>('ARKESEL_API_KEY')?.trim();
    const senderId = this.configService
      .get<string>('ARKESEL_SENDER_ID')
      ?.trim();

    if (!apiKey) {
      throw new Error('ARKESEL_API_KEY is required');
    }

    let response: Response;
    try {
      response = await this.fetchWithTimeout(
        'https://sms.arkesel.com/api/v2/sms/send',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': apiKey,
          },
          body: JSON.stringify({
            sender: senderId || 'Pavodah',
            message,
            recipients: [phone],
          }),
        },
      );
    } catch (error) {
      this.logger.error(`Failed to send SMS to ${phone} with Arkesel:`, error);
      throw new Error(`Failed to send SMS to ${phone}`);
    }

    if (!response.ok) {
      const errorData = await this.readJsonResponse(response);
      this.logger.error(
        `Arkesel SMS API error (${response.status}):`,
        errorData,
      );
      throw new Error(
        `Arkesel SMS API returned ${response.status}: ${JSON.stringify(errorData)}`,
      );
    }

    const result = await this.readJsonResponse(response);
    this.logger.log(
      `SMS sent successfully to ${phone} via Arkesel. Response: ${JSON.stringify(result)}`,
    );
  }

  private async sendWithAfricasTalking(
    phone: string,
    message: string,
  ): Promise<void> {
    const username = this.configService
      .get<string>('AFRICASTALKING_USERNAME')
      ?.trim();
    const apiKey = this.configService
      .get<string>('AFRICASTALKING_API_KEY')
      ?.trim();
    const senderId = this.configService
      .get<string>('AFRICASTALKING_SENDER_ID')
      ?.trim();

    if (!username || !apiKey) {
      throw new Error(
        'AFRICASTALKING_USERNAME and AFRICASTALKING_API_KEY are required',
      );
    }

    const sandbox =
      username.toLowerCase() === 'sandbox' ||
      this.getBooleanConfig('AFRICASTALKING_SANDBOX', false);
    const enqueue = this.getBooleanConfig('AFRICASTALKING_ENQUEUE', true);
    const endpoint = sandbox
      ? 'https://api.sandbox.africastalking.com/version1/messaging'
      : 'https://api.africastalking.com/version1/messaging';

    const body = new URLSearchParams({
      username,
      to: phone,
      message,
      bulkSMSMode: '1',
    });
    if (senderId && !sandbox) body.set('from', senderId);
    if (enqueue) body.set('enqueue', '1');

    let response: Response;
    try {
      response = await this.fetchWithTimeout(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          apiKey,
        },
        body: body.toString(),
      });
    } catch (error) {
      this.logger.error(
        `Failed to send SMS to ${phone} with Africa's Talking:`,
        error,
      );
      throw new Error(`Failed to send SMS to ${phone}`);
    }

    if (response.status !== 201) {
      const errorData = await response.text().catch(() => '');
      this.logger.error(
        `Africa's Talking SMS API error (${response.status}): ${errorData}`,
      );
      throw new Error(
        `Africa's Talking SMS API returned ${response.status}: ${errorData}`,
      );
    }

    const result = await this.readJsonResponse(response);
    this.assertAfricasTalkingAcceptedResponse(result);
    this.logger.log(
      `SMS sent successfully to ${phone} via Africa's Talking. Response: ${JSON.stringify(result)}`,
    );
  }

  private getBooleanConfig(key: string, defaultValue: boolean): boolean {
    const value = this.configService.get<string>(key);
    if (value === undefined || value === null || value === '') {
      return defaultValue;
    }
    return ['1', 'true', 'yes', 'on'].includes(value.trim().toLowerCase());
  }

  private async fetchWithTimeout(
    url: string,
    init: RequestInit,
  ): Promise<Response> {
    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      this.getRequestTimeoutMs(),
    );

    try {
      return await fetch(url, { ...init, signal: controller.signal });
    } finally {
      clearTimeout(timeout);
    }
  }

  private getRequestTimeoutMs(): number {
    const value = Number(
      this.configService.get<string>('SMS_REQUEST_TIMEOUT_MS'),
    );
    return Number.isFinite(value) && value > 0 ? value : 10000;
  }

  private async readJsonResponse(response: Response): Promise<unknown> {
    return (await response.json().catch(() => ({}))) as unknown;
  }

  private getResponseString(value: unknown, key: string): string | undefined {
    if (typeof value !== 'object' || value === null || !(key in value)) {
      return undefined;
    }
    const entry = (value as Record<string, unknown>)[key];
    if (typeof entry === 'string') return entry;
    if (typeof entry === 'number') return String(entry);
    return undefined;
  }

  private assertAfricasTalkingAcceptedResponse(result: unknown): void {
    if (typeof result !== 'object' || result === null) {
      throw new Error("Africa's Talking SMS response was invalid");
    }

    const messageData = (result as Record<string, unknown>).SMSMessageData;
    if (typeof messageData !== 'object' || messageData === null) {
      throw new Error(
        "Africa's Talking SMS response was missing SMSMessageData",
      );
    }

    const data = messageData as Record<string, unknown>;
    const message =
      typeof data.Message === 'string' ? data.Message : 'Unknown response';
    const recipients = Array.isArray(data.Recipients) ? data.Recipients : [];
    const accepted = recipients.some((recipient) => {
      if (typeof recipient !== 'object' || recipient === null) return false;
      const row = recipient as Record<string, unknown>;
      const statusCode =
        typeof row.statusCode === 'number' ? row.statusCode : undefined;
      const status = typeof row.status === 'string' ? row.status : undefined;
      return (
        (statusCode !== undefined && statusCode >= 100 && statusCode < 200) ||
        status?.toLowerCase() === 'success'
      );
    });

    if (!accepted) {
      throw new Error(`Africa's Talking SMS was not accepted: ${message}`);
    }
  }
}
