import React from "react";
import { footerIcons } from "@/constants";
import Image from "next/image";

const FooterIcons = () => {
  return (
    <div className="flex justify-end">
      <div className="flex items-center gap-4">
        {footerIcons.map((item: any) => (
          <a target="_blank" rel="noreferrer" href={item.link} key={item.label}>
            <Image
              alt={item.label}
              src={item.imgURL}
              width={32}
              height={32}
              className="object-contain"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default FooterIcons;
