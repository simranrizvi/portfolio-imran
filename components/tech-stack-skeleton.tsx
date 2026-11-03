import { Skeleton } from "@/components/ui/skeleton";

export function TechStackTagsSkeleton() {
  return (
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-6 w-20 rounded-full" />
      ))}
    </div>
  );
}

export function TechStackChartSkeleton() {
  return (
    <div className="flex items-center gap-6">
      {/* PIE */}
      <Skeleton className="w-48 h-48 rounded-full" />

      {/* LEGEND */}
      <div className="flex-1 space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-10" />
          </div>
        ))}
      </div>
    </div>
  );
}
