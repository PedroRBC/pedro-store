"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
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

import { signIn, useSession } from 'next-auth/react'

const formSchema = z.object({
    identifier: z.string().min(4).max(50),
    password: z.string().min(8).max(16),
})

export function LoginForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            identifier: "",
            password: ""
        },
    })

    const onSubmit = ({ password, identifier }: z.infer<typeof formSchema>) => {
        handleSubmit()

    }

    function handleSubmit() {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false);
            router.push("/")
        }, 2000)
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4" >
                    <div className="grid gap-2" >

                        <FormField
                            control={form.control}
                            name="identifier"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Username/Email" {...field} disabled={isLoading} />
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
                    <Button type="submit" disabled={isLoading} >
                        {isLoading ? (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        ) : ("Login")}
                    </Button>
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

            <div className="flex flex-row items-center justify-center space-x-2" >
                <Button variant="outline" type="button" onClick={() => {
                    signIn("github", {
                        callbackUrl: '/'
                    })
                }} disabled={isLoading} >
                    <Icons.gitHub className="h-4 w-4" />
                </Button>
                <Button variant="outline" type="button" onClick={() => signIn("google", {
                    callbackUrl: '/'
                })} disabled={isLoading} >
                    <Icons.google className="h-4 w-4" />
                </Button>
                <Button variant="outline" type="button" onClick={handleSubmit} disabled={isLoading} >
                    <Icons.facebook className="h-4 w-4" />
                </Button>
            </div>
        </>
    )
}
