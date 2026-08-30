import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  FileUploadService,
  FileCategory,
} from '../common/services/file-upload.service';
import {
  CreateQuoteDto,
  UpdateQuoteStatusDto,
  SendQuoteOfferDto,
} from './dto/quote.dto';
import { QuoteStatus } from '../../generated/prisma';
import { OrdersService } from '../orders/orders.service';
import { NotificationEventsService } from '../notifications/notification-events.service';

const QUOTE_INCLUDE = {
  client: {
    select: { id: true, firstName: true, lastName: true, avatar: true },
  },
  provider: {
    select: { id: true, firstName: true, lastName: true, avatar: true },
  },
  service: {
    select: { id: true, title: true, coverImage: true },
  },
  order: {
    select: {
      id: true,
      orderNumber: true,
      paymentStatus: true,
      total: true,
      currency: true,
    },
  },
};

@Injectable()
export class QuoteService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileUploadService: FileUploadService,
    private readonly ordersService: OrdersService,
    private readonly notificationEvents?: NotificationEventsService,
  ) {}

  async create(
    clientId: string,
    dto: CreateQuoteDto,
    files: Express.Multer.File[] = [],
  ) {
    // Upload attachments
    const attachmentUrls: string[] = [];
    for (const file of files) {
      const result = await this.fileUploadService.uploadFile(
        file,
        FileCategory.DOCUMENT,
        { folder: 'quote-attachments', generateUniqueName: true },
      );
      attachmentUrls.push(result.url);
    }

    const quote = await this.prisma.quoteRequest.create({
      data: {
        clientId,
        providerId: dto.providerId,
        serviceId: dto.serviceId ?? null,
        projectTitle: dto.projectTitle,
        description: dto.description,
        deliveryTime: dto.deliveryTime,
        budget: dto.budget,
        currency: dto.currency ?? 'GHS',
        attachments: attachmentUrls,
      },
      include: QUOTE_INCLUDE,
    });
    await this.notificationEvents?.quoteReceived(quote);
    return quote;
  }

  async findAllForProvider(providerId: string, status?: QuoteStatus) {
    return this.prisma.quoteRequest.findMany({
      where: {
        providerId,
        ...(status ? { status } : {}),
      },
      include: QUOTE_INCLUDE,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllForClient(clientId: string) {
    return this.prisma.quoteRequest.findMany({
      where: { clientId },
      include: QUOTE_INCLUDE,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const quote = await this.prisma.quoteRequest.findUnique({
      where: { id },
      include: QUOTE_INCLUDE,
    });

    if (!quote) throw new NotFoundException('Quote request not found');
    if (quote.clientId !== userId && quote.providerId !== userId) {
      throw new ForbiddenException('You are not part of this quote request');
    }

    return quote;
  }

  async updateStatus(
    id: string,
    providerId: string,
    dto: UpdateQuoteStatusDto,
  ) {
    const quote = await this.prisma.quoteRequest.findUnique({ where: { id } });
    if (!quote) throw new NotFoundException('Quote request not found');
    if (quote.providerId !== providerId) {
      throw new ForbiddenException(
        'Only the provider can update the quote status',
      );
    }

    const updated = await this.prisma.quoteRequest.update({
      where: { id },
      data: {
        status: dto.status as QuoteStatus,
        ...(dto.declineReason ? { declineReason: dto.declineReason } : {}),
      },
      include: QUOTE_INCLUDE,
    });
    await this.notificationEvents?.quoteUpdated({
      ...updated,
      actor: 'provider',
    });
    return updated;
  }

  async sendOffer(id: string, providerId: string, dto: SendQuoteOfferDto) {
    const quote = await this.prisma.quoteRequest.findUnique({ where: { id } });
    if (!quote) throw new NotFoundException('Quote request not found');
    if (quote.providerId !== providerId) {
      throw new ForbiddenException('Only the provider can send an offer');
    }

    const updated = await this.prisma.quoteRequest.update({
      where: { id },
      data: {
        status: QuoteStatus.PENDING,
        providerNote: dto.providerNote,
        budget: dto.budget,
        deliveryTime: dto.deliveryTime,
      },
      include: QUOTE_INCLUDE,
    });
    await this.notificationEvents?.quoteUpdated({
      ...updated,
      actor: 'provider',
    });
    return updated;
  }

  async respondToOffer(
    id: string,
    clientId: string,
    dto: UpdateQuoteStatusDto,
  ) {
    const quote = await this.prisma.quoteRequest.findUnique({ where: { id } });
    if (!quote) throw new NotFoundException('Quote request not found');
    if (quote.clientId !== clientId) {
      throw new ForbiddenException('Only the client can respond to an offer');
    }

    if (dto.status === 'ACCEPTED') {
      await this.ordersService.createFromAcceptedQuote(id, clientId);
      const updated = await this.prisma.quoteRequest.findUnique({
        where: { id },
        include: QUOTE_INCLUDE,
      });
      if (updated) {
        await this.notificationEvents?.quoteUpdated({
          ...updated,
          actor: 'client',
        });
      }
      return updated;
    }

    const updated = await this.prisma.quoteRequest.update({
      where: { id },
      data: {
        status: dto.status as QuoteStatus,
        ...(dto.declineReason ? { declineReason: dto.declineReason } : {}),
      },
      include: QUOTE_INCLUDE,
    });
    await this.notificationEvents?.quoteUpdated({
      ...updated,
      actor: 'client',
    });
    return updated;
  }
}
