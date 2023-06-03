'use client';

import { ReactNode } from "react";

import { Provider } from "react-redux";

import { store } from "./store";

interface ProviderInterface {
    children: ReactNode
}

export const Providers = ({ children }: ProviderInterface) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}