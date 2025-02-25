import { AppResponse } from '../../../constants/app.constants';
import { Comment } from './comment.dto';
import { IsString } from 'class-validator';

export class AddCommentResDto {
    message: AppResponse.SUCCESS;
    comment: Comment;
}
