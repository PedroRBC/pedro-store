import type { NextAuthOptions } from "next-auth";
import prisma from '@/lib/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    pages: {
        signIn: '/signin',
        newUser: '/',
    },
    secret: process.env.NEXTAUTH_SECRET!
}
