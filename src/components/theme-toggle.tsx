"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import {
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuItem,
    DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"

export function ThemeToggle() {
    const { setTheme } = useTheme()

    return (
        <DropdownMenuSub >
            <DropdownMenuSubTrigger >
                <Icons.sun className="ml-2 h-5 w-5 dark:hidden" />
                <Icons.moon className="ml-2 hidden h-5 w-5 dark:block" />
                <span>Toggle Theme</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Icons.sun className="ml-2 h-4 w-4" />
                    <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Icons.moon className="ml-2 h-4 w-4" />
                    <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    <Icons.laptop className="ml-2 h-4 w-4" />
                    <span>System</span>
                </DropdownMenuItem>
            </DropdownMenuSubContent>
        </DropdownMenuSub>
    )
}
