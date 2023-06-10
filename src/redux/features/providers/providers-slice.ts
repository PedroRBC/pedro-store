'use client';

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ProvidersState {
    loggedProviders: string[]
}

const initialState: ProvidersState = {
    loggedProviders: []
};

export const providersSlice = createSlice({
    name: "providers",
    initialState,
    reducers: {
        setProviders: (state, { payload }: PayloadAction<string[]>) => {
            state.loggedProviders = payload
        }
    },
});

export const { setProviders } = providersSlice.actions;

export const providersReducer = providersSlice.reducer;