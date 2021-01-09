import React, { useEffect, useReducer } from "react";
import { knownSpells, Spell } from "./spells";
import Button, { ButtonSizes, ButtonType } from "./Button";
import {
  canCastSpell,
  canPrepareSpell,
  getSpellsByLevel,
  isCantrip,
  spellsPerDay,
} from "./utils";

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

const SpellsCast = ({ usedSpells }: { usedSpells: Spell[] }) => {
  const usedSpellsByLevel = getSpellsByLevel(usedSpells);
  console.log({ usedSpells });
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

type Action =
  | { type: "SET_MODE"; mode: Mode }
  | { type: "PREPARE_SPELL"; spell: Spell }
  | { type: "CAST_SPELL"; spell: Spell }
  | { type: "RESET" };

type State = {
  mode: Mode;
  preparedSpells: Spell[];
  usedSpells: Spell[];
};

const initialState: State = {
  mode: Mode.PREPARE,
  preparedSpells: [],
  usedSpells: [],
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
    case "CAST_SPELL":
      const { usedSpells } = state;
      if (!canCastSpell(usedSpells, action.spell) || isCantrip(action.spell)) {
        return state;
      }
      const newUsedSpells = [...usedSpells, action.spell];
      return { ...state, usedSpells: newUsedSpells };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const STORAGE_KEY = "SPELL_TRACKER";

const initializer = (initialValue = initialState) => {
  const state = localStorage.getItem(STORAGE_KEY);
  return state != null ? JSON.parse(state) : initialValue;
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState, initializer);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const { preparedSpells, mode, usedSpells } = state;
  const spellsToDisplay: Spell[] =
    mode === Mode.PREPARE ? knownSpells : preparedSpells;

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
      <div className={"px-4 overflow-y-auto"}>
        {Object.entries(getSpellsByLevel(spellsToDisplay)).map(
          ([level, spells]) => {
            return (
              <div key={level}>
                <div
                  className={
                    "sticky top-0 uppercase text-sm py-3 bg-white z-10"
                  }
                >
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
                        {mode === Mode.PREPARE ? (
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
                        ) : (
                          <Button
                            onClick={() =>
                              dispatch({ type: "CAST_SPELL", spell })
                            }
                            size={ButtonSizes.SMALL}
                            type={ButtonType.OUTLINE}
                            disabled={!canCastSpell(usedSpells, spell)}
                          >
                            Cast
                          </Button>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

export default App;
