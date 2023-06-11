import { Skeleton } from "@/components/ui/skeleton"

export function ProfileFormSkeleton() {

    return (
        <div className="space-y-8" >
            <div className="space-y-2" >
                <Skeleton className="h-4 w-14" />
                <Skeleton className="h-10 w-full" />
                <div className="space-y-1" >
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/3" />
                </div>
            </div>
            <Skeleton className="h-10 w-1/4" />
        </div>
    )
}