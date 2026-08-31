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
import { Role, UserStatus } from '../../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';

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

  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async handleConnection(@ConnectedSocket() client: Socket) {
    try {
      const token =
        client.handshake.auth.token ||
        client.handshake.headers.authorization?.split(' ')[1];
      if (!token) throw new Error('Unauthorized');

      const decoded = this.jwt.verify<{ id?: string; sub?: string }>(token);
      const userId = decoded.id || decoded.sub;
      if (!userId) throw new Error('Unauthorized');

      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { role: true, status: true },
      });
      const canReceiveNotifications =
        user?.status === UserStatus.ACTIVE ||
        (user?.role === Role.SERVICE_PROVIDER &&
          (user.status === UserStatus.PENDING ||
            user.status === UserStatus.REJECTED));
      if (!canReceiveNotifications) throw new Error('Unauthorized');

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
