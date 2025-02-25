import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '../comment/comment.entity';
import { LessThan, Repository } from 'typeorm';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(CommentEntity)
        private readonly commentRepository: Repository<CommentEntity>,
    ) {}

    private readonly logger = new Logger('TaskService');

    @Cron('* * 0 * * *')
    async handleCron() {
        const result = await this.commentRepository.delete({
            deleteOn: LessThan(new Date()),
        });

        this.logger.debug(
            `Task service deleted successfully. ${JSON.stringify(result)}`,
        );
    }
}
