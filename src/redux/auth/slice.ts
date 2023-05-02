import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

export type AuthStatus = "auth_error" | "auth_success" | "auth_pending" | "no_auth" | "loading"

export interface IAuthSlice {
    username: string | undefined,
    authStatus: AuthStatus,
    userId: string | undefined,
    token: string | undefined,
    range: number
}

const initialState: IAuthSlice = {
    username: undefined,
    userId: undefined,
    range: 0,
    authStatus: "loading",
    token: Cookies.get("auth")
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logInRequest: (state, action: PayloadAction<{ username: string, password: string }>) => { },
        setAuthStatus: (state, action: PayloadAction<AuthStatus>) => {
            console.log("set auth status", action.payload)
            state.authStatus = action.payload
            if (action.payload === "no_auth") {
                state.userId = undefined
                state.username = undefined
                state.range = 0
            }
        },
        authFromToken: () => { },
        setAuthToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },
        setUserId: (state, action: PayloadAction<string>) => {
            state.userId = action.payload
        },
        setRange: (state, action: PayloadAction<number>) => {
            state.range = action.payload
        },
        setUserName: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
    },
});

export const { actions: authActions, reducer: authReducer } =
    authSlice;
