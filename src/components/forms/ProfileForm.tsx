"use client"

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
    if (status === "loading" && name === "") return <p> Carregando... </p>;
    return <FormProfile />
}

export function FormProfile() {
    const dispatch = useDispatch()
    const name = useAppSelector(state => state.auth.name);
    const defaultValues: ProfileFormValues = {
        name,
    }
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: "onChange",
    })

    function onSubmit(data: ProfileFormValues) {
        dispatch(setName(data.name))
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
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name. It can be your real name or a
                                pseudonym. You can only change this once every 30 days.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Update profile</Button>
            </form>
        </Form>
    )
}

FormProfile.auth = {
    loading: <p> Carregando... </p>,
}