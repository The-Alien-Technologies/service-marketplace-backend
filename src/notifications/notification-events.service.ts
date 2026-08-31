import { Injectable, Logger } from '@nestjs/common';
import {
  NotificationPriority,
  NotificationType,
  OrderStatus,
  PaymentRefundStatus,
  ProviderPayoutStatus,
  Role,
} from '../../generated/prisma';
import { NotificationsService } from './notifications.service';

const MESSAGE_EMAIL_DELAY_MS = 3 * 60_000;

@Injectable()
export class NotificationEventsService {
  private readonly logger = new Logger(NotificationEventsService.name);

  constructor(private readonly notifications: NotificationsService) {}

  async orderPaid(order: {
    id: string;
    orderNumber: string;
    planTitle: string;
    clientId: string;
    providerId: string;
    paymentReference: string;
  }) {
    await this.safeCreate([
      this.notifications.create({
        userId: order.clientId,
        type: NotificationType.PAYMENT_SUCCEEDED,
        priority: NotificationPriority.CRITICAL,
        title: 'Payment confirmed',
        message: `Payment for order ${order.orderNumber} was confirmed.`,
        actionUrl: `/dashboard/orders/${order.id}`,
        entityType: 'order',
        entityId: order.id,
        dedupeKey: `payment-succeeded:${order.paymentReference}:${order.clientId}`,
        smsEligible: true,
      }),
      this.notifications.create({
        userId: order.providerId,
        type: NotificationType.ORDER_PAID,
        priority: NotificationPriority.CRITICAL,
        title: 'New paid order',
        message: `${order.planTitle} is paid and ready for you to review.`,
        actionUrl: `/dashboard/orders/${order.id}`,
        entityType: 'order',
        entityId: order.id,
        dedupeKey: `order-paid:${order.id}:${order.providerId}`,
        smsEligible: true,
      }),
    ]);
  }

  async paymentFailed(order: {
    id: string;
    orderNumber: string;
    clientId: string;
    paymentReference: string;
  }) {
    await this.safeCreate([
      this.notifications.create({
        userId: order.clientId,
        type: NotificationType.PAYMENT_FAILED,
        priority: NotificationPriority.IMPORTANT,
        title: 'Payment was not completed',
        message: `Payment for order ${order.orderNumber} failed. You can safely try again.`,
        actionUrl: `/dashboard/orders/${order.id}`,
        entityType: 'order',
        entityId: order.id,
        dedupeKey: `payment-failed:${order.paymentReference}:${order.clientId}`,
        smsEligible: true,
      }),
    ]);
  }

  async orderStatusChanged(order: {
    id: string;
    orderNumber: string;
    clientId: string;
    providerId: string;
    actorId: string;
    status: OrderStatus;
    updatedAt: Date;
  }) {
    const recipientId =
      order.actorId === order.providerId ? order.clientId : order.providerId;
    const label = order.status.toLowerCase().replaceAll('_', ' ');
    await this.safeCreate([
      this.notifications.create({
        userId: recipientId,
        type: NotificationType.ORDER_STATUS_CHANGED,
        priority:
          order.status === OrderStatus.COMPLETED
            ? NotificationPriority.IMPORTANT
            : NotificationPriority.INFO,
        title: 'Order status updated',
        message: `Order ${order.orderNumber} is now ${label}.`,
        actionUrl: `/dashboard/orders/${order.id}`,
        entityType: 'order',
        entityId: order.id,
        dedupeKey: `order-status:${order.id}:${order.status}:${order.updatedAt.toISOString()}:${recipientId}`,
      }),
    ]);
  }

  async quoteReceived(quote: {
    id: string;
    projectTitle: string;
    providerId: string;
  }) {
    await this.safeCreate([
      this.notifications.create({
        userId: quote.providerId,
        type: NotificationType.QUOTE_RECEIVED,
        priority: NotificationPriority.IMPORTANT,
        title: 'New quote request',
        message: `A client requested a quote for ${quote.projectTitle}.`,
        actionUrl: `/dashboard/quotes/${quote.id}`,
        entityType: 'quote',
        entityId: quote.id,
        dedupeKey: `quote-received:${quote.id}:${quote.providerId}`,
      }),
    ]);
  }

  async quoteUpdated(quote: {
    id: string;
    projectTitle: string;
    clientId: string;
    providerId: string;
    status: string;
    actor: 'client' | 'provider';
    updatedAt: Date;
  }) {
    const recipientId =
      quote.actor === 'provider' ? quote.clientId : quote.providerId;
    const actionUrl =
      quote.actor === 'provider'
        ? `/dashboard/my-quotes/${quote.id}`
        : `/dashboard/quotes/${quote.id}`;
    const status = quote.status.toLowerCase().replaceAll('_', ' ');
    await this.safeCreate([
      this.notifications.create({
        userId: recipientId,
        type: NotificationType.QUOTE_UPDATED,
        priority: NotificationPriority.IMPORTANT,
        title: 'Quote updated',
        message: `${quote.projectTitle} is now ${status}.`,
        actionUrl,
        entityType: 'quote',
        entityId: quote.id,
        dedupeKey: `quote-updated:${quote.id}:${quote.status}:${quote.updatedAt.toISOString()}:${recipientId}`,
      }),
    ]);
  }

  async reviewReceived(review: {
    id: string;
    providerId: string;
    orderId: string;
    rating: number;
  }) {
    await this.safeCreate([
      this.notifications.create({
        userId: review.providerId,
        type: NotificationType.REVIEW_RECEIVED,
        title: 'New customer review',
        message: `A client left a ${review.rating}-star review on a completed order.`,
        actionUrl: '/dashboard/reviews',
        entityType: 'review',
        entityId: review.id,
        dedupeKey: `review-received:${review.id}:${review.providerId}`,
      }),
    ]);
  }

  async reviewResponse(review: {
    id: string;
    clientId: string;
    orderId: string;
    updatedAt: Date;
  }) {
    await this.safeCreate([
      this.notifications.create({
        userId: review.clientId,
        type: NotificationType.REVIEW_RESPONSE,
        title: 'Provider responded to your review',
        message: 'The provider posted a response to your review.',
        actionUrl: `/dashboard/orders/${review.orderId}`,
        entityType: 'review',
        entityId: review.id,
        dedupeKey: `review-response:${review.id}:${review.updatedAt.toISOString()}:${review.clientId}`,
      }),
    ]);
  }

  async disputeOpened(dispute: {
    id: string;
    orderId: string;
    providerId: string;
    clientId: string;
  }) {
    const providerNotification = this.notifications.create({
      userId: dispute.providerId,
      type: NotificationType.DISPUTE_OPENED,
      priority: NotificationPriority.CRITICAL,
      title: 'Dispute opened',
      message: 'A client opened a dispute for one of your completed orders.',
      actionUrl: `/dashboard/disputes/${dispute.id}`,
      entityType: 'dispute',
      entityId: dispute.id,
      dedupeKey: `dispute-opened:${dispute.id}:${dispute.providerId}`,
      smsEligible: true,
    });
    const adminNotifications = this.notifications.createForRole(Role.ADMIN, {
      type: NotificationType.DISPUTE_OPENED,
      priority: NotificationPriority.CRITICAL,
      title: 'New dispute requires review',
      message: 'A client opened a dispute on a completed order.',
      actionUrl: `/dashboard/disputes/${dispute.id}`,
      entityType: 'dispute',
      entityId: dispute.id,
      dedupeKey: (userId) => `dispute-opened:${dispute.id}:${userId}`,
      smsEligible: true,
    });
    await this.safeCreate([providerNotification, adminNotifications]);
  }

  async disputeUpdated(dispute: {
    id: string;
    clientId: string;
    providerId: string;
    status: string;
    updatedAt: Date;
  }) {
    const status = dispute.status.toLowerCase().replaceAll('_', ' ');
    await this.safeCreate([
      this.notifications.createForUsers(
        [dispute.clientId, dispute.providerId],
        {
          type: NotificationType.DISPUTE_UPDATED,
          priority: NotificationPriority.CRITICAL,
          title: 'Dispute updated',
          message: `Your dispute is now ${status}.`,
          actionUrl: `/dashboard/disputes/${dispute.id}`,
          entityType: 'dispute',
          entityId: dispute.id,
          dedupeKey: (userId) =>
            `dispute-updated:${dispute.id}:${dispute.status}:${dispute.updatedAt.toISOString()}:${userId}`,
          smsEligible: true,
        },
      ),
    ]);
  }

  async refundUpdated(refund: {
    id: string;
    orderId: string;
    clientId: string;
    status: PaymentRefundStatus;
    updatedAt: Date;
  }) {
    const status = refund.status.toLowerCase().replaceAll('_', ' ');
    await this.safeCreate([
      this.notifications.create({
        userId: refund.clientId,
        type: NotificationType.REFUND_UPDATED,
        priority: NotificationPriority.CRITICAL,
        title: 'Refund updated',
        message: `Your refund is now ${status}.`,
        actionUrl: `/dashboard/orders/${refund.orderId}`,
        entityType: 'refund',
        entityId: refund.id,
        dedupeKey: `refund-updated:${refund.id}:${refund.status}:${refund.updatedAt.toISOString()}:${refund.clientId}`,
        smsEligible: true,
      }),
    ]);
  }

  async payoutRequested(payout: {
    id: string;
    providerId: string;
    reference: string;
    amount: string;
    currency: string;
  }) {
    await this.safeCreate([
      this.notifications.createForRole(Role.ADMIN, {
        type: NotificationType.PAYOUT_REQUESTED,
        priority: NotificationPriority.IMPORTANT,
        title: 'New payout request',
        message: `A provider requested ${payout.currency} ${payout.amount}.`,
        actionUrl: '/dashboard/payouts',
        entityType: 'payout',
        entityId: payout.id,
        dedupeKey: (userId) => `payout-requested:${payout.reference}:${userId}`,
      }),
    ]);
  }

  async payoutUpdated(payout: {
    id: string;
    providerId: string;
    reference: string;
    status: ProviderPayoutStatus;
    updatedAt: Date;
  }) {
    const status = payout.status.toLowerCase().replaceAll('_', ' ');
    await this.safeCreate([
      this.notifications.create({
        userId: payout.providerId,
        type: NotificationType.PAYOUT_UPDATED,
        priority: NotificationPriority.CRITICAL,
        title: 'Payout updated',
        message: `Payout ${payout.reference} is now ${status}.`,
        actionUrl: '/dashboard/earnings',
        entityType: 'payout',
        entityId: payout.id,
        dedupeKey: `payout-updated:${payout.reference}:${payout.status}:${payout.updatedAt.toISOString()}:${payout.providerId}`,
        smsEligible: true,
      }),
    ]);
  }

  async messageReceived(message: {
    id: string;
    conversationId: string;
    senderId: string;
    recipientId: string;
    senderName: string;
  }) {
    await this.safeCreate([
      this.notifications.create({
        userId: message.recipientId,
        type: NotificationType.MESSAGE_RECEIVED,
        title: `New message from ${message.senderName}`,
        message: 'Open Messages to continue the conversation.',
        actionUrl: `/dashboard/messages?conversation=${message.conversationId}`,
        entityType: 'conversation',
        entityId: message.conversationId,
        dedupeKey: `message-received:${message.id}:${message.recipientId}`,
        emailDelayMs: MESSAGE_EMAIL_DELAY_MS,
        emailCollapseKey: `message-email:${message.recipientId}:${message.conversationId}`,
        cancelEmailIfRead: true,
      }),
    ]);
  }

  async supportEscalated(conversationId: string) {
    await this.safeCreate([
      this.notifications.createForRole(Role.ADMIN, {
        type: NotificationType.SUPPORT_ESCALATED,
        priority: NotificationPriority.IMPORTANT,
        title: 'Support conversation escalated',
        message: 'A customer is waiting for a human support agent.',
        actionUrl: '/dashboard/support-chat',
        entityType: 'supportConversation',
        entityId: conversationId,
        dedupeKey: (userId) => `support-escalated:${conversationId}:${userId}`,
      }),
    ]);
  }

  async securityAlert(input: {
    userId: string;
    key: string;
    title: string;
    message: string;
  }) {
    await this.safeCreate([
      this.notifications.create({
        userId: input.userId,
        type: NotificationType.SECURITY_ALERT,
        priority: NotificationPriority.CRITICAL,
        title: input.title,
        message: input.message,
        actionUrl: '/dashboard/profile?tab=password',
        entityType: 'security',
        entityId: input.userId,
        dedupeKey: `security:${input.key}:${input.userId}`,
        smsEligible: true,
      }),
    ]);
  }

  async adminAlert(input: {
    key: string;
    title: string;
    message: string;
    actionUrl: string;
    entityType: string;
    entityId: string;
    critical?: boolean;
  }) {
    await this.safeCreate([
      this.notifications.createForRole(Role.ADMIN, {
        type: NotificationType.SYSTEM_ALERT,
        priority: input.critical
          ? NotificationPriority.CRITICAL
          : NotificationPriority.IMPORTANT,
        title: input.title,
        message: input.message,
        actionUrl: input.actionUrl,
        entityType: input.entityType,
        entityId: input.entityId,
        dedupeKey: (userId) => `${input.key}:${userId}`,
        smsEligible: input.critical,
      }),
    ]);
  }

  async providerApplicationSubmitted(input: {
    providerId: string;
    providerName: string;
    submittedAt: Date;
  }) {
    await this.safeCreate([
      this.notifications.createForRole(Role.ADMIN, {
        type: NotificationType.SYSTEM_ALERT,
        priority: NotificationPriority.IMPORTANT,
        title: 'Provider application ready for review',
        message: `${input.providerName} submitted a provider application.`,
        actionUrl: `/dashboard/provider-applications?application=${input.providerId}`,
        entityType: 'providerApplication',
        entityId: input.providerId,
        dedupeKey: (userId) =>
          `provider-application-submitted:${input.providerId}:${input.submittedAt.toISOString()}:${userId}`,
      }),
    ]);
  }

  async providerApplicationDecision(input: {
    providerId: string;
    approved: boolean;
    reason?: string;
    reviewedAt: Date;
  }) {
    await this.safeCreate([
      this.notifications.create({
        userId: input.providerId,
        type: NotificationType.SYSTEM_ALERT,
        priority: NotificationPriority.IMPORTANT,
        title: input.approved
          ? 'Your provider application was approved'
          : 'Your provider application needs changes',
        message: input.approved
          ? 'You can now open your provider dashboard and start creating services.'
          : `Your application was not approved yet. ${input.reason ?? 'Review the requested changes and resubmit.'}`,
        actionUrl: input.approved ? '/dashboard' : '/provider-application',
        entityType: 'providerApplication',
        entityId: input.providerId,
        dedupeKey: `provider-application-decision:${input.providerId}:${input.reviewedAt.toISOString()}`,
      }),
    ]);
  }

  private async safeCreate(tasks: Promise<unknown>[]) {
    const results = await Promise.allSettled(tasks);
    for (const result of results) {
      if (result.status === 'rejected') {
        this.logger.error(
          `Failed to create notification: ${
            result.reason instanceof Error
              ? result.reason.message
              : 'Unknown error'
          }`,
        );
      }
    }
  }
}
