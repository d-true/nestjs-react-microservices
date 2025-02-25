import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { DbModule } from './database/database.module';
import { LogModule } from './logger/logger.module';
import { CommentModule } from './modules/comment/comment.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from './modules/tasks/task.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [appConfig, databaseConfig],
            envFilePath: ['.env'],
        }),
        ScheduleModule.forRoot(),
        CommentModule,
        DbModule,
        LogModule,
        TaskModule,
    ],
})
export class AppModule {}
