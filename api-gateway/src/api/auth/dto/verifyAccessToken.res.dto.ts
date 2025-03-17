import { AppResponse } from '../../../common/constants/app.constants';
import {ApiClassType, ApiCommonType, ApiEnumType} from "../../../common/decorators/field.decorators";
import {IsString} from "class-validator";

class VerifyAccessTokenPayloadDto {
    @ApiCommonType(IsString)
    id!: string;
    @ApiCommonType(IsString)
    role!: string;
    @ApiCommonType(IsString)
    sessionId!: string;
}


export class VerifyAccessTokenResDto {
    @ApiEnumType(AppResponse.SUCCESS)
    message!: AppResponse.SUCCESS;
    @ApiClassType(VerifyAccessTokenPayloadDto)
    payload!: VerifyAccessTokenPayloadDto;
}

