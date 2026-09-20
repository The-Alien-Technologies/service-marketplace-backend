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
      const adminEmail =
        process.env.SUPER_ADMIN_EMAIL ?? process.env.ADMIN_EMAIL;
      const adminPassword =
        process.env.SUPER_ADMIN_PASSWORD ?? process.env.ADMIN_PASSWORD;
      if (!adminEmail || !adminPassword) {
        this.logger.warn(
          'Super admin seed skipped: credentials are not configured',
        );
        return;
      }
      const existingAdmin = await this.prisma.user.findUnique({
        where: { email: adminEmail },
      });

      if (existingAdmin) {
        if (existingAdmin.role !== Role.SUPER_ADMIN) {
          await this.prisma.user.update({
            where: { id: existingAdmin.id },
            data: { role: Role.SUPER_ADMIN, adminMarketId: null },
          });
          this.logger.log(
            'Existing seed administrator upgraded to super admin',
          );
        } else {
          this.logger.log(`Super admin user already exists: ${adminEmail}`);
        }
        return;
      }

      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);

      const admin = await this.prisma.user.create({
        data: {
          email: adminEmail,
          password: hashedPassword,
          firstName: 'Admin',
          lastName: 'User',
          role: Role.SUPER_ADMIN,
          status: UserStatus.ACTIVE,
          emailVerified: true,
          hasCompletedOnboarding: true,
          avatar:
            'https://i.pinimg.com/736x/09/31/b5/0931b5399d9f1a3afe4417ee83eff961.jpg',
        },
      });

      this.logger.log(`Super admin user created successfully: ${admin.email}`);
    } catch (error) {
      this.logger.error('Failed to seed admin user:', error);
    }
  }
}
