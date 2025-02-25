import { AccessTokenJwtResDto, RefreshTokenJwtResDto } from './token.dto';
import { AppResponse } from '../../../constants/app.constants';

export class VerifyTokenResDto {
    message: AppResponse.SUCCESS;
    payload: AccessTokenJwtResDto | RefreshTokenJwtResDto;
}
