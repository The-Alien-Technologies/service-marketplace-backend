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
import { Logger } from '@nestjs/common';

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
      // Verify user has access before letting them join the room
      await this.chatService.getConversation(conversationId, userId);
      client.join(conversationId);
      this.logger.log(`User ${userId} joined room: ${conversationId}`);
    } catch (e) {
      this.logger.warn(
        `User ${userId} failed to join room: ${conversationId} - ${e.message}`,
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
      // Save the message
      const savedMessage = await this.chatService.saveMessage(
        payload.conversationId,
        userId,
        payload.content,
      );

      // Broadcast to the room
      this.server
        .to(payload.conversationId)
        .emit('receive_message', savedMessage);
    } catch (error) {
      this.logger.error(`Failed to send message: ${error.message}`);
    }
  }
}
