"use client"

import { SessionProvider as NextAuthProvider, type SessionProviderProps } from "next-auth/react"

export function SessionProvider({ children, ...props }: SessionProviderProps) {
    return <NextAuthProvider {...props} > {children} </NextAuthProvider>
}