import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

// Convenience decorator for admin-only endpoints
export const IsAdmin = () => Roles(Role.ADMIN);

// Convenience decorator for customer-only endpoints
export const IsUser = () => Roles(Role.USER);

// Convenience decorator for service provider endpoints (both SERVICE_PROVIDER and ADMIN can access)
export const IsServiceProvider = () => Roles(Role.SERVICE_PROVIDER, Role.ADMIN);
