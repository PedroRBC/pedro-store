import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { NextRequest, NextResponse } from "next/server"
import prisma from '@/lib/prisma'

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
