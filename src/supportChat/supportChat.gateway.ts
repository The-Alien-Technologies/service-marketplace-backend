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
  import { Logger } from '@nestjs/common';
  import { SupportChatService } from './supportChat.service';
  import { Role } from '../../generated/prisma';

const ADMIN_ROOM = 'support-admins';

@WebSocketGateway({
    namespace: 'support',
    cors: {origin: '*'}, //Production: ['https://dev.pavodah.com']
})
export class SupportChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    
    @WebSocketServer() server: Server;

    private readonly logger = new Logger(SupportChatGateway.name);

    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly supportChatService: SupportChatService,
    ){};

    //Connection Lifecycle------------------
    async handleConnection(client: Socket) {
        try{
            const token = 
            client.handshake.auth.token || 
            client.handshake.headers.authorization.split(' ')[1];

            if(!token) throw new Error('No token provided');

            const decoded = this.jwtService.verify(token, {
                secret: this.configService.get('JWT_SECRET'),
            });

            client.data.user = decoded;
            const userId = decoded.id || decoded.sub;
            const role: Role = decoded.Role;

            this.logger.log(`Support socket connected: ${client.id} {User: ${userId}, Role ${role}`);

            //Admin auto-join the admin broadcast room
            if(role === Role.ADMIN){
                client.join(ADMIN_ROOM);
                this.logger.log(`Admin ${userId} joined ${ADMIN_ROOM}`);
            }
        }catch(error){
            this.logger.error(`Support connection rejected: ${error}`);
            client.disconnect();
        }
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Support socket disconnected: ${client.id}`);      
    }

    // Join a support conversation room--------------------
    @SubscribeMessage('support:join')
    async handleJoin(
        @ConnectedSocket() client: Socket,
        @MessageBody() conversationId: string){
        const user = client.data.user;
        const userId = user?.id || user?.sub;
        const role: Role = user?.role;

        if(!userId) return;

        const canAccess = this.supportChatService.canAccessConversation(
            conversationId,
            userId,
            role,
        );

        if(!canAccess) {
            client.emit('support:error', {
                message: 'Access denied to this conversation',
            });
            return;
        }

        const room = `support-${conversationId}`;
        client.join(room);
        this.logger.log(`Client ${client.id} joined support room: ${room}`);
    }

    //Leave a support conversation room-------------------
    @SubscribeMessage('support-leave')
    handleLeave(
        @ConnectedSocket() client: Socket,
        @MessageBody() conversationId: string){
        const room = `support-${conversationId}`;
        client.leave(room);
        this.logger.log(`Client ${client?.id} left support room ${room}`);
    }

    //Send a message-----------------------------
    @SubscribeMessage('support:send_message')
    async handleSendMessage(
        @ConnectedSocket() client: Socket,
        @MessageBody() payload: {conversationId: string, content: string}){
            const user = client.data.user;
            const userId = user?.id || user?.sub;
            const role: Role = user?.role;
            
            if(!userId) return;

            try{
                const { userMessage, botMessage } = await this.supportChatService.sendMessage(
                    payload.conversationId,
                    userId,
                    payload.content,
                    role
                );

                const room = `support-${payload.conversationId}`;
                
                //Broadcast the user/admin message to the room
                this.server.to(room).emit('support:message', { message: userMessage});

                //If bot replied, also broadcast it
                if(botMessage){
                    this.server.to(room).emit('support:message', { message: botMessage });
                }
            }catch(error){
                this.logger.error(`support:send_message error: ${error}`);
                client.emit('support:error', { message: error});  
            }
        }

    // Escalate to admin ---------------------------------------------------

    @SubscribeMessage('support:escalate')
    async handleEscalate(
      @ConnectedSocket() client: Socket,
      @MessageBody() conversationId: string,
    ) {
      const user = client.data.user;
      const userId = user?.id || user?.sub;

      if (!userId) return;

      try {
        const { conversation, systemMessage } =
          await this.supportChatService.escalateToAdmin(conversationId, userId);

        const room = `support-${conversationId}`;

        // Tell everyone in the room the conversation has escalated
        this.server.to(room).emit('support:escalated', { conversation });
        this.server.to(room).emit('support:message', { message: systemMessage });

        // Notify all online admins of the new waiting conversation
        this.server.to(ADMIN_ROOM).emit('support:new_waiting', { conversation });
      } catch (error) {
        this.logger.error(`support:escalate error: ${error}`);
        client.emit('support:error', { message: error });
      }
    }

    // Admin joins a waiting conversation --------------------------------
    
        @SubscribeMessage('support:join_as_admin')
        async handleAdminJoin(
          @ConnectedSocket() client: Socket,
          @MessageBody() conversationId: string,
        ) {
          const user = client.data.user;
          const userId = user?.id || user?.sub;
          const role: Role = user?.role;
    
          if (!userId || role !== Role.ADMIN) {
            client.emit('support:error', { message: 'Admins only' });
            return;
          }
    
          try {
            const { conversation, systemMessage } =
              await this.supportChatService.adminJoinConversation(
                conversationId,
                userId,
              );
    
            const room = `support-${conversationId}`;
    
            // Admin socket joins the room
            client.join(room);
    
            // Notify everyone in the room that admin joined
            this.server.to(room).emit('support:admin_joined', { conversation });
            this.server.to(room).emit('support:message', { message: systemMessage });
    
            // Notify all admins so they remove it from the waiting list
            this.server
              .to(ADMIN_ROOM)
              .emit('support:admin_took_conversation', { conversationId });
          } catch (error) {
            this.logger.error(`support:join_as_admin error: ${error}`);
            client.emit('support:error', { message: error });
          }
        }


// ----- Close conversation -------------------------------------

    @SubscribeMessage('support:close')
    async handleClose(
      @ConnectedSocket() client: Socket,
      @MessageBody() conversationId: string,
    ) {
      const user = client.data.user;
      const userId = user?.id || user?.sub;
      const role: Role = user?.role;

      if (!userId) return;

      try {
        const { conversation, systemMessage } =
          await this.supportChatService.closeConversation(
            conversationId,
            userId,
            role,
          );

        const room = `support-${conversationId}`;

        this.server.to(room).emit('support:message', { message: systemMessage });
        this.server.to(room).emit('support:closed', { conversation });
      } catch (error) {
        this.logger.error(`support:close error: ${error}`);
        client.emit('support:error', { message: error });
      }
    }

    // Public helper for REST controller broadcasts ----------------

    broadcastToRoom(conversationId: string, event: string, data: any) {
      this.server.to(`support-${conversationId}`).emit(event, data);
    }

    notifyAdmins(event: string, data: any) {
      this.server.to(ADMIN_ROOM).emit(event, data);
    }

}
