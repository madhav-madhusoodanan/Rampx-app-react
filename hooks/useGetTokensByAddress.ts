import { useQuery } from "@tanstack/react-query";
import { getUserErc20Tokens } from "@/lib/actions/tokenData.action";

export const useGetTokensByAddress = (
  address: `0x${string}` | undefined,
  chainId: number
) => {
  return useQuery({
    queryKey: ["get-tokens", address],
    queryFn: () => getUserErc20Tokens({ address, chainId }),
  });
};
