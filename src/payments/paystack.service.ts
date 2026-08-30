import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface PaystackEnvelope<T> {
  status: boolean;
  message: string;
  data: T;
}

export class PaystackRequestException extends BadGatewayException {
  constructor(
    public readonly outcomeUnknown: boolean,
    public readonly providerMessage: string,
  ) {
    super('Unable to reach the payment provider. Please try again.');
  }
}

export interface PaystackInitializeData {
  authorization_url: string;
  access_code: string;
  reference: string;
}

export interface PaystackTransactionData {
  id?: number | string;
  status: string;
  reference: string;
  amount: number;
  currency: string;
  channel?: string;
  paid_at?: string;
  message?: string;
  gateway_response?: string;
  fees?: number;
  metadata?: Record<string, unknown> | string;
}

export interface PaystackInstitution {
  id?: number;
  name: string;
  code: string;
  slug?: string;
  type?: string;
  currency?: string;
  country?: string;
  active?: boolean;
}

export interface PaystackResolvedAccount {
  account_number: string;
  account_name: string;
  bank_id?: number | string;
}

export interface PaystackTransferRecipientData {
  id: number | string;
  recipient_code: string;
  name: string;
  type: string;
  currency: string;
  active: boolean;
  details?: {
    account_number?: string | null;
    account_name?: string | null;
    bank_code?: string | null;
    bank_name?: string | null;
  };
}

export interface PaystackTransferData {
  id?: number | string;
  amount: number;
  currency: string;
  reference: string;
  status: string;
  transfer_code?: string;
  reason?: string;
  fees?: number;
  recipient?: string | { recipient_code?: string };
  createdAt?: string;
  transferred_at?: string | null;
  failure_reason?: string | null;
}

export interface PaystackDisputeWebhookData {
  id: number | string;
  status?: string;
  resolution?: string | null;
  refund_amount?: number | string | null;
  currency?: string | null;
  transaction?: {
    id?: number | string;
    reference?: string;
    amount?: number;
    currency?: string;
  };
}

export interface PaystackRefundData {
  id: number | string;
  status: string;
  amount: number;
  currency: string;
  refund_reference?: string | null;
  refunded_at?: string | null;
  transaction?:
    | number
    | string
    | {
        id?: number | string;
        reference?: string;
      };
  createdAt?: string;
  updatedAt?: string;
}

export interface PaystackRefundWebhookData {
  status: string;
  transaction_reference: string;
  refund_reference?: string | null;
  amount: number | string;
  currency: string;
  refunded_at?: string | null;
  id?: number | string;
}

@Injectable()
export class PaystackService {
  private readonly logger = new Logger(PaystackService.name);

  constructor(private readonly config: ConfigService) {}

  initialize(input: {
    email: string;
    amountMinor: number;
    currency: string;
    reference: string;
    callbackUrl: string;
    metadata: Record<string, unknown>;
  }) {
    return this.request<PaystackInitializeData>('/transaction/initialize', {
      method: 'POST',
      body: JSON.stringify({
        email: input.email,
        amount: String(input.amountMinor),
        currency: input.currency,
        reference: input.reference,
        callback_url: input.callbackUrl,
        metadata: input.metadata,
      }),
    });
  }

  verify(reference: string) {
    return this.request<PaystackTransactionData>(
      `/transaction/verify/${encodeURIComponent(reference)}`,
      { method: 'GET' },
    );
  }

  refund(input: {
    reference: string;
    amountMinor: number;
    currency: string;
    reason?: string;
  }) {
    return this.request<PaystackRefundData>('/refund', {
      method: 'POST',
      body: JSON.stringify({
        transaction: input.reference,
        amount: input.amountMinor,
        currency: input.currency,
        customer_note: input.reason || 'Service order refund',
        merchant_note: input.reason || 'Pavodah service order refund',
      }),
    });
  }

  fetchRefund(refundId: string) {
    return this.request<PaystackRefundData>(
      `/refund/${encodeURIComponent(refundId)}`,
      { method: 'GET' },
    );
  }

  listRefunds(transactionId: string) {
    return this.request<PaystackRefundData[]>(
      `/refund?transaction=${encodeURIComponent(transactionId)}&perPage=100`,
      { method: 'GET' },
    );
  }

  retryRefund(
    refundId: string,
    details: { currency: string; accountNumber: string; bankId: string },
  ) {
    return this.request<PaystackRefundData>(
      `/refund/retry_with_customer_details/${encodeURIComponent(refundId)}`,
      {
        method: 'POST',
        body: JSON.stringify({
          refund_account_details: {
            currency: details.currency,
            account_number: details.accountNumber,
            bank_id: details.bankId,
          },
        }),
      },
    );
  }

  listInstitutions(type: 'ghipss' | 'mobile_money') {
    return this.request<PaystackInstitution[]>(
      `/bank?country=ghana&currency=GHS&type=${encodeURIComponent(type)}`,
      { method: 'GET' },
    );
  }

  resolveAccount(accountNumber: string, bankCode: string) {
    return this.request<PaystackResolvedAccount>(
      `/bank/resolve?account_number=${encodeURIComponent(accountNumber)}&bank_code=${encodeURIComponent(bankCode)}`,
      { method: 'GET' },
    );
  }

  createTransferRecipient(input: {
    type: 'ghipss' | 'mobile_money';
    name: string;
    accountNumber: string;
    institutionCode: string;
    metadata: Record<string, unknown>;
  }) {
    return this.request<PaystackTransferRecipientData>('/transferrecipient', {
      method: 'POST',
      body: JSON.stringify({
        type: input.type,
        name: input.name,
        account_number: input.accountNumber,
        bank_code: input.institutionCode,
        currency: 'GHS',
        metadata: input.metadata,
      }),
    });
  }

  deactivateTransferRecipient(recipientCode: string) {
    return this.request<Record<string, never>>(
      `/transferrecipient/${encodeURIComponent(recipientCode)}`,
      { method: 'DELETE' },
    );
  }

  initiateTransfer(input: {
    amountMinor: number;
    recipientCode: string;
    reference: string;
    reason: string;
  }) {
    return this.request<PaystackTransferData>('/transfer', {
      method: 'POST',
      body: JSON.stringify({
        source: 'balance',
        amount: input.amountMinor,
        recipient: input.recipientCode,
        reference: input.reference,
        reason: input.reason,
        currency: 'GHS',
      }),
    });
  }

  finalizeTransfer(transferCode: string, otp: string) {
    return this.request<PaystackTransferData>('/transfer/finalize_transfer', {
      method: 'POST',
      body: JSON.stringify({ transfer_code: transferCode, otp }),
    });
  }

  verifyTransfer(reference: string) {
    return this.request<PaystackTransferData>(
      `/transfer/verify/${encodeURIComponent(reference)}`,
      { method: 'GET' },
    );
  }

  private async request<T>(path: string, init: RequestInit): Promise<T> {
    const secret = this.config.getOrThrow<string>('PAYSTACK_SECRET_KEY');
    const baseUrl = this.config.get<string>(
      'PAYSTACK_BASE_URL',
      'https://api.paystack.co',
    );
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);

    try {
      const response = await fetch(`${baseUrl}${path}`, {
        ...init,
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${secret}`,
          'Content-Type': 'application/json',
          ...init.headers,
        },
      });
      const envelope = (await response.json()) as PaystackEnvelope<T>;

      if (!response.ok || !envelope.status) {
        throw new PaystackRequestException(
          response.status >= 500,
          envelope.message || `HTTP ${response.status}`,
        );
      }

      return envelope.data;
    } catch (error) {
      if (error instanceof PaystackRequestException) {
        this.logger.error(
          `Paystack request failed for ${path}: ${error.providerMessage}`,
        );
        throw error;
      }
      const message =
        error instanceof Error && error.name === 'AbortError'
          ? 'Paystack request timed out'
          : error instanceof Error
            ? error.message
            : 'Unknown Paystack error';
      this.logger.error(`Paystack request failed for ${path}: ${message}`);
      throw new PaystackRequestException(true, message);
    } finally {
      clearTimeout(timeout);
    }
  }
}
