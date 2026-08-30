import { GUARDS_METADATA } from '@nestjs/common/constants';
import { RolesGuard } from '../auth/guards/roles.guard';
import { DisputeController } from './dispute.controller';

describe('DisputeController authorization', () => {
  it('applies the roles guard so admin-only route metadata is enforced', () => {
    const guards = Reflect.getMetadata(GUARDS_METADATA, DisputeController) as
      | unknown[]
      | undefined;

    expect(guards).toContain(RolesGuard);
  });
});
