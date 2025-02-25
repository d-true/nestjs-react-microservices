import { Injectable, Inject, Logger } from '@nestjs/common';
import { LoginResDto } from './dto/login.res.dto';
import { AppErrorResDto } from '../../dto/app.res.dto';
import { firstValueFrom } from 'rxjs';
import { AppResponse, USER_SERVICE } from '../../constants/app.constants';
import { Response } from 'express';
import { LoginReqDto } from './dto/login.req.dto';
import { ClientProxy } from '@nestjs/microservices';
import { RegisterReqDto } from './dto/register.req.dto';
import { RegisterResDto } from './dto/register.res.dto';
import { RefreshTokenResDto } from './dto/refreshToken.res.dto';
import { LogoutResDto } from './dto/logout.res.dto';
import { ERROR_RESPONSES } from '../../constants/errors.constants';
import { appResponseError } from '../../utils/app-response.util';

@Injectable()
export class AuthService {
    private readonly logger = new Logger('AuthService');
    constructor(
        @Inject(USER_SERVICE) private readonly usersServiceClient: ClientProxy,
    ) {}
    async login(
        reqDto: LoginReqDto,
        response: Response,
    ): Promise<LoginResDto | AppErrorResDto> {
        const result: LoginResDto | AppErrorResDto = await firstValueFrom(
            this.usersServiceClient.send('login', reqDto),
        );
        if (result.message === AppResponse.SUCCESS) {
            response.cookie('refresh_token', result.refreshToken, {
                expires: new Date(result.refreshTokenExpires),
                sameSite: 'strict',
                httpOnly: true,
            });
        }
        return result;
    }

    async register(
        reqDto: RegisterReqDto,
        response: Response,
    ): Promise<RegisterResDto | AppErrorResDto> {
        const result: RegisterResDto | AppErrorResDto = await firstValueFrom(
            this.usersServiceClient.send('register', reqDto),
        );
        if (result.message === AppResponse.SUCCESS) {
            response.cookie('refresh_token', result.refreshToken, {
                expires: new Date(result.refreshTokenExpires),
                sameSite: 'strict',
                httpOnly: true,
            });
        }
        return result;
    }

    async refreshToken(
        refreshToken: string,
        response: Response,
    ): Promise<RefreshTokenResDto | AppErrorResDto> {
        if (!refreshToken) {
            return {
                message: AppResponse.SUCCESS,
                refreshToken: undefined,
                user: null,
            };
        }

        const result: RefreshTokenResDto | AppErrorResDto =
            await firstValueFrom(
                this.usersServiceClient.send('refresh_token', refreshToken),
            );

        if (result.message === AppResponse.ERROR) {
            response.clearCookie('refresh_token');
        }

        if (result.message === AppResponse.SUCCESS) {
            response.cookie('refresh_token', result.refreshToken, {
                expires: new Date(result.refreshTokenExpires as number),
                sameSite: 'strict',
                httpOnly: true,
            });
        }

        return result;
    }

    async logOut(
        refreshToken: string,
        response: Response,
    ): Promise<LogoutResDto | AppErrorResDto> {
        if (!refreshToken) {
            return appResponseError(
                ERROR_RESPONSES.AUTH.UNAUTHORIZED.NO_REFRESH_TOKEN,
            );
        }

        const result: LogoutResDto | AppErrorResDto = await firstValueFrom(
            this.usersServiceClient.send('logout', refreshToken),
        );
        if (result.message === AppResponse.ERROR) {
            this.logger.debug(result);
        }

        response.clearCookie('refresh_token');
        return result;
    }
}
