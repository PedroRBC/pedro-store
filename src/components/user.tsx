
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";

export function User() {

    return (
        <div className="flex flex-col items-center" >
            <SignedIn>
                <UserButton />
            </SignedIn>
            <SignedOut>
                <div className="grid grid-cols-2 gap-4" >
                    <Button asChild>
                        <Link href='/sign-in' className="text-xl" >
                            Login
                        </Link>
                    </Button>

                    <Button asChild>
                        <Link href='/sign-up' className="text-xl" >
                            Signup
                        </Link>
                    </Button>
                </div>
            </SignedOut>
            </div>
    )
}