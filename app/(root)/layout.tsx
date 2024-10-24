import React from "react";
import Image from "next/image";

import Header from "@/components/shared/navigation/Header";
import XBoy from "@/components/XBoy";
import backgroundImage from "../../public/assets/images/codebgstatic.png";
// import FooterIcons f../listenersonents/shared/FooterIcons";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen flex flex-col bg-a-charcoal relative font-syne">
      <Image
        src={backgroundImage}
        width={0}
        height={0}
        alt="Cover Image"
        className="object-fill opacity-10"
        fill
        unoptimized
      />
      <Header />

      {/* <div className="absolute inset-0 h-full w-full bg-code bg-center bg-cover opacity-25 z-0 " />
      <div className="absolute inset-0 h-full w-full bg-transparent backdrop-blur-[2px] z-0 " /> */}

      <div className="mx-auto w-full max-w-6xl px-4 flex-1">{children}</div>
      {/* <div className="w-full p-6 max-w-screen-2xl mx-auto">
        <FooterIcons />
      </div> */}
      {/* Toaster */}
      <div className="w-full fixed right-6 bottom-4">
        <div className="max-w-screen-2xl mx-auto flex justify-end">
          <XBoy />
        </div>
      </div>
    </main>
  );
};

export default Layout;
