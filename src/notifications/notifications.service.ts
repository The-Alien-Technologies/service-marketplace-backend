import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Notification,
  NotificationChannel,
  NotificationDeliveryStatus,
  NotificationPriority,
  NotificationType,
  Prisma,
  Role,
} from '../../generated/prisma';
import { EmailService } from '../common/services/email.service';
import { SmsService } from '../common/services/sms.service';
import { PrismaService } from '../prisma/prisma.service';
import { ListNotificationsDto } from './dto/list-notifications.dto';
import { NotificationGateway } from './notification.gateway';

const MAX_DELIVERY_ATTEMPTS = 5;
const DELIVERY_BATCH_SIZE = 25;
const DELIVERY_RETRY_INTERVAL_MS = 30_000;
const STALE_PROCESSING_MS = 5 * 60_000;

export interface CreateNotificationInput {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  priority?: NotificationPriority;
  actionUrl?: string;
  entityType?: string;
  entityId?: string;
  metadata?: Prisma.InputJsonValue;
  dedupeKey?: string;
  smsEligible?: boolean;
  emailDelayMs?: number;
  emailCollapseKey?: string;
  cancelEmailIfRead?: boolean;
}

@Injectable()
export class NotificationsService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(NotificationsService.name);
  private deliveryTimer?: ReturnType<typeof setInterval>;
  private deliveryKickTimer?: ReturnType<typeof setTimeout>;
  private deliveryRun?: Promise<void>;

  constructor(
    private readonly prisma: PrismaService,
    private readonly gateway: NotificationGateway,
    private readonly email: EmailService,
    private readonly sms: SmsService,
    private readonly config: ConfigService,
  ) {}

  onModuleInit() {
    this.deliveryTimer = setInterval(() => {
      void this.processPendingDeliveries().catch((error) =>
        this.logger.error(
          `Notification delivery retry failed: ${this.errorMessage(error)}`,
        ),
      );
    }, DELIVERY_RETRY_INTERVAL_MS);
    this.deliveryTimer.unref?.();

    this.scheduleDelivery();
  }

  onModuleDestroy() {
    if (this.deliveryTimer) clearInterval(this.deliveryTimer);
    if (this.deliveryKickTimer) clearTimeout(this.deliveryKickTimer);
  }

  async create(input: CreateNotificationInput): Promise<Notification | null> {
    if (input.dedupeKey) {
      const existing = await this.prisma.notification.findUnique({
        where: { dedupeKey: input.dedupeKey },
      });
      if (existing) return existing;
    }

    const user = await this.prisma.user.findUnique({
      where: { id: input.userId },
      select: {
        id: true,
        notificationsEnabled: true,
        emailNotificationsEnabled: true,
        smsNotificationsEnabled: true,
        email: true,
        phoneNumber: true,
      },
    });
    if (!user) {
      this.logger.warn(
        `Skipping notification for missing user ${input.userId}`,
      );
      return null;
    }

    const channels: NotificationChannel[] = [];
    if (user.emailNotificationsEnabled && user.email) {
      channels.push(NotificationChannel.EMAIL);
    }
    if (input.smsEligible && user.smsNotificationsEnabled && user.phoneNumber) {
      channels.push(NotificationChannel.SMS);
    }

    let notification: Notification;
    try {
      notification = await this.prisma.$transaction(async (transaction) => {
        const created = await transaction.notification.create({
          data: {
            userId: input.userId,
            type: input.type,
            priority: input.priority ?? NotificationPriority.INFO,
            title: input.title.trim(),
            message: input.message.trim(),
            actionUrl: input.actionUrl,
            entityType: input.entityType,
            entityId: input.entityId,
            metadata: input.metadata,
            dedupeKey: input.dedupeKey,
            readAt: user.notificationsEnabled ? null : new Date(),
          },
        });

        const standardChannels = channels.filter(
          (channel) =>
            channel !== NotificationChannel.EMAIL || !input.emailCollapseKey,
        );
        if (standardChannels.length > 0) {
          await transaction.notificationDelivery.createMany({
            data: standardChannels.map((channel) => ({
              notificationId: created.id,
              channel,
            })),
          });
        }

        if (
          channels.includes(NotificationChannel.EMAIL) &&
          input.emailCollapseKey
        ) {
          const deliveryData = {
            notificationId: created.id,
            cancelIfRead:
              (input.cancelEmailIfRead ?? false) && user.notificationsEnabled,
            status: NotificationDeliveryStatus.PENDING,
            attempts: 0,
            lastError: null,
          };
          const retargeted = await transaction.notificationDelivery.updateMany({
            where: {
              collapseKey: input.emailCollapseKey,
              status: {
                in: [
                  NotificationDeliveryStatus.PENDING,
                  NotificationDeliveryStatus.FAILED,
                ],
              },
            },
            data: deliveryData,
          });

          if (retargeted.count === 0) {
            const inserted = await transaction.notificationDelivery.createMany({
              data: [
                {
                  ...deliveryData,
                  channel: NotificationChannel.EMAIL,
                  collapseKey: input.emailCollapseKey,
                  nextAttemptAt: new Date(
                    Date.now() + Math.max(0, input.emailDelayMs ?? 0),
                  ),
                },
              ],
              skipDuplicates: true,
            });

            if (inserted.count === 0) {
              await transaction.notificationDelivery.updateMany({
                where: {
                  collapseKey: input.emailCollapseKey,
                  status: {
                    in: [
                      NotificationDeliveryStatus.PENDING,
                      NotificationDeliveryStatus.FAILED,
                    ],
                  },
                },
                data: deliveryData,
              });
            }
          }
        }

        return created;
      });
    } catch (error) {
      if (input.dedupeKey && this.isUniqueConstraintError(error)) {
        return this.prisma.notification.findUnique({
          where: { dedupeKey: input.dedupeKey },
        });
      }
      throw error;
    }

    if (user.notificationsEnabled) {
      this.gateway.emitCreated(user.id, notification);
    }
    if (channels.length > 0) this.scheduleDelivery();

    return notification;
  }

  async createForUsers(
    userIds: string[],
    input: Omit<CreateNotificationInput, 'userId' | 'dedupeKey'> & {
      dedupeKey?: (userId: string) => string | undefined;
    },
  ) {
    const uniqueUserIds = [...new Set(userIds.filter(Boolean))];
    return Promise.all(
      uniqueUserIds.map((userId) =>
        this.create({
          ...input,
          userId,
          dedupeKey: input.dedupeKey?.(userId),
        }),
      ),
    );
  }

  async createForRole(
    role: Role,
    input: Omit<CreateNotificationInput, 'userId' | 'dedupeKey'> & {
      dedupeKey?: (userId: string) => string | undefined;
    },
  ) {
    const users = await this.prisma.user.findMany({
      where: { role, status: 'ACTIVE' },
      select: { id: true },
    });
    return this.createForUsers(
      users.map((user) => user.id),
      input,
    );
  }

  async list(userId: string, query: ListNotificationsDto) {
    const take = Math.min(50, Math.max(1, query.limit || 20));
    const where: Prisma.NotificationWhereInput = {
      userId,
      ...(query.unreadOnly ? { readAt: null } : {}),
    };
    const items = await this.prisma.notification.findMany({
      where,
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      take: take + 1,
      ...(query.cursor ? { cursor: { id: query.cursor }, skip: 1 } : {}),
    });
    const hasMore = items.length > take;
    const page = hasMore ? items.slice(0, take) : items;
    const [unreadCount, settings] = await Promise.all([
      this.getUnreadCount(userId),
      this.prisma.user.findUnique({
        where: { id: userId },
        select: { notificationsEnabled: true },
      }),
    ]);

    return {
      items: page,
      unreadCount,
      notificationsEnabled: settings?.notificationsEnabled ?? true,
      nextCursor: hasMore ? (page.at(-1)?.id ?? null) : null,
    };
  }

  getUnreadCount(userId: string) {
    return this.prisma.notification.count({ where: { userId, readAt: null } });
  }

  async markRead(userId: string, notificationId: string) {
    const readAt = new Date();
    const updated = await this.prisma.notification.updateMany({
      where: { id: notificationId, userId, readAt: null },
      data: { readAt },
    });
    if (updated.count > 0) {
      this.gateway.emitRead(userId, notificationId, readAt);
    }
    return this.prisma.notification.findFirst({
      where: { id: notificationId, userId },
    });
  }

  async markAllRead(userId: string) {
    const readAt = new Date();
    const result = await this.prisma.notification.updateMany({
      where: { userId, readAt: null },
      data: { readAt },
    });
    if (result.count > 0) this.gateway.emitAllRead(userId, readAt);
    return { count: result.count, readAt };
  }

  async markEntityRead(userId: string, entityType: string, entityId: string) {
    const readAt = new Date();
    const notifications = await this.prisma.notification.findMany({
      where: { userId, entityType, entityId, readAt: null },
      select: { id: true },
    });
    if (notifications.length === 0) return { count: 0, readAt };

    const result = await this.prisma.notification.updateMany({
      where: {
        id: { in: notifications.map((notification) => notification.id) },
        userId,
        readAt: null,
      },
      data: { readAt },
    });
    if (result.count > 0) {
      for (const notification of notifications) {
        this.gateway.emitRead(userId, notification.id, readAt);
      }
    }
    return { count: result.count, readAt };
  }

  async processPendingDeliveries() {
    if (this.deliveryRun) return this.deliveryRun;
    const run = this.processDeliveryBatch().finally(() => {
      if (this.deliveryRun === run) this.deliveryRun = undefined;
    });
    this.deliveryRun = run;
    return run;
  }

  private async processDeliveryBatch() {
    const now = new Date();
    const staleBefore = new Date(Date.now() - STALE_PROCESSING_MS);
    await this.prisma.notificationDelivery.updateMany({
      where: {
        status: NotificationDeliveryStatus.PROCESSING,
        updatedAt: { lte: staleBefore },
      },
      data: {
        status: NotificationDeliveryStatus.FAILED,
        nextAttemptAt: now,
        lastError: 'Delivery worker stopped before recording a result',
      },
    });
    const deliveries = await this.prisma.notificationDelivery.findMany({
      where: {
        attempts: { lt: MAX_DELIVERY_ATTEMPTS },
        status: {
          in: [
            NotificationDeliveryStatus.PENDING,
            NotificationDeliveryStatus.FAILED,
          ],
        },
        nextAttemptAt: { lte: now },
      },
      orderBy: { createdAt: 'asc' },
      take: DELIVERY_BATCH_SIZE,
      include: {
        notification: {
          include: {
            user: {
              select: { email: true, phoneNumber: true },
            },
          },
        },
      },
    });

    for (const delivery of deliveries) {
      const claimed = await this.prisma.notificationDelivery.updateMany({
        where: {
          id: delivery.id,
          attempts: { lt: MAX_DELIVERY_ATTEMPTS },
          status: {
            in: [
              NotificationDeliveryStatus.PENDING,
              NotificationDeliveryStatus.FAILED,
            ],
          },
          nextAttemptAt: { lte: now },
        },
        data: {
          status: NotificationDeliveryStatus.PROCESSING,
          attempts: { increment: 1 },
          lastError: null,
        },
      });
      if (claimed.count !== 1) continue;

      if (
        delivery.channel === NotificationChannel.EMAIL &&
        delivery.cancelIfRead
      ) {
        const cancelled = await this.prisma.notificationDelivery.updateMany({
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
        if (cancelled.count === 1) continue;
      }

      try {
        await this.deliver(delivery);
        await this.prisma.notificationDelivery.update({
          where: { id: delivery.id },
          data: {
            status: NotificationDeliveryStatus.SENT,
            sentAt: new Date(),
            collapseKey: null,
            lastError: null,
          },
        });
      } catch (error) {
        const attempts = delivery.attempts + 1;
        const delayMs = Math.min(
          60 * 60_000,
          30_000 * 2 ** Math.max(0, attempts - 1),
        );
        await this.prisma.notificationDelivery.update({
          where: { id: delivery.id },
          data: {
            status: NotificationDeliveryStatus.FAILED,
            lastError: this.errorMessage(error).slice(0, 500),
            nextAttemptAt: new Date(Date.now() + delayMs),
          },
        });
      }
    }
  }

  private async deliver(
    delivery: Prisma.NotificationDeliveryGetPayload<{
      include: {
        notification: {
          include: { user: { select: { email: true; phoneNumber: true } } };
        };
      };
    }>,
  ) {
    const { notification } = delivery;
    if (delivery.channel === NotificationChannel.EMAIL) {
      if (!notification.user.email) throw new Error('Recipient has no email');
      await this.email.sendEmail({
        to: [notification.user.email],
        subject: `Pavodah: ${notification.title}`,
        html: this.emailHtml(notification),
        text: `${notification.title}\n\n${notification.message}${
          notification.actionUrl
            ? `\n\nOpen: ${this.absoluteUrl(notification.actionUrl)}`
            : ''
        }`,
      });
      return;
    }

    if (!notification.user.phoneNumber) {
      throw new Error('Recipient has no phone number');
    }
    const link = notification.actionUrl
      ? ` ${this.absoluteUrl(notification.actionUrl)}`
      : '';
    await this.sms.sendSms(
      notification.user.phoneNumber,
      `${notification.title}: ${notification.message}${link}`.slice(0, 480),
    );
  }

  private emailHtml(notification: Notification) {
    const title = this.escapeHtml(notification.title);
    const message = this.escapeHtml(notification.message);
    const action = notification.actionUrl
      ? `<p style="margin:24px 0 0"><a href="${this.escapeHtml(
          this.absoluteUrl(notification.actionUrl),
        )}" style="display:inline-block;padding:12px 18px;background:#15803d;color:#fff;text-decoration:none;border-radius:8px">View in Pavodah</a></p>`
      : '';

    return `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1f2937"><h1 style="font-size:20px">${title}</h1><p style="font-size:15px;line-height:1.6">${message}</p>${action}<p style="margin-top:32px;color:#6b7280;font-size:12px">This is a transactional notification from Pavodah.</p></div>`;
  }

  private absoluteUrl(actionUrl: string) {
    const base = this.config.get<string>(
      'WEBSITE_URL',
      this.config.get<string>('APP_URL', 'http://localhost:3001'),
    );
    return new URL(actionUrl, base).toString();
  }

  private escapeHtml(value: string) {
    return value.replace(/[&<>'"]/g, (character) => {
      const replacements: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
      };
      return replacements[character];
    });
  }

  private scheduleDelivery() {
    if (this.deliveryKickTimer) return;
    this.deliveryKickTimer = setTimeout(() => {
      this.deliveryKickTimer = undefined;
      void this.processPendingDeliveries().catch((error) =>
        this.logger.error(
          `Notification delivery failed: ${this.errorMessage(error)}`,
        ),
      );
    }, 0);
    this.deliveryKickTimer.unref?.();
  }

  private isUniqueConstraintError(error: unknown) {
    return (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'P2002'
    );
  }

  private errorMessage(error: unknown) {
    return error instanceof Error ? error.message : 'Unknown error';
  }
}
