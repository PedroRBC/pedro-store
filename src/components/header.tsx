import { ModeToggle } from "./theme-toggle";




export function Header() {

    return (
        <header className="container 2xl:max-w-full top-0 w-full z-40 stick bg-background/90 border-b " >
            <div className="h-14 flex items-center justify-end" >
                <div className="flex justify-between space-x-2" >
                    <nav className="space-x-1 felx items-center" >
                        <ModeToggle />
                    </nav>
                </div>
            </div>
        </header>
    )

}