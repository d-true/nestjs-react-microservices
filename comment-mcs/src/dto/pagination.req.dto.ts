import { Order } from '../constants/app.constants';
import { IsOptional, IsEnum, IsInt } from 'class-validator';

export class PaginationReqDto {
    @IsOptional()
    @IsInt()
    limit?: number;
    @IsOptional()
    @IsInt()
    page?: number;
    @IsOptional()
    @IsEnum(Order)
    order?: Order;
    offset?: number;
}
