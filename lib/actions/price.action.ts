import CachedService from "@/classes/cachedService";
import { toast } from "@/components/ui/use-toast";
import { setIsSwapPriceLoading, setSwapPrice } from "@/store/slices/swap";
import { PriceApiParams, PriceApiResponse } from "@/types/actions";
import { parseUnits } from "viem";

export async function fetchSwapPrice(params?: PriceApiParams) {
  const store = CachedService?.storeRef;
  try {
    if (!store) {
      throw new Error("store not found");
    }
    const { chainId, walletAddress } = store.getState().app;
    const { amountA, tokenA, tokenB, maxSlippage } = store.getState().swap;

    if (!tokenB) {
      throw new Error("token B not found");
    }

    store.dispatch(setIsSwapPriceLoading(true));

    let paramsToSend = params;

    if (!params) {
      if (Boolean(+amountA) === false) {
        store.dispatch(setSwapPrice(undefined));
        store.dispatch(setIsSwapPriceLoading(false));
        return;
      }
      paramsToSend = {
        chainId,
        sellToken: tokenA.address,
        buyToken: tokenB.address,
        taker: walletAddress,
        sellAmount: parseUnits(amountA, tokenA.decimals).toString(),
        slippageBps: maxSlippage ? Number(maxSlippage) : undefined,
      };
    }

    const response = await fetch(`/api/price`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paramsToSend),
    });
    if (!response.ok) {
      throw new Error("Error fetching price");
    }
    const data = (await response.json()) as PriceApiResponse;
    // CachedService.startQouteTimer();
    store?.dispatch(setSwapPrice(data));
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Unable to fetch price",
    });
    console.log("fetchSwapPrice ERROR", error);
    store?.dispatch(setSwapPrice(undefined));
  }
  store?.dispatch(setIsSwapPriceLoading(false));
}
