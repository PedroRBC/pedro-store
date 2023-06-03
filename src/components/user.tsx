'use client';

import { useAppSelector } from "@/redux/selector"
import { Button } from "./ui/button";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/user/user-slice"
import { Icons } from "./icons";

export function User() {
    const user = useAppSelector(state => state.user)
    const dispatch = useDispatch();

    function handleLogout() {
        dispatch(logout())
    }

    if (user.isAuthenticated) {
        return (

            <div className="flex flex-col items-center" >
                <p> Welcome {user.username}! </p>

                <Button onClick={handleLogout} className="gap-2" >
                    <Icons.logOut /> Logout
                </Button>
            </div>

        )
    } else {
        return (
            <div className="flex flex-col items-center" >
                <p> Not authorized! </p>
                <div className="grid grid-cols-2 gap-4" >
                    <Button asChild>
                        <Link href='/login' className="text-xl" >
                            Login
                        </Link>
                    </Button>

                    <Button asChild>
                        <Link href='/signup' className="text-xl" >
                            Signup
                        </Link>
                    </Button>
                </div>
            </div>
        )
    }
}