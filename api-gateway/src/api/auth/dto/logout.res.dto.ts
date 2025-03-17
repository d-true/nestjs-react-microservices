import { AppResponse } from '../../../common/constants/app.constants';
import { ApiEnumType } from '../../../common/decorators/field.decorators';

export class LogoutResDto {
    @ApiEnumType(AppResponse.SUCCESS)
    message!: AppResponse.SUCCESS;
}
