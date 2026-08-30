import {
  BalanceAdjustmentStatus,
  OrderPaymentStatus,
  OrderSource,
  OrderStatus,
  PaymentRefundStatus,
  PaymentTransactionStatus,
  Prisma,
  ProviderPayoutStatus,
  SettlementStatus,
} from '../../generated/prisma';
import { PaymentsService } from './payments.service';

describe('PaymentsService', () => {
  const makeSettlements = () => ({
    ensureForPaidOrder: jest.fn().mockResolvedValue({}),
    recalculateAfterRefund: jest.fn().mockResolvedValue({}),
    calculate: jest.fn(),
  });
  const makeTransaction = (
    paymentStatus: OrderPaymentStatus = OrderPaymentStatus.PROCESSING,
  ) => ({
    id: 'transaction-1',
    createdAt: new Date(),
    updatedAt: new Date(),
    orderId: 'order-1',
    clientId: 'client-1',
    reference: 'PAVODAH-ref1',
    accessCode: 'access-code',
    authorizationUrl: 'https://checkout.paystack.com/test',
    amount: new Prisma.Decimal('12.34'),
    amountMinor: 1234,
    currency: 'GHS',
    status: PaymentTransactionStatus.PENDING,
    isPrimary: false,
    channel: null,
    providerTransactionId: null,
    failureMessage: null,
    paidAt: null,
    verifiedAt: null,
    rawData: null,
    order: {
      id: 'order-1',
      orderNumber: 'ABC12345',
      createdAt: new Date(),
      updatedAt: new Date(),
      clientId: 'client-1',
      providerId: 'provider-1',
      serviceId: 'service-1',
      planId: 'plan-1',
      planTitle: 'Standard',
      planPrice: new Prisma.Decimal('12.34'),
      planInclusions: 'Included work',
      subtotal: new Prisma.Decimal('12.34'),
      addOnsTotal: new Prisma.Decimal(0),
      couponCode: null,
      couponDiscount: new Prisma.Decimal(0),
      total: new Prisma.Decimal('12.34'),
      currency: 'GHS',
      status: OrderStatus.PENDING,
      paymentStatus,
      source: OrderSource.SERVICE_PLAN,
      checkoutKey: null,
      quoteRequestId: null,
      paidAt: null,
    },
  });

  it('converts the database order total to pesewas during initialization', async () => {
    const order = {
      ...makeTransaction().order,
      client: { id: 'client-1', email: 'buyer@example.com' },
      paymentTransactions: [],
      paymentStatus: OrderPaymentStatus.UNPAID,
    };
    const createdTransaction = {
      ...makeTransaction(),
      status: PaymentTransactionStatus.INITIALIZED,
    };
    const initializedTransaction = {
      ...createdTransaction,
      status: PaymentTransactionStatus.PENDING,
    };
    const tx = {
      paymentTransaction: {
        update: jest.fn().mockResolvedValue(initializedTransaction),
      },
      order: { updateMany: jest.fn().mockResolvedValue({ count: 1 }) },
    };
    const prisma = {
      order: { findUnique: jest.fn().mockResolvedValue(order) },
      paymentTransaction: {
        create: jest.fn().mockResolvedValue(createdTransaction),
        update: jest.fn(),
      },
      $transaction: jest.fn((value: unknown) =>
        typeof value === 'function'
          ? (value as (client: unknown) => unknown)(tx)
          : Promise.all(value as Promise<unknown>[]),
      ),
    };
    const paystack = {
      initialize: jest.fn().mockResolvedValue({
        reference: expect.any(String),
        access_code: 'access-code',
        authorization_url: 'https://checkout.paystack.com/test',
      }),
    };
    paystack.initialize.mockImplementation(async (input) => ({
      reference: input.reference,
      access_code: 'access-code',
      authorization_url: 'https://checkout.paystack.com/test',
    }));
    const config = {
      get: jest.fn((key: string, fallback: string) =>
        key === 'WEBSITE_URL' ? 'https://pavodah.com' : fallback,
      ),
    };
    const service = new PaymentsService(
      prisma as never,
      paystack as never,
      config as never,
      makeSettlements() as never,
    );

    await service.initialize('order-1', 'client-1');

    expect(paystack.initialize).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'buyer@example.com',
        amountMinor: 1234,
        currency: 'GHS',
        reference: expect.stringMatching(/^PAVODAH-/),
      }),
    );
  });

  it('reuses the checkout that won a concurrent initialization race', async () => {
    const order = {
      ...makeTransaction().order,
      client: { id: 'client-1', email: 'buyer@example.com' },
      paymentTransactions: [],
      paymentStatus: OrderPaymentStatus.UNPAID,
    };
    const winningTransaction = makeTransaction();
    const prisma = {
      order: { findUnique: jest.fn().mockResolvedValue(order) },
      paymentTransaction: {
        create: jest.fn().mockRejectedValue({ code: 'P2002' }),
        findFirst: jest.fn().mockResolvedValue(winningTransaction),
      },
    };
    const paystack = { initialize: jest.fn() };
    const service = new PaymentsService(
      prisma as never,
      paystack as never,
      {} as never,
      makeSettlements() as never,
    );

    const result = await service.initialize('order-1', 'client-1');

    expect(result.reference).toBe(winningTransaction.reference);
    expect(result.authorizationUrl).toBe(winningTransaction.authorizationUrl);
    expect(paystack.initialize).not.toHaveBeenCalled();
  });

  it('atomically marks the transaction and order paid after exact verification', async () => {
    const transaction = makeTransaction();
    const tx = {
      $queryRaw: jest.fn().mockResolvedValue([{ id: transaction.orderId }]),
      paymentTransaction: {
        findFirst: jest.fn().mockResolvedValue(null),
        update: jest.fn().mockResolvedValue({}),
      },
      order: {
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
        findUniqueOrThrow: jest.fn().mockResolvedValue({
          paymentStatus: OrderPaymentStatus.PAID,
          status: OrderStatus.PENDING,
        }),
      },
    };
    const prisma = {
      paymentTransaction: {
        findUnique: jest.fn().mockResolvedValue(transaction),
        update: jest.fn(),
      },
      $transaction: jest.fn((callback: (client: unknown) => unknown) =>
        callback(tx),
      ),
    };
    const paystack = {
      verify: jest.fn().mockResolvedValue({
        id: 123,
        status: 'success',
        reference: transaction.reference,
        amount: 1234,
        currency: 'GHS',
        channel: 'mobile_money',
        paid_at: '2026-08-02T08:00:00.000Z',
      }),
    };
    const settlements = makeSettlements();
    const service = new PaymentsService(
      prisma as never,
      paystack as never,
      {} as never,
      settlements as never,
    );

    const result = await service.verify(transaction.reference, 'client-1');

    expect(result.paymentStatus).toBe(OrderPaymentStatus.PAID);
    expect(tx.paymentTransaction.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          status: PaymentTransactionStatus.SUCCESS,
        }),
      }),
    );
    expect(tx.order.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          paymentStatus: OrderPaymentStatus.PAID,
        }),
      }),
    );
    expect(settlements.ensureForPaidOrder).toHaveBeenCalled();
  });

  it('refunds a second successful capture without reducing the order balance', async () => {
    const transaction = {
      ...makeTransaction(OrderPaymentStatus.PAID),
      id: 'transaction-2',
      reference: 'PAVODAH-ref2',
    };
    const tx = {
      $queryRaw: jest.fn().mockResolvedValue([{ id: transaction.orderId }]),
      paymentTransaction: {
        findFirst: jest.fn().mockResolvedValue({ id: 'transaction-1' }),
        update: jest.fn().mockResolvedValue({}),
      },
      paymentRefund: {
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
        findUniqueOrThrow: jest.fn().mockImplementation(async () => ({
          id: 'refund-record-2',
          status: PaymentRefundStatus.PENDING,
        })),
      },
      order: {
        updateMany: jest.fn(),
        findUniqueOrThrow: jest.fn().mockResolvedValue({
          paymentStatus: OrderPaymentStatus.PAID,
          status: OrderStatus.PENDING,
        }),
      },
    };
    const prisma = {
      paymentTransaction: {
        findUnique: jest
          .fn()
          .mockResolvedValueOnce(transaction)
          .mockResolvedValueOnce({
            ...transaction,
            status: PaymentTransactionStatus.SUCCESS,
          }),
      },
      paymentRefund: {
        findFirst: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockImplementation(async ({ data }) => ({
          id: 'refund-record-2',
          status: PaymentRefundStatus.INITIALIZED,
          reason: data.reason,
          ...data,
        })),
        findUnique: jest.fn().mockResolvedValue({
          id: 'refund-record-2',
          transactionId: transaction.id,
          orderId: transaction.orderId,
          status: PaymentRefundStatus.INITIALIZED,
          affectsOrderBalance: false,
          amount: transaction.amount,
          amountMinor: transaction.amountMinor,
          currency: transaction.currency,
          reason: 'Duplicate refund',
          disputeId: null,
          transaction,
        }),
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
        findUniqueOrThrow: jest.fn().mockResolvedValue({
          id: 'refund-record-2',
          status: PaymentRefundStatus.PENDING,
        }),
      },
      $transaction: jest.fn((callback: (client: unknown) => unknown) =>
        callback(tx),
      ),
    };
    const paystack = {
      verify: jest.fn().mockResolvedValue({
        id: 124,
        status: 'success',
        reference: transaction.reference,
        amount: 1234,
        currency: 'GHS',
      }),
      refund: jest.fn().mockResolvedValue({
        id: 9002,
        status: 'pending',
        amount: 1234,
        currency: 'GHS',
      }),
    };
    const settlements = makeSettlements();
    const service = new PaymentsService(
      prisma as never,
      paystack as never,
      {} as never,
      settlements as never,
    );

    const result = await service.verify(transaction.reference, 'client-1');

    expect(result.paymentStatus).toBe(OrderPaymentStatus.PAID);
    expect(tx.order.updateMany).not.toHaveBeenCalled();
    expect(settlements.ensureForPaidOrder).not.toHaveBeenCalled();
    expect(prisma.paymentRefund.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ affectsOrderBalance: false }),
      }),
    );
    expect(paystack.refund).toHaveBeenCalledWith(
      expect.objectContaining({ reference: transaction.reference }),
    );
  });

  it('does not reactivate an abandoned transaction when a newer checkout exists', async () => {
    const transaction = {
      ...makeTransaction(OrderPaymentStatus.PROCESSING),
      status: PaymentTransactionStatus.ABANDONED,
    };
    const prisma = {
      paymentTransaction: {
        findUnique: jest.fn().mockResolvedValue(transaction),
        findFirst: jest.fn().mockResolvedValue({ id: 'transaction-2' }),
        update: jest.fn(),
      },
      order: {
        findUniqueOrThrow: jest.fn().mockResolvedValue({
          paymentStatus: OrderPaymentStatus.PROCESSING,
        }),
      },
    };
    const paystack = {
      verify: jest.fn().mockResolvedValue({
        status: 'pending',
        reference: transaction.reference,
        amount: 1234,
        currency: 'GHS',
      }),
    };
    const service = new PaymentsService(
      prisma as never,
      paystack as never,
      {} as never,
      makeSettlements() as never,
    );

    const result = await service.verify(transaction.reference, 'client-1');

    expect(result.paymentStatus).toBe(OrderPaymentStatus.PROCESSING);
    expect(prisma.paymentTransaction.update).not.toHaveBeenCalled();
  });

  it('refuses to deliver value when Paystack returns a different amount', async () => {
    const transaction = makeTransaction();
    const prisma = {
      paymentTransaction: {
        findUnique: jest.fn().mockResolvedValue(transaction),
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
    };
    const paystack = {
      verify: jest.fn().mockResolvedValue({
        status: 'success',
        reference: transaction.reference,
        amount: 100,
        currency: 'GHS',
      }),
    };
    const service = new PaymentsService(
      prisma as never,
      paystack as never,
      {} as never,
      makeSettlements() as never,
    );

    await expect(
      service.verify(transaction.reference, 'client-1'),
    ).rejects.toThrow('Payment amount or currency does not match the order');
    expect(prisma.paymentTransaction.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          status: PaymentTransactionStatus.AMOUNT_MISMATCH,
        }),
      }),
    );
  });

  it('preserves a partially refunded order when its successful charge is verified again', async () => {
    const transaction = {
      ...makeTransaction(OrderPaymentStatus.PARTIALLY_REFUNDED),
      status: PaymentTransactionStatus.SUCCESS,
      isPrimary: true,
    };
    const prisma = {
      paymentTransaction: {
        findUnique: jest.fn().mockResolvedValue(transaction),
      },
    };
    const paystack = { verify: jest.fn() };
    const service = new PaymentsService(
      prisma as never,
      paystack as never,
      {} as never,
      makeSettlements() as never,
    );

    const result = await service.verify(transaction.reference, 'client-1');

    expect(result.paymentStatus).toBe(OrderPaymentStatus.PARTIALLY_REFUNDED);
    expect(paystack.verify).not.toHaveBeenCalled();
  });

  it('initiates an exact full refund and moves the order to refund pending', async () => {
    const successfulTransaction = {
      ...makeTransaction(OrderPaymentStatus.PAID),
      status: PaymentTransactionStatus.SUCCESS,
      paidAt: new Date(),
    };
    const order = {
      ...successfulTransaction.order,
      paymentStatus: OrderPaymentStatus.PAID,
      paymentTransactions: [successfulTransaction],
      refunds: [],
      settlement: {
        id: 'settlement-1',
        status: SettlementStatus.HELD,
        acceptedAt: null,
      },
      externalDisputes: [],
    };
    const prisma = {
      order: {
        findUnique: jest.fn().mockResolvedValue(order),
        findUniqueOrThrow: jest.fn().mockResolvedValue({
          paymentStatus: OrderPaymentStatus.REFUND_PENDING,
        }),
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
        update: jest.fn().mockResolvedValue({}),
      },
      paymentTransaction: {
        update: jest.fn().mockResolvedValue({}),
      },
      paymentRefund: {
        findFirst: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockImplementation(async ({ data }) => ({
          id: 'refund-record-1',
          ...data,
        })),
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
        update: jest.fn().mockResolvedValue({}),
        findUnique: jest.fn().mockResolvedValue({
          id: 'refund-record-1',
          transactionId: successfulTransaction.id,
          orderId: successfulTransaction.orderId,
          status: PaymentRefundStatus.INITIALIZED,
          affectsOrderBalance: true,
          amount: successfulTransaction.amount,
          amountMinor: successfulTransaction.amountMinor,
          currency: successfulTransaction.currency,
          reason: 'Provider unavailable',
          disputeId: null,
          transaction: successfulTransaction,
        }),
        findUniqueOrThrow: jest.fn().mockResolvedValue({
          id: 'refund-record-1',
          providerRefundId: '9001',
          status: PaymentRefundStatus.PENDING,
        }),
      },
      $transaction: jest.fn((callback: (client: unknown) => unknown) =>
        callback(prisma),
      ),
    };
    const paystack = {
      refund: jest.fn().mockResolvedValue({
        id: 9001,
        status: 'pending',
        amount: 1234,
        currency: 'GHS',
      }),
    };
    const service = new PaymentsService(
      prisma as never,
      paystack as never,
      {} as never,
      makeSettlements() as never,
    );

    const result = await service.refund('order-1', 'Provider unavailable');

    expect(paystack.refund).toHaveBeenCalledWith({
      reference: successfulTransaction.reference,
      amountMinor: 1234,
      currency: 'GHS',
      reason: 'Provider unavailable',
    });
    expect(result.paymentStatus).toBe(OrderPaymentStatus.REFUND_PENDING);
    expect(prisma.order.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { paymentStatus: OrderPaymentStatus.REFUND_PENDING },
      }),
    );
  });

  it('marks the order refunded only after an exact refund.processed webhook', async () => {
    const transaction = makeTransaction(OrderPaymentStatus.REFUND_PENDING);
    const refundRecord = {
      id: 'refund-record-1',
      transactionId: transaction.id,
      orderId: transaction.orderId,
      reference: 'pavodah-refund-1',
      providerRefundId: null,
      providerRefundReference: 'refund-1',
      amount: new Prisma.Decimal('12.34'),
      amountMinor: 1234,
      currency: 'GHS',
      status: 'PENDING',
      affectsOrderBalance: true,
    };
    const tx = {
      paymentRefund: {
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
      paymentTransaction: { update: jest.fn().mockResolvedValue({}) },
    };
    const prisma = {
      paymentTransaction: {
        findUnique: jest.fn().mockResolvedValue(transaction),
      },
      paymentRefund: {
        findUnique: jest.fn().mockResolvedValue(refundRecord),
      },
      $transaction: jest.fn((callback: (client: unknown) => unknown) =>
        callback(tx),
      ),
    };
    const settlements = makeSettlements();
    const service = new PaymentsService(
      prisma as never,
      {} as never,
      {} as never,
      settlements as never,
    );

    await service.handleWebhook({
      event: 'refund.processed',
      data: {
        status: 'processed',
        transaction_reference: transaction.reference,
        refund_reference: 'refund-1',
        amount: 1234,
        currency: 'GHS',
      },
    });

    expect(settlements.recalculateAfterRefund).toHaveBeenCalledWith(
      tx,
      transaction.orderId,
      expect.objectContaining({
        refundId: refundRecord.id,
        refundAmount: refundRecord.amount,
      }),
    );
  });

  it('does not downgrade a terminal refund when an older webhook arrives', async () => {
    const transaction = makeTransaction(OrderPaymentStatus.REFUNDED);
    const refundRecord = {
      id: 'refund-record-1',
      transactionId: transaction.id,
      orderId: transaction.orderId,
      reference: 'pavodah-refund-1',
      providerRefundId: '9001',
      providerRefundReference: 'refund-1',
      amount: new Prisma.Decimal('12.34'),
      amountMinor: 1234,
      currency: 'GHS',
      status: 'PROCESSED',
      affectsOrderBalance: true,
    };
    const tx = {
      paymentRefund: {
        updateMany: jest.fn().mockResolvedValue({ count: 0 }),
      },
      paymentTransaction: { update: jest.fn() },
      order: { update: jest.fn() },
    };
    const prisma = {
      paymentTransaction: {
        findUnique: jest.fn().mockResolvedValue(transaction),
      },
      paymentRefund: {
        findUnique: jest.fn().mockResolvedValue(refundRecord),
      },
      $transaction: jest.fn((callback: (client: unknown) => unknown) =>
        callback(tx),
      ),
    };
    const service = new PaymentsService(
      prisma as never,
      {} as never,
      {} as never,
      makeSettlements() as never,
    );

    await service.handleWebhook({
      event: 'refund.pending',
      data: {
        status: 'pending',
        id: 9001,
        transaction_reference: transaction.reference,
        refund_reference: 'refund-1',
        amount: 1234,
        currency: 'GHS',
      },
    });

    expect(tx.paymentTransaction.update).not.toHaveBeenCalled();
    expect(tx.order.update).not.toHaveBeenCalled();
  });

  it('does not duplicate a terminal refund webhook without provider identifiers', async () => {
    const transaction = {
      ...makeTransaction(OrderPaymentStatus.PARTIALLY_REFUNDED),
      isPrimary: true,
    };
    const refundRecord = {
      id: 'refund-record-1',
      transactionId: transaction.id,
      orderId: transaction.orderId,
      reference: 'pavodah-refund-1',
      providerRefundId: null,
      providerRefundReference: null,
      amount: new Prisma.Decimal('5.00'),
      amountMinor: 500,
      currency: 'GHS',
      status: PaymentRefundStatus.PROCESSED,
      affectsOrderBalance: true,
    };
    const tx = {
      paymentRefund: {
        updateMany: jest.fn().mockResolvedValue({ count: 0 }),
      },
      paymentTransaction: { update: jest.fn() },
    };
    const prisma = {
      paymentTransaction: {
        findUnique: jest.fn().mockResolvedValue(transaction),
      },
      paymentRefund: {
        findFirst: jest
          .fn()
          .mockResolvedValueOnce(null)
          .mockResolvedValueOnce(refundRecord),
        create: jest.fn(),
      },
      $transaction: jest.fn((callback: (client: unknown) => unknown) =>
        callback(tx),
      ),
    };
    const settlements = makeSettlements();
    const service = new PaymentsService(
      prisma as never,
      {} as never,
      {} as never,
      settlements as never,
    );

    await service.handleWebhook({
      event: 'refund.processed',
      data: {
        status: 'processed',
        transaction_reference: transaction.reference,
        refund_reference: null,
        amount: 500,
        currency: 'GHS',
      },
    });

    expect(prisma.paymentRefund.create).not.toHaveBeenCalled();
    expect(settlements.recalculateAfterRefund).not.toHaveBeenCalled();
  });

  it('reconciles an uncertain refund by its Paystack transaction id', async () => {
    const refundRecord = {
      id: 'refund-record-uncertain',
      transactionId: 'transaction-1',
      orderId: 'order-1',
      reference: 'pavodah-refund-uncertain',
      providerRefundId: null,
      providerRefundReference: null,
      amount: new Prisma.Decimal('12.34'),
      amountMinor: 1234,
      currency: 'GHS',
      status: PaymentRefundStatus.NEEDS_ATTENTION,
      affectsOrderBalance: true,
      disputeId: null,
      updatedAt: new Date(0),
      transaction: { providerTransactionId: 'paystack-transaction-123' },
    };
    const tx = {
      paymentRefund: {
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
        findUniqueOrThrow: jest.fn().mockResolvedValue({
          ...refundRecord,
          status: PaymentRefundStatus.PROCESSED,
        }),
      },
      paymentTransaction: { update: jest.fn().mockResolvedValue({}) },
    };
    const prisma = {
      paymentRefund: {
        findMany: jest
          .fn()
          .mockResolvedValueOnce([refundRecord])
          .mockResolvedValueOnce([]),
        findUnique: jest.fn().mockResolvedValue(refundRecord),
      },
      $transaction: jest.fn((callback: (client: unknown) => unknown) =>
        callback(tx),
      ),
    };
    const paystack = {
      listRefunds: jest.fn().mockResolvedValue([
        {
          id: 9010,
          status: 'processed',
          amount: 1234,
          currency: 'GHS',
          refunded_at: '2026-08-02T08:00:00.000Z',
        },
      ]),
    };
    const settlements = makeSettlements();
    const service = new PaymentsService(
      prisma as never,
      paystack as never,
      {} as never,
      settlements as never,
    );

    const result = await service.reconcilePendingRefunds();

    expect(result).toEqual({ checked: 1, reconciled: 1, attention: 1 });
    expect(paystack.listRefunds).toHaveBeenCalledWith(
      'paystack-transaction-123',
    );
    expect(settlements.recalculateAfterRefund).toHaveBeenCalledWith(
      tx,
      'order-1',
      expect.objectContaining({
        refundId: refundRecord.id,
        refundAmount: refundRecord.amount,
      }),
    );
  });

  it('does not apply a resolved Paystack dispute twice', async () => {
    const transaction = makeTransaction(OrderPaymentStatus.PAID);
    const settlement = {
      id: 'settlement-1',
      status: SettlementStatus.HELD,
    };
    const tx = {
      externalPaymentDispute: {
        upsert: jest.fn().mockResolvedValue({ id: 'external-dispute-1' }),
        updateMany: jest.fn().mockResolvedValue({ count: 0 }),
        findUniqueOrThrow: jest.fn(),
      },
      orderSettlement: { findUnique: jest.fn() },
    };
    const prisma = {
      paymentTransaction: {
        findUnique: jest.fn().mockResolvedValue({
          ...transaction,
          order: { ...transaction.order, settlement },
        }),
      },
      $transaction: jest.fn((callback: (client: unknown) => unknown) =>
        callback(tx),
      ),
    };
    const service = new PaymentsService(
      prisma as never,
      {} as never,
      {} as never,
      makeSettlements() as never,
    );

    await service.handleWebhook({
      event: 'charge.dispute.resolve',
      data: {
        id: 42,
        resolution: 'merchant-accepted',
        refund_amount: 1234,
        currency: 'GHS',
        transaction: { reference: transaction.reference },
      },
    });

    expect(tx.externalPaymentDispute.updateMany).toHaveBeenCalled();
    expect(tx.externalPaymentDispute.findUniqueOrThrow).not.toHaveBeenCalled();
    expect(tx.orderSettlement.findUnique).not.toHaveBeenCalled();
  });

  it('records a duplicate-charge dispute without freezing real order earnings', async () => {
    const transaction = {
      ...makeTransaction(OrderPaymentStatus.PAID),
      isPrimary: false,
    };
    const tx = {
      externalPaymentDispute: {
        upsert: jest.fn().mockResolvedValue({
          id: 'external-dispute-duplicate',
          status: 'OPEN',
          affectsOrderBalance: false,
        }),
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
      orderSettlement: { findUnique: jest.fn() },
    };
    const prisma = {
      paymentTransaction: {
        findUnique: jest.fn().mockResolvedValue(transaction),
      },
      $transaction: jest.fn((callback: (client: unknown) => unknown) =>
        callback(tx),
      ),
    };
    const service = new PaymentsService(
      prisma as never,
      {} as never,
      {} as never,
      makeSettlements() as never,
    );

    await service.handleWebhook({
      event: 'charge.dispute.create',
      data: {
        id: 84,
        refund_amount: 1234,
        currency: 'GHS',
        transaction: { reference: transaction.reference },
      },
    });

    expect(tx.externalPaymentDispute.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        create: expect.objectContaining({ affectsOrderBalance: false }),
      }),
    );
    expect(tx.orderSettlement.findUnique).not.toHaveBeenCalled();
  });

  it('marks reserved earnings paid only after transfer.success', async () => {
    const payout = {
      id: 'payout-1',
      reference: 'pavodah-payout-reference-1',
      amountMinor: 9000,
      currency: 'GHS',
      status: ProviderPayoutStatus.PROCESSING,
      items: [{ settlementId: 'settlement-1' }],
      adjustmentItems: [],
    };
    const tx = {
      $queryRaw: jest.fn().mockResolvedValue([{ id: payout.id }]),
      providerPayout: {
        findUnique: jest.fn().mockResolvedValue(payout),
        update: jest.fn().mockResolvedValue({}),
      },
      orderSettlement: {
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
    };
    const prisma = {
      providerPayout: { findUnique: jest.fn().mockResolvedValue(payout) },
      $transaction: jest.fn((callback: (client: unknown) => unknown) =>
        callback(tx),
      ),
    };
    const service = new PaymentsService(
      prisma as never,
      {} as never,
      {} as never,
      makeSettlements() as never,
    );

    await service.handleWebhook({
      event: 'transfer.success',
      data: {
        reference: payout.reference,
        amount: 9000,
        currency: 'GHS',
        status: 'success',
      },
    });

    expect(tx.providerPayout.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: ProviderPayoutStatus.SUCCESS }),
      }),
    );
    expect(tx.orderSettlement.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({ data: { status: SettlementStatus.PAID } }),
    );
  });

  it('restores paid earnings and recovered adjustments after transfer.reversed', async () => {
    const payout = {
      id: 'payout-1',
      reference: 'pavodah-payout-reference-1',
      amountMinor: 8100,
      currency: 'GHS',
      status: ProviderPayoutStatus.SUCCESS,
      items: [{ settlementId: 'settlement-1' }],
      adjustmentItems: [
        {
          adjustmentId: 'adjustment-1',
          amount: new Prisma.Decimal('9.00'),
        },
      ],
    };
    const tx = {
      $queryRaw: jest.fn().mockResolvedValue([{ id: payout.id }]),
      providerPayout: {
        findUnique: jest.fn().mockResolvedValue(payout),
        update: jest.fn().mockResolvedValue({}),
      },
      orderSettlement: {
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
      providerBalanceAdjustment: {
        updateMany: jest.fn().mockResolvedValue({ count: 0 }),
      },
    };
    const prisma = {
      providerPayout: { findUnique: jest.fn().mockResolvedValue(payout) },
      $transaction: jest.fn((callback: (client: unknown) => unknown) =>
        callback(tx),
      ),
    };
    const service = new PaymentsService(
      prisma as never,
      {} as never,
      {} as never,
      makeSettlements() as never,
    );

    await service.handleWebhook({
      event: 'transfer.reversed',
      data: {
        reference: payout.reference,
        amount: 8100,
        currency: 'GHS',
        status: 'reversed',
      },
    });

    expect(tx.orderSettlement.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          status: {
            in: [SettlementStatus.RESERVED, SettlementStatus.PAID],
          },
        }),
        data: { status: SettlementStatus.ELIGIBLE },
      }),
    );
    expect(tx.providerBalanceAdjustment.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {
          recoveredAmount: { decrement: new Prisma.Decimal('9.00') },
          status: BalanceAdjustmentStatus.OPEN,
        },
      }),
    );
  });

  it('does not move a transaction back to pending when a success webhook wins', async () => {
    const transaction = makeTransaction(OrderPaymentStatus.PROCESSING);
    const successful = {
      ...transaction,
      status: PaymentTransactionStatus.SUCCESS,
      isPrimary: true,
      paidAt: new Date('2026-08-02T10:00:00.000Z'),
      order: {
        ...transaction.order,
        paymentStatus: OrderPaymentStatus.PAID,
        paidAt: new Date('2026-08-02T10:00:00.000Z'),
      },
    };
    const prisma = {
      paymentTransaction: {
        findUnique: jest.fn().mockResolvedValue(transaction),
        findFirst: jest.fn().mockResolvedValue(null),
        updateMany: jest.fn().mockResolvedValue({ count: 0 }),
        findUniqueOrThrow: jest.fn().mockResolvedValue(successful),
      },
      paymentRefund: { findFirst: jest.fn().mockResolvedValue(null) },
    };
    const paystack = {
      verify: jest.fn().mockResolvedValue({
        status: 'pending',
        reference: transaction.reference,
        amount: transaction.amountMinor,
        currency: transaction.currency,
      }),
    };
    const service = new PaymentsService(
      prisma as never,
      paystack as never,
      {} as never,
      makeSettlements() as never,
    );

    const result = await service.verify(transaction.reference, 'client-1');

    expect(result.paymentStatus).toBe(OrderPaymentStatus.PAID);
    expect(result.paystackStatus).toBe('success');
    expect(prisma.paymentTransaction.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          status: {
            in: [
              PaymentTransactionStatus.INITIALIZED,
              PaymentTransactionStatus.PENDING,
            ],
          },
        }),
      }),
    );
  });

  it('does not mark an already successful transaction failed from a stale event', async () => {
    const transaction = makeTransaction(OrderPaymentStatus.PROCESSING);
    const tx = {
      paymentTransaction: {
        updateMany: jest.fn().mockResolvedValue({ count: 0 }),
      },
      order: { updateMany: jest.fn() },
    };
    const prisma = {
      paymentTransaction: {
        findUnique: jest.fn().mockResolvedValue(transaction),
      },
      $transaction: jest.fn((callback: (client: unknown) => unknown) =>
        callback(tx),
      ),
    };
    const service = new PaymentsService(
      prisma as never,
      {} as never,
      {} as never,
      makeSettlements() as never,
    );

    await service.handleWebhook({
      event: 'charge.failed',
      data: {
        status: 'failed',
        reference: transaction.reference,
        amount: transaction.amountMinor,
        currency: transaction.currency,
      },
    });

    expect(tx.order.updateMany).not.toHaveBeenCalled();
  });

  it('keeps a webhook-processed refund terminal when the API response arrives later', async () => {
    const transaction = makeTransaction(OrderPaymentStatus.REFUNDED);
    const prepared = {
      id: 'refund-race',
      transactionId: transaction.id,
      orderId: transaction.orderId,
      status: PaymentRefundStatus.INITIALIZED,
      affectsOrderBalance: false,
      amount: transaction.amount,
      amountMinor: transaction.amountMinor,
      currency: transaction.currency,
      reason: 'Duplicate charge',
      disputeId: null,
      transaction,
    };
    const processed = {
      ...prepared,
      status: PaymentRefundStatus.PROCESSED,
      providerRefundId: 'refund-provider-1',
    };
    const tx = {
      paymentRefund: {
        updateMany: jest.fn().mockResolvedValue({ count: 0 }),
        findUniqueOrThrow: jest.fn().mockResolvedValue(processed),
      },
      paymentTransaction: { update: jest.fn() },
    };
    const prisma = {
      paymentRefund: {
        findUnique: jest
          .fn()
          .mockResolvedValueOnce(prepared)
          .mockResolvedValueOnce(processed),
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
      $transaction: jest.fn((callback: (client: unknown) => unknown) =>
        callback(tx),
      ),
    };
    const paystack = {
      refund: jest.fn().mockResolvedValue({
        id: 'refund-provider-1',
        status: 'pending',
        amount: transaction.amountMinor,
        currency: transaction.currency,
      }),
    };
    const service = new PaymentsService(
      prisma as never,
      paystack as never,
      {} as never,
      makeSettlements() as never,
    );

    const result = await (
      service as unknown as {
        submitPreparedRefund: (id: string) => Promise<typeof processed>;
      }
    ).submitPreparedRefund(prepared.id);

    expect(result.status).toBe(PaymentRefundStatus.PROCESSED);
    expect(tx.paymentTransaction.update).not.toHaveBeenCalled();
  });

  it('keeps an accepted refund pending when persisting the Paystack response fails', async () => {
    const transaction = makeTransaction(OrderPaymentStatus.PAID);
    const prepared = {
      id: 'refund-persistence-race',
      transactionId: transaction.id,
      orderId: transaction.orderId,
      status: PaymentRefundStatus.INITIALIZED,
      affectsOrderBalance: false,
      amount: transaction.amount,
      amountMinor: transaction.amountMinor,
      currency: transaction.currency,
      reason: 'Duplicate charge',
      disputeId: null,
      transaction,
    };
    const updateMany = jest.fn().mockResolvedValue({ count: 1 });
    const tx = { paymentRefund: { updateMany } };
    const prisma = {
      paymentRefund: {
        findUnique: jest
          .fn()
          .mockResolvedValueOnce(prepared)
          .mockRejectedValueOnce(new Error('database temporarily unavailable')),
        updateMany,
      },
      $transaction: jest.fn((callback: (client: unknown) => unknown) =>
        callback(tx),
      ),
    };
    const paystack = {
      refund: jest.fn().mockResolvedValue({
        id: 'refund-provider-accepted',
        status: 'pending',
        amount: transaction.amountMinor,
        currency: transaction.currency,
      }),
    };
    const service = new PaymentsService(
      prisma as never,
      paystack as never,
      {} as never,
      makeSettlements() as never,
    );

    await expect(
      (
        service as unknown as {
          submitPreparedRefund: (id: string) => Promise<unknown>;
        }
      ).submitPreparedRefund(prepared.id),
    ).rejects.toThrow('database temporarily unavailable');

    expect(paystack.refund).toHaveBeenCalledTimes(1);
    expect(updateMany).toHaveBeenCalledTimes(1);
    expect(updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          status: PaymentRefundStatus.PENDING,
        }),
      }),
    );
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });
});
