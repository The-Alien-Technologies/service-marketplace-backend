import { validate } from 'class-validator';
import { SocialAuthDto, SocialProvider } from './social-auth.dto';

describe('SocialAuthDto role validation', () => {
  it('rejects privileged roles from the public social-auth payload', async () => {
    const dto = Object.assign(new SocialAuthDto(), {
      provider: SocialProvider.GOOGLE,
      accessToken: 'validated-token',
      role: 'ADMIN',
    });

    const errors = await validate(dto);

    expect(errors.some((error) => error.property === 'role')).toBe(true);
  });

  it.each(['USER', 'SERVICE_PROVIDER'])('accepts the %s role', async (role) => {
    const dto = Object.assign(new SocialAuthDto(), {
      provider: SocialProvider.GOOGLE,
      accessToken: 'validated-token',
      role,
    });

    await expect(validate(dto)).resolves.toHaveLength(0);
  });
});
