import { IsString } from 'class-validator';

export class RemoveAvatarReqDto {
    @IsString()
    id!: string;
}
