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
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Icons } from "../icons"

import { signIn } from 'next-auth/react'
import { ContinueWith } from "./ContinueWith";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(16),
})

export function LoginForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState("");

    function newError(message: string) {
        setError(message)
        setTimeout(() => {
            setError("")
        }, 5000)
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const onSubmit = ({ password, email }: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        signIn("credentials", {
            email,
            password,
            redirect: false,
            callbackUrl: '/'
        }).then(res => {
            if (res?.error) newError(res.error)
        }).finally(() => setIsLoading(false))
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
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid items-center gap-4" >
                    <div className="grid gap-2" >

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-primary">Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isLoading} />
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
                                    <FormLabel className="text-primary">Password</FormLabel>
                                    <FormControl >
                                        <div className="relative">
                                            <Input
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
                    {error && <p className="text-center text-base text-destructive">{error}</p>}
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

            <ContinueWith isLoading={isLoading} handleLoading={() => setIsLoading(true)} />
        </>
    )
}
