import {applyDecorators, Type as T} from "@nestjs/common";
import {ApiAcceptedResponse, ApiCreatedResponse, ApiOkResponse, ApiProperty} from "@nestjs/swagger";
import {AppResponse} from "../constants/app.constants";
import {Equals, IsString} from "class-validator";
import { Type } from 'class-transformer';

export const ApiEnumType = (enumKey: AppResponse) => {
    return applyDecorators(
        ApiProperty({
            enum: [enumKey],
        }),
        Equals(enumKey),
    )
}

export const ApiClassType = (classType: T, options?: {
    isArray?: boolean
}) => {
    return applyDecorators(
        ApiProperty({
            type: options?.isArray ? [classType] : classType,
        }),
        Type(() => classType),
    )
}

export const CreatedResponseType = (createdType: T, erroredType: T) => {
    return applyDecorators(
        ApiCreatedResponse({
            type: createdType
        }),
        ApiAcceptedResponse({
            type: erroredType,
        })
    )
}

export const OkResponseType = (okType: T, erroredType: T) => {
    return applyDecorators(
        ApiOkResponse({
            type: okType
        }),
        ApiAcceptedResponse({
            type: erroredType,
        })
    )
}

export const ApiCommonType = (decorator: PropertyDecorator) => {
    return applyDecorators(
        decorator,
        ApiProperty(),
    )
}