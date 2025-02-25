import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Inject,
    Query,
    UseGuards,
} from '@nestjs/common';
import { PaginationReqDto } from '../../dto/pagination.req.dto';
import { GetAllUsersResDto } from './dto/getAllUsers.res.dto';
import { ApiExtraModels, ApiOkResponse, refs } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { USER_SERVICE, UserRoles } from '../../constants/app.constants';
import { AppErrorResDto } from '../../dto/app.res.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { RoleGuard } from '../../guards/role.guard';
import { Roles } from '../../decorators/role.decorator';

@Controller('user')
@UseGuards(AuthGuard)
@ApiExtraModels(AppErrorResDto, GetAllUsersResDto)
export class UserController {
    constructor(
        @Inject(USER_SERVICE) private readonly userServiceClient: ClientProxy,
    ) {}

    @Get()
    @ApiOkResponse({
        schema: { anyOf: refs(GetAllUsersResDto, AppErrorResDto) },
    })
    @HttpCode(HttpStatus.OK)
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
