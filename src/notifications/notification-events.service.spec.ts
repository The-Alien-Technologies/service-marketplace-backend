import { NotificationType } from '../../generated/prisma';
import { NotificationEventsService } from './notification-events.service';

describe('NotificationEventsService', () => {
  it('queues message email with the delayed read-aware conversation policy', async () => {
    const notifications = {
      create: jest.fn().mockResolvedValue({}),
    };
    const service = new NotificationEventsService(notifications as never);

    await service.messageReceived({
      id: 'message-1',
      conversationId: 'conversation-1',
      senderId: 'sender-1',
      recipientId: 'recipient-1',
      senderName: 'Eben Ahurein',
    });

    expect(notifications.create).toHaveBeenCalledWith({
      userId: 'recipient-1',
      type: NotificationType.MESSAGE_RECEIVED,
      title: 'New message from Eben Ahurein',
      message: 'Open Messages to continue the conversation.',
      actionUrl: '/dashboard/messages?conversation=conversation-1',
      entityType: 'conversation',
      entityId: 'conversation-1',
      dedupeKey: 'message-received:message-1:recipient-1',
      emailDelayMs: 3 * 60_000,
      emailCollapseKey: 'message-email:recipient-1:conversation-1',
      cancelEmailIfRead: true,
    });
  });
});
