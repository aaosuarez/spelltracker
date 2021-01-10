import React from "react";
import { ListTitle } from "./ListTitle";
import { Scroll } from "../types";

const scrolls: Scroll[] = [
  { name: "Shield" },
  { name: "Symbol of Sleep" },
  { name: "Mindfog" },
];

const Scrolls = () => {
  return (
    <div>
      <ListTitle>Scrolls</ListTitle>
      {scrolls.map((scroll) => {
        return <div key={scroll.name}>{scroll.name}</div>;
      })}
    </div>
  );
};

export default Scrolls;
