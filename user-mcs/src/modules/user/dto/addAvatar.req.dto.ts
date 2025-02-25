import { File } from '../../file/file.types';
import { IsString, IsNotEmpty } from 'class-validator';

export class AddAvatarReqDto {
    @IsString()
    id: string;
    @IsNotEmpty()
    file: File;
}
