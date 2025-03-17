import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { USER_SERVICE } from '../common/constants/app.constants';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { VerifyAccessTokenResDto } from '../api/auth/dto/verifyAccessToken.res.dto';
import { AppResponse } from '../common/constants/app.constants';
import { AppErrorResDto } from '../common/dto/app.res.dto';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @Inject(USER_SERVICE) private readonly usersServiceClient: ClientProxy,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }

        const result: VerifyAccessTokenResDto | AppErrorResDto =
            await firstValueFrom(
                this.usersServiceClient.send('verify_access_token', token),
            );

        if (result.message === AppResponse.ERROR) {
            throw new UnauthorizedException(result.error);
        }

        request['user'] = {
            id: result.payload.id,
            role: result.payload.role,
        };

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
