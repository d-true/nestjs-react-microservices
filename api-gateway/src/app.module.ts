import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { ApiModule } from './api/api.module';
import { LogModule } from './logger/logger.module';
import microservicesConfig from './config/microservices.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [appConfig, microservicesConfig],
            envFilePath: ['.env'],
        }),
        ApiModule,
        LogModule,
    ],
})
export class AppModule {}
