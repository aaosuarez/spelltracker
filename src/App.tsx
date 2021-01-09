import React, { useReducer } from "react";
import { knownSpells, Spell } from "./spells";
import Button, { ButtonSizes, ButtonType } from "./Button";
import { canPrepareSpell, getSpellsByLevel, spellsPerDay } from "./utils";

enum Mode {
  PREPARE,
  CAST,
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

type Action =
  | { type: "SET_MODE"; mode: Mode }
  | { type: "PREPARE_SPELL"; spell: Spell };

type State = {
  mode: Mode;
  preparedSpells: Spell[];
};

const initialState: State = {
  mode: Mode.PREPARE,
  preparedSpells: [],
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_MODE":
      return { ...state, mode: action.mode };
    case "PREPARE_SPELL":
      const { preparedSpells } = state;
      if (!canPrepareSpell(preparedSpells, action.spell)) {
        return state;
      }
      const newPreparedSpells = [
        ...preparedSpells,
        { ...action.spell, id: Math.floor(Math.random() * 1000) },
      ];
      return { ...state, preparedSpells: newPreparedSpells };
    default:
      return state;
  }
};

function App() {
  // TODO: allow spell casting
  const [state, dispatch] = useReducer(reducer, initialState);
  const { preparedSpells, mode } = state;
  const spellsToDisplay: Spell[] =
    mode === Mode.PREPARE ? knownSpells : preparedSpells;

  return (
    <>
      <div className={"sticky top-0 p-4 bg-white shadow z-10"}>
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
                        {spell.name}
                        <Button
                          onClick={() =>
                            dispatch({ type: "PREPARE_SPELL", spell })
                          }
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
