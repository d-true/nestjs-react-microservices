import * as request from 'supertest';
import * as process from 'node:process';
import { ERROR_RESPONSES } from '../../src/common/constants/errors.constants';
import { appResponseError } from '../../src/utils/app-response.util';
import { LoginResDto } from '../../src/api/auth/dto/login.res.dto';
import { AppErrorResDto } from '../../src/common/dto/app.res.dto';
import { RefreshTokenResDto } from '../../src/api/auth/dto/refreshToken.res.dto';

describe('API Auth Module', () => {
    const app = process.env.APP_URL as string;
    const failUserEmail = `email${Date.now()}@example.com`;
    const failUserPassword = `12345678`;

    const userEmail = `admin@admin.com`;
    const userPassword = `12345678`;

    describe('Fail Login', () => {
        it('should fail with wrong password: /api/auth/login (POST)', () => {
            return request(app)
                .post('/api/auth/login')
                .send({ email: failUserEmail, password: failUserPassword })
                .then(({ body }: { body: AppErrorResDto }) => {
                    expect(body.error).toBe(
                        appResponseError(
                            ERROR_RESPONSES.AUTH.WRONG_PASSWORD_OR_USERNAME,
                        ).error,
                    );
                });
        });
    });

    describe('Login', () => {
        it('should successfully for user: /api/auth/login (POST)', () => {
            return request(app)
                .post('/api/auth/login')
                .send({ email: userEmail, password: userPassword })
                .expect(200)
                .expect(({ body }: { body: LoginResDto }) => {
                    expect(body.accessToken).toBeDefined();
                    expect(body.refreshToken).toBeDefined();
                    expect(body.accessTokenExpires).toBeDefined();
                    expect(body.refreshTokenExpires).toBeDefined();
                    expect(body.user.id).toBeDefined();
                    expect(body.user.roleId).toBeDefined();
                    //@ts-expect-error dto error
                    expect(body.user.password).not.toBeDefined();
                });
        });
    });

    describe('Logged in user', () => {
        let refreshToken: LoginResDto['refreshToken'];

        beforeAll(async () => {
            await request(app)
                .post('/api/auth/login')
                .send({ email: userEmail, password: userPassword })
                .then(({ body }: { body: LoginResDto }) => {
                    refreshToken = body.refreshToken;
                });
        });

        it('should get new refresh token: /api/auth/refresh (POST)', () => {
            return request(app)
                .post('/api/auth/refresh')
                .set('Cookie', ['refresh_token=' + refreshToken])
                .then(({ body }: { body: RefreshTokenResDto }) => {
                    expect(body.accessToken).toBeDefined();
                    expect(body.refreshToken).toBeDefined();
                    expect(body.accessTokenExpires).toBeDefined();
                    expect(body.refreshTokenExpires).toBeDefined();
                    expect(body.user?.id).toBeDefined();
                    expect(body.user?.roleId).toBeDefined();
                    //@ts-expect-error dto error
                    expect(body.user.password).not.toBeDefined();
                });
        });
    });
});
