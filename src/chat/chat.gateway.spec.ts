import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { NotificationEventsService } from '../notifications/notification-events.service';

describe('ChatGateway', () => {
  let gateway: ChatGateway;
  let chatService: {
    getConversation: jest.Mock;
    markConversationRead: jest.Mock;
    saveMessage: jest.Mock;
  };
  let notificationEvents: { messageReceived: jest.Mock };

  beforeEach(async () => {
    chatService = {
      getConversation: jest.fn().mockResolvedValue({
        id: 'conversation-1',
        userId: 'user-1',
        providerId: 'provider-1',
        user: { firstName: 'Ada', lastName: 'Mensah' },
        provider: { firstName: 'Kojo', lastName: 'Owusu' },
      }),
      markConversationRead: jest.fn().mockResolvedValue({ count: 1 }),
      saveMessage: jest.fn().mockResolvedValue({
        id: 'message-1',
        conversationId: 'conversation-1',
        senderId: 'user-1',
        content: 'Hello',
      }),
    };
    notificationEvents = {
      messageReceived: jest.fn().mockResolvedValue(undefined),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatGateway,
        { provide: JwtService, useValue: { verify: jest.fn() } },
        { provide: ConfigService, useValue: { get: jest.fn() } },
        { provide: ChatService, useValue: chatService },
        { provide: NotificationEventsService, useValue: notificationEvents },
      ],
    }).compile();

    gateway = module.get<ChatGateway>(ChatGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('broadcasts read receipts to the conversation room', async () => {
    const emit = jest.fn();
    const to = jest.fn().mockReturnValue({ emit });
    gateway.server = { to } as never;
    const client = { data: { user: { id: 'user-1' } } };

    await gateway.handleMarkConversationRead(client as never, 'conversation-1');

    expect(chatService.getConversation).toHaveBeenCalledWith(
      'conversation-1',
      'user-1',
    );
    expect(chatService.markConversationRead).toHaveBeenCalledWith(
      'conversation-1',
      'user-1',
    );
    expect(to).toHaveBeenCalledWith('conversation-1');
    expect(emit).toHaveBeenCalledWith(
      'messages_read',
      expect.objectContaining({
        conversationId: 'conversation-1',
        readerId: 'user-1',
        readAt: expect.any(Date),
      }),
    );
  });

  it('persists the message notification before broadcasting the message', async () => {
    let releaseNotification: () => void = () => undefined;
    notificationEvents.messageReceived.mockReturnValue(
      new Promise<void>((resolve) => {
        releaseNotification = resolve;
      }),
    );
    const emit = jest.fn();
    gateway.server = { to: jest.fn().mockReturnValue({ emit }) } as never;
    const client = { data: { user: { id: 'user-1' } } };

    const sending = gateway.handleSendMessage(client as never, {
      conversationId: 'conversation-1',
      content: 'Hello',
    });
    await Promise.resolve();
    await Promise.resolve();

    expect(notificationEvents.messageReceived).toHaveBeenCalled();
    expect(emit).not.toHaveBeenCalled();

    releaseNotification();
    await sending;

    expect(emit).toHaveBeenCalledWith(
      'receive_message',
      expect.objectContaining({ id: 'message-1' }),
    );
  });
});
