import { Injectable, Logger } from '@nestjs/common';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { ConfigService } from '@nestjs/config';
import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import { Resend } from 'resend';

export interface EmailOptions {
  to: string[];
  subject: string;
  html: string;
  text?: string;
}

export interface PasswordResetEmailData {
  appName: string;
  userName: string;
  otpCode: string;
  expiryMinutes: number;
  supportEmail: string;
  currentYear: number;
}

export interface WelcomeEmailData {
  appName: string;
  userName: string;
  userEmail: string;
  supportEmail: string;
  appUrl: string;
  currentYear: number;
}

enum EmailProvider {
  AWS = 'AWS',
  RESEND = 'RESEND',
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly sesClient: SESClient;
  private readonly resendClient: Resend;
  private readonly templatesPath: string;

  constructor(private readonly configService: ConfigService) {
    this.sesClient = new SESClient({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID')!,
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY')!,
      },
    });

    this.resendClient = new Resend(this.configService.get<string>('RESEND_API_KEY'));

    this.templatesPath = path.join(__dirname, '../../templates/email');
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    const provider = this.configService.get<string>('EMAIL_PROVIDER', EmailProvider.AWS);

    switch (provider) {
      case EmailProvider.AWS:
        await this.sendEmailWithAws(options);
        break;
      case EmailProvider.RESEND:
        await this.sendEmailWithResend(options);
        break;
      default:
        await this.sendEmailWithAws(options);
    }
  }

  async sendPasswordResetOtp(email: string, otpCode: string, userName?: string): Promise<void> {
    const templateData: PasswordResetEmailData = {
      appName: this.configService.get<string>('APP_NAME', 'Pavodah'),
      userName: userName || 'User',
      otpCode: otpCode,
      expiryMinutes: 15, // 15 minutes for OTP expiry
      supportEmail: this.configService.get<string>('SUPPORT_EMAIL', 'support@pavodah.com'),
      currentYear: new Date().getFullYear(),
    };

    const html = await this.renderTemplate('password-reset-otp.hbs', templateData);
    const text = await this.renderTemplate('password-reset-otp.txt', templateData);

    await this.sendEmail({
      to: [email],
      subject: `${templateData.appName} - Your Password Reset Code`,
      html,
      text,
    });
  }

  private async renderTemplate(templateName: string, data: any): Promise<string> {
    try {
      const templatePath = path.join(this.templatesPath, templateName);
      const templateSource = fs.readFileSync(templatePath, 'utf8');
      const template = Handlebars.compile(templateSource);
      return template(data);
    } catch (error) {
      this.logger.error(`Failed to render template ${templateName}:`, error);
      throw new Error(`Failed to render email template: ${error.message}`);
    }
  }

  /**
   * Generates a 6-digit OTP code
   */
  generateOtpCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * Validates OTP code format (6 digits)
   */
  isValidOtpFormat(otp: string): boolean {
    return /^\d{6}$/.test(otp);
  }

  // Additional email templates can be added here
  async sendWelcomeEmail(email: string, userName: string): Promise<void> {
    const templateData: WelcomeEmailData = {
      appName: this.configService.get<string>('APP_NAME', 'Pavodah'),
      userName: userName,
      userEmail: email,
      supportEmail: this.configService.get<string>('SUPPORT_EMAIL', 'support@pavodah.com'),
      appUrl: this.configService.get<string>('APP_URL', 'http://localhost:3000'),
      currentYear: new Date().getFullYear(),
    };

    const html = await this.renderTemplate('welcome.hbs', templateData);
    const text = await this.renderTemplate('welcome.txt', templateData);

    // TODO: uncomment for production
    // await this.sendEmail({
    //   to: [email],
    //   subject: `${templateData.appName} - Welcome to Pavodah!`,
    //   html,
    //   text,
    // });
  }

  async sendEmailVerificationOtp(email: string, otpCode: string, userName?: string): Promise<void> {
    // Future implementation for email verification
    this.logger.log(`Email verification OTP would be sent to ${email} with code ${otpCode}`);
  }

  private async sendEmailWithAws(options: EmailOptions): Promise<void> {
    const { to, subject, html, text } = options;

    const fromEmail = this.configService.get<string>('FROM_EMAIL', 'noreply@pavodah.com');

    const command = new SendEmailCommand({
      Source: fromEmail,
      Destination: {
        ToAddresses: to,
      },
      Message: {
        Subject: {
          Data: subject,
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: html,
            Charset: 'UTF-8',
          },
          Text: text
            ? {
                Data: text,
                Charset: 'UTF-8',
              }
            : undefined,
        },
      },
    });

    try {
      const result = await this.sesClient.send(command);
      this.logger.log(`Email sent successfully to ${to}. MessageId: ${result.MessageId}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${to} with SES:`, error);
      throw new Error(`Failed to send email to ${to}`);
    }
  }

  private async sendEmailWithResend(options: EmailOptions): Promise<void> {
    const { to, subject, html, text } = options;

    const fromEmail = this.configService.get<string>('RESEND_FROM_EMAIL', 'noreply@pavodah.com');

    const config = {
      from: fromEmail,
      to: to,
      subject: subject,
      html: html,
      text: text,
    };

    try {
      const result = await this.resendClient.emails.send(config);
      this.logger.log(`Email sent successfully to ${to}. MessageId: ${result.data.id}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${to} with Resend:`, error);
      throw new Error(`Failed to send email to ${to}`);
    }
  }
}
