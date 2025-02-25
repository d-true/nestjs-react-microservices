import { PaginationResDto } from '../../../dto/pagination.res.dto';
import { User } from '../user.types';
import { AppResponse } from '../../../constants/app.constants';

export class GetAllUsersResDto {
    message!: AppResponse.SUCCESS;
    users!: User[];
    pagination!: PaginationResDto;
}
