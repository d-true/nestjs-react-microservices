import * as request from 'supertest';
import * as process from 'node:process';
import { LoginResDto } from '../../src/api/auth/dto/login.res.dto';
import { GetProfileResDto } from '../../src/api/profile/dto/getProfile.res.dto';

describe('API User Module', () => {
    const app = process.env.APP_URL as string;
    const userEmail = `admin@admin.com`;
    const userPassword = `12345678`;

    describe('Profile actions', () => {
        let accessToken: LoginResDto['accessToken'];

        beforeAll(async () => {
            await request(app)
                .post('/api/auth/login')
                .send({ email: userEmail, password: userPassword })
                .then(({ body }: { body: LoginResDto }) => {
                    accessToken = body.accessToken;
                });
        });

        it('should get profile info: /api/profile (GET)', () => {
            return request(app)
                .get('/api/profile')
                .auth(accessToken, {
                    type: 'bearer',
                })
                .then(({ body: { profile } }: { body: GetProfileResDto }) => {
                    expect(profile.id).toBeDefined();
                    expect(profile.email).toBeDefined();
                    expect(profile.name).toBeDefined();
                    expect(profile.avatar).toBeDefined();
                    expect(profile.role?.id).toBeDefined();
                    expect(profile.role?.name).toBeDefined();
                    //@ts-expect-error dto error
                    expect(profile.password).not.toBeDefined();
                });
        });
    });
});
