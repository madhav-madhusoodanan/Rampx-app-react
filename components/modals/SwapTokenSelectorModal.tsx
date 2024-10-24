"use client";
import { useState, useEffect, useMemo, useCallback } from "react";

import { Search } from "lucide-react";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import debounce from "lodash.debounce";

import {
  Card,
  CardContent,
  // CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { MOCK_POPULAR_TOKENS } from "@/constants";
// import PopularTokenSkeleton from "../skeletons/PopularTokenSkeleton";
// import TokenCard from "../cards/TokenCard";
// import { useSwapContext } from "@/context/Swap.context";

import { fadeIn } from "@/lib/motion";
import { motion, AnimatePresence } from "framer-motion";
import { useAccount, useChainId } from "wagmi";
// import {
//   Alchemy,
//   Network,
//   TokenBalanceType,
//   TokenBalancesResponse,
// } from "alchemy-sdk";
// import { parseAbiParameter, decodeAbiParameters } from "viem";
// import {
//   getUserErc20Tokens,
// getErc20TokenBySearch,
// } from "@/lib/actions/tokenData.action";
// import { useGetTokensByAddress } from "@/hooks/useGetTokensByAddress";
// import { useGetTokenDataByContractAddress } from "@/hooks/useGetTokenDataByContractAddress";
import { useDispatch, useSelector } from "@/store";
import { setIsTokenModalOpen } from "@/store/slices/app";
import TokenCacheService from "@/classes/tokenCache";
import { TokenInfo } from "@/types/tokens";
import { TokenSelection } from "@/types/enums";
import {
  exchangeTokens,
  setIsSwapPriceLoading,
  setTokenA,
  setTokenB,
} from "@/store/slices/swap";
import { fetchSwapPrice } from "@/lib/actions/price.action";

// TODO - Once colors determined replace arbitrary values with tailwind theme color variables

// type TokenData = {
//   contractAddress: string;
//   tokenBalance: string;
//   tokenName: string;
//   tokenSymbol: string | null;
//   tokenLogo?: string | null;
// };

const SwapTokenSelectorModal = () => {
  // const [myTokens, setMyTokens] = useState<TokenData[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [searchTokenAddress, setSearchTokenAddress] = useState<string>("");
  // const [debouncedSearchTokenAddress, setDebouncedSearchTokenAddress] =
  //   useState<string>("");
  const [shouldLoadMore, setShouldLoadMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const currentChainId = useChainId();

  const dispatch = useDispatch();
  const isTokenListLoading = useSelector(
    (state) => state.loadings.tokensListLoading
  );
  const tokenSelection = useSelector((state) => state.swap.tokenSelection);
  const tokenA = useSelector((state) => state.swap.tokenA);
  const tokenB = useSelector((state) => state.swap.tokenB);
  const amountA = useSelector((state) => state.swap.amountA);

  // const { isTokenSelectorModalOpen, setIsTokenSelectorModalOpen } =
  //   useSwapContext();

  // useEffect(() => {
  //   const fetchInitData = async () => {
  //     setLoading(true);

  //     const response = await getUserErc20Tokens({
  //       address,
  //       chainId: currentChainId,
  //     });

  //     if (!response) {
  //       return;
  //     }

  //     console.log("responseFUCK", response?.tokenBalances);

  //     setMyTokens(response.tokenBalances as TokenData[]);
  //     setLoading(false);
  //   };

  //   if (isTokenSelectorModalOpen && isConnected) {
  //     fetchInitData();
  //   }
  // }, [isTokenSelectorModalOpen, isConnected, address, currentChainId]);

  // const { data, status, refetch, isRefetching } = useGetTokensByAddress(
  //   address,
  //   currentChainId
  // );
  // console.log("BLAST TANSTACK DATA", data);

  // const {
  //   data: tokenSearchData,
  //   status: searchStatus,
  //   refetch: searchRefectch,
  //   isRefetching: isSearchRefetching,
  // } = useGetTokenDataByContractAddress(
  //   debouncedSearchTokenAddress,
  //   currentChainId
  // );

  // useEffect(() => {
  //   refetch();
  // }, [currentChainId, address]);

  // useEffect(() => {
  //   if (debouncedSearchTokenAddress.length > 0) {
  //     searchRefectch();
  //   }
  // }, [debouncedSearchTokenAddress, address, currentChainId]);

  // const handleTokenSearchChange = (e: any) => {
  //   setSearchTokenAddress(e.target.value);

  //   const delayDebounceFn = setTimeout(() => {
  //     setDebouncedSearchTokenAddress(e.target.value);
  //   }, 500);

  //   return () => clearTimeout(delayDebounceFn);
  // };

  const tokensList = useMemo(() => {
    return TokenCacheService.tokensList;
  }, [isTokenListLoading, currentChainId]);

  const loadMoreTokens = useCallback(() => {
    if (hasMore && tokensList.length > 0) {
      const newTokens = tokensList.slice(tokens.length, tokens.length + 20);
      setTokens((prevTokens) => [...prevTokens, ...newTokens]);
      setHasMore(tokens.length + newTokens.length < tokensList.length);
    }
  }, [tokens.length, hasMore, isTokenListLoading]);

  useEffect(() => {
    if (!isTokenListLoading) {
      setTokens([]);
      setShouldLoadMore(true);
    }
  }, [isTokenListLoading, currentChainId]);

  useEffect(() => {
    if (shouldLoadMore) {
      loadMoreTokens();
      setShouldLoadMore(false);
    }
  }, [shouldLoadMore]);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        handleKeywordChange(value, tokensList);
      }, 500),
    [tokensList]
  );

  const handleKeywordChange = (value: string, tokensList: TokenInfo[]) => {
    if (!value) {
      setTokens(tokensList.slice(0, 20));
      return;
    }

    const filtered: TokenInfo[] = [];
    tokensList.forEach((token) => {
      let weight = 0;

      if (token.symbol.toLowerCase().includes(value)) {
        weight +=
          (value.length / token.symbol.length) * 300 +
          token.symbol.length -
          token.symbol.toLowerCase().indexOf(value);
      }

      if (token.name.toLowerCase().includes(value)) {
        weight +=
          (value.length / token.name.length) * 100 +
          token.name.length -
          token.name.toLowerCase().indexOf(value);
      }

      if (value.length > 10 && token.address.toLowerCase().includes(value)) {
        weight +=
          (value.length / token.address.length) * 50 +
          token.address.length -
          token.address.toLowerCase().indexOf(value);
      }

      if (weight > 0) {
        filtered.push({ ...token, weight });
      }
    });

    const sortedTokens = filtered
      .sort((a, b) => (b?.weight ?? 0) - (a?.weight ?? 0))
      .slice(0, 20);

    setTokens(sortedTokens);
  };

  const searchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);
    debouncedSearch(value);
  };

  const closeModal = () => {
    dispatch(setIsTokenModalOpen(false));
  };

  // console.log("SEARCH REFETCHING", isSearchRefetching);
  // console.log("SEARCH STATUS", searchStatus);
  // console.log("SEARCH DATA", tokenSearchData);

  // const delayDebounceFn = setTimeout(() => {
  //   if (search) {
  //     const newUrl = formUrlQuery({
  //       params: searchParams.toString(),
  //       key: "q",
  //       value: search,
  //     });
  //     router.push(newUrl, { scroll: false });
  //   } else {
  //     if (pathname === route) {
  //       const newUrl = removeKeysFromQuery({
  //         params: searchParams.toString(),
  //         keysToRemove: ["q"],
  //       });
  //       router.push(newUrl, { scroll: false });
  //     }
  //   }
  // }, 500);

  // return () => clearTimeout(delayDebounceFn);

  // console.log("STATUS TANSTACK", status);
  // console.log("DATA TANSTACK", data);

  // useEffect(() => {
  //   const fetchTokenData = async () => {
  //     const response = await getErc20TokenBySearch({
  //       contractAddress: searchTokenAddress,
  //       chainId: currentChainId,
  //     });

  //     console.log("DEBOUNCE RESPONSE MMOTHERFUCKER", response);
  //   };

  //   if (searchTokenAddress.length > 0) {
  //     fetchTokenData();
  //   }
  // }, [searchTokenAddress]);

  // console.log("debounce bs", debouncedSearchTokenAddress.length);

  const onSelectToken = (token: TokenInfo) => {
    const currentToken = tokenSelection === TokenSelection.A ? tokenA : tokenB;

    const otherToken = tokenSelection === TokenSelection.A ? tokenB : tokenA;

    const setTokenAction =
      tokenSelection === TokenSelection.A ? setTokenA : setTokenB;

    // make sure user is not selecting the same token
    if (
      (currentToken?.address !== token.address &&
        currentToken?.symbol !== token.symbol) ||
      currentToken === undefined
    ) {
      // if user is exchanging tokens, exchange them
      if (token.address === otherToken?.address) {
        dispatch(exchangeTokens());
      } else {
        dispatch(setTokenAction(token));
      }
      if (amountA && +amountA !== 0) {
        dispatch(setIsSwapPriceLoading(true));
        fetchSwapPrice();
      }
    }
    closeModal();
  };

  const TokenRow = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const token = tokens[index];
    if (!token) return null;
    return (
      <div
        style={style}
        className="flex items-center p-2 hover:bg-zinc-800 cursor-pointer"
        onClick={() => onSelectToken(token)}
      >
        <Image
          src={token.logoURI}
          alt={token.name}
          className="w-8 h-8 mr-3 rounded-full"
          width={32}
          height={32}
        />
        <div>
          <div className="font-medium text-white">{token.name}</div>
          <div className="text-sm text-gray-400">{token.symbol}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed top-0 left-0 z-10 w-full h-screen flex justify-center items-center">
      {/* BLURRED MODAL BG */}
      <button
        onClick={closeModal}
        className="w-full h-screen bg-a-charcoal bg-opacity-50 fixed"
      />

      {/* TOKEN SELECTOR CARD */}
      <Card className="w-[400px] h-[600px]  bg-a-charcoal rounded-2xl border border-gray-500 border-opacity-50  z-10 text-[#ececec] overflow-hidden">
        <CardHeader className="px-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Select a token</CardTitle>
            <button onClick={closeModal}>
              <XIcon className="cursor-pointer" />
            </button>
          </div>
          <div className="pt-4">
            <div className="relative w-full max-w-[400px] ">
              <div className="relative flex grow items-center gap-1 rounded-xl px-4 border border-[#262626]">
                <Search className="text-[#6d6d6d]" />
                <Input
                  type="text"
                  autoFocus
                  placeholder="Paste token address..."
                  value={searchQuery}
                  onChange={searchInputChange}
                  className="paragraph-regular focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 !important  
                  text-[#ececec] border-none bg-transparent shadow-none outline-none placeholder:text-[#4e4e4e] w-full"
                />
              </div>
            </div>

            <div className="flex flex-row flex-wrap gap-4 mt-6">
              {MOCK_POPULAR_TOKENS.map((token, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 border border-[#292929] py-2 px-3 rounded-xl bg-gray-300 bg-opacity-0 hover:bg-opacity-10 transition-all duration-150 cursor-pointer"
                >
                  <Image
                    src={token.tokenLogo}
                    width={20}
                    height={20}
                    alt={token.tokenSymbol}
                    className=""
                    unoptimized
                  />
                  <span className="font-medium text-sm">
                    {token.tokenSymbol}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardHeader>

        {/* DIVIDER */}
        <div className="w-full h-[1px] bg-[#262626] " />

        {/* Tokens list with infinite scroll */}
        <CardContent className="px-3 custom-scrollbar">
          <div className="h-[400px]">
            <AutoSizer>
              {({ height, width }) => (
                <List
                  height={height}
                  itemCount={tokens.length}
                  itemSize={60}
                  itemData={tokens}
                  itemKey={(index, data) => data[index].address}
                  width={width}
                  onItemsRendered={({
                    visibleStopIndex,
                  }: {
                    visibleStopIndex: number;
                  }) => {
                    if (visibleStopIndex >= tokens.length - 1 && hasMore) {
                      loadMoreTokens();
                    }
                  }}
                >
                  {TokenRow}
                </List>
              )}
            </AutoSizer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const SwapTokenSelectorModalWrapper = () => {
  const isTokenModalOpen = useSelector((state) => state.app.isTokenModalOpen);

  return (
    <AnimatePresence>
      {isTokenModalOpen && (
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn("", "tween", 0, 0.3)}
          exit="hidden"
        >
          <SwapTokenSelectorModal />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { SwapTokenSelectorModal, SwapTokenSelectorModalWrapper };
