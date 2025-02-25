import { AppResponse } from '../../../constants/app.constants';
import { ApiProperty } from '@nestjs/swagger';

export class LogoutResDto {
    @ApiProperty()
    message: AppResponse.SUCCESS;
}
