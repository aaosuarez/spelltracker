import { getSpellsByLevel } from "./utils";
import { ListTitle } from "./ListTitle";
import React from "react";
import { Spell } from "./spells";

const SpellsByLevel = ({
  spells,
  renderSpell,
}: {
  spells: Spell[];
  renderSpell: (spell: Spell) => React.ReactNode;
}) => {
  return (
    <div>
      {Object.entries(getSpellsByLevel(spells)).map(([level, spells]) => {
        return (
          <div key={level}>
            <ListTitle>Level {level}</ListTitle>
            <ul className={"mb-4"}>
              {spells.map((spell) => renderSpell(spell))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default SpellsByLevel;
