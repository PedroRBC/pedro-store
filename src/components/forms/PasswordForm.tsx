"use client"

import { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useSession } from "next-auth/react"
import { useDispatch } from "react-redux"
import { useAppSelector } from "@/redux/selector"
import { setHasPassword } from "@/redux/features/auth/auth-slice"
import axios from "axios"
import { Icons } from "../icons"
import { PasswordFormSkeleton } from "../skeletons/PasswordForm"

const passwordFormSchema = z.object({
    oldPassword: z.string().min(6),
    newPassword: z.string().min(6),
    confirmPassword: z.string().min(6)
}).refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
})

type ProfileFormValues = z.infer<typeof passwordFormSchema>

export function PasswordForm() {
    const { status } = useSession();
    if (status === "loading") return <PasswordFormSkeleton />;
    return <FormPassword />
}

export function FormPassword() {
    const { update } = useSession();
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showConPassword, setShowConPassword] = useState<boolean>(false);
    const [text, setText] = useState<string>("");
    const [error, setError] = useState<string>("");
    const hasPassword = useAppSelector(state => state.auth.hasPassword);
    const defaultValues: ProfileFormValues = {
        oldPassword: hasPassword ? "" : "@undefined@",
        confirmPassword: "",
        newPassword: ""
    }
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(passwordFormSchema),
        defaultValues,
        mode: "onChange"
    })

    async function onSubmit(data: ProfileFormValues) {
        setIsLoading(true)
        axios.patch("/api/user", data)
            .then(_ => {
                dispatch(setHasPassword(true))
                setText("Password updated.")
                update()
            }).catch(err => {
                setError(err.response.data)
            })
        setIsLoading(false);
    }

    return (
        <Form {...form}>
            {!hasPassword && (
                <p className="text-destructive" >Your account is passwordless. Set one now!</p>
            )}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {hasPassword && (
                    <FormField
                        control={form.control}
                        name="oldPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-primary" >Old Password</FormLabel>
                                <FormControl>
                                    <div className="relative md:w-1/2">
                                        <Input
                                            {...field}
                                            disabled={isLoading}
                                            className="block pr-11"
                                            type={showOldPassword ? "text" : "password"}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            className="absolute inset-y-0 right-0 flex items-center"
                                            onClick={() => setShowOldPassword(!showOldPassword)}
                                        >
                                            {showOldPassword ? (
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
                )}
                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-primary">New Password</FormLabel>
                            <FormControl>
                                <div className="relative md:w-1/2">
                                    <Input
                                        {...field}
                                        disabled={isLoading}
                                        className="block pr-11"
                                        type={showNewPassword ? "text" : "password"}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        className="absolute inset-y-0 right-0 flex items-center"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                    >
                                        {showNewPassword ? (
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
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-primary">Confirm password</FormLabel>
                            <FormControl>
                                <div className="relative md:w-1/2">
                                    <Input
                                        {...field}
                                        disabled={isLoading}
                                        className="block pr-11"
                                        type={showConPassword ? "text" : "password"}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        className="absolute inset-y-0 right-0 flex items-center"
                                        onClick={() => setShowConPassword(!showConPassword)}
                                    >
                                        {showConPassword ? (
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

                <div className="flex flex-row items-center space-x-4" >
                    <Button disabled={isLoading} type="submit">
                        {isLoading ? (
                            <Icons.spinner className="mx-8 h-4 w-4 animate-spin" />
                        ) : ("Update password")}
                    </Button>
                    {text && <p className="text-sm text-primary">{text}</p>}
                    {error && <p className="text-sm text-destructive">{error}</p>}
                </div>

            </form>
        </Form>
    )
}