import { IsString } from 'class-validator';
export class DeleteCommentReqDto {
    @IsString()
    id!: string;
    @IsString()
    userId!: string;
}
