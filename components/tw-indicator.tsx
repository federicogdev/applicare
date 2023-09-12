import React from "react";

export const TwIndicator = () => {
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <div className="fixed z-50 flex items-center justify-center w-6 h-6 p-3 font-mono text-xs text-white rounded bg-zinc-800 bottom-1 left-1">
      <div className="block sm:hidden">XS</div>
      <div className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
        SM
      </div>
      <div className="hidden md:block lg:hidden xl:hidden 2xl:hidden">MD</div>
      <div className="hidden lg:block xl:hidden 2xl:hidden">LG</div>
      <div className="hidden xl:block 2xl:hidden">XL</div>
      <div className="hidden 2xl:block">XXL</div>
    </div>
  );
};
