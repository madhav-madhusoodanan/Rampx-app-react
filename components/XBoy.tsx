"use client";
import React, { useState } from "react";
import Image from "next/image";
import { XIcon, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import Link from "next/link";
import { SOCIAL_MEDIA_LINKS } from "@/constants";

const XBoy = () => {
  const [isXBoyOpen, setIsXBoyOpen] = useState<boolean>(false);

  return (
    <div className="flex items-center gap-2">
      <motion.div
        initial="hidden"
        animate={isXBoyOpen ? "show" : "hidden"}
        variants={fadeIn("left", "tween", 0, 0.3)}
        className="w-[200px] h-[105px] flex justify-center items-center"
      >
        <div className="xboy-border-container flex justify-center items-center bg-a-fluo relative">
          {/* 
        FADED GRADIENT BORDER TOP + BOTTOM 
        Increase/Decrease the opacity of the gradient to make it more/less visible 👇
        */}
          <div className="h-[1px] w-full absolute top-0 bg-gradient-to-r from-[#232323]/20 via-[#232323] to-[#232323]/20" />
          <div className="h-[1px] w-full absolute bottom-0 bg-gradient-to-r from-[#232323]/20 via-[#232323] to-[#232323]/20" />

          <div className="xboy-container2 bg-[#232323] p-2">
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => setIsXBoyOpen(false)}
                className="border-[0.5px] border-a-fluo p-0.5 border-opacity-50"
              >
                <XIcon size={12} strokeWidth={1} className="text-a-fluo" />
              </button>
              <div className="text-sm animate-blink">XBOY</div>
            </div>
            <div className="mt-1 flex justify-end text-[10px]">
              Hey! i'm here to help
            </div>

            <div className="flex justify-end items-center gap-2 mt-2 text-sm text-a-fluo">
              <div className="flex items-center gap-1">
                <div>Documentation</div>
                <ChevronRight size={10} />
              </div>
              <p>|</p>
              <div className="flex items-center gap-1">
                <div>FAQs</div>
                <ChevronRight size={10} />
              </div>
            </div>

            <div className="flex justify-between items-center mt-2">
              <p className="text-[10px] pl-2">Reach out:</p>
              <div className="flex items-center gap-3">
                {SOCIAL_MEDIA_LINKS.map((socialMedia, index) => (
                  <Link key={index} href={socialMedia.link} target="_blank">
                    <socialMedia.icon className="text-a-fluo h-3 w-3" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <button
        type="button"
        onClick={() => setIsXBoyOpen((prev) => !prev)}
        className="w-[105px] h-[105px] flex justify-center items-center"
      >
        <div className="xboy-border-container flex justify-center items-center bg-a-fluo relative">
          {/* 
        FADED GRADIENT BORDER TOP + BOTTOM 
        Increase/Decrease the opacity of the gradient to make it more/less visible 👇
        */}
          <div className="h-[1px] w-full absolute top-0 bg-gradient-to-r from-[#232323]/20 via-[#232323] to-[#232323]/20" />
          <div className="h-[1px] w-full absolute bottom-0 bg-gradient-to-r from-[#232323]/20 via-[#232323] to-[#232323]/20" />

          <div className="xboy-container bg-[#232323] flex justify-center items-center">
            <Image
              src="/assets/images/xboy-idle.gif"
              alt="XBoy"
              width={65}
              height={65}
              className=""
            />
          </div>
        </div>
      </button>
    </div>
  );
};

export default XBoy;
