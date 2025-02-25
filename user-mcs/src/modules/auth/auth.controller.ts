import { Body, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginReqDto } from './dto/login.req.dto';
import { LoginResDto } from './dto/login.res.dto';
import { RegisterReqDto } from './dto/register.req.dto';
import { RegisterResDto } from './dto/register.res.dto';
import { LogoutResDto } from './dto/logout.res.dto';
import { MessagePattern } from '@nestjs/microservices';
import { VerifyTokenResDto } from './dto/verifyToken.res.dto';
import { AppErrorResDto } from '../../dto/app.res.dto';
import { RefreshTokenResDto } from './dto/refreshToken.res.dto';
import { TokenService } from '../token/token.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly tokenService: TokenService,
    ) {}
    @MessagePattern('login')
    async login(
        @Body() reqDto: LoginReqDto,
    ): Promise<LoginResDto | AppErrorResDto> {
        return this.authService.login(reqDto);
    }

    @MessagePattern('register')
    async register(
        reqDto: RegisterReqDto,
    ): Promise<RegisterResDto | AppErrorResDto> {
        return this.authService.register(reqDto);
    }

    @MessagePattern('verify_access_token')
    async verifyAccessToken(
        token: string,
    ): Promise<VerifyTokenResDto | AppErrorResDto> {
        return this.tokenService.verifyAccessToken(token);
    }

    @MessagePattern('refresh_token')
    async refreshToken(
        token: string,
    ): Promise<RefreshTokenResDto | AppErrorResDto> {
        return this.tokenService.refreshToken(token);
    }

    @MessagePattern('logout')
    async logOut(token: string): Promise<LogoutResDto | AppErrorResDto> {
        return this.authService.logOut(token);
    }
}
