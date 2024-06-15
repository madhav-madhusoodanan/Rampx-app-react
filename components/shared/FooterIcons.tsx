import React from "react";
import { FOOTER_ICONS } from "@/constants";
import Image from "next/image";
import { FooterIcon } from "@/types";

const FooterIcons = () => {
  return (
    <div className="flex justify-end">
      <div className="flex items-center gap-4">
        {FOOTER_ICONS.map((item: FooterIcon) => (
          <a target="_blank" rel="noreferrer" href={item.link} key={item.label}>
            <Image
              alt={item.label}
              src={item.imgURL}
              width={32}
              height={32}
              className="object-contain rounded-full cursor-pointer hover:shadow-[0_0_6px_rgba(179,207,61,1)] transition-all duration-300"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default FooterIcons;
