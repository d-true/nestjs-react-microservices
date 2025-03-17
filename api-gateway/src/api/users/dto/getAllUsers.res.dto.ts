import { PaginationResDto } from '../../../common/dto/pagination.res.dto';
import { UserResDto } from './user.res.dto';
import { AppResponse } from '../../../common/constants/app.constants';
import {ApiClassType, ApiEnumType} from '../../../common/decorators/field.decorators';
import {UserAuthResDto} from "../../auth/dto/user.auth.res.dto";

export class GetAllUsersResDto {
    @ApiEnumType(AppResponse.SUCCESS)
    message!: AppResponse.SUCCESS;
    @ApiClassType(UserAuthResDto, {isArray: true})
    users!: UserResDto[];
    @ApiClassType(PaginationResDto)
    pagination!: PaginationResDto;
}
