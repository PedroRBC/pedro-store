import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    console.log(params)
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return new NextResponse('Unauthorized', { status: 401 })
    }
    if (!params.id) {
        return new NextResponse('Missing Fields', { status: 400 })
    }
    try {
        const account = await prisma.account.findUnique({
            where: {
                id: params.id
            },
            select: {
                id: true
            }
        })
        if (!account) {
            return new NextResponse('Not Found', { status: 404 })
        }
        await prisma.account.delete({
            where: {
                id: account.id
            }
        })
        return new NextResponse('Deleted', { status: 201 })
    } catch (e) {
        console.error('API:', e)
        return new NextResponse('Internal Error', { status: 500 })
    }
}