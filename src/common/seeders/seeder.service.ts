import { Injectable, Logger } from '@nestjs/common';
import { AdminSeeder } from './admin.seeder';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    private adminSeeder: AdminSeeder,
  ) {}

  async runAllSeeders(): Promise<void> {
    this.logger.log('Starting database seeding...');

    try {
      await this.adminSeeder.seed();

      this.logger.log('Database seeding completed successfully');
    } catch (error) {
      this.logger.error('Database seeding failed:', error);
    }
  }
}
