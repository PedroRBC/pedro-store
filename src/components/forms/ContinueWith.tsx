import { signIn } from "next-auth/react"
import { Icons } from "../icons"
import { Button } from "../ui/button"



export function ContinueWith({ isLoading, handleLoading, callbackUrl }: { isLoading: boolean, handleLoading: () => void, callbackUrl: string }) {
    return (<>
        <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                </span>
            </div>
        </div>
        <div className="flex flex-row items-center justify-center space-x-2" >
            <Button variant="outline" type="button" onClick={() => {
                handleLoading();
                signIn("github", {
                    callbackUrl
                })
            }} disabled={isLoading} >
                <Icons.gitHub className="h-4 w-4" />
            </Button>
            <Button variant="outline" type="button" onClick={() => {
                handleLoading();
                signIn("google", {
                    callbackUrl
                })
            }} disabled={isLoading} >
                <Icons.google className="h-4 w-4" />
            </Button>
            <Button variant="outline" type="button" disabled={isLoading} >
                <Icons.facebook className="h-4 w-4" />
            </Button>
        </div>
    </>)
}