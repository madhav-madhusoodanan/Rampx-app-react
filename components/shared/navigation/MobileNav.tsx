"use client";

import React, { useState } from "react";
import { NAV_LINKS } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Popover open={open} onOpenChange={() => setOpen(!open)}>
      <PopoverTrigger>
        <Menu className="mt-2" />
      </PopoverTrigger>
      <PopoverContent
        align="center"
        className="border-a-fluo border-[0.5px] bg-[#3F412B] flex flex-col gap-y-3 p-1 w-[150px] mt-3"
      >
        {NAV_LINKS.map(({ label, path }) => (
          <Link
            key={label}
            href={path}
            className="uppercase relative group cursor-pointer px-3"
            onClick={() => setOpen(false)}
          >
            <p
              className={
                pathname.startsWith(path)
                  ? "text-a-fluo"
                  : "text-white group-hover:text-a-fluo group-hover:text-shadow-a-fluo"
              }
            >
              {label}
            </p>
          </Link>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default MobileNav;
