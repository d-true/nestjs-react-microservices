import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './enteties/user.entity';
import { Repository } from 'typeorm';
import { GetAllUsersReqDto } from './dto/getAllUsers.req.dto';
import { AppResponse } from '../../constants/app.constants';
import {
    addPaginationInfo,
    preparePaginationQuery,
} from '../../utils/pagination.utils';
import { GetAllUsersResDto } from './dto/getAllUsers.res.dto';
import { GetProfileReqDto } from './dto/getProfile.req.dto';
import { GetProfileResDto } from './dto/getProfile.res.dto';
import { ERROR_RESPONSES } from '../../constants/errors.constants';
import { AppErrorResDto } from '../../dto/app.res.dto';
import { FileService } from '../file/file.service';
import { AddAvatarReqDto } from './dto/addAvatar.req.dto';
import { AddAvatarResDto } from './dto/addAvatar.res.dto';
import { RemoveAvatarReqDto } from './dto/removeAvatar.req.dto';
import { RemoveAvatarResDto } from './dto/removeAvatar.res.dto';
import { appResponseError } from '../../utils/app-response.util';

@Injectable()
export class UserService {
    private readonly logger = new Logger('UserService');
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly fileService: FileService,
    ) {}
    async getAllUsers(reqDto: GetAllUsersReqDto): Promise<GetAllUsersResDto> {
        const preparedQuery = preparePaginationQuery(reqDto);
        const query = this.userRepository
            .createQueryBuilder('user')
            .orderBy('user.createdAt', preparedQuery.order);
        query.skip(preparedQuery.offset).take(preparedQuery.limit);
        const [users, count] = await Promise.all([
            query.select(['user.id', 'user.name', 'user.createdAt']).getMany(),
            query.getCount(),
        ]);
        const pagination = addPaginationInfo(preparedQuery, count);
        return {
            message: AppResponse.SUCCESS,
            users,
            pagination,
        };
    }

    async getProfile(
        reqDto: GetProfileReqDto,
    ): Promise<GetProfileResDto | AppErrorResDto> {
        const user = await this.userRepository.findOne({
            where: { id: reqDto.id },
            select: ['id', 'name', 'email', 'avatar'],
            relations: ['role'],
        });

        if (!user) {
            return appResponseError(ERROR_RESPONSES.GLOBAL.NOT_FOUND);
        }

        return {
            message: AppResponse.SUCCESS,
            profile: user,
        };
    }

    async addAvatar(
        reqDto: AddAvatarReqDto,
    ): Promise<AddAvatarResDto | AppErrorResDto> {
        let fileName: string;
        try {
            fileName = await this.fileService.uploadFile(reqDto['file']);
        } catch (error: unknown) {
            this.logger.warn(error);
            return appResponseError(ERROR_RESPONSES.FILE.UPLOAD_ERROR);
        }

        await this.userRepository.update(reqDto.id, { avatar: fileName });
        return {
            message: AppResponse.SUCCESS,
            avatar: fileName,
        };
    }

    async removeAvatar(
        reqDto: RemoveAvatarReqDto,
    ): Promise<RemoveAvatarResDto | AppErrorResDto> {
        const user = await this.userRepository.findOne({
            where: { id: reqDto.id },
            select: ['avatar'],
        });

        if (!user) {
            return appResponseError(ERROR_RESPONSES.USER.NO_USER_FOUND);
        }

        if (!user.avatar) {
            return appResponseError(ERROR_RESPONSES.FILE.NO_USER_FILE_EXISTS);
        }

        try {
            await this.fileService.deleteFile(user.avatar);
        } catch (error: unknown) {
            // if file already removed
            if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
                await this.userRepository.update(reqDto.id, { avatar: '' });
            }

            this.logger.warn(`Remove user file ${user.avatar} error\n`, error);
            return appResponseError(ERROR_RESPONSES.FILE.DELETE_ERROR);
        }

        await this.userRepository.update(reqDto.id, { avatar: '' });

        return {
            message: AppResponse.SUCCESS,
        };
    }
}
