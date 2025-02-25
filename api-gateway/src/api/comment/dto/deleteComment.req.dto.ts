import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteCommentReqDto {
    @ApiProperty()
    @IsString()
    id!: string;
}
