import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async getConversations(userId: string) {
    const conversations = await this.prisma.conversation.findMany({
      where: {
        OR: [{ userId }, { providerId: userId }],
      },
      include: {
        user: {
          select: { id: true, firstName: true, lastName: true, avatar: true },
        },
        provider: {
          select: { id: true, firstName: true, lastName: true, avatar: true },
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        _count: {
          select: {
            messages: {
              where: { senderId: { not: userId }, isRead: false },
            },
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    return conversations.map(({ _count, ...conversation }) => ({
      ...conversation,
      unreadCount: _count.messages,
    }));
  }

  async getConversation(id: string, userId: string) {
    const conversation = await this.prisma.conversation.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, firstName: true, lastName: true, avatar: true },
        },
        provider: {
          select: { id: true, firstName: true, lastName: true, avatar: true },
        },
      },
    });

    if (!conversation) throw new NotFoundException('Conversation not found');
    if (conversation.userId !== userId && conversation.providerId !== userId) {
      throw new ForbiddenException('You are not part of this conversation');
    }

    return conversation;
  }

  async getMessages(
    conversationId: string,
    userId: string,
    skip = 0,
    take = 50,
  ) {
    await this.getConversation(conversationId, userId);
    const safeSkip = Number.isFinite(skip) ? Math.max(0, Math.floor(skip)) : 0;
    const safeTake = Number.isFinite(take)
      ? Math.min(100, Math.max(1, Math.floor(take)))
      : 50;
    const messages = await this.prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'desc' },
      skip: safeSkip,
      take: safeTake,
    });
    return messages.reverse();
  }

  async getOrCreateConversation(userId: string, targetId: string) {
    let conversation = await this.prisma.conversation.findFirst({
      where: {
        OR: [
          { userId, providerId: targetId },
          { userId: targetId, providerId: userId },
        ],
      },
      include: {
        user: {
          select: { id: true, firstName: true, lastName: true, avatar: true },
        },
        provider: {
          select: { id: true, firstName: true, lastName: true, avatar: true },
        },
      },
    });

    if (!conversation) {
      conversation = await this.prisma.conversation.create({
        data: { userId, providerId: targetId },
        include: {
          user: {
            select: { id: true, firstName: true, lastName: true, avatar: true },
          },
          provider: {
            select: { id: true, firstName: true, lastName: true, avatar: true },
          },
        },
      });
    }

    return conversation;
  }

  async saveMessage(conversationId: string, senderId: string, content: string) {
    const normalizedContent = content?.trim();
    if (!normalizedContent) {
      throw new BadRequestException('Message content is required');
    }
    if (normalizedContent.length > 5000) {
      throw new BadRequestException('Messages cannot exceed 5000 characters');
    }
    const message = await this.prisma.message.create({
      data: {
        conversationId,
        senderId,
        content: normalizedContent,
      },
    });

    await this.prisma.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    });

    return message;
  }

  async markConversationRead(conversationId: string, userId: string) {
    await this.getConversation(conversationId, userId);
    return this.prisma.message.updateMany({
      where: { conversationId, senderId: { not: userId }, isRead: false },
      data: { isRead: true },
    });
  }

  async getUnreadCount(userId: string) {
    return this.prisma.message.count({
      where: {
        senderId: { not: userId },
        isRead: false,
        conversation: {
          OR: [{ userId }, { providerId: userId }],
        },
      },
    });
  }
}
