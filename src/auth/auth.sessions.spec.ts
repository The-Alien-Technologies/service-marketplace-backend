import { JwtService } from '@nestjs/jwt';
import { AuthService, UserPayload } from './auth.service';
import { Role, UserStatus } from '../../generated/prisma';

const user = {
  id: 'user-1',
  email: 'user@example.com',
  role: Role.USER,
  status: UserStatus.ACTIVE,
  tokenVersion: 0,
};

const makeService = () => {
  const usersService = {
    findById: jest.fn().mockResolvedValue(user),
    updateLastActivity: jest.fn().mockResolvedValue(undefined),
  };
  const authSession = {
    create: jest.fn().mockResolvedValue({ id: 'session-1' }),
    findFirst: jest.fn().mockResolvedValue({ id: 'session-1' }),
    updateMany: jest.fn().mockResolvedValue({ count: 1 }),
  };
  const prisma = { authSession };
  const jwtService = new JwtService({ secret: 'test-secret' });
  const configService = {
    get: jest.fn((key: string) =>
      key === 'JWT_REFRESH_EXPIRATION_TIME' ? '30d' : undefined,
    ),
  };
  const service = new AuthService(
    usersService as never,
    jwtService,
    {} as never,
    {} as never,
    configService as never,
    {} as never,
    {} as never,
    prisma as never,
    {} as never,
  );

  return { authSession, jwtService, service, usersService };
};

describe('AuthService sessions', () => {
  it('issues access and refresh tokens for one persisted device session', async () => {
    const { authSession, jwtService, service } = makeService();

    const tokens = await (service as any).issueSessionTokens(user);
    const access = jwtService.verify<UserPayload>(tokens.token);
    const refresh = jwtService.verify<UserPayload>(tokens.refreshToken);

    expect(access.sessionId).toBe(refresh.sessionId);
    expect(access.tokenType).toBe('access');
    expect(refresh.tokenType).toBe('refresh');
    expect(access.jti).not.toBe(refresh.jti);
    expect(authSession.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        id: access.sessionId,
        userId: user.id,
        refreshTokenHash: expect.any(String),
        expiresAt: expect.any(Date),
      }),
    });
  });

  it('revokes only the current session on logout', async () => {
    const { authSession, service } = makeService();

    await service.logout(user.id, 'current-session');

    expect(authSession.updateMany).toHaveBeenCalledWith({
      where: {
        id: 'current-session',
        userId: user.id,
        revokedAt: null,
      },
      data: { revokedAt: expect.any(Date) },
    });
  });

  it('rotates a refresh token once and rejects reuse of the old token', async () => {
    const { authSession, service } = makeService();
    const original = await (service as any).issueSessionTokens(user);
    authSession.updateMany
      .mockResolvedValueOnce({ count: 1 })
      .mockResolvedValueOnce({ count: 0 });

    const rotated = await service.refreshTokenFromRefreshToken(
      original.refreshToken,
    );

    expect(rotated.refreshToken).not.toBe(original.refreshToken);
    await expect(
      service.refreshTokenFromRefreshToken(original.refreshToken),
    ).rejects.toMatchObject({ status: 401 });
  });

  it('rejects access tokens whose session has been revoked', async () => {
    const { authSession, jwtService, service } = makeService();
    const tokens = await (service as any).issueSessionTokens(user);
    const payload = jwtService.verify<UserPayload>(tokens.token);
    authSession.findFirst.mockResolvedValueOnce(null);

    await expect(service.validateUser(payload)).resolves.toBeNull();
  });
});
