import { Spell } from "./types";

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

export const isCantrip = (spell: Spell): boolean => {
  return spell.level === 0;
};

export const canPrepareSpell = (
  preparedSpells: Spell[],
  spell: Spell
): boolean => {
  const maxSpells = spellsPerDay[spell.level];
  if (maxSpells == null) {
    return false;
  }
  const numSpellsPreparedAtLevel =
    getSpellsByLevel(preparedSpells)[spell.level]?.length ?? 0;

  if (isCantrip(spell)) {
    const hasPreparedCantrip = preparedSpells.some(
      (preparedSpell: Spell) => preparedSpell.name === spell.name
    );
    return !hasPreparedCantrip && numSpellsPreparedAtLevel < maxSpells;
  }

  return numSpellsPreparedAtLevel < maxSpells;
};

export const canCastSpell = (usedSpells: Spell[], spell: Spell): boolean => {
  if (isCantrip(spell)) {
    return true;
  }
  return !usedSpells.some((usedSpell) => usedSpell.id === spell.id);
};
