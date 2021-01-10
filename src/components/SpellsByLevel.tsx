import { getSpellsByLevel } from "../utils";
import Section from "./Section";
import React from "react";
import { Spell } from "../types";

const SpellsByLevel = ({
  spells,
  renderSpell,
}: {
  spells: Spell[];
  renderSpell: (spell: Spell) => React.ReactNode;
}) => {
  return (
    <>
      {Object.entries(getSpellsByLevel(spells)).map(([level, spells]) => {
        return (
          <Section key={level}>
            <Section.Title>Level {level} Spells</Section.Title>
            <Section.Body>
              <ul className={"mb-4"}>
                {spells.map((spell) => renderSpell(spell))}
              </ul>
            </Section.Body>
          </Section>
        );
      })}
    </>
  );
};

export default SpellsByLevel;
