import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { CommentService } from './comment.service';

describe('CommentService', () => {
    let service: CommentService;
    let commentRepositoryValue: Partial<
        Record<keyof Repository<CommentEntity>, jest.Mock>
    >;

    beforeAll(async () => {
        commentRepositoryValue = {
            findOne: jest.fn(),
            delete: jest.fn(),
            update: jest.fn(),
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
