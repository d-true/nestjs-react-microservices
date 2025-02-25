import { Injectable, Inject } from '@nestjs/common';
import { RegisterReqDto } from './dto/register.req.dto';
import { RegisterResDto } from './dto/register.res.dto';
import { UserEntity } from '../user/enteties/user.entity';
import { ERROR_RESPONSES } from '../../constants/errors.constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginReqDto } from './dto/login.req.dto';
import { LoginResDto } from './dto/login.res.dto';
import { verifyPassword } from '../../utils/password.utils';
import { AppResponse, UserRoles } from '../../constants/app.constants';
import { SessionEntity } from '../user/enteties/session.entity';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../../config/config.type';
import { VerifyTokenResDto } from './dto/verifyToken.res.dto';
import { AppErrorResDto } from '../../dto/app.res.dto';
import { LogoutResDto } from './dto/logout.res.dto';
import { TokenService } from '../token/token.service';
import { appResponseError } from '../../utils/app-response.util';

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService<AllConfigType>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(SessionEntity)
        private readonly sessionRepository: Repository<SessionEntity>,
        @Inject(TokenService) private readonly tokenService: TokenService,
    ) {}

    async login(reqDto: LoginReqDto): Promise<LoginResDto | AppErrorResDto> {
        const user = await this.userRepository.findOne({
            where: { email: reqDto.email },
            select: ['id', 'email', 'password', 'roleId'],
        });

        const isPasswordValid =
            user && (await verifyPassword(reqDto.password, user.password));

        if (!isPasswordValid) {
            return appResponseError(
                ERROR_RESPONSES.AUTH.WRONG_PASSWORD_OR_USERNAME,
            );
        }
        const token = await this.tokenService.createSessionAndToken(user);

        return {
            user: {
                id: user.id,
                roleId: user.roleId,
            },
            message: AppResponse.SUCCESS,
            ...token,
        };
    }

    async register(
        reqDto: RegisterReqDto,
    ): Promise<RegisterResDto | AppErrorResDto> {
        const isExistUser = await this.userRepository.exists({
            where: { email: reqDto.email },
        });
        if (isExistUser) {
            return appResponseError(ERROR_RESPONSES.AUTH.EMAIL_EXISTS);
        }

        const user = this.userRepository.create({
            email: reqDto.email,
            name: reqDto.name,
            password: reqDto.password,
            roleId: UserRoles.USER,
        });

        await user.save();

        const token = await this.tokenService.createSessionAndToken(user);

        return {
            user: {
                id: user.id,
                roleId: user.roleId,
            },
            message: AppResponse.SUCCESS,
            ...token,
        };
    }

    async logOut(token: string): Promise<LogoutResDto | AppErrorResDto> {
        const result: VerifyTokenResDto | AppErrorResDto =
            await this.tokenService.verifyToken(
                token,
                this.configService.getOrThrow('app.authTokenRefreshSecret', {
                    infer: true,
                }),
            );

        if (result.message === AppResponse.ERROR) {
            return result;
        }

        await this.sessionRepository.delete(result.payload.sessionId);

        return {
            message: AppResponse.SUCCESS,
        };
    }
}
