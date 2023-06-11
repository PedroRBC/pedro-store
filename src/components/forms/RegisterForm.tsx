"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from 'next/navigation';
import axios, { type AxiosError } from "axios";

import Link from "next/link";
import { Icons } from "../icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ContinueWith } from "./ContinueWith";

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(16),
    name: z.string().min(3).max(32),
})

export function RegisterForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const defaultError = searchParams.get("error") === "OAuthAccountNotLinked" ? "This email is already in use by another account." : "";
    const [error, setError] = useState(defaultError);
    const callbackUrl = searchParams.get("callbackUrl")

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
            password: "",
            name: ""
        },
    })

    const onSubmit = ({ password, email, name }: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        axios.post("/api/auth/register", {
            name,
            email,
            password
        }).then(_ => router.push(callbackUrl ? `/login?callbackUrl=${callbackUrl}&email=${email}` : `/login?email=${email}`))
            .catch((err: AxiosError) => {
                if (err.response) newError(err.response.data as string)
                setIsLoading(false);
            })
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid items-center gap-2" >
                    <div className="mb-2 grid gap-2" >

                        <FormField // FullName
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-primary">Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isLoading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField // Email
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

                        <FormField // Password
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
                        ) : "Register"
                        }
                    </Button>
                    {error && <p className="text-center text-base text-destructive">{error}</p>}
                    <p className="text-sm" >
                        Have an account?{" "}
                        <Link href={callbackUrl ? `/login?callbackUrl=${callbackUrl}` : "/login"} className="underline" > Login </Link>
                    </p>
                </form>
            </Form>
            <ContinueWith isLoading={isLoading} handleLoading={() => setIsLoading(true)} callbackUrl={callbackUrl || '/'} />
        </>
    )
}
