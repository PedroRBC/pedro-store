import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from '@/redux/provider'
import { Metadata } from 'next'
import { cn } from '@/lib/utils'

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
    <html lang="en">
      <body className={cn(inter.className,
        "min-h-screen bg-background antialiased"
      )}>
        <Providers>
          <main className="flex min-h-screen bg-background text-primary" >
              {children}
          </main>
      </Providers>
      </body>
    </html>
  )
}
