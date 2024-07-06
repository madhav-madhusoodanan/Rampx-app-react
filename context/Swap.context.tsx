"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ZERO_ADDRESS, MOCK_POPULAR_TOKENS } from "@/constants";

interface InputOrOutputToken {
  smartContractAddress: string;
  tokenName: string;
  tokenSymbol: string;
  tokenLogo: string;
}

interface SwapContextType {
  isTokenSelectorModalOpen: string;
  setIsTokenSelectorModalOpen: (isTokenSelectorModalOpen: string) => void;
  inputToken: InputOrOutputToken;
  setInputToken: (inputToken: InputOrOutputToken) => void;
  outputToken: InputOrOutputToken;
  setOutputToken: (inputToken: InputOrOutputToken) => void;
  inputAmount: string;
  setInputAmount: (inputAmount: string) => void;
  outputAmount: string;
  setOutputAmount: (outputAmount: string) => void;
  handleSwitchTokens: () => void;
}

const SwapContext = createContext<SwapContextType | undefined>(undefined);

export function SwapProvider({ children }: { children: React.ReactNode }) {
  const [isTokenSelectorModalOpen, setIsTokenSelectorModalOpen] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [outputAmount, setOutputAmount] = useState("");
  const [inputToken, setInputToken] = useState<InputOrOutputToken>({
    smartContractAddress: ZERO_ADDRESS,
    tokenName: "Ethereum",
    tokenSymbol: "ETH",
    tokenLogo: MOCK_POPULAR_TOKENS[0].tokenLogo,
  });
  const [outputToken, setOutputToken] = useState<InputOrOutputToken>({
    smartContractAddress: "",
    tokenName: "",
    tokenSymbol: "",
    tokenLogo: "",
  });

  const handleSwitchTokens = () => {
    const tempInputToken = inputToken;
    setInputToken(outputToken);
    setOutputToken(tempInputToken);
  };

  //   const handleThemeChange = () => {
  //     if (
  //       localStorage.theme === "dark" ||
  //       (!("theme" in localStorage) &&
  //         window.matchMedia("(prefers-color-scheme: dark)").matches)
  //     ) {
  //       setMode("dark");
  //       document.documentElement.classList.add("dark");
  //     } else {
  //       setMode("light");
  //       document.documentElement.classList.remove("dark");
  //     }
  //   };

  //   useEffect(() => {
  //     // add logic here to set url params based on swap input/output
  //   }, [mode]);

  return (
    <SwapContext.Provider
      value={{
        isTokenSelectorModalOpen,
        setIsTokenSelectorModalOpen,
        inputToken,
        setInputToken,
        outputToken,
        setOutputToken,
        inputAmount,
        setInputAmount,
        outputAmount,
        setOutputAmount,
        handleSwitchTokens,
      }}
    >
      {children}
    </SwapContext.Provider>
  );
}

export function useSwapContext() {
  const context = useContext(SwapContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
