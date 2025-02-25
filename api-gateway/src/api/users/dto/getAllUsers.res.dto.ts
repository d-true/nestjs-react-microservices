import { PaginationResDto } from '../../../dto/pagination.res.dto';
import { UserResDto } from './user.res.dto';
import { ApiProperty } from '@nestjs/swagger';
import { AppResponse } from '../../../constants/app.constants';

export class GetAllUsersResDto {
    @ApiProperty()
    message: AppResponse.SUCCESS;
    @ApiProperty()
    users: UserResDto[];
    @ApiProperty()
    pagination: PaginationResDto;
}
