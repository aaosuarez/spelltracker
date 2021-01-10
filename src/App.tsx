import React from "react";
import { knownSpells } from "./spells";
import Button, { ButtonSizes, ButtonType } from "./components/Button";
import {
  canCastSpell,
  canPrepareSpell,
  getSpellsByLevel,
  spellsPerDay,
} from "./utils";
import Wands from "./components/Wands";
import Scrolls from "./components/Scroll";
import Hexes from "./components/Hexes";
import SpellsByLevel from "./components/SpellsByLevel";
import useAppReducer from "./hooks/useAppReducer";
import { Mode, Spell } from "./types";

// TODO: Sort alphabetically by level
const SpellsPerDay = ({ preparedSpells }: { preparedSpells: Spell[] }) => {
  const preparedSpellsByLevel = getSpellsByLevel(preparedSpells);
  return (
    <div className={"my-2"}>
      <div className={"text-center text-sm"}>Prepared Spells</div>
      <div className={"flex justify-between"}>
        {spellsPerDay.map((maxSpells, level) => {
          const numPreparedSpells = preparedSpellsByLevel[level]?.length ?? 0;
          const text =
            maxSpells == null ? "-" : `${numPreparedSpells}/${maxSpells}`;
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

// TODO: Sort alphabetically & if cast by level
const SpellsCast = ({ usedSpells }: { usedSpells: Spell[] }) => {
  const usedSpellsByLevel = getSpellsByLevel(usedSpells);
  return (
    <div className={"my-2"}>
      <div className={"text-center text-sm"}>Spells Cast</div>
      <div className={"flex justify-between"}>
        {spellsPerDay.map((spellNumber, level) => {
          const numUsedSpells = usedSpellsByLevel[level]?.length ?? 0;
          const text =
            spellNumber == null
              ? "-"
              : level === 0
              ? "∞"
              : `${numUsedSpells}/${spellNumber}`;
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
  const [{ preparedSpells, mode, usedSpells }, dispatch] = useAppReducer();
  const spellsToDisplay: Spell[] =
    mode === Mode.PREPARE ? knownSpells : preparedSpells;

  const renderSpell = (spell: Spell) => {
    const canPrepare = canPrepareSpell(preparedSpells, spell);

    return (
      <li key={spell.id} className={"flex justify-between items-center mb-2"}>
        {spell.name}
        {mode === Mode.PREPARE ? (
          <Button
            onClick={() => dispatch({ type: "PREPARE_SPELL", spell })}
            type={ButtonType.OUTLINE}
            size={ButtonSizes.SMALL}
            disabled={!canPrepare}
          >
            Prepare
          </Button>
        ) : (
          <Button
            onClick={() => dispatch({ type: "CAST_SPELL", spell })}
            size={ButtonSizes.SMALL}
            type={ButtonType.OUTLINE}
            disabled={!canCastSpell(usedSpells, spell)}
          >
            Cast
          </Button>
        )}
      </li>
    );
  };

  return (
    <div className={"flex flex-col h-screen"}>
      <div className={"p-4 bg-white shadow z-20"}>
        <div className={"flex"}>
          <Button
            className={"flex-1 mr-1 text-sm"}
            type={mode === Mode.PREPARE ? ButtonType.FILL : ButtonType.OUTLINE}
            onClick={() => dispatch({ type: "SET_MODE", mode: Mode.PREPARE })}
          >
            PREPARE SPELLS
          </Button>
          <Button
            className={"flex-1 ml-1 text-sm"}
            type={mode === Mode.CAST ? ButtonType.FILL : ButtonType.OUTLINE}
            onClick={() => dispatch({ type: "SET_MODE", mode: Mode.CAST })}
          >
            CAST SPELLS
          </Button>
        </div>
        {mode === Mode.PREPARE ? (
          <SpellsPerDay preparedSpells={preparedSpells} />
        ) : (
          <SpellsCast usedSpells={usedSpells} />
        )}
        <p
          className={"underline text-xs text-center"}
          onClick={() => dispatch({ type: "RESET" })}
        >
          Reset
        </p>
      </div>
      <div className={"overflow-y-auto"}>
        {mode === Mode.CAST ? (
          <>
            <Hexes />
            <Scrolls />
            <Wands />
          </>
        ) : null}
        <SpellsByLevel spells={spellsToDisplay} renderSpell={renderSpell} />
      </div>
    </div>
  );
}

export default App;
