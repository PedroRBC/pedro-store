import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return new NextResponse('Unauthorized', { status: 401 })
    }
    if (!params.id) {
        return new NextResponse('Missing Fields', { status: 400 })
    }
    try {
        await prisma.account.delete({
            where: {
                id: params.id
            }
        })
    } catch (e) {
        console.error('API:', e)
        return new NextResponse('Internal Error', { status: 500 })
    }
}