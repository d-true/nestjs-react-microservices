import { ApiProperty } from '@nestjs/swagger';
import { TokenResDto } from './token.res.dto';
import { AppResponse } from '../../../constants/app.constants';
import { UserAuthResDto } from './user.auth.res.dto';

export class RegisterResDto extends TokenResDto {
    @ApiProperty()
    message!: AppResponse.SUCCESS;
    @ApiProperty()
    user!: UserAuthResDto;
}
