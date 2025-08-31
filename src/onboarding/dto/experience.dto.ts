import { IsEnum } from 'class-validator';
import { ExperienceLevel } from '../../common/enums';

export class UpdateExperienceDto {
  @IsEnum(ExperienceLevel)
  experienceLevel: ExperienceLevel;
}
