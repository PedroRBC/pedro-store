import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import { cn } from '@/lib/utils'
import { Header } from '@/components/header'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Pedro Store',
    template: '%s | Pedro Store'
  },
  description: 'Loja do pedro :)',
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body className={cn(inter.className,
        "min-h-screen bg-background antialiased text-primary"
      )}>
        <Providers>
          <main className="relative flex min-h-screen flex-col" >
            <Header />
            <div className='flex flex-1' >{children}</div>

          </main>
        </Providers>
        <TailwindIndicator />
      </body>
    </html>
  )
}
