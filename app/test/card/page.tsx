import React from "react";

const Page = () => {
  return (
    <div className="flex justify-center items-center h-screen max-w-[500px] mx-auto">
      {/* <div
        className="swap-border-container flex justify-center items-center
         bg-a-fluo "
      >
        <div className="h-[600px]">
          <div className="relative h-[5px] w-[500px] ">
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black to-black/10"></div>
          </div>

          <div className="bg-[#232323] swap-container h-[590px] w-[400px] flex justify-center items-center"></div>
        </div>
      </div> */}

      <div
        className="swap-border-container flex justify-center items-center
         bg-a-fluo w-full h-[600px] relative"
      >
        <div className="h-[1px] w-full absolute top-0 bg-gradient-to-r from-black/40 via-black to-black/40" />
        <div className="h-[1px] w-full absolute bottom-0 bg-gradient-to-r from-black/40 via-black to-black/40" />
        <div className="bg-[#232323] swap-container p-8 h-[598px]"></div>
      </div>
    </div>
  );
};

export default Page;
