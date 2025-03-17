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
import { USER_SERVICE } from '../../common/constants/app.constants';
import { Response } from 'express';
import { AppErrorResDto } from '../../common/dto/app.res.dto';
import { refs } from '@nestjs/swagger';
import { ApiExtraModels } from '@nestjs/swagger';
import { Cookies } from '../../common/decorators/cookie.decorator';
import { RefreshTokenResDto } from './dto/refreshToken.res.dto';
import { AuthService } from './auth.service';
import {OkResponseType, CreatedResponseType} from "../../common/decorators/field.decorators";

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
    @OkResponseType(LoginResDto, AppErrorResDto)
    async login(
        @Body() reqDto: LoginReqDto,
        @Res({ passthrough: true }) response: Response,
    ): Promise<LoginResDto | AppErrorResDto> {
        return this.authService.login(reqDto, response);
    }

    @Post('register')
    @CreatedResponseType(RegisterResDto, AppErrorResDto)
    async register(
        @Body() reqDto: RegisterReqDto,
        @Res({ passthrough: true }) response: Response,
    ): Promise<RegisterResDto | AppErrorResDto> {
        return this.authService.register(reqDto, response);
    }

    @Post('refresh')
    @OkResponseType(RefreshTokenResDto, AppErrorResDto)
    async refreshToken(
        @Cookies('refresh_token') refreshToken: string,
        @Res({ passthrough: true }) response: Response,
    ): Promise<RefreshTokenResDto | AppErrorResDto> {
        return this.authService.refreshToken(refreshToken, response);
    }

    @Post('logout')
    @OkResponseType(LogoutResDto, AppErrorResDto)
    async logOut(
        @Cookies('refresh_token') refreshToken: string,
        @Res({ passthrough: true }) response: Response,
    ): Promise<LogoutResDto | AppErrorResDto> {
        return this.authService.logOut(refreshToken, response);
    }
}
