import { AddCommentReqDto } from './addComment.req.dto';
import { IsString } from 'class-validator';

export class EditCommentReqDto extends AddCommentReqDto {
    @IsString()
    id!: string;
}
