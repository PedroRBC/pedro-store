import Link from "next/link";

import { Lottie } from "@/components/Lottie";
import Auth from "../../../../public/auth.json"
import { LoginForm } from "@/components/forms/LoginForm";

export const metadata = {
    title: 'Login',
}

export default function Login() {

    return (
        <div className="container flex-col items-center grid max-w-none grid-cols-2 px-0">
            <Link
                href="/signup"
                className="absolute right-8 top-8 text-xl"
            >
                Signup
            </Link>

            <div className="relative flex h-full flex-col border-r border-border " >
                <Lottie animationData={Auth} />
            </div>

            <div className="p-8" >
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]" >
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Login to your account
                        </h1>
                    </div>
                    <LoginForm />

                </div>
            </div>
        </div>
    )
}
