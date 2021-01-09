import React, { useState } from "react";
import { knownSpells, Spell } from "./spells";
import Button, { ButtonSizes, ButtonType } from "./Button";
import { canPrepareSpell, getSpellsByLevel, spellsPerDay } from "./utils";

enum Mode {
  Prepare,
  Cast,
}

const SpellsPerDay = ({ preparedSpells }: { preparedSpells: Spell[] }) => {
  const preparedSpellsByLevel = getSpellsByLevel(preparedSpells);
  return (
    <div className={"my-2"}>
      <div className={"text-center text-sm"}>Prepared Spells</div>
      <div className={"flex justify-between"}>
        {spellsPerDay.map((maxSpells, level) => {
          const text =
            maxSpells == null
              ? "-"
              : `${preparedSpellsByLevel[level]?.length ?? 0}/${maxSpells}`;
          return (
            <div key={level} className={"flex flex-col text-center flex-1"}>
              <div className={"text-xs"}>{level}</div>
              <div className={"text-sm"}>{text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SpellsCast = () => {
  return (
    <div className={"my-2"}>
      <div className={"text-center text-sm"}>Spells Cast</div>
      <div className={"flex justify-between"}>
        {spellsPerDay.map((spellNumber, level) => {
          const text = spellNumber == null ? "-" : `0/${spellNumber}`;
          return (
            <div key={level} className={"flex flex-col text-center flex-1"}>
              <div className={"text-xs"}>{level}</div>
              <div className={"text-sm"}>{text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function App() {
  // TODO: switch to using useReducer
  // TODO: allow spell casting
  const [mode, setMode] = useState<Mode>(Mode.Prepare);
  const [preparedSpells, setPreparedSpells] = useState<Spell[]>([]);
  const spellsToDisplay: Spell[] =
    mode === Mode.Prepare ? knownSpells : preparedSpells;
  const prepareSpell = (spell: Spell) => {
    const preparedSpellsByLevel = getSpellsByLevel(preparedSpells);
    const maxSpells = spellsPerDay[spell.level];
    const numPreparedSpellsAtLevel =
      preparedSpellsByLevel[spell.level]?.length ?? 0;
    if (maxSpells == null || numPreparedSpellsAtLevel >= maxSpells) {
      return;
    }
    setPreparedSpells([
      ...preparedSpells,
      // TODO: generate uuid for spell
      { ...spell, id: Math.random() * 100000 },
    ]);
  };
  return (
    <>
      <div className={"sticky top-0 p-4 bg-white shadow z-10"}>
        <div className={"flex"}>
          <Button
            className={"flex-1 mr-1 text-sm"}
            type={mode === Mode.Prepare ? ButtonType.FILL : ButtonType.OUTLINE}
            onClick={() => setMode(Mode.Prepare)}
          >
            PREPARE SPELLS
          </Button>
          <Button
            className={"flex-1 ml-1 text-sm"}
            type={mode === Mode.Cast ? ButtonType.FILL : ButtonType.OUTLINE}
            onClick={() => {
              setMode(Mode.Cast);
            }}
          >
            CAST SPELLS
          </Button>
        </div>
        {mode === Mode.Prepare ? (
          <SpellsPerDay preparedSpells={preparedSpells} />
        ) : (
          <SpellsCast />
        )}
      </div>
      <div className={"px-4"}>
        {Object.entries(getSpellsByLevel(spellsToDisplay)).map(
          ([level, spells]) => {
            return (
              <>
                <div className={"uppercase text-sm py-3 bg-white"}>
                  Level {level}
                </div>
                <ul className={"mb-4"}>
                  {spells.map((spell) => {
                    const canPrepare = canPrepareSpell(preparedSpells, spell);

                    return (
                      <li
                        key={spell.id}
                        className={"flex justify-between items-center mb-2"}
                      >
                        <Button
                          onClick={() => prepareSpell(spell)}
                          type={ButtonType.OUTLINE}
                          size={ButtonSizes.SMALL}
                          disabled={!canPrepare}
                        >
                          Prepare
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              </>
            );
          }
        )}
      </div>
    </>
  );
}

export default App;
