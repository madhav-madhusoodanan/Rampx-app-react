import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const shortenAddress = (address: `0x${string}` | undefined) => {
  if (!address) return "";

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
