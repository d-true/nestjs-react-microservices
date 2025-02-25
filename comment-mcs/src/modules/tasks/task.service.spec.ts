import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from '../comment/comment.entity';
import { CommentService } from '../comment/comment.service';

describe('TaskService', () => {
    let service: CommentService;
    let commentRepositoryValue: Partial<
        Record<keyof Repository<CommentEntity>, jest.Mock>
    >;

    beforeAll(async () => {
        commentRepositoryValue = {
            delete: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommentService,
                {
                    provide: getRepositoryToken(CommentEntity),
                    useValue: commentRepositoryValue,
                },
            ],
        }).compile();

        service = module.get<CommentService>(CommentService);
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
