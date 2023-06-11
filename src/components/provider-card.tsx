'use client';
import { ClientSafeProvider, signIn } from "next-auth/react";

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

export function ProviderCard({ provider }: { provider: ClientSafeProvider }) {
    const Providers = useAppSelector(state => state.providers.loggedProviders)
    const dispatch = useDispatch();
    function handleConnect() {
        signIn(provider.id)
    }
    function handleDisconnect(id: string) {
        axios.delete(`/api/user/${id}`)
            .then(res => {
                dispatch(removeProvider(provider.id));
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
                        >
                            Disconnect
                        </Button>
                    ) : (
                        <Button
                            className="hover:bg-green-500"
                            onClick={handleConnect}
                        >
                            Connect
                        </Button>
                    )
                }
            </CardContent>

        </Card>
    )
}