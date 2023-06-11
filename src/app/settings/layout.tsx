import { SidebarNav, items } from "@/components/sidebarNav";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/options'

const sidebarNavItems: items[] = [
    {
        title: "Profile",
        href: "/settings",
        icon: "avatar"
    },
    {
        title: "Password",
        href: "/settings/password",
        icon: "lock"
    },
    {
        title: "Connections",
        href: "/settings/connections",
        icon: "roundKey"
    }
]

export const metadata: Metadata = {
    title: "Settings"
}

export default async function SettingsLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/login?callbackUrl=/settings");
    };

    return (
        <div className="block flex-1 space-y-6 p-8 pb-16 md:p-10">
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">
                    Manage your account settings and set e-mail preferences.
                </p>
            </div>
            <Separator className="my-6" />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="-mx-4 lg:w-1/5">
                    <SidebarNav items={sidebarNavItems} />
                </aside>
                <div className="flex-1 lg:max-w-2xl">{children}</div>
            </div>
        </div>
    );
}