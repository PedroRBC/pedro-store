import type { NextAuthOptions } from "next-auth";
import prisma from '@/lib/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from 'bcrypt'


const CredentialSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' })
})

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
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const { email, password } = CredentialSchema.parse(credentials);
                const user = await prisma.user.findUnique({
                    where: { email }
                })
                if (!user || !user?.hashedPassword) throw new Error('Invalid credentials');
                const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
                if (!passwordMatch) throw new Error('Incorrect password');
                return user;
            }            
        })
    ],
    pages: {
        signIn: '/login',
        newUser: '/',
    },
    secret: process.env.NEXTAUTH_SECRET!
}
