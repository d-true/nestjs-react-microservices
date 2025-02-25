import fetchRequest from '../fetch/fetch-request.ts';
import { setAuth, unsetAuth } from './auth.slice.ts';
import { Dispatch } from '@reduxjs/toolkit';
import {
    RefreshTokenResponse,
    LoginRequest,
    LoginResponse,
    LogoutResponse,
    RegisterRequest,
    RegisterResponse,
} from './auth.types.ts';
import fetchErrorHandler from '../fetch/fetch-error-handler.ts';

export async function login({
    data,
    dispatch,
}: {
    data: LoginRequest;
    dispatch: Dispatch;
}): Promise<void> {
    try {
        const result = await fetchRequest<LoginResponse>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
        });

        if (result.message === 'OK') {
            dispatch(
                setAuth({
                    user: result.user,
                    accessToken: result.accessToken,
                    tokenExpires: result.tokenExpires,
                }),
            );
        } else {
            fetchErrorHandler(result);
        }
    } catch (e) {
        fetchErrorHandler(e);
    }
}

export async function register({
    data,
    dispatch,
}: {
    data: RegisterRequest;
    dispatch: Dispatch;
}): Promise<void> {
    try {
        const result = await fetchRequest<RegisterResponse>('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
        });
        if (result.message === 'OK') {
            dispatch(
                setAuth({
                    user: result.user,
                    accessToken: result.accessToken,
                    tokenExpires: result.tokenExpires,
                }),
            );
        } else {
            fetchErrorHandler(result);
        }
    } catch (e) {
        fetchErrorHandler(e);
    }
}

export async function refreshToken({
    dispatch,
}: {
    dispatch: Dispatch;
}): Promise<void> {
    try {
        const result = await fetchRequest<RefreshTokenResponse>(
            '/auth/refresh',
            {
                method: 'POST',
            },
        );

        if (result.message === 'OK') {
            if (result.accessToken) {
                dispatch(
                    setAuth({
                        user: result.user,
                        accessToken: result.accessToken,
                        tokenExpires: result.tokenExpires,
                    }),
                );
            }
        } else {
            fetchErrorHandler(result);
        }
    } catch (e) {
        fetchErrorHandler(e);
    }
}

export async function logOut({
    dispatch,
}: {
    dispatch: Dispatch;
}): Promise<void> {
    try {
        const result = await fetchRequest<LogoutResponse>('/auth/logout', {
            method: 'POST',
        });
        if (result.message === 'OK') {
            dispatch(unsetAuth());
        } else {
            fetchErrorHandler(result);
        }
    } catch (e) {
        fetchErrorHandler(e);
    }
}
