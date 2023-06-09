import { ClientProviders } from './providers-client'

export function Providers({ children }: {
    children: React.ReactNode
}) {
    return (
            <ClientProviders>
                {children}
        </ClientProviders>
    )
}