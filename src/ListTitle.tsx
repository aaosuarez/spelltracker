import React from "react";

export const ListTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={"sticky top-0 uppercase text-sm py-3 bg-white z-10"}>
      {children}
    </div>
  );
};
