import { CommentDeleteOnOptions } from '../../../constants/app.constants';
import { IsIn, IsString } from 'class-validator';

export class AddCommentReqDto {
    @IsString()
    userId: string;
    @IsString()
    text: string;
    @IsIn(CommentDeleteOnOptions)
    deleteOn: (typeof CommentDeleteOnOptions)[number];
}
