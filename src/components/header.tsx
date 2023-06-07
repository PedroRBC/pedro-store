import { ModeToggle } from "./theme-toggle";

export function Header() {

    return (
        <header className="container sticky top-0 z-40 w-full border-b bg-background/90 2xl:max-w-full " >
            <div className="flex h-14 items-center justify-end" >
                <div className="flex justify-between space-x-2" >
                    <nav className="flex items-center space-x-1" >
                        <ModeToggle />
                    </nav>
                </div>
            </div>
        </header>
    )

}