import React from "react";
import ExploreBreadcrumb from "@/components/ExploreBreadcrumb";
import TokenChart from "@/components/charts/TokenChart";
import SwapCard from "@/components/cards/SwapCard";
import SwapWidget from "@/components/SwapWidget";

const Page = ({ params }: any) => {
  return (
    <div className="mt-10">
      <ExploreBreadcrumb contractAddress={params.contractAddress} />

      <div className="flex items-start gap-4 ">
        <TokenChart />
        <div className="mt-10">
          {" "}
          <SwapWidget />
        </div>
      </div>
    </div>
  );
};

export default Page;
