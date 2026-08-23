import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
  Req,
  Query,
  UploadedFile,
  UseInterceptors,
  Optional,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ResponseUtil } from 'src/common/utils/response.util';
import { FileUploadService } from 'src/common/services/file-upload.service';
import { NotificationsService } from '../notifications/notifications.service';

@Controller('chat')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly fileUploadService: FileUploadService,
    @Optional()
    private readonly notifications?: NotificationsService,
  ) {}

  @Get('conversations')
  async getConversations(@Req() req: any) {
    const conversations = await this.chatService.getConversations(
      req.currentUser.id,
    );
    return ResponseUtil.success(
      { conversations },
      'Conversations retrieved successfully',
    );
  }

  @Get('conversations/:id/messages')
  async getMessages(
    @Req() req: any,
    @Param('id') id: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    const messages = await this.chatService.getMessages(
      id,
      req.currentUser.id,
      skip ? parseInt(skip) : 0,
      take ? parseInt(take) : 50,
    );
    return ResponseUtil.success(
      { messages },
      'Messages retrieved successfully',
    );
  }

  @Get('unread-count')
  async getUnreadCount(@Req() req: any) {
    const unreadCount = await this.chatService.getUnreadCount(
      req.currentUser.id,
    );
    return ResponseUtil.success(
      { unreadCount },
      'Unread message count retrieved successfully',
    );
  }

  @Patch('conversations/:id/read')
  async markConversationRead(@Req() req: any, @Param('id') id: string) {
    const result = await this.chatService.markConversationRead(
      id,
      req.currentUser.id,
    );
    await this.notifications?.markEntityRead(
      req.currentUser.id,
      'conversation',
      id,
    );
    return ResponseUtil.success(
      { count: result.count },
      'Conversation marked as read',
    );
  }

  @Post('start')
  async startConversation(@Req() req: any, @Body('targetId') targetId: string) {
    const conversation = await this.chatService.getOrCreateConversation(
      req.currentUser.id,
      targetId,
    );
    return ResponseUtil.success(
      { conversation },
      'Conversation created successfully',
    );
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
    }),
  )
  async uploadFile(
    @Req() _req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const result = await this.fileUploadService.uploadGeneral(file, 'chat');
    return ResponseUtil.success(
      { url: result.url },
      'File uploaded successfully',
    );
  }
}
