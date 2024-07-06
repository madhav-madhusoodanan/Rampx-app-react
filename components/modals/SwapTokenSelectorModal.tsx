"use client";
import { useState, useEffect } from "react";

import { Search } from "lucide-react";
import { XIcon } from "lucide-react";
import Image from "next/image";

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
import PopularTokenSkeleton from "../skeletons/PopularTokenSkeleton";
import TokenCard from "../cards/TokenCard";
import { useSwapContext } from "@/context/Swap.context";

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
import {
  getUserErc20Tokens,
  // getErc20TokenBySearch,
} from "@/lib/actions/tokenData.action";
import { useGetTokensByAddress } from "@/hooks/useGetTokensByAddress";
import { useGetTokenDataByContractAddress } from "@/hooks/useGetTokenDataByContractAddress";

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
  const [searchTokenAddress, setSearchTokenAddress] = useState<string>("");
  const [debouncedSearchTokenAddress, setDebouncedSearchTokenAddress] =
    useState<string>("");

  const { isConnected, address } = useAccount();
  const currentChainId = useChainId();

  console.log(currentChainId);

  const { isTokenSelectorModalOpen, setIsTokenSelectorModalOpen } =
    useSwapContext();

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

  const { data, status, refetch, isRefetching } = useGetTokensByAddress(
    address,
    currentChainId
  );
  console.log("BLAST TANSTACK DATA", data);

  const {
    data: tokenSearchData,
    status: searchStatus,
    refetch: searchRefectch,
    isRefetching: isSearchRefetching,
  } = useGetTokenDataByContractAddress(
    debouncedSearchTokenAddress,
    currentChainId
  );

  useEffect(() => {
    refetch();
  }, [currentChainId, address]);

  useEffect(() => {
    if (debouncedSearchTokenAddress.length > 0) {
      searchRefectch();
    }
  }, [debouncedSearchTokenAddress, address, currentChainId]);

  const handleTokenSearchChange = (e: any) => {
    setSearchTokenAddress(e.target.value);

    const delayDebounceFn = setTimeout(() => {
      setDebouncedSearchTokenAddress(e.target.value);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
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

  return (
    <div className="fixed top-0 left-0 z-10 w-full h-screen flex justify-center items-center">
      {/* BLURRED MODAL BG */}
      <button
        onClick={() => setIsTokenSelectorModalOpen("")}
        className="w-full h-screen bg-black bg-opacity-50 fixed "
      />

      {/* TOKEN SELECTOR CARD */}
      <Card
        className="w-[400px] h-[600px]  bg-[#141414] rounded-2xl border-[1px] 
      border-gray-500 border-opacity-20  z-10 text-[#ececec] overflow-hidden"
      >
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Select a token</CardTitle>
            <button onClick={() => setIsTokenSelectorModalOpen("")}>
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
                  value={searchTokenAddress}
                  onChange={(e) => handleTokenSearchChange(e)}
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

        <CardContent className="p-0 overflow-y-scroll h-[337px] custom-scrollbar ">
          {status === "error" || searchStatus === "error" ? (
            <div className="text-center mt-4 text-a-gray">
              Error has occured
            </div>
          ) : status === "pending" ||
            (debouncedSearchTokenAddress && searchStatus === "pending") ||
            isRefetching ||
            isSearchRefetching ? (
            <div className="py-4 flex flex-col gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
                <PopularTokenSkeleton key={index} />
              ))}
            </div>
          ) : debouncedSearchTokenAddress.length > 0 ? (
            <div>
              {tokenSearchData &&
              tokenSearchData.tokenSymbol &&
              tokenSearchData.tokenName ? (
                <div>
                  <div className="my-4 font-medium text-a-gray pl-6">
                    Results
                  </div>

                  <TokenCard
                    token={JSON.stringify(tokenSearchData)}
                    isMyToken={false}
                  />
                </div>
              ) : (
                <div className="text-center mt-4 text-a-gray">
                  No results found
                </div>
              )}
            </div>
          ) : (
            <section className="flex flex-col gap-2">
              {data && data.tokenBalances.length > 0 && (
                <div>
                  <div className="my-4 font-medium text-a-gray pl-6">
                    My tokens
                  </div>

                  {data.tokenBalances.map((token, index) => (
                    <TokenCard
                      key={index}
                      token={JSON.stringify(token)}
                      isMyToken={true}
                    />
                  ))}
                </div>
              )}
              <div>
                <div className="my-4 font-medium text-a-gray pl-6">
                  Popular tokens
                </div>

                {MOCK_POPULAR_TOKENS.map((token, index) => (
                  <TokenCard key={index} token={JSON.stringify(token)} />
                ))}
              </div>
            </section>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const SwapTokenSelectorModalWrapper = () => {
  const { isTokenSelectorModalOpen } = useSwapContext();

  return (
    <AnimatePresence>
      {isTokenSelectorModalOpen && (
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
