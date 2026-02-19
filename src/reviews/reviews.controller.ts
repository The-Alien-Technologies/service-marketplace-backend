import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { CreateReviewResponseDto } from './dto/create-review-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { IsServiceProvider } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ResponseUtil } from '../common/utils/response.util';
import { Public } from '../common/decorators/is-public.decorator';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // Client submits a review for a completed order
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @CurrentUser('userId') userId: string,
    @Body() dto: CreateReviewDto,
  ) {
    const review = await this.reviewsService.create(userId, dto);
    return ResponseUtil.success(review, 'Review submitted successfully');
  }

  // Get reviews for a service (public)
  @Get('service/:serviceId')
  @Public()
  async findByService(
    @Param('serviceId') serviceId: string,
    @Query('rating') rating?: string,
    @Query('sort') sort?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const result = await this.reviewsService.findByService(serviceId, {
      rating: rating ? Number(rating) : undefined,
      sort,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });
    return ResponseUtil.success(result, 'Reviews retrieved successfully');
  }

  // Get reviews received by the logged-in provider (dashboard)
  @Get('my')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @IsServiceProvider()
  async findMyReviews(
    @CurrentUser('userId') userId: string,
    @Query('rating') rating?: string,
    @Query('sort') sort?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const result = await this.reviewsService.findByProvider(userId, {
      rating: rating ? Number(rating) : undefined,
      sort,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });
    return ResponseUtil.success(result, 'Reviews retrieved successfully');
  }

  // Check if an order already has a review
  @Get('order/:orderId')
  @UseGuards(JwtAuthGuard)
  async findByOrder(@Param('orderId') orderId: string) {
    const review = await this.reviewsService.findByOrder(orderId);
    return ResponseUtil.success(review, 'Review retrieved successfully');
  }

  // Provider responds to a review
  @Post(':reviewId/respond')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @IsServiceProvider()
  async respond(
    @Param('reviewId') reviewId: string,
    @CurrentUser('userId') userId: string,
    @Body() dto: CreateReviewResponseDto,
  ) {
    const response = await this.reviewsService.respond(reviewId, userId, dto);
    return ResponseUtil.success(response, 'Response submitted successfully');
  }
}
