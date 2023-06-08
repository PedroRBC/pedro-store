import { ThemeProvider } from "@/components/theme-provider"
import { ReduxProvider } from "@/redux/redux-provider"


export function Providers({ children }: {
    children: React.ReactNode
}) {
    return (
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem >
            <ReduxProvider>
                {children}
            </ReduxProvider>
        </ThemeProvider>
    )
}