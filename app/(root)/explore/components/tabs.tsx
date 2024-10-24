import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "@/store";
import { setCurrentTab } from "@/store/slices/explore";
import { ExploreTabs } from "@/types/slices";

const TableTabs = () => {
  const dispatch = useDispatch();
  const currentTab = useSelector((state) => state.explore.currentTab);
  const handleClick = (val: ExploreTabs) => {
    dispatch(setCurrentTab(val));
  };
  return (
    <div className="flex gap-0 pb-3 z-10">
      <Button
        className={`transition-all duration-200 text-[28px] ${
          currentTab === ExploreTabs.TOKENS
            ? "text-white hover:opacity-50"
            : "text-white/50 hover:text-white"
        }`}
        onClick={() => handleClick(ExploreTabs.TOKENS)}
      >
        Tokens
      </Button>
      <Button
        className={`transition-all duration-200 text-[28px] ${
          currentTab === ExploreTabs.POOLS
            ? "text-white hover:opacity-50"
            : "text-white/50 hover:text-white"
        }`}
        onClick={() => handleClick(ExploreTabs.POOLS)}
      >
        Pools
      </Button>
      <Button
        className={`transition-all duration-200 text-[28px] ${
          currentTab === ExploreTabs.TRANSACTIONS
            ? "text-white hover:opacity-50"
            : "text-white/50 hover:text-white"
        }`}
        onClick={() => handleClick(ExploreTabs.TRANSACTIONS)}
      >
        Transactions
      </Button>
    </div>
  );
};

export default TableTabs;
