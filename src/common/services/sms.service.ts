import { Injectable, Logger } from '@nestjs/common';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { ConfigService } from '@nestjs/config';

export interface SmsOptions {
  phoneNumber: string;
  message: string;
}

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);
  private readonly snsClient: SNSClient;

  constructor(private readonly configService: ConfigService) {
    this.snsClient = new SNSClient({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID')!,
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY')!,
      },
    });
  }

  async sendSms(options: SmsOptions): Promise<void> {
    const { phoneNumber, message } = options;

    // Validate phone number format (should start with + and country code)
    if (!phoneNumber.startsWith('+')) {
      throw new Error('Phone number must include country code (e.g., +1234567890)');
    }

    const command = new PublishCommand({
      PhoneNumber: phoneNumber,
      Message: message,
      MessageAttributes: {
        'AWS.SNS.SMS.SenderID': {
          DataType: 'String',
          StringValue: this.configService.get('SMS_SENDER_ID', 'Pavodah'),
        },
        'AWS.SNS.SMS.SMSType': {
          DataType: 'String',
          StringValue: 'Transactional', // Use 'Promotional' for marketing messages
        },
      },
    });

    try {
      const result = await this.snsClient.send(command);
      this.logger.log(`SMS sent successfully to ${phoneNumber}. MessageId: ${result.MessageId}`);
    } catch (error) {
      this.logger.error(`Failed to send SMS to ${phoneNumber}:`, error);
      throw new Error(`Failed to send SMS to ${phoneNumber}: ${error.message}`);
    }
  }

  async sendVerificationCode(phoneNumber: string, code: string): Promise<void> {
    const appName = this.configService.get('APP_NAME', 'Pavodah');
    const message = `Your ${appName} verification code is: ${code}. This code will expire in 10 minutes.`;
    
    await this.sendSms({
      phoneNumber,
      message,
    });
  }

  async sendPasswordResetCode(phoneNumber: string, code: string): Promise<void> {
    const appName = this.configService.get('APP_NAME', 'Pavodah');
    const message = `Your ${appName} password reset code is: ${code}. This code will expire in 10 minutes.`;
    
    await this.sendSms({
      phoneNumber,
      message,
    });
  }

  /**
   * Format phone number to E.164 format if needed
   * This is a basic implementation - you might want to use a library like libphonenumber-js for more robust formatting
   */
  formatPhoneNumber(phoneNumber: string, defaultCountryCode: string = '+233'): string {
    // Remove all non-digit characters
    const digits = phoneNumber.replace(/\D/g, '');
    
    // If it already starts with +, return as is
    if (phoneNumber.startsWith('+')) {
      return phoneNumber;
    }
    
    // If it starts with country code digits (e.g., 233 for Ghana), add +
    if (digits.startsWith('233')) {
      return `+${digits}`;
    }
    
    // If it's a local number (e.g., 0241234567), remove leading 0 and add country code
    if (digits.startsWith('0')) {
      return `${defaultCountryCode}${digits.substring(1)}`;
    }
    
    // Otherwise, assume it's a local number without leading 0
    return `${defaultCountryCode}${digits}`;
  }
}
