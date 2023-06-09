'use client';

import { Button } from "./ui/button";
import Link from "next/link";

import { useSession } from 'next-auth/react'

export function User() {
    const { data: session } = useSession()

    return (
        <div className="flex flex-col items-center" >
            {session ? (
                <span> Logado como: {`${session.user?.name}`} </span>
            ) : (<div className="grid grid-cols-2 gap-4" >
                <Button asChild>
                        <Link href='/signin' className="text-xl" >
                            Login
                        </Link>
                    </Button>

                    <Button asChild>
                        <Link href='/signup' className="text-xl" >
                            Signup
                        </Link>
                    </Button>
            </div>)}
            </div>
    )
}