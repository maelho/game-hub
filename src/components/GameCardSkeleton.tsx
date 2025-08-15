import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function GameCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="w-full h-48" />
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex space-x-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-4" />
          </div>
          <Skeleton className="h-6 w-12" />
        </div>
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
    </Card>
  );
}
