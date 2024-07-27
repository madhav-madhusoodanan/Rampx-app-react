import { SwapTokenSelectorModalWrapper } from "@/components/modals/SwapTokenSelectorModal";
import SwapWidget from "@/components/SwapWidget";
import SwapAndRampSwitch from "@/components/SwapAndRampSwitch";
import SwapTokensInfoSection from "@/components/SwapTokensInfoSection";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="py-8 w-full px-6 md:px-10 max-w-[530px]">
        {/* <div className="flex justify-between items-center pb-3  mt-7">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Image
                  alt="refresh"
                  src="/assets/icons/swap-refresh.svg"
                  width={30}
                  height={30}
                  className="cursor-pointer hover:shadow-[0_0_6px_rgba(179,207,61,1)] rounded-full transition-all duration-300"
                />
              </TooltipTrigger>
              <TooltipContent className="border-none rounded-xl bg-black mb-1  py-2 px-4 text-xs">
                <p>Refresh</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="flex gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="h-[30px] px-2 cursor-pointer hover:shadow-[0_0_6px_rgba(179,207,61,1)] rounded-full transition-all duration-300 bg-black bg-opacity-25 border border-a-fluo flex justify-center items-center gap-2">
                    <Image
                      alt="slippage-settings"
                      src="/assets/icons/swap-slippage.svg"
                      width={20}
                      height={20}
                    />
                    <span className="font-mono text-sm">0.5%</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="border-none rounded-xl bg-black mb-1 py-2 px-4 text-xs">
                  <p>Slippage Settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Image
                    alt="settings"
                    src="/assets/icons/swap-settings.svg"
                    width={30}
                    height={30}
                    className="cursor-pointer hover:shadow-[0_0_6px_rgba(179,207,61,1)] rounded-full transition-all duration-300"
                  />
                </TooltipTrigger>
                <TooltipContent className="border-none rounded-xl bg-black mb-1  py-2 px-4 text-xs">
                  <p>Swap Settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div> */}

        {/* <SwapCard /> */}

        <SwapAndRampSwitch />

        <SwapWidget />

        <SwapTokensInfoSection />
      </div>

      <SwapTokenSelectorModalWrapper />
    </div>
  );
};

export default Page;
