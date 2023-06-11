'use client';

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface loggedProviders {
    id: string,
    provider: string
}

interface data {
    connections: loggedProviders[],
    hasPassword: boolean
}

interface authState {
    connections: loggedProviders[],
    name: string,
    hasPassword: boolean
}

const initialState: authState = {
    connections: [],
    name: typeof window !== "undefined" ? (window.localStorage.getItem('name') || "") : "",
    hasPassword: false
};

export const providersSlice = createSlice({
    name: "providers",
    initialState,
    reducers: {
        setData: (state, { payload }: PayloadAction<data>) => {
            state.connections = payload.connections
            state.hasPassword = payload.hasPassword
        },
        setHasPassword: (state, { payload }: PayloadAction<boolean>) => {
            state.hasPassword = payload
        },
        removeProvider: (state, { payload }: PayloadAction<string>) => {
            state.connections = state.connections.filter(provider => provider.id !== payload)
        },
        logout: (state) => {
            state.connections = []
            state.name = ""
            localStorage.removeItem('name')
        },
        setName: (state, { payload }: PayloadAction<string>) => {
            state.name = payload
            localStorage.setItem('name', payload)
        }
    },
});

export const { setData, removeProvider, logout, setName } = providersSlice.actions;

export const authReducer = providersSlice.reducer;