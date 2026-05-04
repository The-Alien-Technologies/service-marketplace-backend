  import {
    Controller,
    Get,
    Post,
    Patch,
    Body,
    Param,
    Req,
    UseGuards,
  } from '@nestjs/common';
  import { SupportChatService } from './supportChat.service';
  import { SupportChatGateway } from './supportChat.gateway';
  import { SendSupportMessageDto } from './dto/send-message.dto';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  import { RolesGuard } from '../auth/guards/roles.guard';
  import { IsAdmin } from '../common/decorators/roles.decorator';
  import { ResponseUtil } from '../common/utils/response.util';

  @Controller('support')
  @UseGuards(JwtAuthGuard, RolesGuard)
  export class SupportChatController {
    constructor(
      private readonly supportChatService: SupportChatService,
      private readonly supportChatGateway: SupportChatGateway,
    ) {}

    // ─── User/SP endpoints ────────────────────────────────────────────────────

    @Post('conversations')
    async startConversation(@Req() req: any) {
      const conversation = await this.supportChatService.startConversation(
        req.currentUser.id,
        req.currentUser.role
      );
      return ResponseUtil.success({ conversation }, 'Support conversationstarted');
    }

    @Get('conversations/my')
    async getMyConversations(@Req() req: any) {
      const conversations = await this.supportChatService.getMyConversations(
        req.currentUser.id,
      );
      return ResponseUtil.success(
        { conversations },
        'Conversations retrieved successfully',
      );
    }

    @Get('conversations/:id')
    async getConversation(@Req() req: any, @Param('id') id: string) {
      const conversation =
        await this.supportChatService.getConversationWithMessages(
          id,
          req.currentUser.id,
          req.currentUser.role,
        );
      return ResponseUtil.success(
        { conversation },
        'Conversation retrieved successfully',
      );
    }

    @Post('conversations/:id/messages')
    async sendMessage(
      @Req() req: any,
      @Param('id') id: string,
      @Body() dto: SendSupportMessageDto,
    ) {
      const { userMessage, botMessage } =
        await this.supportChatService.sendMessage(
          id,
          req.currentUser.id,
          dto.content,
          req.currentUser.role,
        );

      // Broadcast via WebSocket so other participants see it in real time
      this.supportChatGateway.broadcastToRoom(id, 'support:message', {
        message: userMessage,
      });
      if (botMessage) {
        this.supportChatGateway.broadcastToRoom(id, 'support:message', {
          message: botMessage,
        });
      }

      return ResponseUtil.success(
        { userMessage, botMessage },
        'Message sent successfully',
      );
    }

    @Patch('conversations/:id/escalate')
    async escalate(@Req() req: any, @Param('id') id: string) {
      const { conversation, systemMessage } =
        await this.supportChatService.escalateToAdmin(id, req.currentUser.id);

      this.supportChatGateway.broadcastToRoom(id, 'support:escalated', {
        conversation,
      });
      this.supportChatGateway.broadcastToRoom(id, 'support:message', {
        message: systemMessage,
      });
      this.supportChatGateway.notifyAdmins('support:new_waiting', {
        conversation,
      });

      return ResponseUtil.success(
        { conversation },
        'Escalated to human support. Please wait.',
      );
    }

    @Patch('conversations/:id/close')
    async close(@Req() req: any, @Param('id') id: string) {
      const { conversation, systemMessage } =
        await this.supportChatService.closeConversation(
          id,
          req.currentUser.id,
          req.currentUser.role,
        );

      this.supportChatGateway.broadcastToRoom(id, 'support:message', {
        message: systemMessage,
      });
      this.supportChatGateway.broadcastToRoom(id, 'support:closed', {
        conversation,
      });

      return ResponseUtil.success({ conversation }, 'Conversation closed');
    }

    // ─── Admin endpoints ──────────────────────────────────────────────────────

    @Get('admin/conversations')
    @IsAdmin()
    async getAdminConversations() {
      const data = await this.supportChatService.getAdminConversation();
      return ResponseUtil.success(data, 'Conversations retrieved successfully');
    }

    @Patch('admin/conversations/:id/join')
    @IsAdmin()
    async adminJoin(@Req() req: any, @Param('id') id: string) {
      const { conversation, systemMessage } =
        await this.supportChatService.adminJoinConversation(
          id,
          req.currentUser.id,
        );

      this.supportChatGateway.broadcastToRoom(id, 'support:admin_joined', {
        conversation,
      });
      this.supportChatGateway.broadcastToRoom(id, 'support:message', {
        message: systemMessage,
      });
      this.supportChatGateway.notifyAdmins('support:admin_took_conversation', {
        conversationId: id,
      });

      return ResponseUtil.success(
        { conversation },
        'You have joined the conversation',
      );
    }

    @Patch('admin/conversations/:id/close')
    @IsAdmin()
    async adminClose(@Req() req: any, @Param('id') id: string) {
      const { conversation, systemMessage } =
        await this.supportChatService.closeConversation(
          id,
          req.currentUser.id,
          req.currentUser.role,
        );

      this.supportChatGateway.broadcastToRoom(id, 'support:message', {
        message: systemMessage,
      });
      this.supportChatGateway.broadcastToRoom(id, 'support:closed', {
        conversation,
      });

      return ResponseUtil.success({ conversation }, 'Conversation closed');
    }
  }