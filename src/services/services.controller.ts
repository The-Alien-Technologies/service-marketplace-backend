import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  ParseEnumPipe,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import {
  IsServiceProvider,
  IsAdmin,
} from '../common/decorators/roles.decorator';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ResponseUtil } from '../common/utils/response.util';
import { ServiceStatus } from '../../generated/prisma';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Public } from '../common/decorators/is-public.decorator';
import { MarketActor } from '../markets/market-access.service';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @IsServiceProvider()
  @UseInterceptors(FileInterceptor('coverImage'))
  async create(
    @CurrentUser('userId') userId: string,
    @Body() createServiceDto: CreateServiceDto,
    @UploadedFile() coverImage?: Express.Multer.File,
  ) {
    const service = await this.servicesService.create(
      userId,
      createServiceDto,
      coverImage,
    );
    return ResponseUtil.success(service, 'Service created successfully');
  }

  @Get()
  @Public()
  async findAll(
    @Query('status') status?: ServiceStatus,
    @Query('categoryId') categoryId?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('market') marketCode?: string,
    @Query('search') search?: string,
    @Query('sortBy') sortBy?: 'recent' | 'popular',
  ) {
    const result = await this.servicesService.findAll({
      status,
      categoryId,
      page: page ? Number.parseInt(page, 10) : undefined,
      limit: limit ? Number.parseInt(limit, 10) : undefined,
      marketCode,
      search,
      sortBy,
    });
    return ResponseUtil.success(result, 'Services retrieved successfully');
  }

  @Get('my')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @IsServiceProvider()
  async findMyServices(
    @CurrentUser('userId') userId: string,
    @Query('status') status?: ServiceStatus,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('marketId') marketId?: string,
    @Query('search') search?: string,
    @Query('categoryId') categoryId?: string,
  ) {
    const result = await this.servicesService.findAll({
      providerId: userId,
      status,
      page: page ? Number.parseInt(page, 10) : undefined,
      limit: limit ? Number.parseInt(limit, 10) : undefined,
      marketId,
      search,
      categoryId,
    });
    return ResponseUtil.success(result, 'Your services retrieved successfully');
  }

  @Get('my/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @IsServiceProvider()
  async findMyService(
    @Param('id') id: string,
    @CurrentUser('userId') userId: string,
  ) {
    const service = await this.servicesService.findOneForProvider(id, userId);
    return ResponseUtil.success(service, 'Your service retrieved successfully');
  }

  @Get('admin/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @IsAdmin()
  async findAllAdmin(
    @CurrentUser() actor: MarketActor,
    @Query('status') status?: ServiceStatus,
    @Query('categoryId') categoryId?: string,
    @Query('providerId') providerId?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('marketId') marketId?: string,
    @Query('search') search?: string,
  ) {
    const result = await this.servicesService.findAll({
      status,
      categoryId,
      providerId,
      page: page ? Number.parseInt(page, 10) : undefined,
      limit: limit ? Number.parseInt(limit, 10) : undefined,
      includeAll: true,
      actor,
      marketId,
      search,
    });
    return ResponseUtil.success(result, 'All services retrieved successfully');
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string) {
    const service = await this.servicesService.findOne(id);
    return ResponseUtil.success(service, 'Service retrieved successfully');
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @IsServiceProvider()
  @UseInterceptors(FileInterceptor('coverImage'))
  async update(
    @Param('id') id: string,
    @CurrentUser('userId') userId: string,
    @Body() updateServiceDto: UpdateServiceDto,
    @UploadedFile() coverImage?: Express.Multer.File,
  ) {
    const service = await this.servicesService.update(
      id,
      userId,
      updateServiceDto,
      coverImage,
    );
    return ResponseUtil.success(service, 'Service updated successfully');
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @IsServiceProvider()
  async updateStatus(
    @Param('id') id: string,
    @CurrentUser('userId') userId: string,
    @Body('status', new ParseEnumPipe(ServiceStatus)) status: ServiceStatus,
  ) {
    const service = await this.servicesService.updateStatus(id, userId, status);
    return ResponseUtil.success(service, 'Service status updated successfully');
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @IsServiceProvider()
  async remove(@Param('id') id: string, @CurrentUser('userId') userId: string) {
    await this.servicesService.remove(id, userId);
    return ResponseUtil.success(null, 'Service deleted successfully');
  }

  @Post(':id/images')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @IsServiceProvider()
  @UseInterceptors(FilesInterceptor('images', 10))
  async uploadImages(
    @Param('id') id: string,
    @CurrentUser('userId') userId: string,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    const service = await this.servicesService.uploadImages(id, userId, images);
    return ResponseUtil.success(service, 'Images uploaded successfully');
  }

  @Delete(':id/images/:imageId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @IsServiceProvider()
  async deleteImage(
    @Param('id') id: string,
    @Param('imageId') imageId: string,
    @CurrentUser('userId') userId: string,
  ) {
    await this.servicesService.deleteImage(id, imageId, userId);
    return ResponseUtil.success(null, 'Image deleted successfully');
  }
}
