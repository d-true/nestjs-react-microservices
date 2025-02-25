import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './enteties/user.entity';
import { UserService } from './user.service';
import { FileService } from '../file/file.service';

describe('UserService', () => {
    let service: UserService;
    let userRepositoryValue: Partial<
        Record<keyof Repository<UserEntity>, jest.Mock>
    >;
    let fileServiceValue: Partial<Record<keyof FileService, jest.Mock>>;

    beforeAll(async () => {
        userRepositoryValue = {
            findOne: jest.fn(),
        };

        fileServiceValue = {
            uploadFile: jest.fn(),
            deleteFile: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: userRepositoryValue,
                },
                {
                    provide: FileService,
                    useValue: fileServiceValue,
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
