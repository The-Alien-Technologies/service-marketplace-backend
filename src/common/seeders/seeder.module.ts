import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { AdminSeeder } from './admin.seeder';
import { CategoriesSeeder } from './categories.seeder';
import { SeederService } from './seeder.service';

@Module({
  imports: [PrismaModule],
  providers: [AdminSeeder, CategoriesSeeder, SeederService],
  exports: [AdminSeeder, CategoriesSeeder, SeederService],
})
export class SeederModule {}
