import { ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserStatus } from '../../../generated/prisma';
import { Role } from '../../common/enums/role.enum';
import { RolesGuard } from './roles.guard';

function contextFor(currentUser: { role: Role; status: UserStatus }) {
  return {
    getHandler: jest.fn(),
    getClass: jest.fn(),
    switchToHttp: () => ({
      getRequest: () => ({ currentUser }),
    }),
  } as any;
}

describe('RolesGuard provider approval enforcement', () => {
  const reflector = {
    getAllAndOverride: jest.fn(),
  } as unknown as Reflector;
  const guard = new RolesGuard(reflector);

  beforeEach(() => {
    jest.clearAllMocks();
    (reflector.getAllAndOverride as jest.Mock).mockReturnValue([
      Role.SERVICE_PROVIDER,
      Role.ADMIN,
    ]);
  });

  it('blocks pending providers from provider tools', () => {
    expect(() =>
      guard.canActivate(
        contextFor({
          role: Role.SERVICE_PROVIDER,
          status: UserStatus.PENDING,
        }),
      ),
    ).toThrow(ForbiddenException);
  });

  it('allows approved providers and active admins', () => {
    expect(
      guard.canActivate(
        contextFor({
          role: Role.SERVICE_PROVIDER,
          status: UserStatus.ACTIVE,
        }),
      ),
    ).toBe(true);
    expect(
      guard.canActivate(
        contextFor({ role: Role.ADMIN, status: UserStatus.ACTIVE }),
      ),
    ).toBe(true);
  });
});
