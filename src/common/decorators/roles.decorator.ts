import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

// This grants staff access only. Services still enforce country tenancy.
export const IsAdmin = () => Roles(Role.ADMIN, Role.SUPER_ADMIN);

export const IsSuperAdmin = () => Roles(Role.SUPER_ADMIN);

// Convenience decorator for customer-only endpoints
export const IsUser = () => Roles(Role.USER);

export const IsServiceProvider = () => Roles(Role.SERVICE_PROVIDER);
