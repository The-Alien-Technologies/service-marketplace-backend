import { ForbiddenException, Injectable } from '@nestjs/common';
import { Role } from '../../generated/prisma';

export interface MarketActor {
  id: string;
  role: string;
  adminMarketId?: string | null;
}

@Injectable()
export class MarketAccessService {
  marketForAdmin(actor: MarketActor, requestedMarketId?: string) {
    if (actor.role === Role.SUPER_ADMIN) return requestedMarketId;
    if (actor.role !== Role.ADMIN || !actor.adminMarketId) {
      throw new ForbiddenException('Country administrator access is required');
    }
    if (requestedMarketId && requestedMarketId !== actor.adminMarketId) {
      throw new ForbiddenException('You cannot access another market');
    }
    return actor.adminMarketId;
  }

  assertResource(actor: MarketActor, resourceMarketId: string) {
    const allowed = this.marketForAdmin(actor);
    if (allowed && allowed !== resourceMarketId) {
      throw new ForbiddenException('You cannot access another market');
    }
  }

  isStaff(role: string) {
    return role === Role.ADMIN || role === Role.SUPER_ADMIN;
  }
}
