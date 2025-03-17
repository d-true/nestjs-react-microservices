import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { AllConfigType } from './config/config.type';
import {
    VersioningType,
    ValidationPipe,
    HttpStatus,
    ValidationError,
    UnprocessableEntityException,
} from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import setupSwagger from './utils/swagger';
import * as cookieParser from 'cookie-parser';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { StriptagsPipe } from './pipes/striptags.pipe';
import {HttpStatusErrorInterceptor} from "./interceptors/http-status.interceptor";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useLogger(app.get(Logger));
    app.use(cookieParser());

    // Setup security headers
    app.use(helmet());

    const configService = app.get(ConfigService<AllConfigType>);
    const corsOrigin = configService.getOrThrow('app.corsOrigin', {
        infer: true,
    });
    app.enableCors({
        origin: corsOrigin,
        credentials: true,
    });
    console.info('CORS Origin:', corsOrigin);

    const isDevelopment =
        configService.getOrThrow('app.nodeEnv', { infer: true }) ===
        'development';

    app.setGlobalPrefix(
        configService.getOrThrow('app.apiPrefix', { infer: true }),
        {
            exclude: ['/', '/swagger'],
        },
    );

    //if (isDevelopment) {
    setupSwagger(app);
    //}
    app.enableVersioning({
        type: VersioningType.URI,
    });

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            transformOptions: { enableImplicitConversion: true },
            whitelist: true,
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            exceptionFactory: (errors: ValidationError[]) => {
                return new UnprocessableEntityException(errors);
            },
        }),
    );

    app.useGlobalPipes(new StriptagsPipe());
    app.useGlobalFilters(new GlobalExceptionFilter(configService));
    app.useGlobalInterceptors(new HttpStatusErrorInterceptor());

    await app.listen(configService.getOrThrow('app.port', { infer: true }));

    console.info(`Server running on ${await app.getUrl()}`);

    return app;
}

void bootstrap();
