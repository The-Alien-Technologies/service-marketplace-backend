import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role, UserStatus } from '../../../generated/prisma';
import { ALLOW_UNAPPROVED_PROVIDER_KEY } from '../../common/decorators/allow-unapproved-provider.decorator';

@Injectable()
export class ProviderApprovalGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    if (context.getType() !== 'http') return true;

    const request = context.switchToHttp().getRequest();
    const user = request.currentUser;

    if (
      !user ||
      user.role !== Role.SERVICE_PROVIDER ||
      user.status === UserStatus.ACTIVE
    ) {
      return true;
    }

    const isAllowed = this.reflector.getAllAndOverride<boolean>(
      ALLOW_UNAPPROVED_PROVIDER_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isAllowed) return true;

    throw new ForbiddenException(
      'Your provider application must be approved before you can use provider tools',
    );
  }
}
