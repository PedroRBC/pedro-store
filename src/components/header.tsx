import Link from "next/link";
import { Button } from "./ui/button";
import { UserDropdown } from "./userDropdown";

export function Header() {

    return (
        <header className="container sticky top-0 z-40 w-full border-b bg-background/90 2xl:max-w-full " >
            <nav className="flex h-14 items-center justify-between space-x-2" >
                <div className="flex items-center space-x-4" >
                    <span>
                        Pedro Store
                    </span>
                    <Button variant="ghost" asChild>
                        <Link href="/" >
                            <span>Home</span>
                        </Link>
                    </Button>
                </div>
                <div className="flex items-center space-x-1" >
                    <UserDropdown />
                </div>
            </nav>
        </header>
    )

}