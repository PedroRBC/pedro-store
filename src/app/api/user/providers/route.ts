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
        const providers = await prisma.account.findMany({
            where: {
                user: {
                    email: session.user.email
                }
            },
            select: {
                id: true,
                provider: true,
            }
        })
        return NextResponse.json(providers, { status: 200 })
    } catch (e) {
        console.error('API:', e)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
