import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenService } from '../token/token.service';

describe('AuthController', () => {
    let controller: AuthController;
    let authServiceValue: Partial<Record<keyof AuthService, jest.Mock>>;
    let tokenServiceValue: Partial<Record<keyof TokenService, jest.Mock>>;

    beforeAll(async () => {
        authServiceValue = {
            login: jest.fn(),
            register: jest.fn(),
            logOut: jest.fn(),
        };
        tokenServiceValue = {
            createSessionAndToken: jest.fn(),
            verifyToken: jest.fn(),
            verifyAccessToken: jest.fn(),
            refreshToken: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: authServiceValue,
                },
                {
                    provide: TokenService,
                    useValue: tokenServiceValue,
                },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
