import {Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {AppResponse} from "../common/constants/app.constants";
import {AppErrorResDto} from "../common/dto/app.res.dto";

@Injectable()
// change http status from original to ACCEPTED
export class HttpStatusErrorInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    return next
        .handle()
        .pipe(
            tap((response:unknown) => {

                if (response instanceof AppErrorResDto) {
                    if (response.message === AppResponse.ERROR) {
                        const res: {
                            status: number;
                            [key: string]: unknown;
                        } = context.switchToHttp().getResponse();
                        res.status = HttpStatus.ACCEPTED;
                    }
                }

            }),
        );
    }
}