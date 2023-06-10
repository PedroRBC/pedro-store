import { signIn } from "next-auth/react"
import { Icons } from "../icons"
import { Button } from "../ui/button"



export function ContinueWith({ isLoading, handleLoading }: { isLoading: boolean, handleLoading: () => void }) {
    return (
        <div className="flex flex-row items-center justify-center space-x-2" >
            <Button variant="outline" type="button" onClick={() => {
                handleLoading();
                signIn("github", {
                    callbackUrl: '/',
                })
            }} disabled={isLoading} >
                <Icons.gitHub className="h-4 w-4" />
            </Button>
            <Button variant="outline" type="button" onClick={() => {
                handleLoading();
                signIn("google", {
                    callbackUrl: '/'
                })
            }} disabled={isLoading} >
                <Icons.google className="h-4 w-4" />
            </Button>
            <Button variant="outline" type="button" disabled={isLoading} >
                <Icons.facebook className="h-4 w-4" />
            </Button>
        </div>
    )
}