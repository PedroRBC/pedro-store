
import Link from "next/link";

import { Lottie } from "@/components/Lottie";
import Auth from "../../../../../public/auth.json"
import { LoginForm } from "@/components/forms/LoginForm";
import { SignIn } from "@clerk/nextjs";


export const metadata = {
    title: 'Login',
}

export default function Login() {


    return (
        <div className="container relative flex max-w-none flex-col justify-center md:grid md:grid-cols-2" suppressHydrationWarning>
            <Link
                href="/sign-up"
                className="absolute right-8 top-8 text-xl"
            >
                Signup
            </Link>

            <div className="relative hidden flex-col justify-center border-r border-border p-8 md:flex" >
                <Lottie animationData={Auth} />
            </div>

            <div className="flex p-8" >
                <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6 sm:w-[350px]" >
                    <SignIn signUpUrl="/sing-up" />
                </div>
            </div>
        </div>
    )
}
