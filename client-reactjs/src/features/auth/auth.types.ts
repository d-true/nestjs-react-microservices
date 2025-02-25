import {
    AppResponse,
    AppResponseError,
    AppResponseSuccess,
} from '../app.types.ts';

export type LoginRequest = {
    email: string;
    password: string;
};

export type RegisterRequest = {
    email: string;
    password: string;
};

type Token = {
    userId: string;
    accessToken: string;
    tokenExpires: number;
    refreshToken: string;
};

type UserAuthResponse = {
    id: string;
    roleId: number;
};

export type LoginResponse =
    | (AppResponseSuccess &
          Token & {
              user: UserAuthResponse | null;
          })
    | AppResponseError;

export type RefreshTokenResponse = LoginResponse;
export type RegisterResponse = LoginResponse;

export type LogoutResponse = AppResponse;
