import React from "react";
import Image from "next/image";

import Header from "@/components/shared/navigation/Header";
import XBoy from "@/components/XBoy";
import backgroundImage from "../../public/assets/images/codebgstatic.png";
import GlobalModals from "@/components/modals/globalModals";
// import FooterIcons f../listenersonents/shared/FooterIcons";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen flex flex-col bg-a-charcoal relative font-syne">
      <Image
        src={backgroundImage}
        width={0}
        height={0}
        alt="Cover Image"
        className="object-fill opacity-10 z-0"
        fill
        unoptimized
        draggable={false}
      />
      <Header />

      {/* <div className="absolute inset-0 h-full w-full bg-code bg-center bg-cover opacity-25 z-0 " />
      <div className="absolute inset-0 h-full w-full bg-transparent backdrop-blur-[2px] z-0 " /> */}

      <div className="mx-auto w-full max-w-6xl px-4 flex-1 relative">
        {children}
      </div>
      {/* <div className="w-full p-6 max-w-screen-2xl mx-auto">
        <FooterIcons />
      </div> */}
      {/* Toaster */}
      <div className="fixed right-6 bottom-4">
        <div className="flex justify-end">
          <XBoy />
        </div>
      </div>
      <GlobalModals />
    </main>
  );
};

export default Layout;
