import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../config/config.type';
import { Params } from 'nestjs-pino';
import { Options } from 'pino-http';
import { join } from 'path';
import pino from 'pino';

function loggerFactory(configService: ConfigService<AllConfigType>): Params {
    const logLevel = configService.get('app.logLevel', { infer: true });
    const logFile = configService.get('app.logFile', { infer: true });
    const logFilePath = configService.getOrThrow('app.logFilePath', {
        infer: true,
    });
    const logFileLimit = configService.getOrThrow('app.logFileLimit', {
        infer: true,
    });
    const logFileSize = configService.getOrThrow('app.logFileSize', {
        infer: true,
    });

    const transportTargets: pino.TransportTargetOptions[] = [
        {
            target: 'pino-pretty',
            options: {
                singleLine: true,
                ignore: 'req.id,req.method,req.url,req.headers,req.remoteAddress,req.remotePort,res.headers',
            },
        },
    ];

    if (logFile) {
        transportTargets.push({
            target: 'pino-roll',
            options: {
                file: join(logFilePath, 'log'),
                mkdir: true,
                size: logFileSize,
                dateFormat: 'yyyy-MM-dd',
                frequency: 'daily',
                limit: { count: logFileLimit },
            },
        });
    }

    const pinoHttpOptions: Options = {
        level: logLevel,
        messageKey: 'msg',
        timestamp: () => `,"timestamp":"${new Date(Date.now()).toISOString()}"`,
        transport: {
            targets: transportTargets,
        },
    };

    return {
        pinoHttp: pinoHttpOptions,
    };
}

export default loggerFactory;
