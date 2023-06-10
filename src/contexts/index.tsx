import { ReduxProvider } from "./ReduxProvider";
import { SessionProvider } from "./SessionProvider"
import { ThemeProvider } from "./ThemeProvider"


import { store } from "@/redux/store";

export function Providers({ children }: { children: React.ReactNode }) {

    return (
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem >
            <ReduxProvider store={store}>
                <SessionProvider>
                    {children}
                </SessionProvider>
            </ReduxProvider>
        </ThemeProvider>
    )
}