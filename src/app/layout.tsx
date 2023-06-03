import 'tailwindcss/tailwind.css'
import { Inter } from 'next/font/google'
import { Providers } from '@/redux/provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pedro Store',
  description: 'Loja do pedro :)',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Providers>
        <body className={`${inter.className}`} >{children}</body>
      </Providers>
    </html>
  )
}
