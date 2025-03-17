import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import {ApiCommonType} from "../../../common/decorators/field.decorators";

export class DeleteCommentReqDto {
    @ApiCommonType(IsString())
    id!: string;
}
