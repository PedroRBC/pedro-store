'use client';
import { ClientSafeProvider, signIn, useSession } from "next-auth/react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAppSelector } from "@/redux/selector";
import axios from "axios";

import { useDispatch } from "react-redux";
import { removeProvider } from "@/redux/features/providers/providers-slice";
import { useState } from "react";
import { Icons } from "./icons";
import { SkeletonProviderCard } from "./skeletons/provider-card";

export function ProviderCard({ provider }: { provider: ClientSafeProvider }) {
    const { status } = useSession()
    const Providers = useAppSelector(state => state.providers.loggedProviders)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false)
    if (status === "loading") {
        return <SkeletonProviderCard />
    }
    function handleConnect() {
        setLoading(true)
        signIn(provider.id, {
            callbackUrl: "/settings/connections",
        })
    }
    function handleDisconnect(id: string) {
        setLoading(true)
        axios.delete(`/api/user/providers/${id}`)
            .then(res => {
                dispatch(removeProvider(id));
                setLoading(false)
            })
    }
    const actualProvider = Providers.find(p => p.provider === provider.id)
    const connected = actualProvider?.provider === provider.id

    return (
        <Card key={provider.name}>
            <CardHeader>
                <CardTitle>{provider.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-row justify-between">
                <CardDescription>
                    Use {provider.name} to sign in to your account.
                </CardDescription>
                {
                    connected ? (
                        <Button
                            className="hover:bg-destructive"
                            onClick={() => handleDisconnect(actualProvider?.id)}
                            disabled={loading}
                        >
                            {loading ? (
                                <Icons.spinner className="mx-4 h-4 w-4 animate-spin" />
                            ) : ("Disconnect")}
                        </Button>
                    ) : (
                        <Button
                            className="hover:bg-green-500"
                                onClick={handleConnect} disabled={loading}
                            >
                                {loading ? (
                                    <Icons.spinner className="mx-4 h-4 w-4 animate-spin" />
                                ) : ("Connect")}
                        </Button>
                    )
                }
            </CardContent>
        </Card>
    )
}