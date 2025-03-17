import { IsString } from 'class-validator';
import {ApiCommonType} from "../../../common/decorators/field.decorators";

export class LoginReqDto {
    @ApiCommonType(IsString())
    email!: string;
    @ApiCommonType(IsString())
    password!: string;
}
