import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/enteties/user.entity';
import { FileService } from './file.service';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../../config/config.type';

describe('FileService', () => {
    let service: FileService;
    let userRepositoryValue: Partial<
        Record<keyof Repository<UserEntity>, jest.Mock>
    >;

    let configServiceValue: Partial<
        Record<keyof ConfigService<AllConfigType>, jest.Mock>
    >;

    beforeAll(async () => {
        userRepositoryValue = {
            findOne: jest.fn(),
        };

        configServiceValue = {
            get: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FileService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: userRepositoryValue,
                },
                {
                    provide: ConfigService,
                    useValue: configServiceValue,
                },
            ],
        }).compile();

        service = module.get<FileService>(FileService);
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
