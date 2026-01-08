import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { IsAdmin } from '../common/decorators/roles.decorator';
import { UsersService } from './users.service';
import { ResponseUtil } from '../common/utils/response.util';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@IsAdmin()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('role') role?: string,
    @Query('status') status?: string,
  ) {
    const pageNum = Number.parseInt(page || '1', 10);
    const limitNum = Number.parseInt(limit || '10', 10);

    const result = await this.usersService.findAll({
      page: pageNum,
      limit: limitNum,
      search,
      role,
      status,
    });

    return ResponseUtil.success(result, 'Users retrieved successfully');
  }

  @Get('stats')
  async getUserStats() {
    const stats = await this.usersService.getStats();
    return ResponseUtil.success(stats, 'User stats retrieved successfully');
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    return ResponseUtil.success(user, 'User retrieved successfully');
  }

  @Patch(':id/status')
  async updateUserStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateUserStatusDto,
  ) {
    const user = await this.usersService.updateStatus(
      id,
      updateStatusDto.status,
    );
    return ResponseUtil.success(user, 'User status updated successfully');
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.usersService.delete(id);
    return ResponseUtil.success(null, 'User deleted successfully');
  }
}
