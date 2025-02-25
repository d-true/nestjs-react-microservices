import { TokenDto } from './token.dto';
import { AppResponse } from '../../../constants/app.constants';
import { UserResDto } from './user.dto';

export class RefreshTokenResDto extends TokenDto {
    message: AppResponse.SUCCESS;
    user: UserResDto;
}
