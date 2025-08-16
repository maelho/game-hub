import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function GameCardSkeleton() {
  return (
    <Card className="overflow-hidden border bg-card relative p-0 gap-0">
      <div className="absolute top-2 right-2 z-10">
        <Skeleton className="h-6 w-8 rounded" />
      </div>

      <div className="aspect-video">
        <Skeleton className="w-full h-full" />
      </div>

      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <Skeleton className="w-3.5 h-3.5 rounded-sm" />
            <Skeleton className="w-3.5 h-3.5 rounded-sm" />
            <Skeleton className="w-3.5 h-3.5 rounded-sm" />
          </div>
          <Skeleton className="h-6 w-8 rounded" />
        </div>
        <Skeleton className="h-4 w-3/4" />
      </div>
    </Card>
  );
}
