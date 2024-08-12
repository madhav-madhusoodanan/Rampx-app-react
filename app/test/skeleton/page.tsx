import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CardHeader, CardTitle } from "@/components/ui/card";

const Page = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      {/* <div className="h-[50px] w-[200px]">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 200 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 25 Q 25 0, 50 25 T 100 25 T 150 15"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
        </svg>
      </div>
       */}

      {/* <div className="h-[100px] w-[300px]">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 300 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 50 Q 25 0, 50 50 T 100 50 T 150 50 T 200 50"
            stroke="red"
            strokeWidth="4"
            fill="none"
          />
        </svg>
      </div> */}
      <div className="w-[540px]">
        <CardHeader className="">
          <Skeleton className="h-[50px] w-[200px] rounded-[10px]" />

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
          >
            <path
              className="animate-pulse bg-slate-50/10"
              d="M0 50 Q 25 0, 50 50 T 100 50 T 150 50"
              //   stroke="#F8FAFC"
              stroke="rgba(248, 250, 252, 0.3)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="flex items-center gap-10">
          <Skeleton className="h-[8px] w-[50px]  rounded-[10px]" />
          <Skeleton className="h-[8px] w-[50px]  rounded-[10px]" />
          <Skeleton className="h-[8px] w-[50px]  rounded-[10px]" />
          <Skeleton className="h-[8px] w-[50px]  rounded-[10px]" />
          <Skeleton className="h-[8px] w-[50px]  rounded-[10px]" />
        </div>
      </div>
    </div>
  );
};

export default Page;
