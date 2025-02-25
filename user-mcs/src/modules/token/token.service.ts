import { Injectable } from '@nestjs/common';
import { UserEntity } from '../user/enteties/user.entity';
import { ERROR_RESPONSES } from '../../constants/errors.constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppResponse } from '../../constants/app.constants';
import { createHash } from 'node:crypto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { SessionEntity } from '../user/enteties/session.entity';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../../config/config.type';
import { JwtService } from '@nestjs/jwt';
import { VerifyTokenResDto } from '../auth/dto/verifyToken.res.dto';
import { AppErrorResDto } from '../../dto/app.res.dto';
import {
    AccessTokenJwtResDto,
    RefreshTokenJwtResDto,
} from '../auth/dto/token.dto';
import { RefreshTokenResDto } from '../auth/dto/refreshToken.res.dto';
import { appResponseError } from '../../utils/app-response.util';

@Injectable()
export class TokenService {
    constructor(
        private readonly configService: ConfigService<AllConfigType>,
        private readonly jwtService: JwtService,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(SessionEntity)
        private readonly sessionRepository: Repository<SessionEntity>,
    ) {}

    async createSessionAndToken(user: UserEntity) {
        const hash = createHash('sha256')
            .update(randomStringGenerator())
            .digest('hex');

        const session = this.sessionRepository.create({
            hash,
            userId: user.id,
        });
        await session.save();

        return this.createToken({
            id: user.id,
            role: user.roleId,
            sessionId: session.id,
            hash,
        });
    }

    async verifyToken(
        token: string,
        secret: string,
    ): Promise<VerifyTokenResDto | AppErrorResDto> {
        let payload: AccessTokenJwtResDto | RefreshTokenJwtResDto;
        try {
            payload = this.jwtService.verify(token, { secret });
        } catch {
            return appResponseError(
                ERROR_RESPONSES.AUTH.UNAUTHORIZED.INVALID_ACCESS_TOKEN,
            );
        }

        // use cache instead
        const isSessionExisted = await this.sessionRepository.exists({
            where: { id: payload.sessionId },
        });

        if (!isSessionExisted) {
            return appResponseError(
                ERROR_RESPONSES.AUTH.UNAUTHORIZED.INVALID_SESSION,
            );
        }

        return {
            message: AppResponse.SUCCESS,
            payload,
        };
    }

    async verifyAccessToken(
        token: string,
    ): Promise<VerifyTokenResDto | AppErrorResDto> {
        return this.verifyToken(
            token,
            this.configService.getOrThrow('app.authTokenAccessSecret', {
                infer: true,
            }),
        );
    }

    async refreshToken(
        token: string,
    ): Promise<RefreshTokenResDto | AppErrorResDto> {
        const result: VerifyTokenResDto | AppErrorResDto =
            await this.verifyToken(
                token,
                this.configService.getOrThrow('app.authTokenRefreshSecret', {
                    infer: true,
                }),
            );

        if (result.message === AppResponse.ERROR) {
            return appResponseError(result.error);
        }

        const session = await this.sessionRepository.findOneBy({
            id: result.payload.sessionId,
        });

        if (
            !session ||
            session.hash !== (result.payload as RefreshTokenJwtResDto).hash
        ) {
            return appResponseError(
                ERROR_RESPONSES.AUTH.UNAUTHORIZED.INVALID_SESSION,
            );
        }

        // check another statuses, such as banned, blocked or so
        const user = await this.userRepository.findOne({
            where: { id: session.userId },
            select: ['id', 'roleId'],
        });

        if (!user) {
            return appResponseError(
                ERROR_RESPONSES.AUTH.UNAUTHORIZED.NO_AUTH_USER,
            );
        }

        const newHash = createHash('sha256')
            .update(randomStringGenerator())
            .digest('hex');

        await this.sessionRepository.update(session.id, { hash: newHash });

        const refreshedToken = await this.createToken({
            id: user.id,
            role: user.roleId,
            sessionId: session.id,
            hash: newHash,
        });

        return {
            message: AppResponse.SUCCESS,
            ...refreshedToken,
            user: {
                id: user.id,
                roleId: user.roleId,
            },
        };
    }

    private async createToken(data: {
        role: number;
        id: string;
        sessionId: string;
        hash: string;
    }) {
        const accessTokenExpiresIn = this.configService.getOrThrow(
            'app.authTokenAccessExpire',
            { infer: true },
        );
        const accessTokenExpires: number = Date.now() + accessTokenExpiresIn;

        const refreshTokenExpiresIn = this.configService.getOrThrow(
            'app.authTokenRefreshExpire',
            { infer: true },
        );
        const refreshTokenExpires: number = Date.now() + refreshTokenExpiresIn;

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    id: data.id,
                    role: data.role,
                    sessionId: data.sessionId,
                },
                {
                    secret: this.configService.getOrThrow(
                        'app.authTokenAccessSecret',
                        {
                            infer: true,
                        },
                    ),
                    expiresIn: accessTokenExpiresIn,
                },
            ),
            this.jwtService.signAsync(
                {
                    sessionId: data.sessionId,
                    hash: data.hash,
                },
                {
                    secret: this.configService.getOrThrow(
                        'app.authTokenRefreshSecret',
                        {
                            infer: true,
                        },
                    ),
                    expiresIn: refreshTokenExpiresIn,
                },
            ),
        ]);
        return {
            accessToken,
            refreshToken,
            accessTokenExpires,
            refreshTokenExpires,
        };
    }
}
