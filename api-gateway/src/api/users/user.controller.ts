import {
    Controller,
    Get,
    Inject,
    Query,
    UseGuards,
} from '@nestjs/common';
import { PaginationReqDto } from '../../common/dto/pagination.req.dto';
import { GetAllUsersResDto } from './dto/getAllUsers.res.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { USER_SERVICE, UserRoles } from '../../common/constants/app.constants';
import { AppErrorResDto } from '../../common/dto/app.res.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { RoleGuard } from '../../guards/role.guard';
import { Roles } from '../../common/decorators/role.decorator';
import {OkResponseType} from "../../common/decorators/field.decorators";

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
    constructor(
        @Inject(USER_SERVICE) private readonly userServiceClient: ClientProxy,
    ) {}

    @Get()
    @OkResponseType(GetAllUsersResDto, AppErrorResDto)
    @Roles(UserRoles.ADMIN)
    @UseGuards(RoleGuard)
    async getAllUsers(
        @Query() reqDto: PaginationReqDto,
    ): Promise<GetAllUsersResDto | AppErrorResDto> {
        return firstValueFrom(
            this.userServiceClient.send('get_all_users', reqDto),
        );
    }
}
