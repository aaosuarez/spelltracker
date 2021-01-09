import React, { useState } from "react";
import spells, { Spell } from "./spells";
import Button, { ButtonType } from "./Button";
import { spellsPerDay } from "./utils";

const spellsByLevel: Record<number, Spell[]> = spells.reduce(
  (result, spell) => {
    if (result[spell.level] != null) {
      result[spell.level].push(spell);
    } else {
      result[spell.level] = [spell];
    }
    return result;
  },
  {} as Record<number, Spell[]>
);

enum Mode {
  Prepare,
  Cast,
}

const SpellsPerDay = () => {
  return (
    <>
      {spellsPerDay.map((spellNumber, level) => {
        const text = spellNumber == null ? "-" : `0/${spellNumber}`;
        return (
          <div key={level} className={"flex flex-col text-center flex-1"}>
            <div className={"text-xs"}>{level}</div>
            <div className={"text-sm"}>{text}</div>
          </div>
        );
      })}
    </>
  );
};

function App() {
  const [mode, setMode] = useState<Mode>(Mode.Prepare);
  return (
    <>
      <div className={"sticky top-0 p-4 bg-white shadow"}>
        <div className={"flex"}>
          <Button
            className={"flex-1 mr-1 text-sm"}
            type={mode === Mode.Prepare ? ButtonType.Fill : ButtonType.Outline}
            onClick={() => setMode(Mode.Prepare)}
          >
            PREPARE SPELLS
          </Button>
          <Button
            className={"flex-1 ml-1 text-sm"}
            type={mode === Mode.Cast ? ButtonType.Fill : ButtonType.Outline}
            onClick={() => setMode(Mode.Cast)}
          >
            CAST SPELLS
          </Button>
        </div>
        <div className={"text-center my-2 text-sm"}>Prepared Spells</div>
        <div className={"flex justify-between"}>
          <SpellsPerDay />
        </div>
      </div>
      <div className={"px-4"}>
        {Object.entries(spellsByLevel).map(([level, spells]) => {
          return (
            <>
              <div className={"uppercase text-sm py-3 bg-white"}>
                Level {level}
              </div>
              <ul className={"mb-4"}>
                {spells.map((spell) => (
                  <li id={spell.name}>{spell.name}</li>
                ))}
              </ul>
            </>
          );
        })}
      </div>
    </>
  );
}

export default App;
