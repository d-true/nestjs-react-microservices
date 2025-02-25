import {
    type ArgumentsHost,
    Catch,
    type ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../config/config.type';
import { Request } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    private debug: boolean = false;
    private readonly logger = new Logger(GlobalExceptionFilter.name);

    constructor(private readonly configService: ConfigService<AllConfigType>) {}

    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const request: Request = ctx.getRequest();

        // console.log(request);

        const httpStatus =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const message =
            exception instanceof HttpException
                ? exception.getResponse()
                : 'Internal Server Error';

        this.debug = this.configService.getOrThrow('app.debug', {
            infer: true,
        });

        const error = {
            route: request.route ? (request.route as object) : null,
            httpStatus,
            message,
            stack: '',
            trace: {},
        };

        if (this.debug) {
            if (exception instanceof Error) {
                error.stack = exception.stack ?? '';
                error.trace = exception;
            }
        }

        this.logger.error(error);

        throw exception;
    }
}
