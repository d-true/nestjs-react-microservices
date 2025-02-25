import { AppResponse } from '../../../constants/app.constants';
import { ProfileDto } from './profile.dto';

export class GetProfileResDto {
    message!: AppResponse.SUCCESS;
    profile!: ProfileDto;
}
