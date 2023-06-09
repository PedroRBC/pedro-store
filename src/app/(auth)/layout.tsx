'use client';

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
    }) {
    const { status } = useSession();
    if (status === "authenticated") {
        redirect("/")
    };
    return children
}
