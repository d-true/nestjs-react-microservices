import {ApiCommonType} from "../../../common/decorators/field.decorators";
import {IsDateString, IsString} from "class-validator";

export class UserResDto {
    @ApiCommonType(IsString())
    name!: string;
    @ApiCommonType(IsString())
    id!: string;
    @ApiCommonType(IsDateString())
    createdAt!: Date;
}
