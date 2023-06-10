'use client';

import { useSession, signOut } from "next-auth/react";
import { Icons } from "@/components/icons"

import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function UserDropdown() {
    const { data: session } = useSession()

    return (
        <>

            {!session && (
                <Button variant="outline" asChild className="mr-3">
                    <Link href="/login" >
                        <span>Login</span>
                        <Icons.logIn className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            )}

            <DropdownMenu  >
                <DropdownMenuTrigger asChild>
                    {session ? (
                        <Avatar className='cursor-pointer'>
                            <AvatarImage src={session.user?.image!} />
                            <AvatarFallback>{session.user?.name!}</AvatarFallback>
                        </Avatar>
                    ) : <Icons.avatar width={40} height={40} className="cursor-pointer" />}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" >
                    <DropdownMenuLabel className="justify-center" >
                        {session ? `${session.user?.name}` : "Guest"}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <ThemeToggle />
                    {
                        session && (
                            <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => signOut()}>
                                    <Icons.logOut className="mr-2 h-4 w-4" />
                                    <span>Logout</span>
                                </DropdownMenuItem>
                            </>
                        )
                    }
                </DropdownMenuContent>
            </DropdownMenu>

        </>
    )
}