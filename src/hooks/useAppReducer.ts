import { Dispatch, Reducer, useEffect, useReducer } from "react";
import { canCastSpell, canPrepareSpell, isCantrip } from "../utils";
import { Mode, Spell } from "../types";

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

type Action =
  | { type: "SET_MODE"; mode: Mode }
  | { type: "PREPARE_SPELL"; spell: Spell }
  | { type: "CAST_SPELL"; spell: Spell }
  | { type: "RESET" };

const STORAGE_KEY = "SPELL_TRACKER";

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

const initializer = (initialValue = initialState) => {
  const state = localStorage.getItem(STORAGE_KEY);
  return state != null ? JSON.parse(state) : initialValue;
};

export default function useAppReducer(): [State, Dispatch<Action>] {
  const [state, dispatch] = useReducer<Reducer<State, Action>, any>(
    reducer,
    initialState,
    initializer
  );

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return [state, dispatch];
}
