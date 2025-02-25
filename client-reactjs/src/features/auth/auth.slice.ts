import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
    user: {
        id: string;
        roleId: number;
    } | null;
    accessToken: string | null;
    tokenExpires: number | null;
};

const initialState: AuthState = {
    user: null,
    accessToken: null,
    tokenExpires: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, data: PayloadAction<AuthState>) => {
            state.user = data.payload.user;
            state.accessToken = data.payload.accessToken;
            state.tokenExpires = data.payload.tokenExpires;
        },
        unsetAuth: () => initialState,
    },
});

export const { setAuth, unsetAuth } = authSlice.actions;

export default authSlice.reducer;
