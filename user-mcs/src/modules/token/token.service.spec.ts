import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenService } from './token.service';
import { UserEntity } from '../user/enteties/user.entity';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../../config/config.type';
import { SessionEntity } from '../user/enteties/session.entity';
import { JwtService } from '@nestjs/jwt';

describe('TokenService', () => {
    let service: TokenService;
    let userRepositoryValue: Partial<
        Record<keyof Repository<UserEntity>, jest.Mock>
    >;

    let configServiceValue: Partial<
        Record<keyof ConfigService<AllConfigType>, jest.Mock>
    >;

    let sessionRepositoryValue: Partial<
        Record<keyof Repository<SessionEntity>, jest.Mock>
    >;

    let jwtServiceValue: Partial<Record<keyof JwtService, jest.Mock>>;

    beforeAll(async () => {
        userRepositoryValue = {
            findOne: jest.fn(),
            exists: jest.fn(),
            create: jest.fn(),
        };

        configServiceValue = {
            get: jest.fn(),
        };

        sessionRepositoryValue = {
            findOne: jest.fn(),
            exists: jest.fn(),
            create: jest.fn(),
        };

        jwtServiceValue = {
            signAsync: jest.fn(),
            verify: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TokenService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: userRepositoryValue,
                },
                {
                    provide: ConfigService,
                    useValue: configServiceValue,
                },
                {
                    provide: getRepositoryToken(SessionEntity),
                    useValue: sessionRepositoryValue,
                },
                {
                    provide: JwtService,
                    useValue: jwtServiceValue,
                },
            ],
        }).compile();

        service = module.get<TokenService>(TokenService);
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
