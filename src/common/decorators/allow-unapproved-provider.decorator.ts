import { SetMetadata } from '@nestjs/common';

export const ALLOW_UNAPPROVED_PROVIDER_KEY = 'allowUnapprovedProvider';

export const AllowUnapprovedProvider = () =>
  SetMetadata(ALLOW_UNAPPROVED_PROVIDER_KEY, true);
