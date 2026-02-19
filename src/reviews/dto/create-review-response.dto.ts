import { IsString } from 'class-validator';

export class CreateReviewResponseDto {
  @IsString()
  comment: string;
}
