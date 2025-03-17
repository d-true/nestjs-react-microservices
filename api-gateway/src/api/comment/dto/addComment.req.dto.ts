import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString, MaxLength } from 'class-validator';
import { CommentDeleteOnOptions } from '../../../common/constants/app.constants';

export class AddCommentReqDto {
    @ApiProperty({
        maxLength: 5000,
    })
    @IsString()
    @MaxLength(5000)
    text!: string;
    @ApiProperty({
        enum: CommentDeleteOnOptions,
    })
    @IsIn(CommentDeleteOnOptions)
    deleteOn!: (typeof CommentDeleteOnOptions)[number];
}
