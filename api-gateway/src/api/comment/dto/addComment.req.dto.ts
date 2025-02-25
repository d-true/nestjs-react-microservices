import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString, MaxLength } from 'class-validator';
import { CommentDeleteOnOptions } from '../../../constants/app.constants';

export class AddCommentReqDto {
    @ApiProperty()
    @IsString()
    @MaxLength(5000)
    text!: string;
    @ApiProperty()
    @IsIn(CommentDeleteOnOptions)
    deleteOn: (typeof CommentDeleteOnOptions)[number];
}
