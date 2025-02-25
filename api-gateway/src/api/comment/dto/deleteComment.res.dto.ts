import { ApiProperty } from '@nestjs/swagger';
import { AppResponse } from '../../../constants/app.constants';

export class DeleteCommentResDto {
    @ApiProperty()
    message: AppResponse.SUCCESS;
}
