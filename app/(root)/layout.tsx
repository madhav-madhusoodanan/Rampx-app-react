import React from "react";
import Header from "@/components/shared/navigation/Header";
import FooterIcons from "@/components/shared/FooterIcons";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen flex flex-col bg-ramp bg-cover bg-center relative">
      <Header />

      <div className="mx-auto w-full max-w-5xl flex flex-col flex-1">
        {children}
      </div>

      <div className="w-full p-6 max-w-screen-2xl mx-auto">
        <FooterIcons />
      </div>
      {/* Toaster */}
    </main>
  );
};

export default Layout;
