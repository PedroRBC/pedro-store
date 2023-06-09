'use client';

import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store";
import { ThemeProvider } from "next-themes"

export function ClientProviders({ children }: {
    children: React.ReactNode
}) {
    'use client';
    return (
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem >
            <ReduxProvider store={store} >
                {children}
            </ReduxProvider>
        </ThemeProvider>
    )
}