import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { AdminSeeder } from './admin.seeder';
import { SeederService } from './seeder.service';

@Module({
  imports: [PrismaModule],
  providers: [AdminSeeder, SeederService],
  exports: [AdminSeeder, SeederService],
})
export class SeederModule {}
