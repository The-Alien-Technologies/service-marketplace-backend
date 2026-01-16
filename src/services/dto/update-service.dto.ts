import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';
import { CreateServiceDto } from './create-service.dto';
import { ServiceStatus } from '../../../generated/prisma';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  @IsOptional()
  @IsEnum(ServiceStatus)
  status?: ServiceStatus;
}
