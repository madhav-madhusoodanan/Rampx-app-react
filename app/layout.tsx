import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { headers } from "next/headers";

import { cookieToInitialState } from "wagmi";
import { config } from "@/config/Web3.config";
import Web3ModalProvider from "@/context/Web3.context";
import { SwapProvider } from "@/context/Swap.context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// TODO - Revisit this and consult with team with regards to metadata content

export const metadata: Metadata = {
  title: "RampX",
  description:
    "The All-in-One Platform for Seamless Crypto Onboarding and Trading",

  icons: {
    icon: "/public/assets/icons/rampx-icon.svg",
  },
  openGraph: {
    images: ["public/assets/images/ogimage.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3ModalProvider initialState={initialState}>
          <SwapProvider>{children}</SwapProvider>
        </Web3ModalProvider>
      </body>
    </html>
  );
}
