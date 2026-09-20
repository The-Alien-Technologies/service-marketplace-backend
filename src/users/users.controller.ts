import {
  BadRequestException,
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { IsAdmin } from '../common/decorators/roles.decorator';
import { UsersService } from './users.service';
import { ResponseUtil } from '../common/utils/response.util';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import {
  ProviderApplicationDecision,
  ReviewProviderApplicationDto,
} from './dto/review-provider-application.dto';
import { Role, UserStatus } from '../../generated/prisma';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { MarketActor } from '../markets/market-access.service';

function positiveInteger(
  value: string | undefined,
  fallback: number,
  max: number,
) {
  const parsed = Number.parseInt(value || '', 10);
  if (!Number.isFinite(parsed) || parsed < 1) return fallback;
  return Math.min(parsed, max);
}

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@IsAdmin()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(
    @CurrentUser() actor: MarketActor,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('role') role?: string,
    @Query('status') status?: string,
    @Query('marketId') marketId?: string,
    @Query('marketplaceOnly') marketplaceOnly?: string,
  ) {
    if (role && !Object.values(Role).includes(role as Role)) {
      throw new BadRequestException('Invalid user role filter');
    }
    if (status && !Object.values(UserStatus).includes(status as UserStatus)) {
      throw new BadRequestException('Invalid user status filter');
    }
    const pageNum = Number.parseInt(page || '1', 10);
    const limitNum = Number.parseInt(limit || '10', 10);

    const result = await this.usersService.findAll({
      page: pageNum,
      limit: limitNum,
      search,
      role,
      status,
      actor,
      marketId,
      marketplaceOnly: marketplaceOnly === 'true',
    });

    return ResponseUtil.success(result, 'Users retrieved successfully');
  }

  @Get('stats')
  async getUserStats(
    @CurrentUser() actor: MarketActor,
    @Query('marketId') marketId?: string,
  ) {
    const stats = await this.usersService.getStats(actor, marketId);
    return ResponseUtil.success(stats, 'User stats retrieved successfully');
  }

  @Get('provider-applications')
  async getProviderApplications(
    @CurrentUser() actor: MarketActor,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('status') status?: UserStatus,
    @Query('marketId') marketId?: string,
  ) {
    const result = await this.usersService.findProviderApplications({
      page: positiveInteger(page, 1, 1_000_000),
      limit: positiveInteger(limit, 10, 100),
      search,
      status,
      actor,
      marketId,
    });
    return ResponseUtil.success(
      result,
      'Provider applications retrieved successfully',
    );
  }

  @Get('provider-applications/:id')
  async getProviderApplication(
    @CurrentUser() actor: MarketActor,
    @Param('id') id: string,
  ) {
    await this.usersService.assertAdminCanAccessUser(actor, id);
    const application = await this.usersService.findProviderApplicationById(id);
    return ResponseUtil.success(
      application,
      'Provider application retrieved successfully',
    );
  }

  @Patch('provider-applications/:id/decision')
  async reviewProviderApplication(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() reviewDto: ReviewProviderApplicationDto,
  ) {
    await this.usersService.assertAdminCanAccessUser(
      req.currentUser! as MarketActor,
      id,
    );
    const application = await this.usersService.reviewProviderApplication(
      id,
      req.currentUser!.id,
      reviewDto.decision as ProviderApplicationDecision,
      reviewDto.reason,
    );
    return ResponseUtil.success(
      application,
      reviewDto.decision === ProviderApplicationDecision.APPROVE
        ? 'Provider application approved successfully'
        : 'Provider application rejected successfully',
    );
  }

  @Get(':id')
  async getUserById(
    @CurrentUser() actor: MarketActor,
    @Param('id') id: string,
  ) {
    await this.usersService.assertAdminCanAccessUser(actor, id);
    const user = await this.usersService.findById(id);
    return ResponseUtil.success(user, 'User retrieved successfully');
  }

  @Patch(':id/status')
  async updateUserStatus(
    @CurrentUser() actor: MarketActor,
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateUserStatusDto,
  ) {
    await this.usersService.assertAdminCanAccessUser(actor, id);
    const user = await this.usersService.updateStatus(
      id,
      updateStatusDto.status,
    );
    return ResponseUtil.success(user, 'User status updated successfully');
  }

  @Delete(':id')
  async deleteUser(@CurrentUser() actor: MarketActor, @Param('id') id: string) {
    await this.usersService.assertAdminCanAccessUser(actor, id);
    await this.usersService.delete(id);
    return ResponseUtil.success(null, 'User deleted successfully');
  }
}
