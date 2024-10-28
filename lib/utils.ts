import TokenCacheService from "@/classes/tokenCache";
import { NATIVE_TOKEN_ADDRESS, TOKENLIST_EXPIRE_PERIOD } from "@/constants";
import { ApiResponse, UniqueContract } from "@/types";
import { TokenAPIResponse } from "@/types/tokens";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import numbro from "numbro";

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

export const matchTokenAddress = (tokenA: string, tokenB: string) => {
  return tokenA.toLowerCase() === tokenB.toLowerCase();
};

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

export const formatNumberToKMB = (number: number): string => {
  return numbro(number).format({
    average: true,
    output: "currency",
    mantissa: 2,
  });
};

export const formatNumberWithCommas = (numberString: string): string => {
  // Convert the string to a number
  const number = parseFloat(numberString);

  // Check if the number is valid
  if (isNaN(number)) {
    return "";
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

export const getWeekTimestamps = () => {
  const now = new Date();
  const endOfRange = new Date(now);
  endOfRange.setDate(now.getDate());
  endOfRange.setHours(23, 59, 59, 999);

  const startOfRange = new Date(endOfRange);
  startOfRange.setDate(endOfRange.getDate() - 6);
  startOfRange.setHours(0, 0, 0, 0);
  const fromTimestamp = Number((startOfRange.getTime() / 1000).toFixed(0));
  const toTimestamp = Number((endOfRange.getTime() / 1000).toFixed(0));

  return { fromTimestamp, toTimestamp };
};

export function validateDecimalPlaces(numStr: string, maxDecimals: number) {
  // Regular expression to check if the number has more than maxDecimals places
  const regex = new RegExp(`^\\d+(\\.\\d{0,${maxDecimals}})?$`);
  return regex.test(numStr);
}

export const formatTokenAmount = (num: number | undefined, digits = 2) => {
  if (num === 0) return "0";
  if (!num) return "-";
  if (num < 0.001 && digits <= 3) {
    return "<0.001";
  }
  if (num < 0.01 && digits <= 2) {
    return "<0.01";
  }

  let formattedAmount = numbro(num)
    .formatCurrency({
      average: true,
      mantissa: num >= 1000 ? 2 : digits,
      abbreviations: {
        million: "M",
        billion: "B",
      },
    })
    .replace("$", "");

  formattedAmount = formattedAmount.replace(".00", "");
  return formattedAmount;
};

export const formatDollarAmount = (
  num: number | undefined | null,
  digits = 2,
  round = true
) => {
  if (num === 0) return "$0.00";
  if (!num) return "-";
  if (num < 0.001 && digits <= 3) {
    return "<$0.001";
  }
  if (num < 0.01 && digits <= 2) {
    return "<$0.01";
  }

  return numbro(num).formatCurrency({
    average: round,
    mantissa: num > 1000 ? 2 : digits,
    abbreviations: {
      million: "M",
      billion: "B",
    },
  });
};

export const minutesToUnixTimestamp = (minutes: number) => {
  const now = Date.now();
  const timestamp = now + minutes * 60 * 1000;
  return Math.floor(timestamp / 1000);
};

export const timeAgo = (timestamp: number) => {
  const seconds = Math.floor((Date.now() - timestamp * 1000) / 1000);

  if (seconds < 60) return `${seconds} sec ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hrs ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} days ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} months ago`;

  const years = Math.floor(months / 12);
  return `${years} years ago`;
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
