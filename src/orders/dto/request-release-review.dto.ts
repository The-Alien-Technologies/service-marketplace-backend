import { IsOptional, IsString, MaxLength } from 'class-validator';

export class RequestReleaseReviewDto {
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  note?: string;
}
