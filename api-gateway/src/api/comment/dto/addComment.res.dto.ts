import { ApiProperty } from '@nestjs/swagger';
import { AppResponse } from '../../../constants/app.constants';
import { CommentResDto } from './comment.res.dto';

export class AddCommentResDto {
    @ApiProperty()
    message: AppResponse.SUCCESS;
    @ApiProperty()
    comment: CommentResDto;
}
