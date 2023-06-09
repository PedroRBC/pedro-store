import { ClerkProvider } from '@clerk/nextjs'
import { ClientProviders } from './providers-client'
import { cn } from '@/lib/utils'

export function Providers({ children }: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider
            appearance={{
                layout: {
                    socialButtonsPlacement: "bottom",
                    socialButtonsVariant: "iconButton",
                    shimmer: false
                },
                variables: {
                    colorBackground: 'transparent',
                },
                elements: {
                    card: 'border-border bg-background',
                    headerTitle: 'text-2xl text-primary font-semibold tracking-tight',
                    headerSubtitle: 'text-sm text-primary font-normal tracking-tight',
                    formFieldLabel__identifier: 'text-primary',
                    formFieldLabel: 'text-primary',
                    formFieldInfoText__password: 'text-primary',
                    footerActionText: 'text-primary',
                    dividerLine: 'bg-border',
                    dividerText: 'text-primary',
                    socialButtonsIconButton: 'border-border dark:dark',
                    navbar: 'border-border',
                    navbarButton: 'text-primary',
                    profileSectionTitleText: 'text-primary',
                    profileSectionContent: 'text-primary',
                    userPreviewTextContainer: 'text-primary',
                    accordionTriggerButton: 'text-primary',
                    accordionContent: 'text-primary',
                    userButtonPopoverActionButtonText: 'text-primary',
                    userButtonPopoverActionButtonIcon: 'text-primary',
                    userButtonPopoverFooter: 'border-border text-primary',
                    userPreviewSecondaryIdentifier: 'text-primary',
                },
            }}
        >
            <ClientProviders>
                {children}
            </ClientProviders>
        </ClerkProvider>
    )
}