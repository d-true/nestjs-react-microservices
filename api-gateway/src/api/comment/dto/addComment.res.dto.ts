import { AppResponse } from '../../../common/constants/app.constants';
import { CommentResDto } from './comment.res.dto';
import {ApiClassType, ApiEnumType} from '../../../common/decorators/field.decorators';

export class AddCommentResDto {
    @ApiEnumType(AppResponse.SUCCESS)
    message!: AppResponse.SUCCESS;
    @ApiClassType(CommentResDto)
    comment!: CommentResDto;
}
