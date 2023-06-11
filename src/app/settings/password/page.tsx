import { Separator } from "@/components/ui/separator"

export default function SettingsConnectionsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Password</h3>
                <p className="text-sm text-muted-foreground">
                    Update your security information.
                </p>
            </div>
            <Separator />
        </div>
    )
}