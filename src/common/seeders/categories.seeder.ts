import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CategoriesSeeder {
  constructor(private prisma: PrismaService) {}

  async seed() {
    const categories = [
      {
        name: 'Plumbing',
        description: 'Plumbing installation, repair, and maintenance services',
        isActive: true,
        sortOrder: 1,
      },
      {
        name: 'Electrical',
        description: 'Electrical installation, repair, and maintenance services',
        isActive: true,
        sortOrder: 2,
      },
      {
        name: 'Painting',
        description: 'Interior and exterior painting services',
        isActive: true,
        sortOrder: 3,
      },
      {
        name: 'Carpentry',
        description: 'Wood work, furniture making, and repair services',
        isActive: true,
        sortOrder: 4,
      },
      {
        name: 'Cleaning',
        description: 'House cleaning and maintenance services',
        isActive: true,
        sortOrder: 5,
      },
      {
        name: 'Beauty & Wellness',
        description: 'Beauty, spa, and wellness services',
        isActive: true,
        sortOrder: 6,
      },
      {
        name: 'Tutoring',
        description: 'Educational and tutoring services',
        isActive: true,
        sortOrder: 7,
      },
      {
        name: 'Photography',
        description: 'Photography and videography services',
        isActive: true,
        sortOrder: 8,
      },
      {
        name: 'Catering',
        description: 'Food and catering services',
        isActive: true,
        sortOrder: 9,
      },
      {
        name: 'Transportation',
        description: 'Transportation and delivery services',
        isActive: true,
        sortOrder: 10,
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
