import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  MarketStatus,
  ProviderMarketMembershipStatus,
  Role,
  Prisma,
  ServiceStatus,
  UserStatus,
} from '../../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCountryAdminDto, UpdateMarketDto } from './dto/market.dto';
import { MarketAccessService, MarketActor } from './market-access.service';

const MARKET_PUBLIC_SELECT = {
  id: true,
  code: true,
  name: true,
  currency: true,
  locale: true,
  minorUnit: true,
  status: true,
  checkoutEnabled: true,
  providerOnboardingEnabled: true,
  servicePublishingEnabled: true,
} as const;

const COUNTRY_ADMIN_SELECT = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  displayName: true,
  avatar: true,
  status: true,
  createdAt: true,
  lastActiveAt: true,
  adminMarketId: true,
  adminMarket: { select: MARKET_PUBLIC_SELECT },
} as const;

@Injectable()
export class MarketsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly marketAccess: MarketAccessService,
  ) {}

  listPublic() {
    return this.prisma.market.findMany({
      where: { status: { not: MarketStatus.INACTIVE } },
      select: MARKET_PUBLIC_SELECT,
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    });
  }

  listAll(options?: { search?: string; status?: string }) {
    const search = options?.search?.trim();
    const status = Object.values(MarketStatus).includes(
      options?.status as MarketStatus,
    )
      ? (options?.status as MarketStatus)
      : undefined;
    return this.prisma.market.findMany({
      where: {
        ...(status ? { status } : {}),
        ...(search
          ? {
              OR: [
                { name: { contains: search, mode: 'insensitive' as const } },
                { code: { contains: search, mode: 'insensitive' as const } },
                {
                  currency: { contains: search, mode: 'insensitive' as const },
                },
              ],
            }
          : {}),
      },
      select: {
        ...MARKET_PUBLIC_SELECT,
        paystackCountry: true,
        _count: {
          select: {
            admins: true,
            providerMemberships: true,
            services: true,
            orders: true,
          },
        },
      },
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    });
  }

  async update(id: string, actorId: string, dto: UpdateMarketDto) {
    const market = await this.prisma.market.findUnique({ where: { id } });
    if (!market) throw new NotFoundException('Market not found');
    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.market.update({
        where: { id },
        data: dto,
        select: MARKET_PUBLIC_SELECT,
      });
      await tx.adminAuditLog.create({
        data: {
          actorId,
          marketId: id,
          action: 'MARKET_UPDATED',
          entityType: 'Market',
          entityId: id,
          metadata: { ...dto } as Prisma.InputJsonValue,
        },
      });
      return updated;
    });
  }

  async findActiveByCode(code: string) {
    return this.prisma.market.findFirst({
      where: {
        code: code.toUpperCase(),
        status: { not: MarketStatus.INACTIVE },
      },
      select: MARKET_PUBLIC_SELECT,
    });
  }

  async selectForUser(userId: string, marketCode?: string) {
    const market = marketCode ? await this.findActiveByCode(marketCode) : null;
    if (marketCode && !market) {
      throw new BadRequestException('This market is not available');
    }
    await this.prisma.user.update({
      where: { id: userId },
      data: { selectedMarketId: market?.id ?? null },
    });
    return market;
  }

  listProviderMemberships(providerId: string) {
    return this.prisma.providerMarketMembership.findMany({
      where: { providerId },
      include: { market: { select: MARKET_PUBLIC_SELECT } },
      orderBy: [{ isPrimary: 'desc' }, { createdAt: 'asc' }],
    });
  }

  async apply(providerId: string, marketId: string) {
    const [provider, market, existing] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: providerId } }),
      this.prisma.market.findUnique({ where: { id: marketId } }),
      this.prisma.providerMarketMembership.findUnique({
        where: { providerId_marketId: { providerId, marketId } },
      }),
    ]);
    if (!provider || provider.role !== Role.SERVICE_PROVIDER) {
      throw new BadRequestException('Only service providers can join markets');
    }
    if (
      !market ||
      market.status !== MarketStatus.ACTIVE ||
      !market.providerOnboardingEnabled
    ) {
      throw new BadRequestException('Provider onboarding is unavailable here');
    }
    if (
      existing?.status === ProviderMarketMembershipStatus.ACTIVE ||
      existing?.status === ProviderMarketMembershipStatus.PENDING
    ) {
      throw new BadRequestException(
        existing.status === ProviderMarketMembershipStatus.ACTIVE
          ? 'You already operate in this market'
          : 'Your market application is already pending',
      );
    }
    return this.prisma.providerMarketMembership.upsert({
      where: { providerId_marketId: { providerId, marketId } },
      create: {
        providerId,
        marketId,
        status: ProviderMarketMembershipStatus.PENDING,
      },
      update: {
        status: ProviderMarketMembershipStatus.PENDING,
        reviewedAt: null,
        reviewedBy: null,
        rejectionReason: null,
      },
      include: { market: { select: MARKET_PUBLIC_SELECT } },
    });
  }

  async assignCountryAdmin(userId: string, marketId: string, actorId: string) {
    const [user, market] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: userId } }),
      this.prisma.market.findUnique({ where: { id: marketId } }),
    ]);
    if (!user) throw new NotFoundException('User not found');
    if (!market) throw new NotFoundException('Market not found');
    if (user.role === Role.SUPER_ADMIN) {
      throw new BadRequestException('A super admin cannot be country-scoped');
    }
    if (user.role === Role.SERVICE_PROVIDER) {
      throw new BadRequestException(
        'A service provider cannot be converted into a country admin',
      );
    }
    return this.prisma.$transaction(async (tx) => {
      const admin = await tx.user.update({
        where: { id: userId },
        data: { role: Role.ADMIN, adminMarketId: marketId },
        select: COUNTRY_ADMIN_SELECT,
      });
      await tx.adminAuditLog.create({
        data: {
          actorId,
          marketId,
          action: 'COUNTRY_ADMIN_ASSIGNED',
          entityType: 'User',
          entityId: userId,
        },
      });
      return admin;
    });
  }

  listCountryAdmins(options: {
    search?: string;
    marketId?: string;
    status?: string;
  }) {
    const search = options.search?.trim();
    const status = Object.values(UserStatus).includes(
      options.status as UserStatus,
    )
      ? (options.status as UserStatus)
      : undefined;
    return this.prisma.user.findMany({
      where: {
        role: Role.ADMIN,
        ...(options.marketId ? { adminMarketId: options.marketId } : {}),
        ...(status ? { status } : {}),
        ...(search
          ? {
              OR: [
                { email: { contains: search, mode: 'insensitive' as const } },
                {
                  firstName: {
                    contains: search,
                    mode: 'insensitive' as const,
                  },
                },
                {
                  lastName: {
                    contains: search,
                    mode: 'insensitive' as const,
                  },
                },
                {
                  displayName: {
                    contains: search,
                    mode: 'insensitive' as const,
                  },
                },
              ],
            }
          : {}),
      },
      select: COUNTRY_ADMIN_SELECT,
      orderBy: [{ status: 'asc' }, { lastActiveAt: 'desc' }],
    });
  }

  async updateCountryAdmin(
    adminId: string,
    actorId: string,
    dto: UpdateCountryAdminDto,
  ) {
    const [admin, market] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: adminId } }),
      dto.marketId
        ? this.prisma.market.findUnique({ where: { id: dto.marketId } })
        : null,
    ]);
    if (!admin || admin.role !== Role.ADMIN) {
      throw new NotFoundException('Country administrator not found');
    }
    if (dto.marketId && !market)
      throw new NotFoundException('Market not found');
    const marketId = dto.marketId ?? admin.adminMarketId;
    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.user.update({
        where: { id: adminId },
        data: {
          ...(dto.marketId ? { adminMarketId: dto.marketId } : {}),
          ...(dto.status ? { status: dto.status } : {}),
        },
        select: COUNTRY_ADMIN_SELECT,
      });
      await tx.adminAuditLog.create({
        data: {
          actorId,
          marketId,
          action: 'COUNTRY_ADMIN_UPDATED',
          entityType: 'User',
          entityId: adminId,
          metadata: { ...dto } as Prisma.InputJsonValue,
        },
      });
      return updated;
    });
  }

  async removeCountryAdmin(adminId: string, actorId: string) {
    const admin = await this.prisma.user.findUnique({ where: { id: adminId } });
    if (!admin || admin.role !== Role.ADMIN) {
      throw new NotFoundException('Country administrator not found');
    }
    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.user.update({
        where: { id: adminId },
        data: { role: Role.USER, adminMarketId: null },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          displayName: true,
          role: true,
          status: true,
        },
      });
      await tx.adminAuditLog.create({
        data: {
          actorId,
          marketId: admin.adminMarketId,
          action: 'COUNTRY_ADMIN_ACCESS_REMOVED',
          entityType: 'User',
          entityId: adminId,
        },
      });
      return updated;
    });
  }

  async listMembershipApplications(
    actor: MarketActor,
    options: {
      marketId?: string;
      status?: ProviderMarketMembershipStatus;
      search?: string;
      page?: number;
      limit?: number;
      orderBy?: 'asc' | 'desc';
    } = {},
  ) {
    const marketId = this.marketAccess.marketForAdmin(actor, options.marketId);
    const status = options.status ?? ProviderMarketMembershipStatus.PENDING;
    const search = options.search?.trim();
    const page = Math.max(1, options.page ?? 1);
    const limit = Math.min(100, Math.max(1, options.limit ?? 10));
    const where: Prisma.ProviderMarketMembershipWhereInput = {
      marketId,
      status,
      ...(search
        ? {
            provider: {
              is: {
                OR: [
                  {
                    email: {
                      contains: search,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                  {
                    firstName: {
                      contains: search,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                  {
                    lastName: {
                      contains: search,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                  {
                    displayName: {
                      contains: search,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                ],
              },
            },
          }
        : {}),
    };
    const [applications, total] = await Promise.all([
      this.prisma.providerMarketMembership.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          market: { select: MARKET_PUBLIC_SELECT },
          provider: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              displayName: true,
              avatar: true,
              isServiceProviderVerified: true,
            },
          },
        },
        orderBy: { createdAt: options.orderBy ?? 'asc' },
      }),
      this.prisma.providerMarketMembership.count({ where }),
    ]);

    return {
      applications,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async reviewMembership(
    membershipId: string,
    actor: MarketActor,
    status: ProviderMarketMembershipStatus,
    reason?: string,
  ) {
    if (status === ProviderMarketMembershipStatus.PENDING) {
      throw new BadRequestException('Choose a final membership decision');
    }
    const membership = await this.prisma.providerMarketMembership.findUnique({
      where: { id: membershipId },
      include: {
        provider: { select: { isServiceProviderVerified: true } },
      },
    });
    if (!membership) throw new NotFoundException('Membership not found');
    this.marketAccess.assertResource(actor, membership.marketId);
    if (
      status === ProviderMarketMembershipStatus.ACTIVE &&
      !membership.provider.isServiceProviderVerified
    ) {
      throw new BadRequestException(
        'The provider application must be approved first',
      );
    }
    const rejectionReason = reason?.trim();
    if (
      status === ProviderMarketMembershipStatus.REJECTED &&
      !rejectionReason
    ) {
      throw new BadRequestException('A rejection reason is required');
    }
    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.providerMarketMembership.update({
        where: { id: membershipId },
        data: {
          status,
          reviewedAt: new Date(),
          reviewedBy: actor.id,
          rejectionReason:
            status === ProviderMarketMembershipStatus.REJECTED
              ? rejectionReason
              : null,
        },
        include: { market: { select: MARKET_PUBLIC_SELECT } },
      });
      if (status !== ProviderMarketMembershipStatus.ACTIVE) {
        await tx.service.updateMany({
          where: {
            providerId: membership.providerId,
            marketId: membership.marketId,
            status: ServiceStatus.PUBLISHED,
          },
          data: { status: ServiceStatus.SUSPENDED },
        });
      }
      await tx.adminAuditLog.create({
        data: {
          actorId: actor.id,
          marketId: membership.marketId,
          action: 'PROVIDER_MARKET_MEMBERSHIP_REVIEWED',
          entityType: 'ProviderMarketMembership',
          entityId: membershipId,
          metadata: { status, reason: rejectionReason ?? null },
        },
      });
      return updated;
    });
  }
}
