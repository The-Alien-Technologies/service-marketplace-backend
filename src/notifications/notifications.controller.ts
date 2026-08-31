import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ResponseUtil } from '../common/utils/response.util';
import { ListNotificationsDto } from './dto/list-notifications.dto';
import { NotificationsService } from './notifications.service';
import { AllowUnapprovedProvider } from '../common/decorators/allow-unapproved-provider.decorator';

@Controller('notifications')
@AllowUnapprovedProvider()
export class NotificationsController {
  constructor(private readonly notifications: NotificationsService) {}

  @Get()
  async list(
    @CurrentUser('userId') userId: string,
    @Query() query: ListNotificationsDto,
  ) {
    return ResponseUtil.success(
      await this.notifications.list(userId, query),
      'Notifications retrieved',
    );
  }

  @Get('unread-count')
  async unreadCount(@CurrentUser('userId') userId: string) {
    return ResponseUtil.success(
      { count: await this.notifications.getUnreadCount(userId) },
      'Unread notification count retrieved',
    );
  }

  @Patch('read-all')
  async markAllRead(@CurrentUser('userId') userId: string) {
    return ResponseUtil.success(
      await this.notifications.markAllRead(userId),
      'Notifications marked as read',
    );
  }

  @Patch(':id/read')
  async markRead(
    @CurrentUser('userId') userId: string,
    @Param('id') notificationId: string,
  ) {
    return ResponseUtil.success(
      {
        notification: await this.notifications.markRead(userId, notificationId),
      },
      'Notification marked as read',
    );
  }
}
