import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
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

    return this.prisma.category.create({
      data: {
        name,
        description,
        parentCategoryId,
        featured: featured ?? false,
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
          },
        },
        _count: {
          select: {
            subCategories: true,
          },
        },
      },
      orderBy: [{ featured: 'desc' }, { createdAt: 'asc' }],
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
          },
        },
      },
      orderBy: { createdAt: 'asc' },
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
          },
        },
        _count: {
          select: {
            subCategories: true,
          },
        },
      },
      orderBy: [{ featured: 'desc' }, { createdAt: 'asc' }],
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

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
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

    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
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
        _count: {
          select: {
            userInterests: true,
          },
        },
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    // Check if category has subcategories
    if (category.subCategories.length > 0) {
      throw new BadRequestException(
        'Cannot delete category with subcategories. Please delete or reassign subcategories first.',
      );
    }

    // Soft delete: mark as inactive instead of hard delete
    return this.prisma.category.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async hardDelete(id: string) {
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

    return this.prisma.category.delete({
      where: { id },
    });
  }
}
