import React from "react";
import Header from "@/components/shared/navigation/Header";
// import FooterIcons from "@/components/shared/FooterIcons";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen flex flex-col bg-a-charcoal relative font-syne">
      <Header />

      {/* <div className="absolute inset-0 h-full w-full bg-code bg-center bg-cover opacity-25 z-0 " />
      <div className="absolute inset-0 h-full w-full bg-transparent backdrop-blur-[2px] z-0 " /> */}

      <div className="mx-auto w-full max-w-6xl px-4 flex-1 ">{children}</div>

      {/* <div className="w-full p-6 max-w-screen-2xl mx-auto">
        <FooterIcons />
      </div> */}
      {/* Toaster */}
    </main>
  );
};

export default Layout;
