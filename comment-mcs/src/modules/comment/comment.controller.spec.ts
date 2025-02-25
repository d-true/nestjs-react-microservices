import { Test, TestingModule } from '@nestjs/testing';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

describe('CommentController', () => {
    let controller: CommentController;
    let usersServiceValue: Partial<Record<keyof CommentService, jest.Mock>>;

    beforeAll(async () => {
        usersServiceValue = {
            getAllComments: jest.fn(),
            addComment: jest.fn(),
            deleteComment: jest.fn(),
            editComment: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [CommentController],
            providers: [
                {
                    provide: CommentService,
                    useValue: usersServiceValue,
                },
            ],
        }).compile();

        controller = module.get<CommentController>(CommentController);
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
