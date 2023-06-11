'use client';

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface loggedProviders {
    id: string,
    provider: string
}

interface ProvidersState {
    loggedProviders: loggedProviders[]
}

const initialState: ProvidersState = {
    loggedProviders: []
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
        }
    },
});

export const { setProviders, removeProvider } = providersSlice.actions;

export const providersReducer = providersSlice.reducer;