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

  async findAll(includeInactive = false) {
    const where = includeInactive ? {} : { isActive: true };

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
