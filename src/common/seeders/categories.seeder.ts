import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

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
      },
      {
        name: 'Electrical',
        description: 'Electrical installation, repair, and maintenance services',
        isActive: true,
      },
      {
        name: 'Painting',
        description: 'Interior and exterior painting services',
        isActive: true,
      },
      {
        name: 'Carpentry',
        description: 'Wood work, furniture making, and repair services',
        isActive: true,
      },
      {
        name: 'Cleaning',
        description: 'House cleaning and maintenance services',
        isActive: true,
      },
      {
        name: 'Beauty & Wellness',
        description: 'Beauty, spa, and wellness services',
        isActive: true,
      },
      {
        name: 'Tutoring',
        description: 'Educational and tutoring services',
        isActive: true,
      },
      {
        name: 'Photography',
        description: 'Photography and videography services',
        isActive: true,
      },
      {
        name: 'Catering',
        description: 'Food and catering services',
        isActive: true,
      },
      {
        name: 'Transportation',
        description: 'Transportation and delivery services',
        isActive: true,
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
