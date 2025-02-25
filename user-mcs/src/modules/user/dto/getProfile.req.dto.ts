import { IsString } from 'class-validator';

export class GetProfileReqDto {
    @IsString()
    id!: string;
}
