import { AppResponse } from '../../../common/constants/app.constants';
import {ApiCommonType, ApiEnumType} from '../../../common/decorators/field.decorators';
import {IsString} from "class-validator";

export class AddAvatarResDto {
    @ApiEnumType(AppResponse.SUCCESS)
    message!: AppResponse.SUCCESS;
    @ApiCommonType(IsString())
    avatar!: string;
}
