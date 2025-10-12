import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CategoriesService } from './categories.service';
import { ResponseUtil } from '../common/utils/response.util';

@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAllCategories() {
    try {
      const categories = await this.categoriesService.findAll();
      return ResponseUtil.success(categories, 'Categories retrieved successfully');
    } catch (error) {
      throw error;
    }
  }
}
