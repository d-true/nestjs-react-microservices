import { AddCommentReqDto } from './addComment.req.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import {ApiCommonType} from "../../../common/decorators/field.decorators";

export class EditCommentReqDto extends AddCommentReqDto {
    @ApiCommonType(IsString())
    id!: string;
}
