"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from 'react-hook-form';
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
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(16),
})

export function LoginForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const router = useRouter();
    const defaultError = searchParams.get("error") === "OAuthAccountNotLinked" ? "This email is already in use by another account." : "";
    const [error, setError] = useState(defaultError);
    const callbackUrl = searchParams.get("callbackUrl")
    const email = searchParams.get("email") || "";
    const [showPassword, setShowPassword] = useState<boolean>(false);
    function newError(message: string) {
        setError(message)
        setTimeout(() => {
            setError("")
        }, 5000)
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email,
            password: ""
        },
    })

    const onSubmit = ({ password, email }: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        signIn("credentials", {
            email,
            password,
            redirect: false
        }).then(res => {
            if (res?.error) {
                setIsLoading(false)
                newError(res.error)
            }
            else router.push(callbackUrl || '/')
        })
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid items-center gap-2" >
                    <div className="mb-2 grid gap-2" >

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
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        ) : ("Login")}
                    </Button>
                    {error && <p className="text-center text-base text-destructive">{error}</p>}
                    <p className="text-sm" >
                        Don&apos;t have an account?{" "}
                        <Link href={callbackUrl ? `/register?callbackUrl=${callbackUrl}` : '/register'} className="underline" > Register </Link>
                    </p>
                </form>
            </Form>
            <ContinueWith isLoading={isLoading} handleLoading={() => setIsLoading(true)} callbackUrl={callbackUrl || '/'} />
        </>
    )
}
