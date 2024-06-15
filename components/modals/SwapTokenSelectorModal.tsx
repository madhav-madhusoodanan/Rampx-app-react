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
import PopularTokenCard from "../cards/PopularTokenCard";
import { useSwapContext } from "@/context/Swap.context";

import { fadeIn } from "@/lib/motion";
import { motion, AnimatePresence } from "framer-motion";

// TODO - Once colors determined replace arbitrary values with tailwind theme color variables

const SwapTokenSelectorModal = () => {
  const [loading, setLoading] = useState(true);

  const { setIsTokenSelectorModalOpen } = useSwapContext();

  useEffect(() => {
    const mockFetch = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(mockFetch);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-10 w-full h-screen flex justify-center items-center">
      {/* BLURRED MODAL BG */}
      <button
        onClick={() => setIsTokenSelectorModalOpen(false)}
        className="w-full h-screen bg-black bg-opacity-50 fixed "
      />

      {/* TOKEN SELECTOR CARD */}
      <Card
        className="w-[400px] h-[600px]  bg-[#141414] rounded-2xl border-[1px] 
      border-gray-500 border-opacity-20  z-10 text-[#ececec] overflow-hidden"
      >
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Select a token</CardTitle>
            <button onClick={() => setIsTokenSelectorModalOpen(false)}>
              <XIcon className="cursor-pointer" />
            </button>
          </div>
          <div className="pt-4">
            <div className="relative w-full max-w-[400px] max-lg:hidden">
              <div className="relative flex grow items-center gap-1 rounded-xl px-4 border border-[#262626]">
                <Search className="text-[#6d6d6d]" />
                <Input
                  type="text"
                  autoFocus
                  placeholder="Paste token address..."
                  className="paragraph-regular focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 !important  
                  text-[#ececec] border-none bg-transparent shadow-none outline-none placeholder:text-[#4e4e4e]"
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
                    src={token.imageUrl}
                    width={20}
                    height={20}
                    alt={token.symbol}
                    className=""
                    unoptimized
                  />
                  <span className="font-medium">{token.symbol}</span>
                </div>
              ))}
            </div>
          </div>
        </CardHeader>

        {/* DIVIDER */}
        <div className="w-full h-[1px] bg-[#262626] " />

        <CardContent className="p-0 overflow-y-scroll h-[337px] custom-scrollbar ">
          {loading ? (
            <div className="py-4 flex flex-col gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
                <PopularTokenSkeleton key={index} />
              ))}
            </div>
          ) : (
            <section>
              <div className="my-4 font-medium text-a-gray pl-6">
                Popular tokens
              </div>

              {MOCK_POPULAR_TOKENS.map((token, index) => (
                <PopularTokenCard key={index} token={token} />
              ))}
            </section>
          )}
        </CardContent>
        {/* <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
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
