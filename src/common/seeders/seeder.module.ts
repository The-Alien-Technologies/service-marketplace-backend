import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { AdminSeeder } from './admin.seeder';
import { CategoriesSeeder } from './categories.seeder';
import { SeederService } from './seeder.service';
import { MarketsSeeder } from './markets.seeder';

@Module({
  imports: [PrismaModule],
  providers: [MarketsSeeder, AdminSeeder, CategoriesSeeder, SeederService],
  exports: [MarketsSeeder, AdminSeeder, CategoriesSeeder, SeederService],
})
export class SeederModule {}
