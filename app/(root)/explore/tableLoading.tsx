import { Skeleton } from "@/components/ui/skeleton";

const TableLoading = () => {
  return (
    <div className="bg-[#191919] w-full">
      <Skeleton className="h-16 w-full" />
      {Array.from({ length: 6 }).map((_, index: number) => (
        <div key={index} className="flex items-center justify-between my-4">
          <Skeleton className="h-6 w-6 rounded ml-2" />
          <div className="flex gap-2 items-center w-96">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-6 w-64 rounded-xl" />
          </div>
          <Skeleton className="h-6 w-20 rounded-xl" />
          <Skeleton className="h-6 w-20 rounded-xl" />
          <Skeleton className="h-6 w-20 rounded-xl" />
          <Skeleton className="h-6 w-20 rounded-xl" />
          <Skeleton className="h-6 w-20 rounded-xl" />
        </div>
      ))}
    </div>
  );
};
export default TableLoading;
