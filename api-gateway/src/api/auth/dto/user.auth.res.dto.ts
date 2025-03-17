import {IsEnum, IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {UserRoles} from "../../../common/constants/app.constants";
import {ApiCommonType} from "../../../common/decorators/field.decorators";

export class UserAuthResDto {
    @ApiCommonType(IsString())
    id!: string;
    @ApiProperty()
    @IsEnum(UserRoles)
    roleId!: UserRoles;
}
