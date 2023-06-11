"use client"

import axios from "axios";

import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react"
import { useEffect } from "react";
import { setProviders } from "@/redux/features/providers/providers-slice";

export function FetchContext({ children }: { children: React.ReactNode }) {
    const { status } = useSession();
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === "authenticated") {
            const Fetch = async () => {
                const { data } = await axios.get("/api/user/providers");
                dispatch(setProviders(data));
            }
            Fetch()
        }
    }, [status])

    return <> {children} </>
}