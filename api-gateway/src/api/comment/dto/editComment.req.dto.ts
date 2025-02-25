import { AddCommentReqDto } from './addComment.req.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EditCommentReqDto extends AddCommentReqDto {
    @IsString()
    @ApiProperty()
    id!: string;
}
