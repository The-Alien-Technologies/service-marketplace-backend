import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Extract current user from request
 * JWT strategy returns: { id, email, firstName, lastName, username, role, isActive, createdAt, updatedAt }
 */
export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      return undefined;
    }

    // If requesting specific field
    if (data) {
      // Map 'userId' to 'id' for backwards compatibility
      if (data === 'userId') {
        return user.id;
      }
      return user[data];
    }

    return user;
  },
);
