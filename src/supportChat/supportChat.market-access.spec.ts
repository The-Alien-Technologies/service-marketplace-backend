import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { Role, SupportConversationStatus } from '../../generated/prisma';
import { MarketAccessService } from '../markets/market-access.service';
import { SupportChatService } from './supportChat.service';

describe('SupportChatService market access', () => {
  it('does not let a country admin claim a legacy conversation without a market', async () => {
    const tx = {
      supportConversation: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'conversation-1',
          marketId: null,
          adminId: null,
          status: SupportConversationStatus.AWAITING_FOR_ADMIN,
        }),
        updateMany: jest.fn(),
      },
    };
    const prisma = {
      $transaction: jest.fn((callback: (client: unknown) => unknown) =>
        callback(tx),
      ),
    };
    const service = new SupportChatService(
      prisma as never,
      undefined,
      new MarketAccessService(),
    );

    await expect(
      service.adminJoinConversation('conversation-1', 'admin-1', {
        id: 'admin-1',
        role: Role.ADMIN,
        adminMarketId: 'market-gh',
      }),
    ).rejects.toThrow(ForbiddenException);
    expect(tx.supportConversation.updateMany).not.toHaveBeenCalled();
  });

  it('atomically refuses a conversation already claimed by another admin', async () => {
    const tx = {
      supportConversation: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'conversation-1',
          marketId: 'market-gh',
          adminId: null,
          status: SupportConversationStatus.AWAITING_FOR_ADMIN,
        }),
        updateMany: jest.fn().mockResolvedValue({ count: 0 }),
        findUniqueOrThrow: jest.fn(),
      },
    };
    const prisma = {
      $transaction: jest.fn((callback: (client: unknown) => unknown) =>
        callback(tx),
      ),
      supportMessage: { create: jest.fn() },
    };
    const service = new SupportChatService(
      prisma as never,
      undefined,
      new MarketAccessService(),
    );

    await expect(
      service.adminJoinConversation('conversation-1', 'admin-2', {
        id: 'admin-2',
        role: Role.ADMIN,
        adminMarketId: 'market-gh',
      }),
    ).rejects.toThrow(BadRequestException);
    expect(tx.supportConversation.findUniqueOrThrow).not.toHaveBeenCalled();
    expect(prisma.supportMessage.create).not.toHaveBeenCalled();
  });

  it('only lets the assigned admin send messages', async () => {
    const prisma = {
      supportConversation: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'conversation-1',
          marketId: 'market-gh',
          initiatorId: 'user-1',
          adminId: 'admin-1',
          status: SupportConversationStatus.ACTIVE_WITH_ADMIN,
        }),
        update: jest.fn(),
      },
      supportMessage: { create: jest.fn() },
    };
    const service = new SupportChatService(
      prisma as never,
      undefined,
      new MarketAccessService(),
    );

    await expect(
      service.sendMessage('conversation-1', 'admin-2', 'Hello', Role.ADMIN, {
        id: 'admin-2',
        role: Role.ADMIN,
        adminMarketId: 'market-gh',
      }),
    ).rejects.toThrow(ForbiddenException);
    expect(prisma.supportMessage.create).not.toHaveBeenCalled();
  });

  it('only lets the assigned admin close an active conversation', async () => {
    const prisma = {
      supportConversation: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'conversation-1',
          marketId: 'market-gh',
          initiatorId: 'user-1',
          adminId: 'admin-1',
          status: SupportConversationStatus.ACTIVE_WITH_ADMIN,
        }),
        updateMany: jest.fn(),
      },
      supportMessage: { create: jest.fn() },
    };
    const service = new SupportChatService(
      prisma as never,
      undefined,
      new MarketAccessService(),
    );

    await expect(
      service.closeConversation('conversation-1', 'admin-2', Role.ADMIN, {
        id: 'admin-2',
        role: Role.ADMIN,
        adminMarketId: 'market-gh',
      }),
    ).rejects.toThrow(ForbiddenException);
    expect(prisma.supportConversation.updateMany).not.toHaveBeenCalled();
    expect(prisma.supportMessage.create).not.toHaveBeenCalled();
  });

  it('does not emit a second close message after a concurrent close', async () => {
    const prisma = {
      supportConversation: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'conversation-1',
          marketId: 'market-gh',
          initiatorId: 'user-1',
          adminId: 'admin-1',
          status: SupportConversationStatus.ACTIVE_WITH_ADMIN,
        }),
        updateMany: jest.fn().mockResolvedValue({ count: 0 }),
        findUniqueOrThrow: jest.fn(),
      },
      supportMessage: { create: jest.fn() },
    };
    const service = new SupportChatService(
      prisma as never,
      undefined,
      new MarketAccessService(),
    );

    await expect(
      service.closeConversation('conversation-1', 'admin-1', Role.ADMIN, {
        id: 'admin-1',
        role: Role.ADMIN,
        adminMarketId: 'market-gh',
      }),
    ).rejects.toThrow(BadRequestException);
    expect(prisma.supportConversation.findUniqueOrThrow).not.toHaveBeenCalled();
    expect(prisma.supportMessage.create).not.toHaveBeenCalled();
  });

  it('returns the welcome message under the documented messages property', async () => {
    const welcomeMessage = {
      id: 'message-1',
      conversationId: 'conversation-1',
      content: 'Welcome',
    };
    const prisma = {
      supportConversation: {
        findFirst: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue({ id: 'conversation-1' }),
      },
      user: {
        findUnique: jest.fn().mockResolvedValue({
          selectedMarketId: 'market-gh',
          homeMarketId: 'market-gh',
        }),
      },
      supportMessage: {
        create: jest.fn().mockResolvedValue(welcomeMessage),
      },
    };
    const service = new SupportChatService(
      prisma as never,
      undefined,
      new MarketAccessService(),
    );

    const result = await service.startConversation('user-1', Role.USER);

    expect(result.messages).toEqual([welcomeMessage]);
    expect(result).not.toHaveProperty('message');
  });
});
