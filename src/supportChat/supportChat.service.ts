import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  Optional,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { PrismaService } from '../prisma/prisma.service';
import { llmClient } from './llm/client';
import { NotificationEventsService } from '../notifications/notification-events.service';
import {
  MarketAccessService,
  MarketActor,
} from '../markets/market-access.service';

import {
  SupportConversationStatus,
  SupportSenderType,
  Role,
} from '../../generated/prisma';

const promptDir = path.join(__dirname, './prompt');
const template = fs.readFileSync(path.join(promptDir, 'chatbot.txt'), 'utf8');
const pavodahInfo = fs.readFileSync(path.join(promptDir, 'Pavodah.md'), 'utf8');
const botInstructions = template.replace('{{pavodahInfo}}', pavodahInfo);

const USER_SELECT = {
  id: true,
  firstName: true,
  lastName: true,
  avatar: true,
};

@Injectable()
export class SupportChatService {
  constructor(
    private readonly prisma: PrismaService,
    @Optional()
    private readonly notificationEvents?: NotificationEventsService,
    private readonly marketAccess: MarketAccessService = new MarketAccessService(),
  ) {}

  //USER: start or resume a conversation...........................
  async startConversation(userId: string, userRole: Role) {
    const existing = await this.prisma.supportConversation.findFirst({
      where: {
        initiatorId: userId,
        status: { not: SupportConversationStatus.CLOSED },
      },
      include: {
        messages: { orderBy: { createdAt: 'asc' } },
        initiator: { select: USER_SELECT },
        admin: { select: USER_SELECT },
      },
    });

    if (existing) return existing;

    const initiator = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { selectedMarketId: true, homeMarketId: true },
    });
    const conversation = await this.prisma.supportConversation.create({
      data: {
        initiatorId: userId,
        marketId:
          initiator?.selectedMarketId ?? initiator?.homeMarketId ?? null,
        initiatorType:
          userRole === Role.SERVICE_PROVIDER
            ? SupportSenderType.SERVICE_PROVIDER
            : SupportSenderType.USER,
      },
      include: {
        initiator: { select: USER_SELECT },
        admin: { select: USER_SELECT },
      },
    });
    //TODO create dynamic bot name
    const welcomeMessage = await this.prisma.supportMessage.create({
      data: {
        conversationId: conversation.id,
        senderType: SupportSenderType.BOT,
        content:
          "Hi, I'm Kwadwo, your Pavodah virtual support assistant. How can I assist you today?",
      },
    });

    return { ...conversation, messages: [welcomeMessage] };
  }

  //USER/ADMIN: Send a message...........................
  async sendMessage(
    conversationId: string,
    senderId: string,
    content: string,
    senderRole: Role,
    actor?: MarketActor,
  ) {
    const conversation = await this.prisma.supportConversation.findUnique({
      where: { id: conversationId },
    });
    if (!conversation) throw new NotFoundException('Conversation not found');
    if (conversation.status === SupportConversationStatus.CLOSED)
      throw new BadRequestException('This conversation is closed');
    //Only the initiator or the assigned admin can sendMessage
    const isAdmin = this.isAdmin(senderRole);
    if (isAdmin) {
      await this.assertAdminConversationAccess(conversation, senderId, actor);
    }
    const isInitiator = conversation.initiatorId === senderId;
    const isAssignedAdmin = conversation.adminId === senderId;

    if (isAdmin && !isAssignedAdmin) {
      throw new ForbiddenException(
        'Only the assigned admin can message this conversation',
      );
    }
    if (!isAdmin && !isInitiator) {
      throw new ForbiddenException('You are not part of this conversation');
    }

    //Admin cannot send during bot phase - haven't joined yet
    if (isAdmin && conversation.status === SupportConversationStatus.BOT) {
      throw new BadRequestException(
        'Admin cannot message while bot is handling this conversation',
      );
    }

    const senderType = this.isAdmin(senderRole)
      ? SupportSenderType.ADMIN
      : senderRole === Role.SERVICE_PROVIDER
        ? SupportSenderType.SERVICE_PROVIDER
        : SupportSenderType.USER;

    const userMessage = await this.prisma.supportMessage.create({
      data: { conversationId, senderId, content, senderType },
      include: { sender: { select: USER_SELECT } },
    });

    await this.prisma.supportConversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    });

    //In bot phase -> generated AI reply.................
    let botMessage = null;
    if (conversation.status === SupportConversationStatus.BOT) {
      const lastBotMsg = await this.prisma.supportMessage.findFirst({
        where: {
          conversationId,
          senderType: SupportSenderType.BOT,
          botResponseId: { not: null },
        },
        orderBy: { createdAt: 'desc' },
      });

      const botResponse = await llmClient.generateText({
        model: 'gpt-4o-mini',
        prompt: content,
        temperature: 0.2,
        maxToken: 140,
        instructions: botInstructions,
        previousResponseId: lastBotMsg?.botResponseId,
      });

      botMessage = await this.prisma.supportMessage.create({
        data: {
          conversationId,
          senderType: SupportSenderType.BOT,
          content: botResponse.text,
          botResponseId: botResponse.id,
        },
      });

      await this.prisma.supportConversation.update({
        where: { id: conversationId },
        data: { updatedAt: new Date() },
      });
    }

    return { userMessage, botMessage };
  }

  // ─── User: Request human support ─────────────────────────────────────────

  async escalateToAdmin(conversationId: string, userId: string) {
    const conversation = await this.prisma.supportConversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation) throw new NotFoundException('Conversation not found');
    if (conversation.initiatorId !== userId) {
      throw new ForbiddenException('Not your conversation');
    }
    if (conversation.status !== SupportConversationStatus.BOT) {
      throw new BadRequestException(
        `Cannot escalate. Current status: ${conversation.status}`,
      );
    }

    const updated = await this.prisma.supportConversation.update({
      where: { id: conversationId },
      data: { status: SupportConversationStatus.AWAITING_FOR_ADMIN },
      include: {
        initiator: { select: USER_SELECT },
        messages: { orderBy: { createdAt: 'desc' }, take: 1 },
      },
    });

    const systemMessage = await this.prisma.supportMessage.create({
      data: {
        conversationId,
        senderType: SupportSenderType.BOT,
        content:
          "You've been added to the support queue. A human agent will be with you shortly. Please hold on.",
      },
    });

    await this.notificationEvents?.supportEscalated(
      conversationId,
      updated.marketId,
    );

    return { conversation: updated, systemMessage };
  }

  // ─── Admin: Join a waiting conversation ───────────────────────────────
  async adminJoinConversation(
    conversationId: string,
    adminId: string,
    actor?: MarketActor,
  ) {
    const updated = await this.prisma.$transaction(async (tx) => {
      const conversation = await tx.supportConversation.findUnique({
        where: { id: conversationId },
      });

      if (!conversation) throw new NotFoundException('Conversation not found');
      if (actor) {
        await this.assertAdminConversationAccess(conversation, adminId, actor);
      }

      const claimed = await tx.supportConversation.updateMany({
        where: {
          id: conversationId,
          status: SupportConversationStatus.AWAITING_FOR_ADMIN,
          adminId: null,
        },
        data: {
          status: SupportConversationStatus.ACTIVE_WITH_ADMIN,
          adminId,
          adminJoinedAt: new Date(),
        },
      });
      if (claimed.count !== 1) {
        throw new BadRequestException(
          conversation.status === SupportConversationStatus.AWAITING_FOR_ADMIN
            ? 'Another admin already joined this conversation'
            : 'Conversation is not waiting for admin',
        );
      }

      return tx.supportConversation.findUniqueOrThrow({
        where: { id: conversationId },
        include: {
          initiator: { select: USER_SELECT },
          admin: { select: USER_SELECT },
        },
      });
    });

    const systemMessage = await this.prisma.supportMessage.create({
      data: {
        conversationId,
        senderType: SupportSenderType.BOT,
        content: 'A support agent has joined the conversation.',
      },
    });

    return { conversation: updated, systemMessage };
  }

  //User or Admin close conversation------------------------------------
  async closeConversation(
    conversationId: string,
    userId: string,
    userRole: Role,
    actor?: MarketActor,
  ) {
    const conversation = await this.prisma.supportConversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation) throw new NotFoundException('Conversation not found');

    if (conversation.status === SupportConversationStatus.CLOSED) {
      throw new BadRequestException('Conversation is already closed');
    }

    const isAdmin = this.isAdmin(userRole);
    if (isAdmin) {
      await this.assertAdminConversationAccess(conversation, userId, actor);
    }
    const isInitiator = conversation.initiatorId === userId;
    const isAssignedAdmin = conversation.adminId === userId;

    if (isAdmin && !isAssignedAdmin) {
      throw new ForbiddenException(
        'Only the assigned admin can close this conversation',
      );
    }
    if (!isAdmin && !isInitiator) {
      throw new ForbiddenException('You cannot close this conversation');
    }

    const claimed = await this.prisma.supportConversation.updateMany({
      where: {
        id: conversationId,
        status: { not: SupportConversationStatus.CLOSED },
        ...(isAdmin ? { adminId: userId } : { initiatorId: userId }),
      },
      data: { status: SupportConversationStatus.CLOSED, updatedAt: new Date() },
    });
    if (claimed.count !== 1) {
      throw new BadRequestException(
        'Conversation changed before it could be closed',
      );
    }

    const [update, systemMessage] = await Promise.all([
      this.prisma.supportConversation.findUniqueOrThrow({
        where: { id: conversationId },
      }),
      this.prisma.supportMessage.create({
        data: {
          conversationId,
          senderType: SupportSenderType.BOT,
          content: 'This support conversation has been closed. Thank you!',
        },
      }),
    ]);

    return { conversation: update, systemMessage };
  }

  //----Queries --------------

  async getMyConversations(userId: string) {
    return this.prisma.supportConversation.findMany({
      where: { initiatorId: userId },
      include: {
        messages: { orderBy: { createdAt: 'desc' }, take: 1 },
        admin: { select: USER_SELECT },
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async getConversationWithMessages(
    conversationId: string,
    userId: string,
    userRole: Role,
    actor?: MarketActor,
  ) {
    const conversation = await this.prisma.supportConversation.findUnique({
      where: { id: conversationId },
      include: {
        messages: { orderBy: { createdAt: 'asc' } },
        initiator: { select: USER_SELECT },
        admin: { select: USER_SELECT },
      },
    });

    if (!conversation) throw new NotFoundException('Conversation not found');

    const isAdmin = this.isAdmin(userRole);
    if (isAdmin) {
      await this.assertAdminConversationAccess(conversation, userId, actor);
    }
    const isParticipant =
      conversation.initiatorId === userId || conversation.adminId === userId;

    if (!isAdmin && !isParticipant) {
      throw new ForbiddenException('You are not part of this conversation');
    }
    return conversation;
  }

  //Admin: all conversation grouped by status
  async getAdminConversation(
    actor: MarketActor = { id: 'legacy', role: Role.SUPER_ADMIN },
  ) {
    const marketId = this.marketAccess.marketForAdmin(actor);
    const marketWhere = marketId ? { marketId } : {};
    const [waiting, active, close] = await Promise.all([
      this.prisma.supportConversation.findMany({
        where: {
          status: SupportConversationStatus.AWAITING_FOR_ADMIN,
          ...marketWhere,
        },
        include: {
          initiator: { select: USER_SELECT },
          messages: { orderBy: { createdAt: 'desc' }, take: 1 },
        },
        orderBy: { updatedAt: 'asc' }, //oldest waiting first
      }),
      this.prisma.supportConversation.findMany({
        where: {
          status: SupportConversationStatus.ACTIVE_WITH_ADMIN,
          ...marketWhere,
        },
        include: {
          initiator: { select: USER_SELECT },
          admin: { select: USER_SELECT },
          messages: { orderBy: { createdAt: 'desc' }, take: 1 },
        },
        orderBy: { updatedAt: 'desc' },
        take: 50,
      }),
      this.prisma.supportConversation.findMany({
        where: { status: SupportConversationStatus.CLOSED, ...marketWhere },
        include: {
          initiator: { select: USER_SELECT },
          admin: { select: USER_SELECT },
          messages: { orderBy: { createdAt: 'desc' }, take: 1 },
        },
        orderBy: { createdAt: 'desc' },
        take: 50,
      }),
    ]);
    return { waiting, active, close };
  }

  //Gateway helper - check if a socket user can join a support room
  async canAccessConversation(
    conversationId: string,
    userId: string,
    userRole: Role,
    actor?: MarketActor,
  ): Promise<boolean> {
    const conversation = await this.prisma.supportConversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation) return false;

    const isAdmin = this.isAdmin(userRole);
    if (isAdmin) {
      try {
        await this.assertAdminConversationAccess(conversation, userId, actor);
      } catch {
        return false;
      }
    }
    const isInitiator = conversation.initiatorId === userId;
    const isAssignedAdmin = conversation.adminId === userId;

    return isAdmin || isInitiator || isAssignedAdmin;
  }

  private isAdmin(role: Role) {
    return role === Role.ADMIN || role === Role.SUPER_ADMIN;
  }

  private async assertAdminConversationAccess(
    conversation: { marketId: string | null },
    adminId: string,
    actor?: MarketActor,
  ) {
    if (actor?.role === Role.SUPER_ADMIN) return;
    const adminMarketId =
      actor?.adminMarketId ??
      (
        await this.prisma.user.findUnique({
          where: { id: adminId },
          select: { adminMarketId: true, role: true },
        })
      )?.adminMarketId;
    if (!conversation.marketId || adminMarketId !== conversation.marketId) {
      throw new ForbiddenException('Access denied for this country');
    }
  }
}
