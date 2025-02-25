import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from '../comment/comment.entity';
import { TaskService } from './task.service';

@Module({
    imports: [TypeOrmModule.forFeature([CommentEntity])],
    controllers: [],
    providers: [TaskService],
})
export class TaskModule {}
