import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

export enum ProviderApplicationDecision {
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
}

export class ReviewProviderApplicationDto {
  @IsEnum(ProviderApplicationDecision)
  decision: ProviderApplicationDecision;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  reason?: string;
}
