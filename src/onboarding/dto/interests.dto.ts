import { IsArray, IsString, IsEnum } from 'class-validator';
import { UserInterestType } from '../../common/enums';

export class UpdateInterestsDto {
  @IsArray()
  @IsString({ each: true })
  categoryIds: string[];

  @IsEnum(UserInterestType)
  type: UserInterestType;
}
