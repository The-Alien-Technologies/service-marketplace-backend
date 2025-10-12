import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Role, UserStatus } from '../../../generated/prisma';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AdminSeeder {
  private readonly logger = new Logger(AdminSeeder.name);

  constructor(private prisma: PrismaService) {}

  async seed() {
    try {
      // Check if admin user already exists
      const adminEmail = process.env.ADMIN_EMAIL;
      const existingAdmin = await this.prisma.user.findUnique({
        where: { email: adminEmail },
      });

      if (existingAdmin) {
        this.logger.log(`Admin user already exists: ${adminEmail}`);
        return;
      }

      // Create admin user
      const adminPassword = process.env.ADMIN_PASSWORD;
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);

      const admin = await this.prisma.user.create({
        data: {
          email: adminEmail,
          password: hashedPassword,
          firstName: 'Admin',
          lastName: 'User',
          role: Role.ADMIN,
          status: UserStatus.ACTIVE,
          emailVerified: true,
          hasCompletedOnboarding: true,
          avatar: 'https://i.pinimg.com/736x/09/31/b5/0931b5399d9f1a3afe4417ee83eff961.jpg',
        },
      });

      this.logger.log(`Admin user created successfully: ${admin.email}`);
      this.logger.log(`Admin credentials - Email: ${adminEmail}, Password: ${adminPassword}`);
    } catch (error) {
      this.logger.error('Failed to seed admin user:', error);
    }
  }
}
