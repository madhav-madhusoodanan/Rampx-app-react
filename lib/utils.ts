import TokenCacheService from "@/classes/tokenCache";
import { NATIVE_TOKEN_ADDRESS, TOKENLIST_EXPIRE_PERIOD } from "@/constants";
import { ApiResponse, UniqueContract } from "@/types";
import { TokenAPIResponse } from "@/types/tokens";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const shortenAddress = (address: `0x${string}` | undefined) => {
  if (!address) return "";

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const blockInvalidCharDecimalsAllowed = (e: any) =>
  ["e", "E", "+", "-", ","].includes(e.key) && e.preventDefault();

export function shortenTokenSymbol(input: string): string {
  if (input.length <= 3) {
    return input;
  }
  return input.slice(0, 3);
}

export const filterUniqueContracts = (data: ApiResponse): UniqueContract[] => {
  const uniqueContracts: { [key: string]: UniqueContract } = {};

  data.result.forEach((item: any) => {
    const contractAddress = item.contractAddress;
    if (!uniqueContracts[contractAddress]) {
      uniqueContracts[contractAddress] = {
        contractAddress: contractAddress,
        tokenName: item.tokenName,
        tokenSymbol: item.tokenSymbol,
        tokenLogo: "",
        tokenBalance: "",
      };
    }
  });

  return Object.values(uniqueContracts);
};

export const formatNumberWithCommas = (numberString: string): string => {
  // Convert the string to a number
  const number = parseFloat(numberString);

  // Check if the number is valid
  if (isNaN(number)) {
    throw new Error(
      "Invalid input: The provided string is not a valid number."
    );
  }

  // Use toLocaleString to format the number with commas
  return number.toLocaleString();
};

export function replaceZeroAddress(
  response: TokenAPIResponse
): TokenAPIResponse {
  Object.keys(response).forEach((chainId) => {
    const tokens = response[chainId];
    tokens.forEach((token) => {
      if (token.address === "0x0000000000000000000000000000000000000000") {
        token.address = NATIVE_TOKEN_ADDRESS;
      }
    });
  });

  return response;
}

export const shouldFetchTokenList = async (lastTokensUpdated: number) => {
  const currentTime = Date.now();
  const tokensListIsEmpty = TokenCacheService.tokensList.length === 0;
  return (
    currentTime - lastTokensUpdated >= TOKENLIST_EXPIRE_PERIOD ||
    tokensListIsEmpty
  );
};

//* THIS CODE WAS CLUTTERING THE SWAPTOKENSELECTORMODAL FILE SO I MOVED IT HERE INCASE WE NEED IT AGAIN

// THIS FUNCTION WORKS FOR DECODING HEXED BALANCES
// useEffect(() => {
//   const hexData =
//     // "0x00000000000000000000000000000000000000000000000000000001955547b7";
//     "0x00000000000000000000000000000000000000000000054b40b1f852bda00000";
//   // Example ABI parameter type
//   const abiParameter = parseAbiParameter("uint256");

//   // Decode the hex data
//   const decodedData = decodeAbiParameters([abiParameter], hexData);

//   console.log("DECODE", decodedData);
// }, [isTokenSelectorModalOpen]);

// PROBABLY DONT NEED SERVER SIDE FOR THIS
// useEffect(() => {
//   // const mockFetch = setTimeout(() => {
//   //   setLoading(false);
//   // }, 2000);
//   // return () => clearTimeout(mockFetch);
//   setLoading(true);
//   const fetchMyTokens = async (address: `0x${string}` | undefined) => {
//     if (!address) return;
//     try {
//       const response = await fetch(
//         // `/api/tokenBalances?address=${address}`
//         `/api/tokenBalances?address=0x48CaaDe36c64A1e91715328B1cdeBee3057c360c`
//       ).then((res) => res.json());
//       console.log("SELECTOR RESPONSE", response);
//       setMyTokens(response.tokenBalances);
//       setLoading(false);
//     } catch (e) {
//       console.log(e);
//     }
//   };
//   if (isTokenSelectorModalOpen && isConnected) {
//     fetchMyTokens(address);
//   }
// }, [isTokenSelectorModalOpen]);

// useEffect(() => {
//   const fetchMyTokens = async (address: `0x${string}` | undefined) => {
//     const settings = {
//       apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY, // Use environment variables for sensitive information.
//       network:
//         currentChainId === 8453 ? Network.BASE_MAINNET : Network.ETH_MAINNET, // Replace with your network.
//     };

//     console.log("CHAINIDDDD", currentChainId, typeof currentChainId);

//     const alchemy = new Alchemy(settings);

//     if (!process.env.NEXT_PUBLIC_ALCHEMY_API_KEY) {
//       console.log("No API key found");
//     }

//     if (!address) return;

//     try {
//       console.log("hit");

//       const balances = await alchemy.core.getTokenBalances(
//         "0x48CaaDe36c64A1e91715328B1cdeBee3057c360c"
//       );

//       console.log("PRE FILTER balances", balances);

//       const tokenData = await Promise.all(
//         balances.tokenBalances.map(async (token) => {
//           const metadata = await alchemy.core.getTokenMetadata(
//             token.contractAddress
//           );

//           console.log("PRE FILTER METADATA", metadata);

//           if (!token.tokenBalance || !metadata.decimals) {
//             return null;
//           }

//           const readableBalance =
//             parseInt(token.tokenBalance, 16) /
//             Math.pow(10, metadata.decimals);

//           return {
//             contractAddress: token.contractAddress,
//             tokenBalance: readableBalance.toString(),
//             tokenName: metadata.name,
//             tokenSymbol: metadata.symbol,
//             tokenLogo: metadata.logo,
//           };
//         })
//       );

//       const filteredTokenData = tokenData.filter(
//         (token): token is TokenData =>
//           token !== null &&
//           token.contractAddress !== null &&
//           token.tokenBalance !== null &&
//           token.tokenName !== null &&
//           token.tokenSymbol !== null &&
//           token.tokenLogo !== null
//       );

//       console.log("newbalances", filteredTokenData);
//       setMyTokens(filteredTokenData);
//       setLoading(false);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   if (isTokenSelectorModalOpen && isConnected) {
//     fetchMyTokens(address);
//   }
// }, [isTokenSelectorModalOpen, isConnected, address, currentChainId]);
