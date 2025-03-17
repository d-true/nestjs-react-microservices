import { TokenResDto } from './token.res.dto';
import { AppResponse } from '../../../common/constants/app.constants';
import { UserAuthResDto } from './user.auth.res.dto';
import {ApiClassType, ApiEnumType} from '../../../common/decorators/field.decorators';

export class RegisterResDto extends TokenResDto {
    @ApiEnumType(AppResponse.SUCCESS)
    message!: AppResponse.SUCCESS;
    @ApiClassType(UserAuthResDto)
    user!: UserAuthResDto;
}
