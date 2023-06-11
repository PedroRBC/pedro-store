import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { NextRequest, NextResponse } from "next/server"
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'

export async function GET(req: NextRequest, res: NextResponse) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    try {
        const connections = await prisma.account.findMany({
            where: {
                user: {
                    email: session.user.email
                }
            },
            select: {
                id: true,
                provider: true,
                user: {
                    select: {
                        hashedPassword: true
                    }
                }
            }
        })

        const response = {
            connections: connections.map(con => { return { id: con.id, provider: con.provider } }),
            hasPassword: !!connections[0].user.hashedPassword
        }

        return NextResponse.json(response, { status: 200 })
    } catch (e) {
        console.error('API:', e)
        return new NextResponse('Internal Error', { status: 500 })
    }
}

export async function PATCH(req: NextRequest, res: NextResponse) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return new NextResponse('Unauthorized', { status: 401 })
    }
    try {
        const body = await req.json();
        if (body.newPassword) {
            const user = await prisma.user.findUnique({
                where: {
                    email: session.user.email!
                }
            })
            if (!user) {
                return new NextResponse('User not found', { status: 404 })
            }
            if (user.hashedPassword) {
                if (!body.oldPassword) {
                    return new NextResponse('Missing Fields', { status: 400 })
                } else {
                    const passwordMatch = await bcrypt.compare(body.oldPassword, user.hashedPassword);
                    if (passwordMatch) {
                        const hashedPassword = await bcrypt.hash(body.newPassword, 10);
                        await prisma.user.update({
                            where: {
                                email: session.user.email!
                            },
                            data: {
                                hashedPassword
                            }
                        })
                        return new NextResponse('Password updated', { status: 200 })
                    } else {
                        return new NextResponse('Incorrect password', { status: 401 })
                    }
                }
            } else {
                const hashedPassword = await bcrypt.hash(body.newPassword, 10);
                await prisma.user.update({
                    where: {
                        email: session.user.email!
                    },
                    data: {
                        hashedPassword
                    }
                })
                return new NextResponse('Password updated', { status: 200 })
            }
        } else {
            if (body.name) {
                await prisma.user.update({
                    where: {
                        email: session.user.email!
                    },
                    data: {
                        name: body.name
                    }
                })
                return new NextResponse('Name updated', { status: 200 })
            } else {
                return new NextResponse('Missing Fields', { status: 400 })
            }
        }

    } catch (e) {
        console.error('API:', e)
        return new NextResponse('Internal Error', { status: 500 })
    }
}