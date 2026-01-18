import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function Loading() {
    return (
        <div className="min-h-screen bg-background pb-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <Button variant="ghost" className="pl-0" disabled>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Articles
                    </Button>
                </div>

                <div className="space-y-4 mb-8">
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-10 w-1/2" />

                    <div className="flex items-center space-x-6 pt-4">
                        <div className="flex items-center space-x-2">
                            <Skeleton className="h-4 w-4 rounded-full" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Skeleton className="h-4 w-4 rounded-full" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                    </div>
                </div>

                <Skeleton className="w-full aspect-video rounded-lg mb-8" />

                <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                </div>
            </div>
        </div>
    )
}
