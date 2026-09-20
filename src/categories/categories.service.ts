import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  FileUploadService,
  FileCategory,
} from '../common/services/file-upload.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FilterServicesDto } from './dto/filter-services.dto';
import {
  ServiceAvailability,
  ServiceStatus,
  UserStatus,
} from '../../generated/prisma';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
    image?: Express.Multer.File,
  ) {
    const { name, description, parentCategoryId, featured } = createCategoryDto;

    // Check if category with same name already exists (case-insensitive)
    const existingCategory = await this.prisma.category.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
    });

    if (existingCategory) {
      throw new ConflictException('Category with this name already exists');
    }

    // If parentCategoryId is provided, verify it exists
    if (parentCategoryId) {
      const parentCategory = await this.prisma.category.findUnique({
        where: { id: parentCategoryId },
      });

      if (!parentCategory) {
        throw new NotFoundException('Parent category not found');
      }
    }

    // Upload image if provided
    let imageUrl: string | undefined;
    if (image) {
      const uploadResult = await this.fileUploadService.uploadFile(
        image,
        FileCategory.GENERAL,
        {
          folder: 'categories',
          allowedTypes: [
            'image/svg+xml',
            'image/png',
            'image/jpeg',
            'image/jpg',
            'image/webp',
          ],
          maxSize: 5 * 1024 * 1024, // 5MB
          generateUniqueName: true,
        },
      );
      imageUrl = uploadResult.url;
    }

    return this.prisma.category.create({
      data: {
        name,
        description,
        parentCategoryId,
        featured: featured ?? false,
        imageUrl,
      },
      include: {
        parentCategory: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findAll(options?: {
    includeInactive?: boolean;
    search?: string;
    featured?: boolean;
  }) {
    const search = options?.search?.trim();
    const where = {
      ...(options?.includeInactive ? {} : { isActive: true }),
      ...(options?.featured !== undefined
        ? { featured: options.featured }
        : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' as const } },
              {
                description: { contains: search, mode: 'insensitive' as const },
              },
            ],
          }
        : {}),
    };

    return this.prisma.category.findMany({
      where,
      include: {
        parentCategory: {
          select: {
            id: true,
            name: true,
          },
        },
        subCategories: {
          where: { isActive: true },
          select: {
            id: true,
            name: true,
            featured: true,
            imageUrl: true,
          },
        },
        _count: {
          select: {
            subCategories: true,
            services: { where: { status: ServiceStatus.PUBLISHED } },
          },
        },
      },
      orderBy: [{ createdAt: 'desc' }],
    });
  }

  async findFeatured() {
    return this.prisma.category.findMany({
      where: {
        isActive: true,
        featured: true,
      },
      include: {
        subCategories: {
          where: { isActive: true },
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findTopLevel() {
    return this.prisma.category.findMany({
      where: {
        isActive: true,
        parentCategoryId: null,
      },
      include: {
        subCategories: {
          where: { isActive: true },
          select: {
            id: true,
            name: true,
            featured: true,
            imageUrl: true,
          },
        },
        _count: {
          select: {
            subCategories: true,
          },
        },
      },
      orderBy: [{ createdAt: 'desc' }],
    });
  }

  async findById(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        parentCategory: {
          select: {
            id: true,
            name: true,
          },
        },
        subCategories: {
          where: { isActive: true },
          select: {
            id: true,
            name: true,
            description: true,
            featured: true,
            imageUrl: true,
          },
        },
        _count: {
          select: {
            userInterests: true,
            subCategories: true,
          },
        },
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async findServicesByCategory(categoryId: string, filters: FilterServicesDto) {
    // Verify category exists
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const {
      search,
      minPrice,
      maxPrice,
      minRating,
      sortBy = 'best_match',
      page = 1,
      limit = 20,
      market,
    } = filters;

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {
      categoryId,
      status: 'PUBLISHED', // Only show published services
      provider: {
        status: UserStatus.ACTIVE,
        isServiceProviderVerified: true,
      },
    };

    if (market?.toUpperCase() === 'GLOBAL') {
      where.availability = ServiceAvailability.GLOBAL;
      where.market = { status: { not: 'INACTIVE' } };
    } else if (market) {
      where.market = {
        code: market.toUpperCase(),
        status: { not: 'INACTIVE' },
      };
    } else {
      where.market = { status: { not: 'INACTIVE' } };
    }

    // Search filter (title, overview, tags)
    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          overview: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          tags: {
            hasSome: [search],
          },
        },
      ];
    }

    // Get services with basic filters
    let services = await this.prisma.service.findMany({
      where,
      include: {
        provider: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        market: true,
        plans: {
          orderBy: {
            price: 'asc',
          },
        },
        _count: {
          select: {
            orders: true,
            reviews: true,
          },
        },
        reviews: {
          select: { rating: true },
        },
      },
    });

    let enrichedServices = services.map((service) => {
      const reviews = service.reviews ?? [];
      const { reviews: _reviews, _count, ...serviceData } = service;
      return {
        ...serviceData,
        averageRating:
          reviews.length > 0
            ? Number(
                (
                  reviews.reduce((sum, review) => sum + review.rating, 0) /
                  reviews.length
                ).toFixed(1),
              )
            : 0,
        reviewCount: _count.reviews ?? 0,
        orderCount: _count.orders,
      };
    });

    // Apply price filter (based on minimum plan price)
    if (minPrice !== undefined || maxPrice !== undefined) {
      enrichedServices = enrichedServices.filter((service) => {
        const minPlanPrice = Math.min(
          ...service.plans.map((p) => Number(p.price)),
        );
        if (minPrice !== undefined && minPlanPrice < minPrice) return false;
        if (maxPrice !== undefined && minPlanPrice > maxPrice) return false;
        return true;
      });
    }

    if (minRating !== undefined) {
      enrichedServices = enrichedServices.filter(
        (service) => service.averageRating >= minRating,
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price_asc':
        enrichedServices.sort((a, b) => {
          const minPriceA = Math.min(...a.plans.map((p) => Number(p.price)));
          const minPriceB = Math.min(...b.plans.map((p) => Number(p.price)));
          return minPriceA - minPriceB;
        });
        break;
      case 'price_desc':
        enrichedServices.sort((a, b) => {
          const minPriceA = Math.min(...a.plans.map((p) => Number(p.price)));
          const minPriceB = Math.min(...b.plans.map((p) => Number(p.price)));
          return minPriceB - minPriceA;
        });
        break;
      case 'rating':
        enrichedServices.sort((a, b) => {
          return (
            b.averageRating - a.averageRating || b.reviewCount - a.reviewCount
          );
        });
        break;
      case 'popular':
        enrichedServices.sort((a, b) => {
          return b.orderCount - a.orderCount;
        });
        break;
      case 'best_match':
      default:
        // Keep default order (most recent first)
        break;
    }

    // Get total count before pagination
    const total = enrichedServices.length;

    // Apply pagination
    const paginatedServices = enrichedServices.slice(skip, skip + limit);

    return {
      services: paginatedServices,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
    image?: Express.Multer.File,
  ) {
    // Check if category exists
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    // If updating name, check for conflicts (case-insensitive)
    if (
      updateCategoryDto.name &&
      updateCategoryDto.name.toLowerCase() !== category.name.toLowerCase()
    ) {
      const existingCategory = await this.prisma.category.findFirst({
        where: {
          name: {
            equals: updateCategoryDto.name,
            mode: 'insensitive',
          },
        },
      });

      if (existingCategory) {
        throw new ConflictException('Category with this name already exists');
      }
    }

    // If updating parentCategoryId, verify it exists and prevent circular references
    if (updateCategoryDto.parentCategoryId !== undefined) {
      if (updateCategoryDto.parentCategoryId) {
        // Prevent self-reference
        if (updateCategoryDto.parentCategoryId === id) {
          throw new BadRequestException('Category cannot be its own parent');
        }

        const parentCategory = await this.prisma.category.findUnique({
          where: { id: updateCategoryDto.parentCategoryId },
          include: {
            parentCategory: true,
          },
        });

        if (!parentCategory) {
          throw new NotFoundException('Parent category not found');
        }

        // Prevent circular reference (basic check - parent's parent cannot be the current category)
        if (parentCategory.parentCategoryId === id) {
          throw new BadRequestException('Circular category reference detected');
        }
      }
    }

    // Upload new image if provided
    let imageUrl: string | undefined;
    if (image) {
      // Delete old image if exists
      if (category.imageUrl) {
        try {
          await this.fileUploadService.deleteFile(category.imageUrl);
        } catch (error) {
          // Log but don't fail if old image deletion fails
          console.warn('Failed to delete old category image:', error);
        }
      }

      const uploadResult = await this.fileUploadService.uploadFile(
        image,
        FileCategory.GENERAL,
        {
          folder: 'categories',
          allowedTypes: [
            'image/svg+xml',
            'image/png',
            'image/jpeg',
            'image/jpg',
            'image/webp',
          ],
          maxSize: 5 * 1024 * 1024, // 5MB
          generateUniqueName: true,
        },
      );
      imageUrl = uploadResult.url;
    }

    return this.prisma.category.update({
      where: { id },
      data: {
        ...updateCategoryDto,
        ...(imageUrl && { imageUrl }),
      },
      include: {
        parentCategory: {
          select: {
            id: true,
            name: true,
          },
        },
        subCategories: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        subCategories: true,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (category.subCategories.length > 0) {
      throw new BadRequestException(
        'Cannot delete category with subcategories. Please delete or reassign subcategories first.',
      );
    }

    // Delete image if exists
    if (category.imageUrl) {
      try {
        await this.fileUploadService.deleteFile(category.imageUrl);
      } catch (error) {
        // Log but don't fail if image deletion fails
        console.warn('Failed to delete category image:', error);
      }
    }

    return this.prisma.category.delete({
      where: { id },
    });
  }
}
