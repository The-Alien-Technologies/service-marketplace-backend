import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async getConversations(userId: string) {
    return this.prisma.conversation.findMany({
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
      },
      orderBy: { updatedAt: 'desc' },
    });
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
    return this.prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' },
      skip,
      take,
    });
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
    const message = await this.prisma.message.create({
      data: {
        conversationId,
        senderId,
        content,
      },
    });

    await this.prisma.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    });

    return message;
  }
}
