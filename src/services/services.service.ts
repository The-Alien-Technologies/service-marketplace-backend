import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  FileUploadService,
  FileCategory,
} from '../common/services/file-upload.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import {
  Prisma,
  Service,
  ServiceStatus,
  ServiceAvailability,
  MarketStatus,
  ProviderMarketMembershipStatus,
  UserStatus,
} from '../../generated/prisma';
import slugify from 'slugify';
import {
  MarketAccessService,
  MarketActor,
} from '../markets/market-access.service';

@Injectable()
export class ServicesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileUploadService: FileUploadService,
    private readonly marketAccess: MarketAccessService = {
      assertResource: () => undefined,
      marketForAdmin: (_actor: MarketActor, marketId?: string) => marketId,
      isStaff: () => true,
    } as unknown as MarketAccessService,
  ) {}

  async create(
    userId: string,
    createServiceDto: CreateServiceDto,
    coverImage?: Express.Multer.File,
  ): Promise<Service> {
    const membership = await this.prisma.providerMarketMembership.findUnique({
      where: {
        providerId_marketId: {
          providerId: userId,
          marketId: createServiceDto.marketId,
        },
      },
      include: { market: true },
    });
    if (
      !membership ||
      membership.status !== ProviderMarketMembershipStatus.ACTIVE
    ) {
      throw new ForbiddenException(
        'You need an active provider membership in this market',
      );
    }
    if (membership.market.status !== MarketStatus.ACTIVE) {
      throw new BadRequestException('Services are unavailable in this market');
    }
    const categoryEnabled = await this.prisma.marketCategory.findUnique({
      where: {
        marketId_categoryId: {
          marketId: createServiceDto.marketId,
          categoryId: createServiceDto.categoryId,
        },
      },
    });
    if (!categoryEnabled?.isActive) {
      throw new BadRequestException(
        'This category is unavailable in the market',
      );
    }

    // Generate unique slug
    const slug = await this.generateUniqueSlug(createServiceDto.title);

    // Upload cover image if provided
    let coverImageUrl: string | undefined;
    if (coverImage) {
      const result = await this.fileUploadService.uploadFile(
        coverImage,
        FileCategory.SERVICE,
      );
      coverImageUrl = result.url;
    }

    // Create service with plans and optionally addons
    const service = await this.prisma.service.create({
      data: {
        title: createServiceDto.title,
        slug,
        overview: createServiceDto.overview,
        coverImage: coverImageUrl,
        tags: createServiceDto.tags || [],
        status: ServiceStatus.DRAFT,
        providerId: userId,
        categoryId: createServiceDto.categoryId,
        marketId: createServiceDto.marketId,
        currency: membership.market.currency,
        availability:
          createServiceDto.availability ?? ServiceAvailability.MARKET,
        plans: {
          create: createServiceDto.plans.map((plan, index) => ({
            title: plan.title,
            price: plan.price,
            inclusions: plan.inclusions,
            isPopular: plan.isPopular || false,
            sortOrder: plan.sortOrder ?? index,
          })),
        },
        addons: createServiceDto.addons
          ? {
              create: createServiceDto.addons.map((addon) => ({
                title: addon.title,
                description: addon.description,
                price: addon.price,
              })),
            }
          : undefined,
      },
      include: {
        plans: true,
        addons: true,
        images: true,
        category: true,
        market: true,
        provider: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            displayName: true,
            avatar: true,
          },
        },
      },
    });

    return service as unknown as Service;
  }

  async findAll(options?: {
    status?: ServiceStatus;
    categoryId?: string;
    providerId?: string;
    page?: number;
    limit?: number;
    includeAll?: boolean;
    marketCode?: string;
    marketId?: string;
    actor?: MarketActor;
    search?: string;
    sortBy?: 'recent' | 'popular';
  }): Promise<{
    services: Service[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (options?.includeAll && options.actor) {
      const scopedMarketId = this.marketAccess.marketForAdmin(
        options.actor,
        options.marketId,
      );
      if (scopedMarketId) where.marketId = scopedMarketId;
    } else if (options?.marketId) {
      where.marketId = options.marketId;
    }

    if (options?.marketCode?.toUpperCase() === 'GLOBAL') {
      where.availability = ServiceAvailability.GLOBAL;
      where.market = { status: { not: MarketStatus.INACTIVE } };
    } else if (options?.marketCode) {
      where.market = {
        code: options.marketCode.toUpperCase(),
        status: { not: MarketStatus.INACTIVE },
      };
    } else if (!options?.includeAll && !options?.providerId) {
      where.market = { status: { not: MarketStatus.INACTIVE } };
    }

    // Logic for filtering services
    if (options?.includeAll) {
      // If includeAll is true (Admin), allow filtering by available parameters but don't force constraints
      if (options.status) where.status = options.status;
      if (options.providerId) where.providerId = options.providerId;
    } else if (!options?.providerId) {
      // Public view: Only show published services
      where.status = ServiceStatus.PUBLISHED;
      where.provider = {
        status: UserStatus.ACTIVE,
        isServiceProviderVerified: true,
      };
    } else {
      // Provider view: Provider can see their own services with any status
      where.providerId = options.providerId;
      if (options.status) {
        where.status = options.status;
      }
    }

    if (options?.categoryId) {
      where.categoryId = options.categoryId;
    }

    if (options?.search?.trim()) {
      const search = options.search.trim();
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { overview: { contains: search, mode: 'insensitive' } },
        { tags: { hasSome: [search] } },
        {
          provider: {
            OR: [
              { displayName: { contains: search, mode: 'insensitive' } },
              { firstName: { contains: search, mode: 'insensitive' } },
              { lastName: { contains: search, mode: 'insensitive' } },
            ],
          },
        },
      ];
    }

    const orderBy =
      options?.sortBy === 'popular'
        ? [
            { orders: { _count: 'desc' as const } },
            { createdAt: 'desc' as const },
          ]
        : { createdAt: 'desc' as const };

    const [services, total] = await Promise.all([
      this.prisma.service.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          plans: {
            orderBy: { sortOrder: 'asc' },
          },
          addons: true,
          images: {
            orderBy: { sortOrder: 'asc' },
          },
          category: true,
          market: true,
          provider: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              displayName: true,
              avatar: true,
            },
          },
          _count: {
            select: { orders: true, reviews: true },
          },
        },
      }),
      this.prisma.service.count({ where }),
    ]);

    const serviceIds = services.map((service) => service.id);
    const ratingGroups = serviceIds.length
      ? await this.prisma.review.groupBy({
          by: ['serviceId'],
          where: { serviceId: { in: serviceIds } },
          _avg: { rating: true },
        })
      : [];
    const averageRatings = new Map(
      ratingGroups.map((group) => [
        group.serviceId,
        Number((group._avg.rating ?? 0).toFixed(1)),
      ]),
    );
    const enrichedServices = services.map((service) => {
      const { _count, ...serviceData } = service;
      return {
        ...serviceData,
        averageRating: averageRatings.get(service.id) ?? 0,
        reviewCount: _count.reviews,
        orderCount: _count.orders,
      };
    });

    return {
      services: enrichedServices as unknown as Service[],
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Service> {
    return this.findOneWhere({
      id,
      status: ServiceStatus.PUBLISHED,
      market: { status: { not: MarketStatus.INACTIVE } },
      provider: {
        status: UserStatus.ACTIVE,
        isServiceProviderVerified: true,
      },
    });
  }

  async findOneForProvider(id: string, providerId: string): Promise<Service> {
    return this.findOneWhere({ id, providerId });
  }

  private async findOneWhere(
    where: Prisma.ServiceWhereInput,
  ): Promise<Service> {
    const service = await this.prisma.service.findFirst({
      where,
      include: {
        plans: {
          orderBy: { sortOrder: 'asc' },
        },
        addons: true,
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        category: true,
        market: true,
        provider: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            displayName: true,
            avatar: true,
            bio: true,
          },
        },
      },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    return service as unknown as Service;
  }

  async update(
    id: string,
    userId: string,
    updateServiceDto: UpdateServiceDto,
    coverImage?: Express.Multer.File,
  ): Promise<Service> {
    // Check ownership
    const service = await this.prisma.service.findUnique({
      where: { id },
      include: { plans: true },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    if (service.providerId !== userId) {
      throw new ForbiddenException('You can only update your own services');
    }
    if (
      updateServiceDto.marketId &&
      updateServiceDto.marketId !== service.marketId
    ) {
      throw new BadRequestException(
        'A service cannot be moved to another market',
      );
    }
    if (updateServiceDto.categoryId) {
      const categoryEnabled = await this.prisma.marketCategory.findUnique({
        where: {
          marketId_categoryId: {
            marketId: service.marketId,
            categoryId: updateServiceDto.categoryId,
          },
        },
      });
      if (!categoryEnabled?.isActive) {
        throw new BadRequestException(
          'This category is unavailable in the market',
        );
      }
    }
    if (updateServiceDto.status === ServiceStatus.PUBLISHED) {
      await this.assertCanPublish(
        id,
        updateServiceDto.plans?.length ?? service.plans.length,
      );
    }

    // Upload new cover image if provided
    let coverImageUrl: string | undefined;
    if (coverImage) {
      // Delete old cover image if exists
      if (service.coverImage) {
        try {
          await this.fileUploadService.deleteFile(service.coverImage);
        } catch (error) {
          console.warn('Failed to delete old cover image:', error);
        }
      }
      const result = await this.fileUploadService.uploadFile(
        coverImage,
        FileCategory.SERVICE,
      );
      coverImageUrl = result.url;
    }

    // Update service
    const updated = await this.prisma.service.update({
      where: { id },
      data: {
        title: updateServiceDto.title,
        overview: updateServiceDto.overview,
        categoryId: updateServiceDto.categoryId,
        tags: updateServiceDto.tags,
        status: updateServiceDto.status,
        availability: updateServiceDto.availability,
        coverImage: coverImageUrl || service.coverImage,
        // Delete all existing plans and create new ones
        plans:
          updateServiceDto.plans !== undefined
            ? {
                deleteMany: {},
                create: updateServiceDto.plans
                  .filter(
                    (plan) =>
                      plan.title && plan.price !== undefined && plan.inclusions,
                  )
                  .map((plan, index) => ({
                    title: plan.title,
                    price: plan.price,
                    inclusions: plan.inclusions,
                    isPopular: plan.isPopular || false,
                    sortOrder: plan.sortOrder ?? index,
                  })),
              }
            : undefined,
        // Delete all existing addons and create new ones
        addons:
          updateServiceDto.addons !== undefined
            ? {
                deleteMany: {},
                create: updateServiceDto.addons
                  .filter((addon) => addon.title && addon.price !== undefined)
                  .map((addon) => ({
                    title: addon.title,
                    description: addon.description || '',
                    price: addon.price,
                  })),
              }
            : undefined,
      },
      include: {
        plans: true,
        addons: true,
        images: true,
        category: true,
        market: true,
        provider: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            displayName: true,
            avatar: true,
          },
        },
      },
    });

    return updated as unknown as Service;
  }

  async updateStatus(
    id: string,
    userId: string,
    status: ServiceStatus,
  ): Promise<Service> {
    const service = await this.prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    if (service.providerId !== userId) {
      throw new ForbiddenException('You can only update your own services');
    }

    // Validate service is ready to publish
    if (status === ServiceStatus.PUBLISHED) {
      await this.assertCanPublish(id);
    }

    return this.prisma.service.update({
      where: { id },
      data: { status },
    }) as unknown as Service;
  }

  private async assertCanPublish(id: string, planCount?: number) {
    const service = await this.prisma.service.findUnique({
      where: { id },
      include: {
        plans: true,
        market: true,
        provider: { include: { providerMarketMemberships: true } },
      },
    });
    if (!service) throw new NotFoundException('Service not found');
    if ((planCount ?? service.plans.length) === 0) {
      throw new BadRequestException(
        'Cannot publish service without at least one plan',
      );
    }
    const membership = service.provider.providerMarketMemberships.find(
      (item) => item.marketId === service.marketId,
    );
    if (
      service.market.status !== MarketStatus.ACTIVE ||
      !service.market.servicePublishingEnabled ||
      membership?.status !== ProviderMarketMembershipStatus.ACTIVE
    ) {
      throw new BadRequestException(
        'This service cannot be published in its current market',
      );
    }
  }

  async remove(id: string, userId: string): Promise<void> {
    const service = await this.prisma.service.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    if (service.providerId !== userId) {
      throw new ForbiddenException('You can only delete your own services');
    }

    // Delete cover image if exists
    if (service.coverImage) {
      try {
        await this.fileUploadService.deleteFile(service.coverImage);
      } catch (error) {
        console.warn('Failed to delete cover image:', error);
      }
    }

    // Delete all portfolio images
    for (const image of service.images) {
      try {
        await this.fileUploadService.deleteFile(image.url);
      } catch (error) {
        console.warn('Failed to delete image:', error);
      }
    }

    // Delete service (cascade will handle plans, addons, images)
    await this.prisma.service.delete({
      where: { id },
    });
  }

  async uploadImages(
    serviceId: string,
    userId: string,
    images: Express.Multer.File[],
  ): Promise<Service> {
    const service = await this.prisma.service.findUnique({
      where: { id: serviceId },
      include: { images: true },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    if (service.providerId !== userId) {
      throw new ForbiddenException(
        'You can only upload images to your own services',
      );
    }

    // Upload images
    const uploadedImages = await Promise.all(
      images.map(async (image, index) => {
        const result = await this.fileUploadService.uploadFile(
          image,
          FileCategory.SERVICE_PORTFOLIO,
        );
        return {
          url: result.url,
          fileName: image.originalname,
          sortOrder: service.images.length + index,
        };
      }),
    );

    // Create image records
    await this.prisma.serviceImage.createMany({
      data: uploadedImages.map((img) => ({
        ...img,
        serviceId,
      })),
    });

    return this.findOne(serviceId);
  }

  async deleteImage(
    serviceId: string,
    imageId: string,
    userId: string,
  ): Promise<void> {
    const service = await this.prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    if (service.providerId !== userId) {
      throw new ForbiddenException(
        'You can only delete images from your own services',
      );
    }

    const image = await this.prisma.serviceImage.findUnique({
      where: { id: imageId },
    });

    if (!image || image.serviceId !== serviceId) {
      throw new NotFoundException('Image not found');
    }

    // Delete from storage
    try {
      await this.fileUploadService.deleteFile(image.url);
    } catch (error) {
      console.warn('Failed to delete image from storage:', error);
    }

    // Delete from database
    await this.prisma.serviceImage.delete({
      where: { id: imageId },
    });
  }

  private async generateUniqueSlug(title: string): Promise<string> {
    const slug = slugify(title, { lower: true, strict: true });
    let counter = 0;

    // Check if slug exists
    while (true) {
      const testSlug = counter === 0 ? slug : `${slug}-${counter}`;
      const existing = await this.prisma.service.findUnique({
        where: { slug: testSlug },
      });

      if (!existing) {
        return testSlug;
      }

      counter++;
    }
  }
}
