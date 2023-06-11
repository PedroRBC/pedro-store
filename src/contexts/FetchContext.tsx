"use client"

import axios from "axios";

import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react"
import { useEffect } from "react";
import { setData, logout, setName, setLoaded } from "@/redux/features/auth/auth-slice";
import { useAppSelector } from "@/redux/selector";

export function FetchContext({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const name = useAppSelector(state => state.auth.name);
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === "authenticated" && name === "" && session?.user) {
            dispatch(setName(session.user.name!))
        }
        if (status === "unauthenticated" && name !== "") {
            dispatch(logout())
        }
    }, [status, dispatch, name, session])

    useEffect(() => {
        if (status === "authenticated") {
            const Fetch = async () => {
                const { data } = await axios.get("/api/user");
                dispatch(setData(data));
                dispatch(setLoaded());
            }
            Fetch()
        }
    }, [status, dispatch])

    return <> {children} </>
}