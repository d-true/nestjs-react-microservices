import { PaginationResDto } from '../../../common/dto/pagination.res.dto';
import { AppResponse } from '../../../common/constants/app.constants';
import { CommentResDto } from './comment.res.dto';
import {ApiClassType, ApiEnumType} from '../../../common/decorators/field.decorators';

export class GetAllCommentsResDto {
    @ApiEnumType(AppResponse.SUCCESS)
    message!: AppResponse.SUCCESS;
    @ApiClassType(CommentResDto, {isArray: true})
    comments!: CommentResDto[];
    @ApiClassType(PaginationResDto)
    pagination!: PaginationResDto;
}
