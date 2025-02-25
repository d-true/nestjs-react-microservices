import { AppResponse } from '../../../constants/app.constants';

export class AddAvatarResDto {
    message!: AppResponse.SUCCESS;
    avatar!: string;
}
