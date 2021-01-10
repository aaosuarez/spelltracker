import React from "react";

const Section = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

const SectionBody = ({ children }: { children: React.ReactNode }) => {
  return <div className={"mx-4 mb-4"}>{children}</div>;
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={
        "sticky top-0 uppercase text-xs text-purple-900 py-1 pl-2 bg-purple-100 z-10 mb-3"
      }
    >
      {children}
    </div>
  );
};

Section.Title = SectionTitle;
Section.Body = SectionBody;

export default Section;
