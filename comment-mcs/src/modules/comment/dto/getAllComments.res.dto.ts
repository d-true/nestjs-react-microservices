import { PaginationResDto } from '../../../dto/pagination.res.dto';
import { Comment } from './comment.dto';
import { AppResponse } from '../../../constants/app.constants';

export class GetAllCommentsResDto {
    message: AppResponse.SUCCESS;
    comments: Comment[];
    pagination: PaginationResDto;
}
