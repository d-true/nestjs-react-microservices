import { ApiProperty } from '@nestjs/swagger';

export class TokenResDto {
    @ApiProperty()
    accessToken!: string;
    @ApiProperty()
    refreshToken!: string;
    @ApiProperty()
    accessTokenExpires!: number;
    @ApiProperty()
    refreshTokenExpires!: number;
}
