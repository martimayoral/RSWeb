import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { LicencePermision } from '../../assets/global';

export type AuthStatus = "auth_error" | "auth_success" | "auth_pending" | "no_auth" | "loading"

export interface IAuthSlice {
    username: string | undefined,
    authStatus: AuthStatus,
    userId: string | undefined,
    token: string | undefined,
    licencePermisions: LicencePermision | undefined
}

const initialState: IAuthSlice = {
    username: undefined,
    userId: undefined,
    licencePermisions: undefined,
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
                state.licencePermisions = undefined
            }
        },
        authFromToken: () => { },
        setAuthToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },
        setUserId: (state, action: PayloadAction<string>) => {
            state.userId = action.payload
        },
        setLicencePermisions: (state, action: PayloadAction<LicencePermision>) => {
            state.licencePermisions = action.payload
        },
        setUserName: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
    },
});

export const { actions: authActions, reducer: authReducer } =
    authSlice;
