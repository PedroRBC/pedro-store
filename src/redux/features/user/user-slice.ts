'use client';

import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const CookieTime = 7 * 24 * 60 * 60;

interface UserState {
    token: string | null,
    username: string,
    email: string,
}

const initialState: UserState = {
    token: getCookie('token')?.toString() || null,
    username: getCookie('username')?.toString() || "",
    email: getCookie('email')?.toString() || "",
};

export const userSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.token = '123';
            state.username = action.payload;
            setCookie('token', '123', { maxAge: CookieTime });
            setCookie('username', action.payload, { maxAge: CookieTime });
        },
        logout: (state) => {
            state.token = null;
            state.username = "";
            state.email = "";
            deleteCookie('token');
            deleteCookie('username');
        }
    },
});

export const { login, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;