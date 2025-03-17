import { ApiProperty } from '@nestjs/swagger';
import {Equals, IsString} from "class-validator";
import {AppResponse} from "../constants/app.constants";
import {ApiEnumType} from "../decorators/field.decorators";

export class AppErrorResDto {
    @ApiEnumType(AppResponse.ERROR)
    message!: AppResponse.ERROR;
    @ApiProperty()
    @IsString()
    error!: string;
}
