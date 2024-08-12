import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="my-10">
      <div className="flex justify-between gap-10">
        {/* TVL CHART SKELETON */}
        <div className="w-full">
          <div>
            <CardHeader>
              <CardDescription className="font-medium text-a-gray text-base">
                RampX TVL
              </CardDescription>
              <Skeleton className="h-[40px] w-[200px] rounded-[10px]" />

              <CardTitle>
                <Skeleton className="h-[20px] w-[100px]  rounded-[10px]" />
              </CardTitle>
            </CardHeader>
            <div className="w-full h-[304px] py-10">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 200 100"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className=""
              >
                <path
                  className="animate-pulse bg-slate-50/10 w-full"
                  d="M0 50 Q 25 0, 50 50 T 100 50 T 150 50 T 200 50"
                  stroke="rgba(248, 250, 252, 0.2)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
              <div className="flex items-center gap-10 pt-2.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-[8px] w-[50px]  rounded-[10px]"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* VOLUME CHART SKELETON */}
        <div className="w-full">
          <div>
            <CardHeader>
              <CardDescription className="font-medium text-a-gray text-base">
                RampX Volume
              </CardDescription>
              <Skeleton className="h-[40px] w-[200px] rounded-[10px]" />

              <CardTitle>
                <Skeleton className="h-[20px] w-[100px]  rounded-[10px]" />
              </CardTitle>
            </CardHeader>
            <div className="w-full h-[304px] pb-5 flex flex-col justify-end">
              <div className="flex justify-between items-end">
                <Skeleton className="h-[180px] w-[30px]  rounded-[10px]" />
                <Skeleton className="h-[80px] w-[30px]  rounded-[10px]" />
                <Skeleton className="h-[220px] w-[30px]  rounded-[10px]" />
                <Skeleton className="h-[130px] w-[30px]  rounded-[10px]" />
                <Skeleton className="h-[120px] w-[30px]  rounded-[10px]" />
                <Skeleton className="h-[180px] w-[30px]  rounded-[10px]" />
                <Skeleton className="h-[170px] w-[30px]  rounded-[10px]" />
                <Skeleton className="h-[140px] w-[30px]  rounded-[10px]" />
                <Skeleton className="h-[130px] w-[30px]  rounded-[10px]" />
                <Skeleton className="h-[200px] w-[30px]  rounded-[10px]" />
                <Skeleton className="h-[180px] w-[30px]  rounded-[10px]" />
                <Skeleton className="h-[80px] w-[30px]  rounded-[10px]" />
                <Skeleton className="h-[220px] w-[30px]  rounded-[10px]" />
                <Skeleton className="h-[50px] w-[30px]  rounded-[10px]" />
              </div>
              <div className="flex items-center gap-10 pt-2.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-[8px] w-[50px]  rounded-[10px]"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
