  import {Injectable, NotFoundException, ForbiddenException, BadRequestException} from '@nestjs/common';
  import * as fs from 'fs';
  import * as path from 'path';
  import { PrismaService } from '../prisma/prisma.service';
  import { llmClient } from './llm/client';

  import {
    SupportConversationStatus,
    SupportSenderType,
    Role,
  } from '../../generated/prisma';

const promptDir = path.join(__dirname, './prompt');
const template = fs.readFileSync(path.join(promptDir, 'chatbot.txt'), 'utf8')
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
    constructor(private readonly prisma: PrismaService){}

    //USER: start or resume a conversation...........................
    async startConversation(userId: string, userRole: Role){
        const existing = await this.prisma.supportConversation.findFirst({
            where: {
                initiatorId: userId,
                status: {not: SupportConversationStatus.CLOSED},
            },
            include: {
                messages: {orderBy: {createdAt: 'asc'}},
                initiator: {select: USER_SELECT},
                admin: {select: USER_SELECT},
            },
        });

        if(existing) return existing;

     const conversation = await this.prisma.supportConversation.create({
        data: { initiatorId: userId,
            initiatorType: userRole === Role.SERVICE_PROVIDER ? SupportSenderType.SERVICE_PROVIDER : SupportSenderType.USER
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
            content: "Hi, I'm Kwadwo, your Pavodah virtual support assistant. How can I assist you today?",
        }
      });

      return { ...conversation, message: [welcomeMessage]};
    }

    //USER/ADMIN: Send a message...........................
    async sendMessage(conversationId: string, senderId: string, content: string, senderRole: Role){
        const conversation = await this.prisma.supportConversation.findUnique({
            where: {id: conversationId},
        });
        if(!conversation) throw new NotFoundException("Conversation not found");
        if(conversation.status === SupportConversationStatus.CLOSED) throw new BadRequestException("This conversation is closed");
        //Only the initiator or the assigned admin can sendMessage
        const isAdmin = senderRole === Role.ADMIN;
        const isInitiator = conversation.initiatorId === senderId;
        const isAssignedAdmin = conversation.adminId

        if(!isAdmin && !isInitiator && !isAssignedAdmin){
          throw new ForbiddenException("You are not part of this conversation");
        }

        //Admin cannot send during bot phase - haven't joined yet
        if(isAdmin && conversation.status === SupportConversationStatus.BOT){
          throw new BadRequestException("Admin cannot message while bot is handling this conversation");
        }

        const senderType = senderRole === Role.ADMIN ? SupportSenderType.ADMIN 
            : senderRole === Role.SERVICE_PROVIDER ? SupportSenderType.SERVICE_PROVIDER : SupportSenderType.USER;

      const userMessage = await this.prisma.supportMessage.create({
        data: {conversationId, senderId, content, senderType },
        include: {sender: {select: USER_SELECT}},
      });
      
      await this.prisma.supportConversation.update({
        where: {id: conversationId},
        data: {updatedAt: new Date()},
      });

      //In bot phase -> generated AI reply.................
      let botMessage = null;
      if(conversation.status === SupportConversationStatus.BOT){
        const lastBotMsg = await this.prisma.supportMessage.findFirst({
          where: {
            conversationId,
            senderType: SupportSenderType.BOT,
            botResponseId: {not: null},
          },
          orderBy: {createdAt: 'desc'},
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
            botResponseId: botResponse.id
          }
        });

        await this.prisma.supportConversation.update({
          where: {id: conversationId},
          data: {updatedAt: new Date()}
        });
      }

      return {userMessage, botMessage}
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

      return { conversation: updated, systemMessage };
    }
  
  // ─── Admin: Join a waiting conversation ───────────────────────────────
    async adminJoinConversation(conversationId: string, adminId: string){
      const updated = this.prisma.$transaction( async (tx) => {
        const conversation = await tx.supportConversation.findUnique({
          where: {id: conversationId},
        });

        if(!conversation) throw new NotFoundException('Conversation not found');

        if(conversation.status !== SupportConversationStatus.AWAITING_FOR_ADMIN){
          throw new BadRequestException("Conversation is not waiting for admin");
        }

        if(conversation.adminId !== null){
          throw new BadRequestException('Another admin already joined this conversation');
        }

        return tx.supportConversation.update({
          where: { id: conversationId },
          data: {
            status: SupportConversationStatus.ACTIVE_WITH_ADMIN,
            adminId,
            adminJoinedAt: new Date(),
          },
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

      return {conversation: updated, systemMessage};
    }

   //User or Admin close conversation------------------------------------
   async closeConversation(conversationId: string, userId: string, userRole: Role ){
    const conversation = await this.prisma.supportConversation.findUnique({
      where: {id: conversationId},
    });

    if(!conversation) throw new NotFoundException("Conversation not found");

    if(conversation.status === SupportConversationStatus.CLOSED){
      throw new BadRequestException("Conversation is already closed");
    }

    const isAdmin = userRole === Role.ADMIN;
    const isInitiator = conversation.initiatorId === userId;

    if(!isAdmin && !isInitiator){
      throw new ForbiddenException("You cannot closed this conversation");
    }

    const update = await this.prisma.supportConversation.update({
      where: {id: conversationId},
      data: {status: SupportConversationStatus.CLOSED , updatedAt: new Date()},
    });

    const systemMessage = await this.prisma.supportMessage.create({
      data: {
        conversationId,
        senderType: SupportSenderType.BOT,
        content: "This support conversation has been closed, Thank you!", 
      }
    });

    return {conversation: update, systemMessage}
   } 

//----Queries --------------

async getMyConversations(userId: string){
  return this.prisma.supportConversation.findMany({
    where: {initiatorId: userId },
    include: {
      messages: {orderBy: {createdAt: 'desc'}, take: 1},
      admin: {select: USER_SELECT},
    },
    orderBy: {updatedAt: 'desc'},
  });

}

async getConversationWithMessages(conversationId: string,userId: string,userRole: Role){
    const conversation = await this.prisma.supportConversation.findUnique({
      where: {id: conversationId},
      include: {
        messages: {orderBy: {createdAt: 'asc'}},
        initiator: {select: USER_SELECT},
        admin: {select: USER_SELECT},
      },
    });

    if(!conversation) throw new NotFoundException("Conversation not found");

    const isAdmin = userRole === Role.ADMIN;
    const isParticipant = conversation.initiatorId === userId || conversation.adminId === userId;

    if(!isAdmin && !isParticipant){
      throw new ForbiddenException("You are not part of this conversation");
    }
    return conversation;
  }

  //Admin: all conversation grouped by status
  async getAdminConversation(){
    const [waiting, active, close] = await Promise.all([
      this.prisma.supportConversation.findMany({
        where: {status: SupportConversationStatus.AWAITING_FOR_ADMIN},
        include: {
          initiator: {select: USER_SELECT},
          messages: {orderBy: { createdAt: 'desc'}, take: 1},
        },
        orderBy: {updatedAt: 'asc'}, //oldest waiting first
      }),
      this.prisma.supportConversation.findMany({
        where: {status: SupportConversationStatus.ACTIVE_WITH_ADMIN},
        include: {
          initiator: {select: USER_SELECT},
        admin: {select: USER_SELECT},
          messages: {orderBy: {createdAt: 'desc'}, take: 1},
        },
        orderBy: {updatedAt: 'desc'},
        take: 50,
      }),
      this.prisma.supportConversation.findMany({
        where: {status: SupportConversationStatus.CLOSED},
        include: {
          initiator: {select: USER_SELECT},
          admin: {select: USER_SELECT},
          messages: {orderBy: {createdAt: 'desc'}, take: 1},
        },
        orderBy: {createdAt: 'desc'},
        take: 50,
      }),
    ]);
    return {waiting, active, close};
  }

  //Gateway helper - check if a socket user can join a support room
  async canAccessConversation(conversationId: string, userId: string, userRole: Role): Promise<boolean> {
    const conversation = await this.prisma.supportConversation.findUnique({
      where: {id: conversationId},
    });

    if(!conversation) return false;

    const isAdmin = userRole === Role.ADMIN;
    const isInitiator = conversation.initiatorId === userId;
    const isAssignedAdmin = conversation.adminId === userId;

    return isAdmin || isInitiator || isAssignedAdmin;
  }
}
