import { ApiProperty } from '@nestjs/swagger';
import { Optional } from '@nestjs/common';

export class CommentResDto {
    @ApiProperty()
    id!: string;
    // delete for user type
    @ApiProperty()
    @Optional()
    userId?: string;
    @ApiProperty()
    text!: string;
    @ApiProperty()
    createdAt!: Date;
    @ApiProperty()
    deleteOn?: Date;
}
