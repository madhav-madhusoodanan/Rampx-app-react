import React from "react";
import { fetchChartData } from "@/lib/actions/charts.action";
import { fetchTokenInfo } from "@/lib/actions/token-info.action";
import ClientPageWrapper from "./clientPageWrapper";
// import useGetChartData from "@/hooks/useGetChartData";
// TODO - add flex-row to the stats section
// TODO - add custom loading.tsx file for this page (it's using the parent one)

const Page = async ({ params }: any) => {
  const chain = params.chain;
  const startTime = Math.floor(Date.now() / 1000) - 7889231;
  const endTime = Math.floor(Date.now() / 1000);

  const data = await fetchChartData(
    chain || 1,
    params.contractAddress,
    startTime,
    endTime
  );

  console.log("DATA", data);

  const tokenInfo = await fetchTokenInfo(chain || 1, params.contractAddress);

  console.log("TOKEN INFO", tokenInfo);

  // console.log("TOKEN INFO", tokenInfo?.data?.listPairsWithMetadataForToken);
  // const TVL = tokenInfo?.data?.listPairsWithMetadataForToken.results.reduce(
  //   (acc: number, pair: any) => acc + parseFloat(pair.liquidity),
  //   0
  // );
  // console.log("TVL", TVL);
  // console.log(
  //   "MARKET CAP",
  //   tokenInfo?.data?.listPairsWithMetadataForToken.results
  // );

  return (
    <ClientPageWrapper
      chartData={data?.data ?? []}
      contractAddress={params.contractAddress}
      chain={chain}
      tokenInfo={tokenInfo?.data}
    />
  );
};

export default Page;
