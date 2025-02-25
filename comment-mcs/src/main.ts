import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { Transport, AsyncMicroserviceOptions } from '@nestjs/microservices';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { AllConfigType } from './config/config.type';
import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { appResponseError } from './utils/app-response.util';
import { ERROR_RESPONSES } from './constants/errors.constants';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<AsyncMicroserviceOptions>(
        AppModule,
        {
            useFactory: (configService: ConfigService) => ({
                transport: Transport.TCP,
                options: {
                    host: configService.get('app.host'),
                    port: configService.get('app.port'),
                },
            }),
            inject: [ConfigService],
        },
    );

    const configService = app.get(ConfigService<AllConfigType>);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            exceptionFactory: (errors: ValidationError[]) => {
                return appResponseError(
                    ERROR_RESPONSES.GLOBAL.VALIDATION_ERROR,
                    errors.toString(),
                );
            },
        }),
    );

    app.useGlobalFilters(new GlobalExceptionFilter(configService));
    app.useLogger(app.get(Logger));
    await app.listen();
}

void bootstrap();
