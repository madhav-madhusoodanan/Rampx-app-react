import SwapWidget from "@/components/SwapWidget";
import SwapAndRampSwitch from "@/components/SwapAndRampSwitch";
import SwapTokensInfoSection from "@/components/SwapTokensInfoSection";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="py-8 w-full px-0 sm:px-6 md:px-10 max-w-[530px] ">
        <SwapAndRampSwitch />

        <SwapWidget className="max-w-full" />

        <SwapTokensInfoSection />
      </div>
    </div>
  );
};

export default Page;
