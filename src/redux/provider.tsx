'use client';

import { ReactNode } from "react";

import { Provider } from "react-redux";

import { store } from "./store";
import { ThemeProvider } from "@/components/theme-provider";

interface ProviderInterface {
    children: ReactNode
}

export const Providers = ({ children }: ProviderInterface) => {
    return (
        <Provider store={store}>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem >
                {children}
            </ThemeProvider>
        </Provider>
    )
}