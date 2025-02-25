import { AppResponse } from '../constants/app.constants';

export class AppErrorResDto {
    message: AppResponse.ERROR;
    error: string;
}
