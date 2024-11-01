"use client";
import React, { useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
// import ExploreTokenChart from "@/components/charts/ExploreTokenChart";
import TvlChart from "@/components/charts/TvlChart";
import VolumeChart from "@/components/charts/VolumeChart";
import Link from "next/link";

import Image from "next/image";
import { MOCK_TOKEN_EXPLORE_PAGE_STATS } from "@/constants";
import { formatNumberWithCommas } from "@/lib/utils";

import TokenMiniChart from "@/components/charts/TokenMiniChart";

import { cn } from "@/lib/utils";
import { CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import TopTokensTable from "./components/tokensTable";
import { useSelector } from "@/store";
import { ExploreTabs } from "@/types/slices";
import TableTabs from "./components/tabs";
import PoolsTable from "./components/poolsTable";
import ChainPoolTable from "./components/chainPoolsTable";
// import ExploreTvlChart from "@/components/charts/lightweight-charts/ExploreTvlChart";
// import ExploreVolumeChart from "@/components/charts/lightweight-charts/ExploreVolumeChart";

// TODO - Figure out the sticky scroll for table header
// TODO - Add truncate to fields that need it
// TODO - Check final chart components to remove the unused ones
// TODO - Remove unused libraries
// TODO - CHECK WHY LAST TOKENCARD IN TABLE DOES NOT HAVE HOVER EFFECT
// TODO - Replace the Link href with the correct path
// TODO - Check left border flickering on resize and disapearing on certain screen sizes

const Page = () => {
  const currentTab = useSelector((state) => state.explore.currentTab);

  const renderTables = useCallback(() => {
    if (currentTab === ExploreTabs.TOKENS) {
      return <TopTokensTable />;
    } else if (currentTab === ExploreTabs.POOLS) {
      return <ChainPoolTable />;
    } else {
      return <div className="h-[400px]">No Data</div>;
    }
  }, [currentTab]);
  return (
    <div className="mt-10 z-20">
      <div className="flex justiyfy-between gap-3">
        {/* <ExploreTokenChart /> */}
        <div className="w-full ">
          <TvlChart />
        </div>

        <div className="w-full ">
          <VolumeChart />
        </div>
      </div>
      <div className=" w-full mt-5 md:mt-20">
        <TableTabs />
        <div className="explore-table-border-container flex justify-center items-center bg-fading-gradient relative">
          {/* 
        FADED GRADIENT BORDER TOP + BOTTOM 
        Increase/Decrease the opacity of the gradient to make it more/less visible 👇
        */}
          {/* <div className="h-[2px] w-full absolute top-0 bg-gradient-to-r from-[#232323]/50 via-[#232323] to-[#232323]/50" />
          <div className="h-[2px] w-full absolute bottom-0 bg-gradient-to-r from-[#232323]/50 via-[#232323] to-[#232323]/50" /> */}

          <div className="bg-[#191919] m-[1px] h-[400px] custom-scrollbar overflow-y-scroll explore-table-container my-[1px] pb-2">
            {renderTables()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
