
import { Lottie } from "@/components/Lottie";
import Auth from "../../../../public/auth.json"
import { RegisterForm } from "@/components/forms/RegisterForm";

export const metadata = {
    title: 'Register',
}

export default function Login() {

    return (
        <div className="container relative flex max-w-none flex-col justify-center md:grid md:grid-cols-2" >

            <div className="relative hidden flex-col justify-center border-r border-border p-8 md:flex" >
                <Lottie animationData={Auth} />
            </div>

            <div className="flex p-8" >
                <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]" >
                    <RegisterForm />
                </div>
            </div>
        </div>
    )
}
