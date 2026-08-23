import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { ChatService } from './chat.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ChatService', () => {
  let service: ChatService;
  let prisma: {
    conversation: {
      findUnique: jest.Mock;
      update: jest.Mock;
    };
    message: {
      findMany: jest.Mock;
      create: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      conversation: {
        findUnique: jest.fn(),
        update: jest.fn().mockResolvedValue({}),
      },
      message: {
        findMany: jest.fn(),
        create: jest.fn(),
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns the newest page in chronological display order', async () => {
    prisma.conversation.findUnique.mockResolvedValue({
      id: 'conversation-1',
      userId: 'user-1',
      providerId: 'provider-1',
    });
    const older = { id: 'message-older' };
    const newer = { id: 'message-newer' };
    prisma.message.findMany.mockResolvedValue([newer, older]);

    const result = await service.getMessages(
      'conversation-1',
      'user-1',
      -3,
      500,
    );

    expect(result).toEqual([older, newer]);
    expect(prisma.message.findMany).toHaveBeenCalledWith({
      where: { conversationId: 'conversation-1' },
      orderBy: { createdAt: 'desc' },
      skip: 0,
      take: 100,
    });
  });

  it('trims valid messages before saving them', async () => {
    const saved = { id: 'message-1', content: 'Hello' };
    prisma.message.create.mockResolvedValue(saved);

    await expect(
      service.saveMessage('conversation-1', 'user-1', '  Hello  '),
    ).resolves.toEqual(saved);
    expect(prisma.message.create).toHaveBeenCalledWith({
      data: {
        conversationId: 'conversation-1',
        senderId: 'user-1',
        content: 'Hello',
      },
    });
  });

  it('rejects empty and oversized messages', async () => {
    await expect(
      service.saveMessage('conversation-1', 'user-1', '   '),
    ).rejects.toBeInstanceOf(BadRequestException);
    await expect(
      service.saveMessage('conversation-1', 'user-1', 'x'.repeat(5001)),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(prisma.message.create).not.toHaveBeenCalled();
  });
});
