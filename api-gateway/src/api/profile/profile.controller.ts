import {
    Controller,
    FileTypeValidator,
    Get,
    HttpCode,
    HttpStatus,
    Inject,
    MaxFileSizeValidator,
    ParseFilePipe,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    Delete,
} from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, refs } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { USER_SERVICE } from '../../constants/app.constants';
import { GetProfileResDto } from './dto/getProfile.res.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { firstValueFrom } from 'rxjs';
import { User } from '../../decorators/user.decorator';
import { ProfileDto } from './dto/profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppErrorResDto } from '../../dto/app.res.dto';
import { AddAvatarResDto } from './dto/addAvatar.res.dto';
import { RemoveAvatarResDto } from './dto/removeAvatar.res.dto';

@Controller('profile')
@ApiExtraModels(
    AppErrorResDto,
    GetProfileResDto,
    AddAvatarResDto,
    RemoveAvatarResDto,
)
@UseGuards(AuthGuard)
export class ProfileController {
    constructor(
        @Inject(USER_SERVICE) private readonly usersServiceClient: ClientProxy,
    ) {}

    @Get()
    @ApiOkResponse({
        schema: { anyOf: refs(GetProfileResDto, AppErrorResDto) },
    })
    @HttpCode(HttpStatus.OK)
    async getProfile(
        @User('id') userId: ProfileDto['id'],
    ): Promise<GetProfileResDto | AppErrorResDto> {
        return firstValueFrom(
            this.usersServiceClient.send('get_profile', { id: userId }),
        );
    }

    @Post('avatar')
    @ApiOkResponse({
        schema: { anyOf: refs(AddAvatarResDto, AppErrorResDto) },
    })
    @UseInterceptors(FileInterceptor('file'))
    async addAvatar(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 1024 * 1024 }),
                    new FileTypeValidator({ fileType: /^image/ }),
                ],
            }),
        )
        file: Express.Multer.File,
        @User('id') userId: ProfileDto['id'],
    ): Promise<AddAvatarResDto | AppErrorResDto> {
        return firstValueFrom(
            this.usersServiceClient.send('add_avatar', { file, id: userId }),
        );
    }

    @Delete('avatar')
    @ApiOkResponse({
        schema: { anyOf: refs(RemoveAvatarResDto, AppErrorResDto) },
    })
    @HttpCode(HttpStatus.OK)
    async removeAvatar(
        @User('id') userId: ProfileDto['id'],
    ): Promise<RemoveAvatarResDto | AppErrorResDto> {
        return firstValueFrom(
            this.usersServiceClient.send('remove_avatar', { id: userId }),
        );
    }
}
