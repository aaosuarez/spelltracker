import React from "react";
import { ListTitle } from "./ListTitle";
import { Wand } from "../types";

const wands: Wand[] = [
  { name: "Fly", charges: 9 },
  { name: "Lightning Bolt", charges: 3 },
  { name: "Cure Critical Wounds", charges: 9 },
  { name: "Charm Person", charges: 18 },
  { name: "Charm Person", charges: 9 },
  { name: "Mage Armor", charges: 6 },
].map((wand) => ({ ...wand, id: Math.floor(Math.random() * 1000) }));

const Wands = () => {
  return (
    <div>
      <ListTitle>Wands</ListTitle>
      {wands.map((wand) => {
        return (
          <div key={wand.id}>
            {wand.name} ({wand.charges})
          </div>
        );
      })}
    </div>
  );
};
export default Wands;
