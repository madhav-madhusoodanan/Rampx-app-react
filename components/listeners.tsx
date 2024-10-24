"use client";
import React, { useEffect } from "react";

import TokenCacheService from "@/classes/tokenCache";
import { shouldFetchTokenList } from "@/lib/utils";
import { useDispatch, useSelector } from "@/store";
import {
  useAccountEffect,
  useBalance,
  useChainId,
  useReadContracts,
} from "wagmi";
import {
  setChainId,
  setNativeBalance,
  setTokenBalances,
  setWalletAddress,
} from "@/store/slices/app";
import { fetchSwapPrice } from "@/lib/actions/price.action";
import { erc20Abi, formatUnits } from "viem";
import { setIsBalanceLoading } from "@/store/slices/loadings";

const Listeners = () => {
  const dispatch = useDispatch();
  const chainId = useChainId();

  const tokenA = useSelector((state) => state.swap.tokenA);
  const tokenB = useSelector((state) => state.swap.tokenB);
  const walletAddress = useSelector((state) => state.app.walletAddress);
  const successTxCount = useSelector((state) => state.app.successTxCount);

  const { data: nativeBalanceData, refetch: refetchNativeBalance } = useBalance(
    {
      address: walletAddress as `0x${string}`,
      chainId: chainId,
    }
  );

  const {
    data: erc20BalancesData,
    isLoading: isBalanceLoading,
    refetch: refetchErc20Balances,
  } = useReadContracts({
    contracts: [
      {
        address: tokenA.address as `0x${string}`,
        abi: erc20Abi,
        functionName: "balanceOf",
        chainId,
        args: [walletAddress as `0x${string}`],
      },
      {
        address: (tokenB?.address as `0x${string}`) ?? "0x",
        abi: erc20Abi,
        functionName: "balanceOf",
        chainId,
        args: [walletAddress as `0x${string}`],
      },
    ],
  });

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

  useEffect(() => {
    dispatch(setIsBalanceLoading(isBalanceLoading));

    if (!isBalanceLoading && erc20BalancesData) {
      let tokenABalance, tokenBBalance;

      if (erc20BalancesData[0]?.status === "success") {
        tokenABalance = formatUnits(
          erc20BalancesData[0].result,
          tokenA.decimals
        );
      } else {
        console.error("Error fetching ERC-20 token A balance");
      }

      if (tokenB && erc20BalancesData[1]?.status === "success") {
        tokenBBalance = formatUnits(
          erc20BalancesData[1].result,
          tokenB.decimals
        );
      } else {
        console.error("Error fetching ERC-20 token B balance");
      }

      if (tokenABalance || tokenBBalance) {
        console.log("Dispatching token balances!");

        const tokenBalances = {
          [tokenA.address]: tokenABalance || "0",
        };

        if (tokenB) {
          tokenBalances[tokenB.address] = tokenBBalance || "0";
        }

        dispatch(setTokenBalances(tokenBalances));
      }
    }
  }, [
    isBalanceLoading,
    erc20BalancesData,
    tokenA.address,
    tokenB?.address,
    tokenA.decimals,
    tokenB?.decimals,
  ]);

  useEffect(() => {
    refetchErc20Balances();
  }, [successTxCount]);

  useEffect(() => {
    if (nativeBalanceData) {
      dispatch(
        setNativeBalance({
          balance: formatUnits(
            nativeBalanceData.value,
            nativeBalanceData.decimals
          ),
          symbol: nativeBalanceData.symbol,
        })
      );
    }
  }, [nativeBalanceData]);

  useEffect(() => {
    dispatch(setChainId(chainId));
  }, [chainId]);

  return <></>;
};

export default Listeners;
