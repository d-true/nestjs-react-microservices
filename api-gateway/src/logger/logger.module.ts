import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import loggerFactory from './logger.factory';
import { LoggerModule } from 'nestjs-pino';

@Module({
    imports: [
        LoggerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: loggerFactory,
        }),
    ],
})
export class LogModule {}
