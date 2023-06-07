import Link from "next/link";

import Auth from "../../../../public/auth.json"
import { Lottie } from "@/components/Lottie";
import { SingUpForm } from "@/components/forms/SignUpForm";

export const metadata = {
    title: 'Signup',
}

export default function Signup() {

    return (
        <div className="container relative flex min-h-screen max-w-none flex-col justify-center md:grid md:min-h-0 md:grid-cols-2">
            <Link
                href="/login"
                className="absolute right-8 top-8 text-xl"
            >
                Login
            </Link>

            <div className="relative hidden flex-col justify-center border-r border-border p-8 md:flex " >
                <Lottie animationData={Auth} />
            </div>

            <div className="flex p-8" >
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]" >
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Create an account
                        </h1>
                        <p className="text-base text-muted-foreground">
                            Enter your email and password below to create your account
                        </p>
                    </div>
                    <SingUpForm />
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        By clicking continue, you agree to our{" "}
                        <Link
                            href="/terms"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                            href="/privacy"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Privacy Policy
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </div>
    )
}
