"use client";
import React, { useEffect } from "react";
import { useChainId } from "wagmi";

import { useDispatch } from "@/store";
import { onChainChange } from "@/store/slices/swap";

const Listeners = () => {
  const dispatch = useDispatch();
  const chainId = useChainId();

  useEffect(() => {
    dispatch(onChainChange(chainId));
  }, [chainId]);

  return <></>;
};

export default Listeners;
