'use client';

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface loggedProviders {
    id: string,
    provider: string
}

interface authState {
    loggedProviders: loggedProviders[],
    name: string,
}

const initialState: authState = {
    loggedProviders: [],
    name: localStorage.getItem('name') || "",
};

export const providersSlice = createSlice({
    name: "providers",
    initialState,
    reducers: {
        setProviders: (state, { payload }: PayloadAction<loggedProviders[]>) => {
            state.loggedProviders = payload
        },
        removeProvider: (state, { payload }: PayloadAction<string>) => {
            state.loggedProviders = state.loggedProviders.filter(provider => provider.id !== payload)
        },
        logout: (state) => {
            state.loggedProviders = []
            state.name = ""
            localStorage.removeItem('name')
        },
        setName: (state, { payload }: PayloadAction<string>) => {
            state.name = payload
            localStorage.setItem('name', payload)
        }
    },
});

export const { setProviders, removeProvider, logout, setName } = providersSlice.actions;

export const authReducer = providersSlice.reducer;