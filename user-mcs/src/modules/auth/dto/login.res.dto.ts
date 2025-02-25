import { AppResponse } from '../../../constants/app.constants';
import { TokenDto } from './token.dto';
import { UserResDto } from './user.dto';

export class LoginResDto extends TokenDto {
    message!: AppResponse.SUCCESS;
    user!: UserResDto;
}
