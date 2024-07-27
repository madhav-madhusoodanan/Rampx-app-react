"use client";

import React, { ReactNode } from "react";
import { config, projectId } from "@/config";
import { siweConfig } from "@/config/siwe";

import { createWeb3Modal } from "@web3modal/wagmi/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { State, WagmiProvider } from "wagmi";

// Setup queryClient
const queryClient = new QueryClient();

if (!projectId) throw new Error("Project ID is not defined");

// Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  siweConfig,
  chainImages: {
    81457: "/assets/icons/blockchains/blast.svg",
    1329: "/assets/icons/blockchains/sei.svg",
  },
  // tokens: {
  //   109: {
  //     address: '0x165E8b1FaEFf503963f113dc81aFc49CeA2bAbA9',
  //     image:
  //       'https://github.com/ChewySwap/chewy-tokenlist/blob/main/tokens/shups.png?raw=true' //optional
  //   }
  // },
  // enableAnalytics: true, // Optional - defaults to your Cloud configuration
  // enableOnramp: false, // Optional - false as default

  // TODO - REMOVE UNUSED FONT FILES FROM /public/fonts
  themeVariables: {
    "--w3m-accent": "#B3CF3D",
    "--w3m-font-family": "SyneForWeb3Modal",
    // "--w3m-color-mix": "#B3CF3D",
    // "--w3m-color-mix-strength": 3,
    // "--w3m-font-size-master": "11px",
  },
});

export default function Web3ModalProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
