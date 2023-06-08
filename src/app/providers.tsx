import { ClerkProvider } from '@clerk/nextjs'
import { ClientProviders } from './providers-client'

export function Providers({ children }: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider
            appearance={{
                layout: {
                    socialButtonsPlacement: "bottom",
                    socialButtonsVariant: "iconButton",
                }
            }}
        >
            <ClientProviders>
                {children}
            </ClientProviders>
        </ClerkProvider>
    )
}
