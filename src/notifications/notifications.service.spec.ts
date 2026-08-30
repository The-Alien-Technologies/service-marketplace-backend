import {
  NotificationChannel,
  NotificationDeliveryStatus,
  NotificationPriority,
  NotificationType,
} from '../../generated/prisma';
import { NotificationsService } from './notifications.service';

describe('NotificationsService', () => {
  const user = {
    id: 'user-1',
    notificationsEnabled: true,
    emailNotificationsEnabled: true,
    smsNotificationsEnabled: true,
    email: 'user@example.com',
    phoneNumber: '+233200000000',
  };
  const notification = {
    id: 'notification-1',
    createdAt: new Date('2026-08-09T10:00:00.000Z'),
    updatedAt: new Date('2026-08-09T10:00:00.000Z'),
    userId: user.id,
    type: NotificationType.PAYMENT_SUCCEEDED,
    priority: NotificationPriority.CRITICAL,
    title: 'Payment confirmed',
    message: 'Your payment was confirmed.',
    actionUrl: '/dashboard/orders/order-1',
    entityType: 'order',
    entityId: 'order-1',
    metadata: null,
    dedupeKey: 'payment:reference-1:user-1',
    readAt: null,
  };

  function setup(overrides: Record<string, unknown> = {}) {
    const prisma: any = {
      user: {
        findUnique: jest.fn().mockResolvedValue(user),
        findMany: jest.fn(),
      },
      notification: {
        findUnique: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue(notification),
        findMany: jest.fn().mockResolvedValue([]),
        count: jest.fn().mockResolvedValue(0),
        updateMany: jest.fn().mockResolvedValue({ count: 0 }),
        findFirst: jest.fn().mockResolvedValue(notification),
      },
      notificationDelivery: {
        findMany: jest.fn().mockResolvedValue([]),
        updateMany: jest.fn().mockResolvedValue({ count: 0 }),
        update: jest.fn(),
        createMany: jest.fn().mockResolvedValue({ count: 0 }),
      },
      ...overrides,
    };
    prisma.$transaction = jest.fn(async (callback) => callback(prisma));
    const gateway = {
      emitCreated: jest.fn(),
      emitRead: jest.fn(),
      emitAllRead: jest.fn(),
    };
    const email = { sendEmail: jest.fn() };
    const sms = { sendSms: jest.fn() };
    const service = new NotificationsService(
      prisma,
      gateway as never,
      email as never,
      sms as never,
      { get: jest.fn((_key, fallback) => fallback) } as never,
    );
    return { service, prisma, gateway, email, sms };
  }

  it('persists preferred delivery channels and emits the in-app event', async () => {
    const { service, prisma, gateway } = setup();

    const result = await service.create({
      userId: user.id,
      type: NotificationType.PAYMENT_SUCCEEDED,
      priority: NotificationPriority.CRITICAL,
      title: ' Payment confirmed ',
      message: ' Your payment was confirmed. ',
      dedupeKey: notification.dedupeKey!,
      smsEligible: true,
    });

    expect(result).toEqual(notification);
    expect(prisma.notification.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          title: 'Payment confirmed',
          message: 'Your payment was confirmed.',
        }),
      }),
    );
    expect(prisma.notificationDelivery.createMany).toHaveBeenCalledWith({
      data: [
        {
          notificationId: notification.id,
          channel: NotificationChannel.EMAIL,
        },
        {
          notificationId: notification.id,
          channel: NotificationChannel.SMS,
        },
      ],
    });
    expect(gateway.emitCreated).toHaveBeenCalledWith(user.id, notification);
  });

  it('delays and collapses message email delivery by conversation', async () => {
    const { service, prisma } = setup();
    prisma.notificationDelivery.updateMany.mockResolvedValue({ count: 0 });
    prisma.notificationDelivery.createMany.mockResolvedValue({ count: 1 });
    const before = Date.now();

    await service.create({
      userId: user.id,
      type: NotificationType.MESSAGE_RECEIVED,
      title: 'New message',
      message: 'Open Messages to continue the conversation.',
      emailDelayMs: 3 * 60_000,
      emailCollapseKey: 'message-email:user-1:conversation-1',
      cancelEmailIfRead: true,
    });

    const call = prisma.notificationDelivery.createMany.mock.calls[0][0];
    expect(call.skipDuplicates).toBe(true);
    expect(call.data).toEqual([
      expect.objectContaining({
        notificationId: notification.id,
        channel: NotificationChannel.EMAIL,
        collapseKey: 'message-email:user-1:conversation-1',
        cancelIfRead: true,
        status: NotificationDeliveryStatus.PENDING,
      }),
    ]);
    expect(call.data[0].nextAttemptAt.getTime()).toBeGreaterThanOrEqual(
      before + 3 * 60_000,
    );
    expect(call.data[0].nextAttemptAt.getTime()).toBeLessThanOrEqual(
      Date.now() + 3 * 60_000,
    );
  });

  it('retargets a pending collapsed email to the newest message', async () => {
    const { service, prisma } = setup();
    prisma.notificationDelivery.updateMany.mockResolvedValue({ count: 1 });

    await service.create({
      userId: user.id,
      type: NotificationType.MESSAGE_RECEIVED,
      title: 'New message',
      message: 'Open Messages to continue the conversation.',
      emailDelayMs: 3 * 60_000,
      emailCollapseKey: 'message-email:user-1:conversation-1',
      cancelEmailIfRead: true,
    });

    expect(prisma.notificationDelivery.updateMany).toHaveBeenCalledWith({
      where: {
        collapseKey: 'message-email:user-1:conversation-1',
        status: {
          in: [
            NotificationDeliveryStatus.PENDING,
            NotificationDeliveryStatus.FAILED,
          ],
        },
      },
      data: {
        notificationId: notification.id,
        cancelIfRead: true,
        status: NotificationDeliveryStatus.PENDING,
        attempts: 0,
        lastError: null,
      },
    });
    expect(prisma.notificationDelivery.createMany).not.toHaveBeenCalled();
  });

  it('returns an existing notification for the same dedupe key', async () => {
    const { service, prisma, gateway } = setup();
    prisma.notification.findUnique.mockResolvedValue(notification);

    const result = await service.create({
      userId: user.id,
      type: NotificationType.PAYMENT_SUCCEEDED,
      title: 'Payment confirmed',
      message: 'Your payment was confirmed.',
      dedupeKey: notification.dedupeKey!,
    });

    expect(result).toEqual(notification);
    expect(prisma.user.findUnique).not.toHaveBeenCalled();
    expect(prisma.notification.create).not.toHaveBeenCalled();
    expect(gateway.emitCreated).not.toHaveBeenCalled();
  });

  it('marks matching entity notifications read and emits updates', async () => {
    const { service, prisma, gateway } = setup();
    prisma.notification.findMany.mockResolvedValue([
      { id: 'notification-1' },
      { id: 'notification-2' },
    ]);
    prisma.notification.updateMany.mockResolvedValue({ count: 2 });

    const result = await service.markEntityRead(
      user.id,
      'conversation',
      'conversation-1',
    );

    expect(result.count).toBe(2);
    expect(prisma.notification.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          id: { in: ['notification-1', 'notification-2'] },
          userId: user.id,
        }),
      }),
    );
    expect(gateway.emitRead).toHaveBeenCalledTimes(2);
  });

  it('returns the authoritative in-app notification preference with a page', async () => {
    const { service } = setup();

    const result = await service.list(user.id, {
      limit: 20,
      unreadOnly: false,
    });

    expect(result.notificationsEnabled).toBe(true);
    expect(result.unreadCount).toBe(0);
  });

  it('does not emit stale entity-read events when another request won the race', async () => {
    const { service, prisma, gateway } = setup();
    prisma.notification.findMany.mockResolvedValue([{ id: 'notification-1' }]);
    prisma.notification.updateMany.mockResolvedValue({ count: 0 });

    const result = await service.markEntityRead(
      user.id,
      'conversation',
      'conversation-1',
    );

    expect(result.count).toBe(0);
    expect(gateway.emitRead).not.toHaveBeenCalled();
  });

  it('stores in-app-disabled notifications as read without emitting them', async () => {
    const disabledUser = { ...user, notificationsEnabled: false };
    const { service, prisma, gateway } = setup({
      user: {
        findUnique: jest.fn().mockResolvedValue(disabledUser),
        findMany: jest.fn(),
      },
    });

    await service.create({
      userId: user.id,
      type: NotificationType.PAYMENT_SUCCEEDED,
      title: 'Payment confirmed',
      message: 'Your payment was confirmed.',
    });

    expect(prisma.notification.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ readAt: expect.any(Date) }),
      }),
    );
    expect(gateway.emitCreated).not.toHaveBeenCalled();
  });

  it('still sends delayed email when only in-app notifications are disabled', async () => {
    const disabledUser = { ...user, notificationsEnabled: false };
    const { service, prisma } = setup({
      user: {
        findUnique: jest.fn().mockResolvedValue(disabledUser),
        findMany: jest.fn(),
      },
    });
    prisma.notificationDelivery.updateMany.mockResolvedValue({ count: 0 });
    prisma.notificationDelivery.createMany.mockResolvedValue({ count: 1 });

    await service.create({
      userId: user.id,
      type: NotificationType.MESSAGE_RECEIVED,
      title: 'New message',
      message: 'Open Messages to continue the conversation.',
      emailDelayMs: 3 * 60_000,
      emailCollapseKey: 'message-email:user-1:conversation-1',
      cancelEmailIfRead: true,
    });

    expect(prisma.notificationDelivery.createMany).toHaveBeenCalledWith(
      expect.objectContaining({
        data: [expect.objectContaining({ cancelIfRead: false })],
      }),
    );
  });

  it('coalesces concurrent worker runs and recovers stale claims first', async () => {
    let release: (deliveries: unknown[]) => void = () => undefined;
    const pending = new Promise<unknown[]>((resolve) => {
      release = resolve;
    });
    const { service, prisma } = setup();
    prisma.notificationDelivery.findMany.mockReturnValue(pending);

    const first = service.processPendingDeliveries();
    const second = service.processPendingDeliveries();
    release([]);
    await Promise.all([first, second]);

    expect(prisma.notificationDelivery.findMany).toHaveBeenCalledTimes(1);
    expect(prisma.notificationDelivery.updateMany).toHaveBeenCalledTimes(1);
    expect(prisma.notificationDelivery.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          status: NotificationDeliveryStatus.PROCESSING,
          updatedAt: { lte: expect.any(Date) },
        }),
        data: expect.objectContaining({
          status: NotificationDeliveryStatus.FAILED,
          nextAttemptAt: expect.any(Date),
        }),
      }),
    );
  });

  it('claims and sends a pending email delivery', async () => {
    const delivery = {
      id: 'delivery-1',
      channel: NotificationChannel.EMAIL,
      attempts: 0,
      cancelIfRead: false,
      notification: {
        ...notification,
        user: { email: user.email, phoneNumber: user.phoneNumber },
      },
    };
    const { service, prisma, email } = setup();
    prisma.notificationDelivery.findMany.mockResolvedValue([delivery]);
    prisma.notificationDelivery.updateMany
      .mockResolvedValueOnce({ count: 0 })
      .mockResolvedValueOnce({ count: 1 });
    prisma.notificationDelivery.update.mockResolvedValue({});

    await service.processPendingDeliveries();

    expect(email.sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: [user.email],
        subject: `Pavodah: ${notification.title}`,
      }),
    );
    expect(prisma.notificationDelivery.update).toHaveBeenCalledWith({
      where: { id: delivery.id },
      data: expect.objectContaining({
        status: NotificationDeliveryStatus.SENT,
        sentAt: expect.any(Date),
        collapseKey: null,
      }),
    });
  });

  it('cancels a delayed email when the conversation was read', async () => {
    const delivery = {
      id: 'delivery-1',
      channel: NotificationChannel.EMAIL,
      attempts: 0,
      cancelIfRead: true,
      notification: {
        ...notification,
        readAt: new Date(),
        user: { email: user.email, phoneNumber: user.phoneNumber },
      },
    };
    const { service, prisma, email } = setup();
    prisma.notificationDelivery.findMany.mockResolvedValue([delivery]);
    prisma.notificationDelivery.updateMany
      .mockResolvedValueOnce({ count: 0 })
      .mockResolvedValueOnce({ count: 1 })
      .mockResolvedValueOnce({ count: 1 });

    await service.processPendingDeliveries();

    expect(email.sendEmail).not.toHaveBeenCalled();
    expect(prisma.notificationDelivery.updateMany).toHaveBeenLastCalledWith({
      where: {
        id: delivery.id,
        status: NotificationDeliveryStatus.PROCESSING,
        cancelIfRead: true,
        notification: { readAt: { not: null } },
      },
      data: {
        status: NotificationDeliveryStatus.CANCELLED,
        collapseKey: null,
        lastError: null,
      },
    });
    expect(prisma.notificationDelivery.update).not.toHaveBeenCalled();
  });
});
