"use client";
import { Button } from "@/components/ui/button";
import SwapArrowsIcon from "@/components/custom-icons/SwapArrowsIcon";
import { useDispatch, useSelector } from "@/store";
import { exchangeTokens, setIsSwapPriceLoading } from "@/store/slices/swap";
import { fetchSwapPrice } from "@/lib/actions/price.action";

const ExchangeButton = () => {
  const isSwapPriceLoading = useSelector(
    (state) => state.swap.isSwapPriceLoading
  );

  const dispatch = useDispatch();

  const handleTokenChange = () => {
    dispatch(exchangeTokens());
    dispatch(setIsSwapPriceLoading(true));
    fetchSwapPrice();
  };

  return (
    <div className="flex justify-between items-center mt-2">
      <div className="w-[40%] h-[0.5px] bg-a-fluo/30" />

      <Button
        onClick={handleTokenChange}
        size="icon"
        className={"border-[0.5px] border-a-fluo  h-8 w-8 ".concat(
          isSwapPriceLoading ? "pointer-events-none" : ""
        )}
      >
        <SwapArrowsIcon className="text-a-fluo " />
      </Button>

      <div className="w-[40%] h-[0.5px] bg-a-fluo/30 " />
    </div>
  );
};
export default ExchangeButton;
