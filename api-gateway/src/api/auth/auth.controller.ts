import {
    Post,
    Body,
    Controller,
    HttpStatus,
    HttpCode,
    Inject,
    Res,
} from '@nestjs/common';
import { LoginReqDto } from './dto/login.req.dto';
import { LoginResDto } from './dto/login.res.dto';
import { RegisterReqDto } from './dto/register.req.dto';
import { RegisterResDto } from './dto/register.res.dto';
import { LogoutResDto } from './dto/logout.res.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { USER_SERVICE } from '../../constants/app.constants';
import { Response } from 'express';
import { AppErrorResDto } from '../../dto/app.res.dto';
import { refs } from '@nestjs/swagger';
import { ApiExtraModels } from '@nestjs/swagger';
import { Cookies } from '../../decorators/cookie.decorator';
import { RefreshTokenResDto } from './dto/refreshToken.res.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiExtraModels(
    AppErrorResDto,
    LoginResDto,
    RegisterResDto,
    RefreshTokenResDto,
    LogoutResDto,
)
export class AuthController {
    constructor(
        @Inject(USER_SERVICE) private readonly usersServiceClient: ClientProxy,
        private readonly authService: AuthService,
    ) {}

    @Post('login')
    @ApiOkResponse({
        schema: { anyOf: refs(LoginResDto, AppErrorResDto) },
    })
    @HttpCode(HttpStatus.OK)
    async login(
        @Body() reqDto: LoginReqDto,
        @Res({ passthrough: true }) response: Response,
    ): Promise<LoginResDto | AppErrorResDto> {
        return this.authService.login(reqDto, response);
    }

    @Post('register')
    @ApiOkResponse({
        schema: { anyOf: refs(RegisterResDto, AppErrorResDto) },
    })
    @HttpCode(HttpStatus.CREATED)
    async register(
        @Body() reqDto: RegisterReqDto,
        @Res({ passthrough: true }) response: Response,
    ): Promise<RegisterResDto | AppErrorResDto> {
        return this.authService.register(reqDto, response);
    }

    @Post('refresh')
    @ApiOkResponse({
        schema: { anyOf: refs(RefreshTokenResDto, AppErrorResDto) },
    })
    @HttpCode(HttpStatus.OK)
    async refreshToken(
        @Cookies('refresh_token') refreshToken: string,
        @Res({ passthrough: true }) response: Response,
    ): Promise<RefreshTokenResDto | AppErrorResDto> {
        return this.authService.refreshToken(refreshToken, response);
    }

    @Post('logout')
    @ApiOkResponse({
        schema: { anyOf: refs(LogoutResDto, AppErrorResDto) },
    })
    @HttpCode(HttpStatus.OK)
    async logOut(
        @Cookies('refresh_token') refreshToken: string,
        @Res({ passthrough: true }) response: Response,
    ): Promise<LogoutResDto | AppErrorResDto> {
        return this.authService.logOut(refreshToken, response);
    }
}
