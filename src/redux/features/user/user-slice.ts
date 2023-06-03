'use client';

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    isAuthenticated: boolean,
    username: string,
    email: string,
    password: string,
}

type LoginPayload = {
    username: string,
    password: string,
}

const initialState: UserState = {
    isAuthenticated: false,
    username: "",
    email: "",
    password: ""
};

export const userSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<LoginPayload>) => {
            state.isAuthenticated = true;
            state.username = action.payload.username;
            state.password = action.payload.password;
        },
        logout: (state) => {
            state.isAuthenticated = false;
        }
    },
});

export const { login, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;