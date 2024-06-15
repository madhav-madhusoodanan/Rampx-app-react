import React from "react";
import Image from "next/image";

import { MOCK_POPULAR_TOKENS } from "@/constants";

interface Props {
  token: (typeof MOCK_POPULAR_TOKENS)[0];
}

const PopularTokenCard = ({ token }: Props) => {
  return (
    <div className=" bg-gray-300 bg-opacity-0 hover:bg-opacity-10 transition-all duration-150 cursor-pointer py-2 px-6">
      <div className="flex items-center gap-6">
        <Image
          src={token.imageUrl}
          alt="popular-token"
          width={36}
          height={36}
          unoptimized
        />

        <div className="flex flex-col  gap-0.5">
          <span className="">{token.token}</span>
          <span className="text-[12px] text-a-gray">{token.symbol}</span>
        </div>
      </div>
    </div>
  );
};

export default PopularTokenCard;
