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
import { removeProvider } from "@/redux/features/auth/auth-slice";
import { useState } from "react";
import { Icons } from "./icons";
import { SkeletonConnectionCard } from "./skeletons/connection-card";

export function ProviderCard({ provider }: { provider: ClientSafeProvider }) {
    const isLoading = useAppSelector(state => state.auth.loading);
    const Connections = useAppSelector(state => state.auth.connections)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false)
    if (isLoading) return <SkeletonConnectionCard />
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
    const actualConnection = Connections.find(c => c.provider === provider.id)
    const connected = actualConnection?.provider === provider.id

    return (
        <Card key={provider.name}>
            <CardHeader>
                <CardTitle>{provider.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-row justify-between text-xs md:text-lg">
                <CardDescription>
                    Use {provider.name} to sign in to your account.
                </CardDescription>
                {
                    connected ? (
                        <Button
                            className="text-xs hover:bg-destructive md:text-base"
                            onClick={() => handleDisconnect(actualConnection?.id)}
                            disabled={loading}
                        >
                            {loading ? (
                                <Icons.spinner className="mx-1 h-4 w-4 animate-spin md:mx-4" />
                            ) : ("Disconnect")}
                        </Button>
                    ) : (
                        <Button
                            className="hover:bg-green-500"
                                onClick={handleConnect} disabled={loading}
                            >
                                {loading ? (
                                    <Icons.spinner className="mx-1 h-4 w-4 animate-spin md:mx-4" />
                                ) : ("Connect")}
                        </Button>
                    )
                }
            </CardContent>
        </Card>
    )
}