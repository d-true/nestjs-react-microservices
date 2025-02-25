export class TokenDto {
    accessToken!: string;
    refreshToken!: string;
    accessTokenExpires!: number;
    refreshTokenExpires!: number;
}

export class RefreshTokenJwtResDto {
    hash!: string;
    sessionId!: string;
    iat!: number;
    exp!: number;
}

export class AccessTokenJwtResDto {
    id!: string;
    role!: string;
    sessionId!: string;
    iat!: number;
    exp!: number;
}
