import { Logger } from '@nestjs/common';
import { SmsService } from './sms.service';

describe('SmsService', () => {
  let fetchMock: jest.Mock;

  const makeService = (values: Record<string, string | undefined>) =>
    new SmsService({
      get: jest.fn((key: string, fallback?: string) => values[key] ?? fallback),
    } as never);

  beforeEach(() => {
    fetchMock = jest.fn();
    global.fetch = fetchMock as never;
    jest.spyOn(Logger.prototype, 'log').mockImplementation();
    jest.spyOn(Logger.prototype, 'error').mockImplementation();
  });

  afterEach(() => jest.restoreAllMocks());

  it('sends Hubtel messages with encoded query parameters', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      status: 201,
      json: jest.fn().mockResolvedValue({ messageId: 'message-1' }),
    });
    const service = makeService({
      SMS_PROVIDER: 'HUBTEL',
      HUBTEL_CLIENT_ID: ' client-id ',
      HUBTEL_CLIENT_SECRET: ' client-secret ',
      HUBTEL_SENDER_ID: ' Pavodah ',
    });

    await service.sendSms('+233241234567', 'Your code is 123456');

    const [rawUrl, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const url = new URL(rawUrl);
    expect(url.origin).toBe('https://sms.hubtel.com');
    expect(url.pathname).toBe('/v1/messages/send');
    expect(url.searchParams.get('clientid')).toBe('client-id');
    expect(url.searchParams.get('clientsecret')).toBe('client-secret');
    expect(url.searchParams.get('from')).toBe('Pavodah');
    expect(url.searchParams.get('to')).toBe('+233241234567');
    expect(url.searchParams.get('content')).toBe('Your code is 123456');
    expect(init.method).toBe('GET');
    expect(init.signal).toBeInstanceOf(AbortSignal);
  });

  it('requires Hubtel credentials', async () => {
    const service = makeService({
      SMS_PROVIDER: 'HUBTEL',
      HUBTEL_CLIENT_ID: 'client-id',
    });

    await expect(service.sendSms('+233241234567', 'Message')).rejects.toThrow(
      'HUBTEL_CLIENT_ID and HUBTEL_CLIENT_SECRET are required',
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('surfaces Hubtel error responses', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 401,
      json: jest.fn().mockResolvedValue({ message: 'Unauthorized' }),
    });
    const service = makeService({
      SMS_PROVIDER: 'HUBTEL',
      HUBTEL_CLIENT_ID: 'client-id',
      HUBTEL_CLIENT_SECRET: 'client-secret',
    });

    await expect(service.sendSms('+233241234567', 'Message')).rejects.toThrow(
      'Hubtel SMS API returned 401',
    );
  });

  it('sends Arkesel messages as JSON', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({ status: 'success' }),
    });
    const service = makeService({
      SMS_PROVIDER: 'ARKESEL',
      ARKESEL_API_KEY: 'api-key',
      ARKESEL_SENDER_ID: 'Pavodah',
    });

    await service.sendSms('+233241234567', 'Message');

    expect(fetchMock).toHaveBeenCalledWith(
      'https://sms.arkesel.com/api/v2/sms/send',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          sender: 'Pavodah',
          message: 'Message',
          recipients: ['+233241234567'],
        }),
      }),
    );
  });

  it("sends Africa's Talking messages as form data", async () => {
    fetchMock.mockResolvedValue({
      status: 201,
      json: jest.fn().mockResolvedValue({
        SMSMessageData: {
          Message: 'Sent to 1/1',
          Recipients: [{ status: 'Success', statusCode: 101 }],
        },
      }),
    });
    const service = makeService({
      SMS_PROVIDER: 'AFRICASTALKING',
      AFRICASTALKING_USERNAME: 'pavodah',
      AFRICASTALKING_API_KEY: 'api-key',
      AFRICASTALKING_SENDER_ID: 'Pavodah',
    });

    await service.sendSms('+233241234567', 'Message');

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('https://api.africastalking.com/version1/messaging');
    expect(init.method).toBe('POST');
    const body = new URLSearchParams(init.body as string);
    expect(body.get('username')).toBe('pavodah');
    expect(body.get('to')).toBe('+233241234567');
    expect(body.get('message')).toBe('Message');
    expect(body.get('from')).toBe('Pavodah');
  });

  it('does not make a network request in TEST mode', async () => {
    const service = makeService({ SMS_PROVIDER: 'TEST' });
    await service.sendSms('+233241234567', 'Message');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects an unknown provider', async () => {
    const service = makeService({ SMS_PROVIDER: 'UNKNOWN' });
    await expect(service.sendSms('+233241234567', 'Message')).rejects.toThrow(
      'SMS_PROVIDER is not configured',
    );
  });
});
