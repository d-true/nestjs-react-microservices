import { AppResponse } from '../../../constants/app.constants';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyAccessTokenResDto {
    @ApiProperty()
    message!: AppResponse.SUCCESS;
    @ApiProperty()
    payload!: {
        id: string;
        role: string;
        sessionId: string;
        iat: number;
        exp: number;
    };
}
