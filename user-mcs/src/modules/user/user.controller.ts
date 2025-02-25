import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { PaginationReqDto } from '../../dto/pagination.req.dto';
import { GetAllUsersResDto } from './dto/getAllUsers.res.dto';
import { MessagePattern } from '@nestjs/microservices';
import { GetProfileReqDto } from './dto/getProfile.req.dto';
import { AppErrorResDto } from '../../dto/app.res.dto';
import { GetProfileResDto } from './dto/getProfile.res.dto';
import { AddAvatarReqDto } from './dto/addAvatar.req.dto';
import { AddAvatarResDto } from './dto/addAvatar.res.dto';
import { RemoveAvatarReqDto } from './dto/removeAvatar.req.dto';
import { RemoveAvatarResDto } from './dto/removeAvatar.res.dto';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}
    @MessagePattern('get_all_users')
    async getAllUsers(reqDto: PaginationReqDto): Promise<GetAllUsersResDto> {
        return this.userService.getAllUsers(reqDto);
    }

    @MessagePattern('get_profile')
    async getProfile(
        reqDto: GetProfileReqDto,
    ): Promise<GetProfileResDto | AppErrorResDto> {
        return this.userService.getProfile(reqDto);
    }

    @MessagePattern('add_avatar')
    async addAvatar(
        reqDto: AddAvatarReqDto,
    ): Promise<AddAvatarResDto | AppErrorResDto> {
        return this.userService.addAvatar(reqDto);
    }

    @MessagePattern('remove_avatar')
    async removeAvatar(
        reqDto: RemoveAvatarReqDto,
    ): Promise<RemoveAvatarResDto | AppErrorResDto> {
        return this.userService.removeAvatar(reqDto);
    }
}
