import { AppResponse } from '../../../constants/app.constants';
import { TokenDto } from './token.dto';
import { UserResDto } from './user.dto';

export class RegisterResDto extends TokenDto {
    message: AppResponse.SUCCESS;
    user: UserResDto;
}
