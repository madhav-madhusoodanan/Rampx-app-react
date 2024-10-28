import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage, http } from "wagmi";
import { mainnet, base, blast, sei, polygon, bsc } from "wagmi/chains";
// import { type Chain } from "viem";

// Get projectId at https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

// TODO - Update web3 metadata prior to production
const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// export const sei = {
//   id: 1329,
//   name: "Sei",
//   nativeCurrency: { name: "Sei", symbol: "SEI", decimals: 18 },
//   rpcUrls: {
//     default: { http: ["https://evm-rpc.sei-apis.com/"] },
//   },
//   blockExplorers: {
//     default: { name: "Seitrace", url: "https://seitrace.com" },
//   },
//   contracts: {
//     // ensRegistry: {
//     //   address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
//     // },
//     // ensUniversalResolver: {
//     //   address: "0xE4Acdd618deED4e6d2f03b9bf62dc6118FC9A4da",
//     //   blockCreated: 16773775,
//     // },
//     // multicall3: {
//     //   address: "0xca11bde05977b3631167028862be2a173976ca11",
//     //   blockCreated: 14353601,
//     // },
//   },
// } as const satisfies Chain;

const chains = [mainnet, base, blast, polygon] as const;

export const CHAINMAP = {
  [mainnet.id]: mainnet,
  [base.id]: base,
  [polygon.id]: polygon,
  [blast.id]: blast,
  // [sei.id]: sei,
};

// Create wagmiConfig
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [blast.id]: http(),
    [base.id]: http(),
    // [sei.id]: http(),
  },
  //   ...wagmiOptions // Optional - Override createConfig parameters
});
