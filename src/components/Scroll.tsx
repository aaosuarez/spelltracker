import React from "react";
import Section from "./Section";
import { Scroll } from "../types";

const scrolls: Scroll[] = [
  { name: "Shield" },
  { name: "Symbol of Sleep" },
  { name: "Mindfog" },
];

const Scrolls = () => {
  return (
    <Section>
      <Section.Title>Scrolls</Section.Title>
      <Section.Body>
        {scrolls
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((scroll) => {
            return <div key={scroll.name}>{scroll.name}</div>;
          })}
      </Section.Body>
    </Section>
  );
};

export default Scrolls;
