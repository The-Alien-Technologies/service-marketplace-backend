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
import { Service, ServiceStatus } from '../../generated/prisma';
import slugify from 'slugify';

@Injectable()
export class ServicesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async create(
    userId: string,
    createServiceDto: CreateServiceDto,
    coverImage?: Express.Multer.File,
  ): Promise<Service> {
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

    // Logic for filtering services
    if (options?.includeAll) {
      // If includeAll is true (Admin), allow filtering by available parameters but don't force constraints
      if (options.status) where.status = options.status;
      if (options.providerId) where.providerId = options.providerId;
    } else if (!options?.providerId) {
      // Public view: Only show published services
      where.status = ServiceStatus.PUBLISHED;
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

    const [services, total] = await Promise.all([
      this.prisma.service.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          plans: {
            orderBy: { sortOrder: 'asc' },
          },
          addons: true,
          images: {
            orderBy: { sortOrder: 'asc' },
          },
          category: true,
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
      }),
      this.prisma.service.count({ where }),
    ]);

    return {
      services: services as unknown as Service[],
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Service> {
    const service = await this.prisma.service.findUnique({
      where: { id },
      include: {
        plans: {
          orderBy: { sortOrder: 'asc' },
        },
        addons: true,
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        category: true,
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
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    if (service.providerId !== userId) {
      throw new ForbiddenException('You can only update your own services');
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
        coverImage: coverImageUrl || service.coverImage,
        // Delete all existing plans and create new ones
        plans:
          updateServiceDto.plans && updateServiceDto.plans.length > 0
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
          updateServiceDto.addons && updateServiceDto.addons.length > 0
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
      const serviceWithPlans = await this.prisma.service.findUnique({
        where: { id },
        include: { plans: true },
      });

      if (!serviceWithPlans?.plans || serviceWithPlans.plans.length === 0) {
        throw new BadRequestException(
          'Cannot publish service without at least one plan',
        );
      }
    }

    return this.prisma.service.update({
      where: { id },
      data: { status },
    }) as unknown as Service;
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
    let slug = slugify(title, { lower: true, strict: true });
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
