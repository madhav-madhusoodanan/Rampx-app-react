import React, { ReactNode } from "react";

const TokenInfoTIle = ({
  title,
  content,
}: {
  title: string;
  content: string | ReactNode;
}) => {
  return (
    <div
      className="flex flex-col gap-1 px-3 py-2 bg-[#232418]/70 min-w-[200px]"
      style={{ borderRadius: 10 }}
      key={title}
    >
      <h3 className="text-white/50">{title}</h3>
      <p className="text-[28px]">{content}</p>
    </div>
  );
};

export default TokenInfoTIle;
