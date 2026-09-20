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
import {
  CreateDisputeDto,
  ResolveDisputeDto,
  UpdateDisputeStatusDto,
} from './dto/dispute.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { IsAdmin } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { MarketActor } from '../markets/market-access.service';

@Controller('disputes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DisputeController {
  constructor(private readonly disputeService: DisputeService) {}

  /** USER: raise a dispute on a completed order */
  @Post()
  create(@Request() req, @Body() dto: CreateDisputeDto) {
    return this.disputeService.create(req.user.id, dto);
  }

  /** ADMIN: list disputes with server-side filters. */
  @Get()
  @IsAdmin()
  findAll(
    @CurrentUser() actor: MarketActor,
    @Query('status') status?: string,
    @Query('priority') priority?: string,
    @Query('issueType') issueType?: string,
    @Query('search') search?: string,
  ) {
    return this.disputeService.findAll(
      { status, priority, issueType, search },
      actor,
    );
  }

  /** CLIENT/PROVIDER: list disputes they are a party to */
  @Get('my')
  findMine(
    @Request() req,
    @Query('status') status?: string,
    @Query('priority') priority?: string,
    @Query('issueType') issueType?: string,
    @Query('search') search?: string,
  ) {
    return this.disputeService.findByParticipant(req.user.id, {
      status,
      priority,
      issueType,
      search,
    });
  }

  /** ADMIN or owner: get single dispute */
  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    const isAdmin = ['ADMIN', 'SUPER_ADMIN'].includes(req.user.role);
    return this.disputeService.findOne(id, req.user.id, isAdmin, req.user);
  }

  /** ADMIN: update dispute status + optional admin note */
  @Patch(':id/status')
  @IsAdmin()
  updateStatus(
    @CurrentUser() actor: MarketActor,
    @Param('id') id: string,
    @Body() dto: UpdateDisputeStatusDto,
  ) {
    return this.disputeService.updateStatus(id, dto, actor);
  }

  /** ADMIN: resolve the financial outcome of a service dispute */
  @Post(':id/resolve')
  @IsAdmin()
  resolve(
    @CurrentUser() actor: MarketActor,
    @Param('id') id: string,
    @Body() dto: ResolveDisputeDto,
  ) {
    return this.disputeService.resolve(id, dto, actor);
  }
}
