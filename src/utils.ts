import { Spell } from "./spells";

export const spellsPerDay = [4, 6, 4, 3, 2, null, null, null, null];

export const getSpellsByLevel = (spells: Spell[]): Record<number, Spell[]> => {
  return spells.reduce((result, spell) => {
    if (result[spell.level] != null) {
      result[spell.level].push(spell);
    } else {
      result[spell.level] = [spell];
    }
    return result;
  }, {} as Record<number, Spell[]>);
};

// TODO: account for cantrips
export const canPrepareSpell = (
  preparedSpells: Spell[],
  newSpell: Spell
): boolean => {
  const maxSpells = spellsPerDay[newSpell.level];
  const numSpellsPreparedAtLevel =
    getSpellsByLevel(preparedSpells)[newSpell.level]?.length ?? 0;
  return maxSpells != null && numSpellsPreparedAtLevel < maxSpells;
};
