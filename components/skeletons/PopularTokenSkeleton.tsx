import React from "react";
import { Skeleton } from "../ui/skeleton";

const PopularTokenSkeleton = () => {
  return (
    <div className="flex justify-between px-6">
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex flex-col gap-1.5">
          <Skeleton className="rounded-full h-3 w-36" />
          <Skeleton className="rounded-full h-3 w-14" />
        </div>
      </div>

      <Skeleton className="rounded-full h-4 w-8 mt-0.5" />
    </div>
  );
};

export default PopularTokenSkeleton;
