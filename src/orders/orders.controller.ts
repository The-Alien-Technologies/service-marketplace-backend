import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { RequestReleaseReviewDto } from './dto/request-release-review.dto';
import { ResponseUtil } from '../common/utils/response.util';
import { OrderStatus } from '../../generated/prisma';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import {
  IsAdmin,
  IsServiceProvider,
} from '../common/decorators/roles.decorator';
import { MarketActor } from '../markets/market-access.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @CurrentUser('userId') userId: string,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    const order = await this.ordersService.create(userId, createOrderDto);
    return ResponseUtil.success(order, 'Order created successfully');
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  async findMyOrders(
    @CurrentUser('userId') userId: string,
    @Query('status') status?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('marketId') marketId?: string,
    @Query('paidOnly') paidOnly?: string,
    @Query('spendingOnly') spendingOnly?: string,
    @Query('completedHistory') completedHistory?: string,
  ) {
    // Support comma-separated statuses e.g. PENDING,AWAITING
    const parsedStatus = status
      ? (status.split(',') as OrderStatus[])
      : undefined;
    const result = await this.ordersService.findClientOrders(userId, {
      status:
        parsedStatus && parsedStatus.length === 1
          ? parsedStatus[0]
          : parsedStatus,
      page: page ? Number.parseInt(page, 10) : undefined,
      limit: limit ? Number.parseInt(limit, 10) : undefined,
      marketId,
      paidOnly: paidOnly === 'true',
      spendingOnly: spendingOnly === 'true',
      completedHistory: completedHistory === 'true',
    });
    return ResponseUtil.success(result, 'Orders retrieved successfully');
  }

  @Get('provider')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @IsServiceProvider()
  async findProviderOrders(
    @CurrentUser('userId') userId: string,
    @Query('status') status?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('marketId') marketId?: string,
    @Query('completedHistory') completedHistory?: string,
    @Query('createdMonth') createdMonth?: string,
  ) {
    // Support comma-separated statuses e.g. PENDING,AWAITING
    const parsedStatus = status
      ? (status.split(',') as OrderStatus[])
      : undefined;
    const result = await this.ordersService.findProviderOrders(userId, {
      status:
        parsedStatus && parsedStatus.length === 1
          ? parsedStatus[0]
          : parsedStatus,
      page: page ? Number.parseInt(page, 10) : undefined,
      limit: limit ? Number.parseInt(limit, 10) : undefined,
      marketId,
      completedHistory: completedHistory === 'true',
      createdMonth,
    });
    return ResponseUtil.success(
      result,
      'Provider orders retrieved successfully',
    );
  }

  @Get('admin/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @IsAdmin()
  async findAll(
    @CurrentUser() actor: MarketActor,
    @Query('status') status?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('marketId') marketId?: string,
    @Query('paidOnly') paidOnly?: string,
    @Query('settledOnly') settledOnly?: string,
  ) {
    const parsedStatus = status
      ? (status.split(',') as OrderStatus[])
      : undefined;
    if (
      parsedStatus?.some((value) => !Object.values(OrderStatus).includes(value))
    ) {
      throw new BadRequestException('Invalid order status filter');
    }
    const result = await this.ordersService.findAll({
      status:
        parsedStatus && parsedStatus.length === 1
          ? parsedStatus[0]
          : parsedStatus,
      page: page ? Number.parseInt(page, 10) : undefined,
      limit: limit ? Number.parseInt(limit, 10) : undefined,
      search,
      actor,
      marketId,
      paidOnly: paidOnly === 'true',
      settledOnly: settledOnly === 'true',
    });
    return ResponseUtil.success(result, 'All orders retrieved successfully');
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(
    @Param('id') id: string,
    @CurrentUser('userId') userId: string,
    @CurrentUser('role') role: string,
    @CurrentUser() actor: MarketActor,
  ) {
    const order = await this.ordersService.findOne(
      id,
      userId,
      role === 'ADMIN' || role === 'SUPER_ADMIN' ? actor : undefined,
    );
    return ResponseUtil.success(order, 'Order retrieved successfully');
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  async updateStatus(
    @Param('id') id: string,
    @CurrentUser('userId') userId: string,
    @Body() updateStatusDto: UpdateOrderStatusDto,
  ) {
    const order = await this.ordersService.updateStatus(
      id,
      userId,
      updateStatusDto.status,
    );
    return ResponseUtil.success(order, 'Order status updated successfully');
  }

  @Post(':id/accept')
  @UseGuards(JwtAuthGuard)
  async acceptWork(
    @Param('id') id: string,
    @CurrentUser('userId') userId: string,
  ) {
    const settlement = await this.ordersService.acceptWork(id, userId);
    return ResponseUtil.success(
      settlement,
      'Work accepted and earnings released',
    );
  }

  @Post(':id/release-review')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @IsServiceProvider()
  async requestReleaseReview(
    @Param('id') id: string,
    @CurrentUser('userId') userId: string,
    @Body() dto: RequestReleaseReviewDto,
  ) {
    const settlement = await this.ordersService.requestReleaseReview(
      id,
      userId,
      dto.note,
    );
    return ResponseUtil.success(settlement, 'Release review requested');
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(
    @Param('id') id: string,
    @CurrentUser('userId') userId: string,
    @CurrentUser('role') role: string,
    @CurrentUser() actor: MarketActor,
  ) {
    const adminActor =
      role === 'ADMIN' || role === 'SUPER_ADMIN' ? actor : undefined;
    const result = await this.ordersService.delete(id, userId, adminActor);
    return ResponseUtil.success(result, 'Order deleted successfully');
  }
}
