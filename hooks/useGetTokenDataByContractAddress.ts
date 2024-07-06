import { useQuery } from "@tanstack/react-query";
import { getErc20TokenDataBySearch } from "@/lib/actions/tokenData.action";

export const useGetTokenDataByContractAddress = (
  contractAddress: string,
  chainId: number
) => {
  return useQuery({
    queryKey: ["get-token-metadata", contractAddress],
    queryFn: () => getErc20TokenDataBySearch({ contractAddress, chainId }),
    enabled: !!contractAddress,
    // enabled: contractAddress.length > 0,
  });
};
