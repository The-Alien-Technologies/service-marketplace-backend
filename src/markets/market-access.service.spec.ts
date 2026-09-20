import { ForbiddenException } from '@nestjs/common';
import { Role } from '../../generated/prisma';
import { MarketAccessService } from './market-access.service';

describe('MarketAccessService', () => {
  const service = new MarketAccessService();

  it('locks a country admin to the assigned market', () => {
    const actor = { id: 'admin', role: Role.ADMIN, adminMarketId: 'ghana' };
    expect(service.marketForAdmin(actor)).toBe('ghana');
    expect(service.marketForAdmin(actor, 'ghana')).toBe('ghana');
    expect(() => service.marketForAdmin(actor, 'south-africa')).toThrow(
      ForbiddenException,
    );
  });

  it('allows a super admin to query one market or all markets', () => {
    const actor = { id: 'root', role: Role.SUPER_ADMIN };
    expect(service.marketForAdmin(actor)).toBeUndefined();
    expect(service.marketForAdmin(actor, 'south-africa')).toBe('south-africa');
  });

  it('rejects unscoped country admins', () => {
    expect(() =>
      service.marketForAdmin({ id: 'admin', role: Role.ADMIN }),
    ).toThrow(ForbiddenException);
  });
});
