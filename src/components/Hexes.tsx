import React from "react";
import Section from "./Section";
import { Hex } from "../types";

const hexes: Hex[] = [
  { name: "Evil Eye" },
  { name: "Cackle" },
  { name: "Misfortune" },
  { name: "Flight" },
  { name: "Slumber" },
];

const Hexes = () => {
  return (
    <Section>
      <Section.Title>Hexes</Section.Title>
      <Section.Body>
        {hexes.map((hex) => {
          return <div key={hex.name}>{hex.name}</div>;
        })}
      </Section.Body>
    </Section>
  );
};

export default Hexes;
