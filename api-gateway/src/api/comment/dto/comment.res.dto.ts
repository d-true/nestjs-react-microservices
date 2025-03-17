import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import { Optional } from '@nestjs/common';
import {IsDateString, IsString} from "class-validator";
import {ApiCommonType} from "../../../common/decorators/field.decorators";

export class CommentResDto {
    @ApiCommonType(IsString())
    id!: string;
    // optional for user type role
    @ApiPropertyOptional()
    @Optional()
    @IsString()
    userId?: string;
    @ApiCommonType(IsString())
    text!: string;
    @ApiCommonType(IsDateString())
    createdAt!: Date;
    @ApiPropertyOptional()
    @Optional()
    @IsDateString()
    deleteOn?: Date;
}
