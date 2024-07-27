"use client";
import React, { useState } from "react";
import Link from "next/link";
import { CopyIcon, CopyCheck } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { shortenAddress } from "@/lib/utils";

interface Props {
  contractAddress: string;
}

const ExploreBreadcrumb = ({ contractAddress }: Props) => {
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const copyContractAddressToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 1000); // Clear the success message after 2 seconds
    } catch (err) {
      setCopySuccess(false);
    }
  };
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-base text-a-gray ">
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/explore"
            className="hover:text-white transition-all duration-300"
          >
            Explore
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/explore"
            className="hover:text-white transition-all duration-300"
          >
            Tokens
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-white">PEPE</BreadcrumbPage>
          <div className="lining-nums flex items-center gap-2">
            {shortenAddress(contractAddress as `0x${string}`)}
            {copySuccess ? (
              <CopyCheck className="h-4 w-4" />
            ) : (
              <button type="button" onClick={copyContractAddressToClipboard}>
                {" "}
                <CopyIcon className="h-4 w-4 hover:text-white transition-all duration-300" />
              </button>
            )}
          </div>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default ExploreBreadcrumb;
