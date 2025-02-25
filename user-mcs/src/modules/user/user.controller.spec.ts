import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
    let controller: UserController;
    let usersServiceValue: Partial<Record<keyof UserService, jest.Mock>>;

    beforeAll(async () => {
        usersServiceValue = {
            getAllUsers: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: usersServiceValue,
                },
            ],
        }).compile();

        controller = module.get<UserController>(UserController);
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
