import CachedService from "@/classes/cachedService";
import { toast } from "@/components/ui/use-toast";
import { excludedDexes } from "@/constants";
import { setIsQouteDataLoading, setQouteData } from "@/store/slices/swap";
import { QouteApiParams, QouteApiResponse } from "@/types/actions";
import { parseUnits } from "viem";

export async function getSwapQoute(params?: QouteApiParams) {
  const store = CachedService?.storeRef;
  try {
    if (!store) {
      failingChore();
      return;
    }

    const { chainId, walletAddress } = store.getState().app;
    const { amountA, tokenA, tokenB, maxSlippage } = store.getState().swap;

    if (!tokenB) {
      failingChore();
      return;
    }

    store.dispatch(setIsQouteDataLoading(true));
    let paramsToSend = params;
    if (!params) {
      if (store) {
        paramsToSend = {
          chainId,
          buyToken: tokenB.address,
          sellToken: tokenA.address,
          sellAmount: parseUnits(amountA, tokenA.decimals).toString(),
          taker: walletAddress,
          excludedSources: excludedDexes[chainId],
          // slippageBps: maxSlippage ? Number(maxSlippage) : undefined,
        };
      } else {
        throw new Error("store not found");
      }
    }
    const response = await fetch(`/api/qoute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paramsToSend),
    });
    if (!response.ok) {
      throw new Error("Error fetching price");
    }
    const data = (await response.json()) as QouteApiResponse;
    store?.dispatch(setQouteData(data));
    store?.dispatch(setIsQouteDataLoading(false));
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Unable to fetch qoute",
    });
    console.log("fetchSwapQoute ERROR", error);
    failingChore();
  }
}

const failingChore = () => {
  const store = CachedService?.storeRef;
  store?.dispatch(setQouteData(undefined));
  store?.dispatch(setIsQouteDataLoading(false));
};
