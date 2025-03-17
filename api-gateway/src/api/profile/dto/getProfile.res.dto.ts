import { AppResponse } from '../../../common/constants/app.constants';
import { ProfileDto } from './profile.dto';
import {ApiClassType, ApiEnumType} from "../../../common/decorators/field.decorators";

export class GetProfileResDto {
    @ApiEnumType(AppResponse.SUCCESS)
    message!: AppResponse.SUCCESS;
    @ApiClassType(ProfileDto)
    profile!: ProfileDto;
}
