import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

import { headers } from "next/headers";

import { cookieToInitialState } from "wagmi";

import { config } from "@/config";
import Web3ModalProvider from "@/context";
import { SwapProvider } from "@/context/Swap.context";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-syne",
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
      <body className={`${inter.variable} ${syne.variable}`}>
        <Web3ModalProvider initialState={initialState}>
          <SwapProvider>{children}</SwapProvider>
        </Web3ModalProvider>
      </body>
    </html>
  );
}
