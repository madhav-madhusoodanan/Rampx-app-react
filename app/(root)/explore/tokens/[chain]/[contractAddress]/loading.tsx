import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="my-10">
      <div className="flex gap-4">
        <Skeleton className="w-[85px] h-[15px] rounded-full" />
        <Skeleton className="w-[85px] h-[15px] rounded-full" />
        <Skeleton className="w-[85px] h-[15px] rounded-full" />
      </div>

      <div className="flex justify-between gap-10 mt-6">
        <div className="w-full">
          <div>
            <CardHeader>
              <Skeleton className="h-[40px] w-[200px] rounded-[10px]" />

              <CardTitle>
                <Skeleton className="h-[20px] w-[100px]  rounded-[10px]" />
              </CardTitle>
            </CardHeader>
            <div className="w-full h-[304px] mt-12 pb-10">
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
              <div className="flex items-center gap-10 pt-14">
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
        <Skeleton className="w-full h-[465px]  mt-6 swap-border-container" />
      </div>

      <div className="mt-24 flex flex-col gap-6 ">
        <h2 className="text-[28px] font-semibold">Stats</h2>

        <div className="text-white lining-nums flex justify-between border-b border-white/5 pb-10">
          <div className="flex flex-col gap-1">
            <h3 className="text-white/50">TVL</h3>
            <Skeleton className="h-[40px] w-[100px] rounded-[10px]" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-white/50">Market cap</h3>
            <Skeleton className="h-[40px] w-[100px] rounded-[10px]" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-white/50">FDV</h3>
            <Skeleton className="h-[40px] w-[100px] rounded-[10px]" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-white/50">1 day volume</h3>
            <Skeleton className="h-[40px] w-[100px] rounded-[10px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default loading;
