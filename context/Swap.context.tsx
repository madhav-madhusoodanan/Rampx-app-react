"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface SwapContextType {
  //   mode: string;
  //   setMode: (mode: string) => void;
  isTokenSelectorModalOpen: boolean;
  setIsTokenSelectorModalOpen: (mode: boolean) => void;
}

const SwapContext = createContext<SwapContextType | undefined>(undefined);

export function SwapProvider({ children }: { children: React.ReactNode }) {
  const [isTokenSelectorModalOpen, setIsTokenSelectorModalOpen] =
    useState(false);

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
      value={{ isTokenSelectorModalOpen, setIsTokenSelectorModalOpen }}
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
