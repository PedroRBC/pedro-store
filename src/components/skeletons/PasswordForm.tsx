import { Skeleton } from "@/components/ui/skeleton"

export function PasswordFormSkeleton() {

    return (
        <div className="space-y-4" >
            <div className="space-y-2" >
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-full md:w-1/2" />
            </div>
            <div className="space-y-2" >
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-full md:w-1/2" />
            </div>
            <div className="space-y-2" >
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-full md:w-1/2" />
            </div>
            <Skeleton className="h-10 w-1/4" />
        </div>
    )
}