import React from "react";
import { ListTitle } from "./ListTitle";

type Hex = {
  name: string;
};

const hexes: Hex[] = [
  { name: "Evil Eye" },
  { name: "Cackle" },
  { name: "Misfortune" },
  { name: "Flight" },
  { name: "Slumber" },
];

const Hexes = () => {
  return (
    <div>
      <ListTitle>Hexes</ListTitle>
      {hexes.map((hex) => {
        return <div key={hex.name}>{hex.name}</div>;
      })}
    </div>
  );
};

export default Hexes;
