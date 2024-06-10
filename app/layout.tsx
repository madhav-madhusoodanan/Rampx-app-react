import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
