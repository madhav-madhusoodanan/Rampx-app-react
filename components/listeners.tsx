"use client";
import React, { useEffect } from "react";

import TokenCacheService from "@/classes/tokenCache";
import { shouldFetchTokenList } from "@/lib/utils";
import { useDispatch, useSelector } from "@/store";
import { useAccountEffect, useBalance, useChainId } from "wagmi";
import { setWalletAddress } from "@/store/slices/app";
import { fetchSwapPrice } from "@/lib/actions/price.action";

const Listeners = () => {
  const dispatch = useDispatch();
  const chainId = useChainId();

  const walletAddress = useSelector((state) => state.app.walletAddress);
  // const successTxCount = useSelector((state) => state.swap.successTxCount);

  const { data: nativeBalanceData, refetch: refetchNativeBalance } = useBalance(
    {
      address: walletAddress as `0x${string}`,
      chainId: chainId,
    }
  );

  useEffect(() => {
    (async () => {
      await TokenCacheService.loadTokensList(dispatch, chainId.toString());
      const lastTokenUpdated = await TokenCacheService.getLastTokenUpdated();
      console.log({ lastTokenUpdated });
      if (await shouldFetchTokenList(lastTokenUpdated || 0)) {
        console.log("updating tokens ... ");
        await TokenCacheService.fetchTokensList();
        await TokenCacheService.loadTokensList(dispatch, chainId.toString());
      }
    })();
  }, [chainId]);

  useAccountEffect({
    onConnect(data) {
      dispatch(setWalletAddress(data.address));
      fetchSwapPrice();
    },
    onDisconnect() {
      dispatch(setWalletAddress(""));
      fetchSwapPrice();
    },
  });

  // useEffect(() => {
  //   dispatch(setChainId(chainId));
  // }, [chainId]);

  // useEffect(() => {
  //   if (nativeBalanceData) {
  //     dispatch(
  //       setNativeBalance({
  //         balance: formatUnits(
  //           nativeBalanceData.value,
  //           nativeBalanceData.decimals
  //         ),
  //         symbol: nativeBalanceData.symbol,
  //       })
  //     );
  //   }
  // }, [nativeBalanceData]);

  // useEffect(() => {
  //   refetchNativeBalance();
  // }, [successTxCount]);

  return <></>;
};

export default Listeners;
