import React from "react";
import { v4 as uuid } from "uuid";
import Section from "./Section";
import { Wand } from "../types";

const wands: Wand[] = [
  { name: "Fly", charges: 9 },
  { name: "Lightning Bolt", charges: 3 },
  { name: "Cure Critical Wounds", charges: 9 },
  { name: "Charm Person", charges: 18 },
  { name: "Charm Person", charges: 9 },
  { name: "Mage Armor", charges: 6 },
].map((wand) => ({ ...wand, id: uuid() }));

const Wands = () => {
  return (
    <Section>
      <Section.Title>Wands</Section.Title>
      <Section.Body>
        {wands.map((wand) => {
          return (
            <div key={wand.id}>
              {wand.name} ({wand.charges})
            </div>
          );
        })}
      </Section.Body>
    </Section>
  );
};
export default Wands;
