import { Order } from '../constants/app.constants';
import { IsOptional, IsEnum, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationReqDto {
    @ApiProperty()
    @IsOptional()
    @IsInt()
    limit?: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    page?: number;

    @ApiProperty()
    @IsOptional()
    @IsEnum(Order)
    order?: Order;
    offset?: number;
}
