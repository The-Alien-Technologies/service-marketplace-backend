import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

const DEFAULT_CATEGORY_IMAGE =
  'https://pavodahdb.s3.us-east-1.amazonaws.com/categories/1._classic_white_shirt_1767881067359_f96a0d7b-6d93-4c3f-958e-eb61688ce0fd.png';

@Injectable()
export class CategoriesSeeder {
  constructor(private prisma: PrismaService) {}

  async seed() {
    // Check if categories already exist
    const existingCategories = await this.prisma.category.count();
    if (existingCategories > 0) {
      console.log('Categories already exist, skipping seeding');
      return;
    }

    console.log('Seeding categories...');
    const categories = [
      {
        name: 'Plumbing',
        description: 'Plumbing installation, repair, and maintenance services',
        isActive: true,
        featured: true,
        imageUrl: DEFAULT_CATEGORY_IMAGE,
      },
      {
        name: 'Electrical',
        description:
          'Electrical installation, repair, and maintenance services',
        isActive: true,
        featured: true,
        imageUrl: DEFAULT_CATEGORY_IMAGE,
      },
      {
        name: 'Painting',
        description: 'Interior and exterior painting services',
        isActive: true,
        featured: false,
        imageUrl: DEFAULT_CATEGORY_IMAGE,
      },
      {
        name: 'Carpentry',
        description: 'Wood work, furniture making, and repair services',
        isActive: true,
        featured: false,
        imageUrl: DEFAULT_CATEGORY_IMAGE,
      },
      {
        name: 'Cleaning',
        description: 'House cleaning and maintenance services',
        isActive: true,
        featured: true,
        imageUrl: DEFAULT_CATEGORY_IMAGE,
      },
      {
        name: 'Beauty & Wellness',
        description: 'Beauty, spa, and wellness services',
        isActive: true,
        featured: true,
        imageUrl: DEFAULT_CATEGORY_IMAGE,
      },
      {
        name: 'Tutoring',
        description: 'Educational and tutoring services',
        isActive: true,
        featured: false,
        imageUrl: DEFAULT_CATEGORY_IMAGE,
      },
      {
        name: 'Photography',
        description: 'Photography and videography services',
        isActive: true,
        featured: true,
        imageUrl: DEFAULT_CATEGORY_IMAGE,
      },
      {
        name: 'Catering',
        description: 'Food and catering services',
        isActive: true,
        featured: false,
        imageUrl: DEFAULT_CATEGORY_IMAGE,
      },
      {
        name: 'Transportation',
        description: 'Transportation and delivery services',
        isActive: true,
        featured: false,
        imageUrl: DEFAULT_CATEGORY_IMAGE,
      },
    ];

    for (const category of categories) {
      await this.prisma.category.upsert({
        where: { name: category.name },
        update: category,
        create: category,
      });
    }

    console.log('Categories seeded successfully');
  }
}
