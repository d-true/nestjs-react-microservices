import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../config/config.type';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function setupSwagger(app: INestApplication) {
    const configService = app.get(ConfigService<AllConfigType>);
    const appName = configService.getOrThrow('app.name', { infer: true });

    const config = new DocumentBuilder()
        .setTitle(appName)
        .setDescription('Standard API Documentation')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document, {
        customSiteTitle: appName,
    });
}

export default setupSwagger;
