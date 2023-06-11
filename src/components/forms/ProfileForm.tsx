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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useSession } from "next-auth/react"
import { useDispatch } from "react-redux"
import { useAppSelector } from "@/redux/selector"
import { setName } from "@/redux/features/auth/auth-slice"
import { ProfileFormSkeleton } from "../skeletons/ProfileForm"
import axios from "axios"
import { Icons } from "../icons"

const profileFormSchema = z.object({
    name: z
        .string()
        .min(4, {
            message: "Name must be at least 4 characters.",
        })
        .max(30, {
            message: "Name must not be longer than 30 characters.",
        })
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function ProfileForm() {
    const { status } = useSession();
    const name = useAppSelector(state => state.auth.name);
    if (status === "loading") return <ProfileFormSkeleton />;
    if (name === "") return <ProfileFormSkeleton />;
    return <FormProfile />
}

export function FormProfile() {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [text, setText] = useState<string>("");
    const name = useAppSelector(state => state.auth.name);
    const defaultValues: ProfileFormValues = {
        name,
    }
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: "onChange",
    })

    async function onSubmit(data: ProfileFormValues) {
        setIsLoading(true)
        axios.patch("/api/user", data)
            .then(_ => {
                dispatch(setName(data.name))
                setText("Profile updated!")
                setTimeout(() => {
                    setText("")
                }, 5000)
            }).finally(() => setIsLoading(false))
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input disabled={isLoading} {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name. It can be your real name or a
                                pseudonym. You can only change this once every 30 days.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-row items-center space-x-4" >
                    <Button disabled={isLoading} type="submit">
                        {isLoading ? (
                            <Icons.spinner className="mx-8 h-4 w-4 animate-spin" />
                        ) : ("Update profile")}
                    </Button>
                    <p className="text-sm text-primary">{text}</p>
                </div>

            </form>
        </Form>
    )
}