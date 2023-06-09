"use client"

const SSO_URL = process.env.NEXT_PUBLIC_CLERK_CALLBACK_SING_UP_URL as string

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Icons } from "../icons"
import { useRouter } from 'next/navigation';
import { useSignUp } from "@clerk/nextjs"

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8).max(16),
    username: z.string().min(4).max(50)
})

export function SingUpForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [error, setError] = useState("");
    const Router = useRouter()
    const { isLoaded, signUp, setActive } = useSignUp()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        },
    })
    if (!isLoaded) return null;

    const onSubmit = ({ email: emailAddress, password, username }: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        signUp.create({
            emailAddress,
            password,
            username
        }).then((result) => {
            if (result.status === 'complete') {
                setActive({ session: result.createdSessionId })
            } else {

            }
        }).catch((err) => {
            console.log()
            setError(err.errors[0].longMessage);
        })
            .finally(() => {
                setIsLoading(false)
            })

    }

    function handleSubmit() {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)

            Router.push("/")
        }, 2000)
    }
    signUp
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4" >
                    <div className="grid gap-2" >
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Username" {...field} type="text" disabled={isLoading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Email address" {...field} type="email" disabled={isLoading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl >
                                        <div className="relative" >
                                            <Input
                                                placeholder="Password"
                                                {...field}
                                                disabled={isLoading}
                                                className="block pr-11"
                                                type={showPassword ? "text" : "password"}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                className="absolute inset-y-0 right-0 flex items-center"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? (
                                                    <Icons.eye className="h-4 w-4" />
                                                ) : (
                                                    <Icons.eyeOff className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" disabled={isLoading} >Continue</Button>
                    {error && <p className="text-sm text-destructive">{error}</p>}
                </form>
            </Form>
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
            <Button variant="outline" type="button" onClick={() => {
                signUp.authenticateWithRedirect({
                    strategy: "oauth_github",
                    redirectUrl: SSO_URL,
                    redirectUrlComplete: "/LICENSE"
                })
            }} disabled={isLoading}>
                {isLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Icons.gitHub className="mr-2 h-4 w-4" />
                )}{" "}
                Github
            </Button>
        </>
    )
}
