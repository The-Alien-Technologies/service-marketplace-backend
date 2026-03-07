import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { DisputeService } from './dispute.service';
import { CreateDisputeDto, UpdateDisputeStatusDto } from './dto/dispute.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IsAdmin } from '../common/decorators/roles.decorator';

@Controller('disputes')
@UseGuards(JwtAuthGuard)
export class DisputeController {
  constructor(private readonly disputeService: DisputeService) {}

  /** USER: raise a dispute on a completed order */
  @Post()
  create(@Request() req, @Body() dto: CreateDisputeDto) {
    return this.disputeService.create(req.user.id, dto);
  }

  /** ADMIN: list all disputes, optional ?status= filter */
  @Get()
  @IsAdmin()
  findAll(@Query('status') status?: string) {
    return this.disputeService.findAll({ status });
  }

  /** USER: list own disputes */
  @Get('my')
  findMine(@Request() req) {
    return this.disputeService.findByClient(req.user.id);
  }

  /** ADMIN or owner: get single dispute */
  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    const isAdmin = req.user.role === 'ADMIN';
    return this.disputeService.findOne(id, req.user.id, isAdmin);
  }

  /** ADMIN: update dispute status + optional admin note */
  @Patch(':id/status')
  @IsAdmin()
  updateStatus(@Param('id') id: string, @Body() dto: UpdateDisputeStatusDto) {
    return this.disputeService.updateStatus(id, dto);
  }
}
