
import { Lottie } from "@/components/Lottie";
import Auth from "../../../../../public/auth.json"
import { LoginForm } from "@/components/forms/LoginForm";

export const metadata = {
    title: 'Login',
}

export default function Login() {

    return (
        <div className="container relative flex max-w-none flex-col justify-center md:grid md:grid-cols-2" >

            <div className="relative hidden flex-col justify-center border-r border-border p-8 md:flex" >
                <Lottie animationData={Auth} />
            </div>

            <div className="flex p-8" >
                <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6 sm:w-[350px]" >
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}
