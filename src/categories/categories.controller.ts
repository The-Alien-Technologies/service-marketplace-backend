import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Query,
  ParseBoolPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { IsAdmin } from '../common/decorators/roles.decorator';
import { Public } from '../common/decorators/is-public.decorator';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ResponseUtil } from '../common/utils/response.util';

@Controller('categories')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // Public endpoints - anyone can read categories
  @Public()
  @Get()
  async getAllCategories(
    @Query('includeInactive', new ParseBoolPipe({ optional: true }))
    includeInactive?: boolean,
  ) {
    try {
      const categories = await this.categoriesService.findAll(
        includeInactive || false,
      );
      return ResponseUtil.success(
        categories,
        'Categories retrieved successfully',
      );
    } catch (error) {
      throw error;
    }
  }

  @Public()
  @Get('featured')
  async getFeaturedCategories() {
    try {
      const categories = await this.categoriesService.findFeatured();
      return ResponseUtil.success(
        categories,
        'Featured categories retrieved successfully',
      );
    } catch (error) {
      throw error;
    }
  }

  @Public()
  @Get('top-level')
  async getTopLevelCategories() {
    try {
      const categories = await this.categoriesService.findTopLevel();
      return ResponseUtil.success(
        categories,
        'Top-level categories retrieved successfully',
      );
    } catch (error) {
      throw error;
    }
  }

  @Public()
  @Get(':id')
  async getCategoryById(@Param('id') id: string) {
    try {
      const category = await this.categoriesService.findById(id);
      return ResponseUtil.success(category, 'Category retrieved successfully');
    } catch (error) {
      throw error;
    }
  }

  // Admin-only endpoints
  @Post()
  @IsAdmin()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.categoriesService.create(createCategoryDto);
      return ResponseUtil.success(category, 'Category created successfully');
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  @IsAdmin()
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      const category = await this.categoriesService.update(
        id,
        updateCategoryDto,
      );
      return ResponseUtil.success(category, 'Category updated successfully');
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @IsAdmin()
  async deleteCategory(@Param('id') id: string) {
    try {
      const category = await this.categoriesService.remove(id);
      return ResponseUtil.success(category, 'Category deleted successfully');
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id/hard')
  @IsAdmin()
  async hardDeleteCategory(@Param('id') id: string) {
    try {
      const category = await this.categoriesService.hardDelete(id);
      return ResponseUtil.success(category, 'Category permanently deleted');
    } catch (error) {
      throw error;
    }
  }
}
