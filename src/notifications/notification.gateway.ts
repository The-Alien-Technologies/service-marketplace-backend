import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { Notification } from '../../generated/prisma';

@WebSocketGateway({
  namespace: '/notifications',
  cors: { origin: '*' },
})
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server?: Server;

  private readonly logger = new Logger(NotificationGateway.name);

  constructor(private readonly jwt: JwtService) {}

  async handleConnection(@ConnectedSocket() client: Socket) {
    try {
      const token =
        client.handshake.auth.token ||
        client.handshake.headers.authorization?.split(' ')[1];
      if (!token) throw new Error('Unauthorized');

      const decoded = this.jwt.verify<{ id?: string; sub?: string }>(token);
      const userId = decoded.id || decoded.sub;
      if (!userId) throw new Error('Unauthorized');

      client.data.userId = userId;
      await client.join(this.userRoom(userId));
    } catch (error) {
      this.logger.warn(
        `Notification socket rejected: ${
          error instanceof Error ? error.message : 'Unauthorized'
        }`,
      );
      client.disconnect();
    }
  }

  handleDisconnect() {
    // Socket.IO removes the client from its user room automatically.
  }

  emitCreated(userId: string, notification: Notification) {
    this.server
      ?.to(this.userRoom(userId))
      .emit('notification.created', { notification });
  }

  emitRead(userId: string, notificationId: string, readAt: Date) {
    this.server?.to(this.userRoom(userId)).emit('notification.read', {
      notificationId,
      readAt,
    });
  }

  emitAllRead(userId: string, readAt: Date) {
    this.server?.to(this.userRoom(userId)).emit('notification.all_read', {
      readAt,
    });
  }

  private userRoom(userId: string) {
    return `user:${userId}`;
  }
}
