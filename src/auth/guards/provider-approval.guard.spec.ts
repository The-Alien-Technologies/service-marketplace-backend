import { ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role, UserStatus } from '../../../generated/prisma';
import { ProviderApprovalGuard } from './provider-approval.guard';

function contextFor(currentUser?: { role: Role; status: UserStatus }) {
  return {
    getType: () => 'http',
    getHandler: jest.fn(),
    getClass: jest.fn(),
    switchToHttp: () => ({
      getRequest: () => ({ currentUser }),
    }),
  } as any;
}

describe('ProviderApprovalGuard', () => {
  const reflector = {
    getAllAndOverride: jest.fn(),
  } as unknown as Reflector;
  const guard = new ProviderApprovalGuard(reflector);

  beforeEach(() => {
    jest.clearAllMocks();
    (reflector.getAllAndOverride as jest.Mock).mockReturnValue(false);
  });

  it.each([UserStatus.PENDING, UserStatus.REJECTED])(
    'blocks a %s provider from ordinary authenticated routes',
    (status) => {
      expect(() =>
        guard.canActivate(contextFor({ role: Role.SERVICE_PROVIDER, status })),
      ).toThrow(ForbiddenException);
    },
  );

  it('allows unapproved providers only on explicitly allowed routes', () => {
    (reflector.getAllAndOverride as jest.Mock).mockReturnValue(true);

    expect(
      guard.canActivate(
        contextFor({
          role: Role.SERVICE_PROVIDER,
          status: UserStatus.PENDING,
        }),
      ),
    ).toBe(true);
  });

  it('allows approved providers, other roles, and public requests', () => {
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
        contextFor({ role: Role.USER, status: UserStatus.ACTIVE }),
      ),
    ).toBe(true);
    expect(guard.canActivate(contextFor())).toBe(true);
  });
});
