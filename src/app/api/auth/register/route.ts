import bcrypt from 'bcrypt'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password } = body;
        if (!name || !email || !password) {
            return new NextResponse('Missing Fields', { status: 400 })
        }
        const exist = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (exist) {
            return new NextResponse('Email already exists', { status: 400 })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword
            }
        })
        return NextResponse.json(user, { status: 201 });
    } catch (e) {
        return new NextResponse('Internal Error', { status: 500 })
    }
}