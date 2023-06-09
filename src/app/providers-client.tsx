'use client';

import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store";
import { ThemeProvider } from "next-themes"
import { SessionProvider } from "next-auth/react"


export function ClientProviders({ children }: {
    children: React.ReactNode
}) {
    'use client';
    return (
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem >
            <SessionProvider>
            <ReduxProvider store={store} >
                {children}
                </ReduxProvider>
            </SessionProvider>
        </ThemeProvider>
    )
}