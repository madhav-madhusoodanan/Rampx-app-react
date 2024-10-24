import { TokenInfo } from "@/types/tokens";
import { base, blast, bsc, mainnet, polygon, sei } from "viem/chains";

export const NATIVE_TOKEN_ADDRESS =
  "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

export const WRAPPED_COINS_INFO: Record<string, TokenInfo> = {
  [mainnet.id]: {
    name: "Wrapped Ether",
    symbol: "WETH",
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    logoURI: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=023",
    decimals: 18,
    chainId: mainnet.id,
  },
  [polygon.id]: {
    name: "Wrapped Matic",
    symbol: "WMATIC",
    address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    logoURI: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=023",
    decimals: 18,
    chainId: polygon.id,
  },
  [bsc.id]: {
    name: "Wrapped BNB",
    symbol: "WBNB",
    address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    logoURI: "https://cryptologos.cc/logos/bnb-bnb-logo.png?v=035",
    decimals: 18,
    chainId: bsc.id,
  },
  [base.id]: {
    name: "Wrapped Ether",
    symbol: "WETH",
    address: "0x4200000000000000000000000000000000000006",
    logoURI:
      "https://assets.coingecko.com/coins/images/2518/thumb/weth.png?1696503332",
    decimals: 18,
    chainId: base.id,
  },
  [blast.id]: {
    chainId: blast.id,
    address: "0x4300000000000000000000000000000000000004",
    symbol: "WETH",
    name: "WETH",
    decimals: 18,
    logoURI:
      "https://static.debank.com/image/mtr_token/logo_url/0x79a61d3a28f8c8537a3df63092927cfa1150fb3c/61844453e63cf81301f845d7864236f6.png",
  },
  [sei.id]: {
    chainId: sei.id,
    address: "0xE30feDd158A2e3b13e9badaeABaFc5516e95e8C7",
    symbol: "WSEI",
    name: "Wrapped SEI",
    decimals: 18,
    logoURI: "https://cdn.sei.io/sei-app/sei-icon.png",
  },
};
