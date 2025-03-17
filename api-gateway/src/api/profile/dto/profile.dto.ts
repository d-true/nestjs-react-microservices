import {ApiClassType, ApiCommonType} from "../../../common/decorators/field.decorators";
import {IsInt, IsString} from "class-validator";

class ProfileRoleDto {
    @ApiCommonType(IsInt())
    id!: number;
    @ApiCommonType(IsString())
    name!: string;
}

export class ProfileDto {
    @ApiCommonType(IsString())
    id!: string;
    @ApiCommonType(IsString())
    avatar!: string;
    @ApiCommonType(IsString())
    name!: string;
    @ApiCommonType(IsString())
    email!: string;
    @ApiClassType(ProfileRoleDto)
    role!: ProfileRoleDto;
}

