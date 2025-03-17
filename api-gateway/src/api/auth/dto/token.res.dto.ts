import { ApiProperty } from '@nestjs/swagger';
import {IsInt, IsString} from "class-validator";
import {ApiCommonType} from "../../../common/decorators/field.decorators";

export class TokenResDto {
    @ApiCommonType(IsString())
    accessToken!: string;
    @ApiCommonType(IsString())
    refreshToken!: string;
    @ApiCommonType(IsInt())
    accessTokenExpires!: number;
    @ApiCommonType(IsInt())
    refreshTokenExpires!: number;
}
