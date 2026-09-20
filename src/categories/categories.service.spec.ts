import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { PrismaService } from '../prisma/prisma.service';
import { FileUploadService } from '../common/services/file-upload.service';
import { NotFoundException } from '@nestjs/common';
import { UserStatus } from '../../generated/prisma';

describe('CategoriesService', () => {
  let service: CategoriesService;

  const mockPrismaService = {
    category: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
    },
    service: {
      findMany: jest.fn(),
    },
  };

  const mockFileUploadService = {
    uploadFile: jest.fn(),
    deleteFile: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: FileUploadService,
          useValue: mockFileUploadService,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('filters category tables in the database query', async () => {
    mockPrismaService.category.findMany.mockResolvedValue([]);

    await service.findAll({
      includeInactive: true,
      search: 'photo',
      featured: true,
    });

    expect(mockPrismaService.category.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          featured: true,
          OR: expect.any(Array),
        }),
      }),
    );
  });

  describe('findServicesByCategory', () => {
    const categoryId = 'cat-1';
    const mockCategory = {
      id: categoryId,
      name: 'Test Category',
    };

    const mockServices = [
      {
        id: 'srv-1',
        title: 'Service 1',
        categoryId,
        plans: [{ price: 100 }, { price: 200 }],
        _count: { orders: 5 },
      },
      {
        id: 'srv-2',
        title: 'Service 2',
        categoryId,
        plans: [{ price: 50 }, { price: 150 }],
        _count: { orders: 10 },
      },
      {
        id: 'srv-3',
        title: 'Service 3',
        categoryId,
        plans: [{ price: 300 }],
        _count: { orders: 2 },
      },
    ];

    it('should return paginated services', async () => {
      mockPrismaService.category.findUnique.mockResolvedValue(mockCategory);
      mockPrismaService.service.findMany.mockResolvedValue(mockServices);

      const result = await service.findServicesByCategory(categoryId, {
        page: 1,
        limit: 10,
      });

      expect(mockPrismaService.category.findUnique).toHaveBeenCalledWith({
        where: { id: categoryId },
      });
      expect(mockPrismaService.service.findMany).toHaveBeenCalled();
      expect(mockPrismaService.service.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            status: 'PUBLISHED',
            provider: {
              status: UserStatus.ACTIVE,
              isServiceProviderVerified: true,
            },
          }),
        }),
      );
      expect(result.services).toHaveLength(3);
      expect(result.total).toBe(3);
      expect(result.page).toBe(1);
    });

    it('should throw NotFoundException if category does not exist', async () => {
      mockPrismaService.category.findUnique.mockResolvedValue(null);

      await expect(
        service.findServicesByCategory('non-existent', {}),
      ).rejects.toThrow(NotFoundException);
    });

    it('should filter by min price', async () => {
      mockPrismaService.category.findUnique.mockResolvedValue(mockCategory);
      mockPrismaService.service.findMany.mockResolvedValue(mockServices);

      const result = await service.findServicesByCategory(categoryId, {
        minPrice: 80,
      });

      // srv-2 (min 50) should be excluded if minPrice is 80? No, wait logic:
      // minPlanPrice < minPrice return false
      // srv-1 min 100 >= 80 -> keep
      // srv-2 min 50 < 80 -> exclude
      // srv-3 min 300 >= 80 -> keep

      expect(result.services).toHaveLength(2);
      expect(result.services.map((s) => s.id)).toEqual(
        expect.arrayContaining(['srv-1', 'srv-3']),
      );
    });

    it('should filter by max price', async () => {
      mockPrismaService.category.findUnique.mockResolvedValue(mockCategory);
      mockPrismaService.service.findMany.mockResolvedValue(mockServices);

      const result = await service.findServicesByCategory(categoryId, {
        maxPrice: 200,
      });

      // srv-1 min 100 <= 200 -> keep
      // srv-2 min 50 <= 200 -> keep
      // srv-3 min 300 > 200 -> exclude

      expect(result.services).toHaveLength(2);
      expect(result.services.map((s) => s.id)).toEqual(
        expect.arrayContaining(['srv-1', 'srv-2']),
      );
    });

    it('should sort by price asc', async () => {
      mockPrismaService.category.findUnique.mockResolvedValue(mockCategory);
      mockPrismaService.service.findMany.mockResolvedValue(mockServices);

      const result = await service.findServicesByCategory(categoryId, {
        sortBy: 'price_asc',
      });

      // srv-2 (50), srv-1 (100), srv-3 (300)
      expect(result.services[0].id).toBe('srv-2');
      expect(result.services[1].id).toBe('srv-1');
      expect(result.services[2].id).toBe('srv-3');
    });

    it('should sort by popularity (orders count)', async () => {
      mockPrismaService.category.findUnique.mockResolvedValue(mockCategory);
      mockPrismaService.service.findMany.mockResolvedValue(mockServices);

      const result = await service.findServicesByCategory(categoryId, {
        sortBy: 'popular',
      });

      // srv-2 (10), srv-1 (5), srv-3 (2)
      expect(result.services[0].id).toBe('srv-2');
      expect(result.services[1].id).toBe('srv-1');
      expect(result.services[2].id).toBe('srv-3');
    });

    it('should filter services by their real average rating', async () => {
      mockPrismaService.category.findUnique.mockResolvedValue(mockCategory);
      mockPrismaService.service.findMany.mockResolvedValue([
        {
          ...mockServices[0],
          reviews: [{ rating: 5 }, { rating: 4 }],
          _count: { orders: 5, reviews: 2 },
        },
        {
          ...mockServices[1],
          reviews: [{ rating: 3 }],
          _count: { orders: 10, reviews: 1 },
        },
      ]);

      const result = await service.findServicesByCategory(categoryId, {
        minRating: 4,
      });

      expect(result.services).toHaveLength(1);
      expect(result.services[0]).toEqual(
        expect.objectContaining({ id: 'srv-1', averageRating: 4.5 }),
      );
    });

    it('should rank by rating instead of order count', async () => {
      mockPrismaService.category.findUnique.mockResolvedValue(mockCategory);
      mockPrismaService.service.findMany.mockResolvedValue([
        {
          ...mockServices[0],
          reviews: [{ rating: 5 }],
          _count: { orders: 1, reviews: 1 },
        },
        {
          ...mockServices[1],
          reviews: [{ rating: 4 }, { rating: 4 }],
          _count: { orders: 100, reviews: 2 },
        },
      ]);

      const result = await service.findServicesByCategory(categoryId, {
        sortBy: 'rating',
      });

      expect(result.services.map((item) => item.id)).toEqual([
        'srv-1',
        'srv-2',
      ]);
    });
  });
});
