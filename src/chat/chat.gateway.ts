import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ChatService } from './chat.service';
import { Logger, Optional } from '@nestjs/common';
import { NotificationEventsService } from '../notifications/notification-events.service';
import { NotificationsService } from '../notifications/notifications.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ChatGateway.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly chatService: ChatService,
    @Optional()
    private readonly notificationEvents?: NotificationEventsService,
    @Optional()
    private readonly notifications?: NotificationsService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token =
        client.handshake.auth.token ||
        client.handshake.headers.authorization?.split(' ')[1];
      if (!token) {
        throw new Error('Unauthorized');
      }

      const decoded = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET'),
      });

      // Usually 'id' or 'sub' depending on your JWT strategy
      const userId = decoded.id || decoded.sub;
      client.data.user = decoded;
      this.logger.log(`Client connected: ${client.id} (User: ${userId})`);
    } catch (error) {
      this.logger.error(`Connection failed: ${error.message}`);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join_conversation')
  async handleJoinConversation(
    @ConnectedSocket() client: Socket,
    @MessageBody() conversationId: string,
  ) {
    const userId = client.data.user?.id || client.data.user?.sub;
    if (!userId) {
      return;
    }

    try {
      await this.chatService.getConversation(conversationId, userId);
      await client.join(conversationId);
      await this.markConversationRead(conversationId, userId);
      this.logger.log(`User ${userId} joined room: ${conversationId}`);
    } catch (e) {
      this.logger.warn(
        `User ${userId} failed to join room: ${conversationId} - ${e.message}`,
      );
    }
  }

  @SubscribeMessage('mark_conversation_read')
  async handleMarkConversationRead(
    @ConnectedSocket() client: Socket,
    @MessageBody() conversationId: string,
  ) {
    const userId = client.data.user?.id || client.data.user?.sub;
    if (!userId) return;
    try {
      await this.chatService.getConversation(conversationId, userId);
      await this.markConversationRead(conversationId, userId);
    } catch (error) {
      this.logger.warn(
        `User ${userId} failed to mark ${conversationId} read: ${this.errorMessage(error)}`,
      );
    }
  }

  @SubscribeMessage('leave_conversation')
  handleLeaveConversation(
    @ConnectedSocket() client: Socket,
    @MessageBody() conversationId: string,
  ) {
    client.leave(conversationId);
    this.logger.log(`Client left room: ${conversationId}`);
  }

  @SubscribeMessage('send_message')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { conversationId: string; content: string },
  ) {
    const userId = client.data.user?.id || client.data.user?.sub;
    if (!userId) {
      return;
    }

    try {
      const content = payload?.content?.trim();
      if (!content) return;

      const conversation = await this.chatService.getConversation(
        payload.conversationId,
        userId,
      );
      const savedMessage = await this.chatService.saveMessage(
        payload.conversationId,
        userId,
        content,
      );

      const sender =
        conversation.userId === userId
          ? conversation.user
          : conversation.provider;
      const recipientId =
        conversation.userId === userId
          ? conversation.providerId
          : conversation.userId;

      if (this.notificationEvents) {
        try {
          await this.notificationEvents.messageReceived({
            id: savedMessage.id,
            conversationId: payload.conversationId,
            senderId: userId,
            recipientId,
            senderName:
              [sender.firstName, sender.lastName].filter(Boolean).join(' ') ||
              'a Pavodah user',
          });
        } catch (error) {
          this.logger.error(
            `Failed to create message notification: ${this.errorMessage(error)}`,
          );
        }
      }
      this.server
        .to(payload.conversationId)
        .emit('receive_message', savedMessage);
    } catch (error) {
      this.logger.error(`Failed to send message: ${this.errorMessage(error)}`);
    }
  }

  private async markConversationRead(conversationId: string, userId: string) {
    const result = await this.chatService.markConversationRead(
      conversationId,
      userId,
    );
    this.server.to(conversationId).emit('messages_read', {
      conversationId,
      readerId: userId,
      readAt: new Date(),
    });
    try {
      await this.notifications?.markEntityRead(
        userId,
        'conversation',
        conversationId,
      );
    } catch (error) {
      this.logger.error(
        `Failed to mark conversation notifications read: ${this.errorMessage(error)}`,
      );
    }
    return result;
  }

  private errorMessage(error: unknown) {
    return error instanceof Error ? error.message : 'Unknown error';
  }
}
