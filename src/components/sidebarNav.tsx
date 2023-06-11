"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

import { Icons } from "@/components/icons"

export interface items {
    href: string
    title: string,
    icon: keyof typeof Icons
}

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
    items: items[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
    const pathname = usePathname()

    return (
        <nav
            className={cn(
                "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
                className
            )}
            {...props}
        >
            {items.map((item) => {
                const Icon = Icons[item.icon]
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            pathname === item.href
                                ? "bg-muted hover:bg-muted"
                                : "hover:bg-transparent hover:underline",
                            "justify-start"
                        )}
                    >
                        <Icon className="mr-2 h-5 w-5" />
                        {item.title}
                    </Link>
                )
            }
            )}
        </nav>
    )
}