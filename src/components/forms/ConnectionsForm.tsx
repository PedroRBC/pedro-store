import { getProviders } from "next-auth/react";
import axios from "axios";
import { ProviderCard } from "../provider-card";

export async function ConnectionsForm() {
    const providers = await getProviders();
    if (!providers) return null;


    return (
        <>
            {Object.values(providers).filter(provider =>
                provider.type === "oauth").map(provider =>
                    <ProviderCard provider={provider} key={provider.name} />
                )}
        </>
    )
}