import { PaginationResDto } from '../../../dto/pagination.res.dto';
import { ApiProperty } from '@nestjs/swagger';
import { AppResponse } from '../../../constants/app.constants';
import { CommentResDto } from './comment.res.dto';

export class GetAllCommentsResDto {
    @ApiProperty()
    message: AppResponse.SUCCESS;
    @ApiProperty()
    users: CommentResDto[];
    @ApiProperty()
    pagination: PaginationResDto;
}
