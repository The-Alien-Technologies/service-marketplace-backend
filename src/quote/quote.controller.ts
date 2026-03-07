import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseGuards,
  Req,
  Query,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { QuoteService } from './quote.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ResponseUtil } from 'src/common/utils/response.util';
import {
  CreateQuoteDto,
  UpdateQuoteStatusDto,
  SendQuoteOfferDto,
} from './dto/quote.dto';
import { QuoteStatus } from '../../generated/prisma';

@Controller('quotes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  /** Client: submit a quote request (with optional file attachments) */
  @Post()
  @UseInterceptors(
    FilesInterceptor('attachments', 5, {
      storage: memoryStorage(),
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  )
  async create(
    @Req() req: any,
    @Body() dto: CreateQuoteDto,
    @UploadedFiles() files: Express.Multer.File[] = [],
  ) {
    const quote = await this.quoteService.create(
      req.currentUser.id,
      dto,
      files,
    );
    return ResponseUtil.success(
      { quote },
      'Quote request submitted successfully',
    );
  }

  /** Provider: list incoming quote requests */
  @Get('provider')
  async getProviderQuotes(@Req() req: any, @Query('status') status?: string) {
    const quotes = await this.quoteService.findAllForProvider(
      req.currentUser.id,
      status as QuoteStatus | undefined,
    );
    return ResponseUtil.success({ quotes }, 'Quote requests retrieved');
  }

  /** Client: list my submitted quote requests */
  @Get('client')
  async getClientQuotes(@Req() req: any) {
    const quotes = await this.quoteService.findAllForClient(req.currentUser.id);
    return ResponseUtil.success({ quotes }, 'Quote requests retrieved');
  }

  /** Either participant: get a single quote request */
  @Get(':id')
  async getOne(@Req() req: any, @Param('id') id: string) {
    const quote = await this.quoteService.findOne(id, req.currentUser.id);
    return ResponseUtil.success({ quote }, 'Quote request retrieved');
  }

  /** Provider: accept or decline a quote request */
  @Patch(':id/status')
  async updateStatus(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: UpdateQuoteStatusDto,
  ) {
    const quote = await this.quoteService.updateStatus(
      id,
      req.currentUser.id,
      dto,
    );
    return ResponseUtil.success({ quote }, 'Quote status updated');
  }

  /** Provider: send a custom offer */
  @Post(':id/offer')
  async sendOffer(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: SendQuoteOfferDto,
  ) {
    const quote = await this.quoteService.sendOffer(
      id,
      req.currentUser.id,
      dto,
    );
    return ResponseUtil.success({ quote }, 'Offer sent successfully');
  }

  /** Client: accept or decline a provider's offer */
  @Patch(':id/respond')
  async respondToOffer(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: UpdateQuoteStatusDto,
  ) {
    const quote = await this.quoteService.respondToOffer(
      id,
      req.currentUser.id,
      dto,
    );
    return ResponseUtil.success({ quote }, 'Response submitted');
  }
}
