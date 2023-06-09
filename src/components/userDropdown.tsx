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
import { SkeletonUserAvatar } from "./skeletons/userAvatar";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/auth/auth-slice";
import { useAppSelector } from "@/redux/selector";

export function UserDropdown() {
    const { data: session } = useSession()
    const { loading, name } = useAppSelector(state => state.auth);
    const dispatch = useDispatch()

    if (loading) return <SkeletonUserAvatar />

    function handleLogout() {
        dispatch(logout())
        signOut()
    }

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

            <DropdownMenu dir="rtl" >
                <DropdownMenuTrigger asChild>
                    {session?.user?.image ? (
                        <Avatar className='cursor-pointer'>
                            <AvatarImage src={session.user?.image!} />
                            <AvatarFallback>{session.user?.name!}</AvatarFallback>
                        </Avatar>
                    ) : <Icons.avatar width={40} height={40} className="cursor-pointer" />}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" >
                    <DropdownMenuLabel className="justify-center" >
                        {session ? name : "Guest"}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <ThemeToggle />
                    {
                        session && (
                            <>  <DropdownMenuSeparator />
                                <Link href='/settings'>
                                    <DropdownMenuItem>
                                        <Icons.cog className="ml-2 h-5 w-5" />
                                        <span>Settings</span>

                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleLogout()}>
                                    <Icons.logOut className="ml-2 h-4 w-4" />
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