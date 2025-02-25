import { ApiProperty } from '@nestjs/swagger';
import { AppResponse } from '../../../constants/app.constants';
import { TokenResDto } from './token.res.dto';
import { UserAuthResDto } from './user.auth.res.dto';

export class LoginResDto extends TokenResDto {
    @ApiProperty()
    message!: AppResponse.SUCCESS;
    @ApiProperty()
    user!: UserAuthResDto;
}
