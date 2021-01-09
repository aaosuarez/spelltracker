export type Spell = {
  level: number;
  name: string;
  id: number;
};

export const knownSpells: Spell[] = [
  {
    level: 0,
    name: "Arcane Mark",
  },
  {
    level: 0,
    name: "Bleed",
  },
  {
    level: 0,
    name: "Dancing Lights",
  },
  {
    level: 0,
    name: "Daze",
  },
  {
    level: 0,
    name: "Detect Magic",
  },
  {
    level: 0,
    name: "Detect Poison",
  },
  {
    level: 0,
    name: "Guidance",
  },
  {
    level: 0,
    name: "Light",
  },
  {
    level: 0,
    name: "Mending",
  },
  {
    level: 0,
    name: "Message",
  },
  {
    level: 0,
    name: "Putrefy Food and Drink",
  },
  {
    level: 0,
    name: "Read Magic",
  },
  {
    level: 0,
    name: "Resistance",
  },
  {
    level: 0,
    name: "Spark",
  },
  {
    level: 0,
    name: "Stabilize",
  },
  {
    level: 0,
    name: "Touch of Fatigue",
  },
  {
    level: 1,
    name: "Ear-Piercing Scream",
  },
  {
    level: 1,
    name: "Ill Omen",
  },
  {
    level: 1,
    name: "Mage Armor",
  },
  {
    level: 1,
    name: "Unseen Servant",
  },
  {
    level: 1,
    name: "Command",
  },
  {
    level: 1,
    name: "Chill Touch",
  },
  {
    level: 1,
    name: "Ventriloquism",
  },
  {
    level: 1,
    name: "Ray of Enfeeblement",
  },
  {
    level: 1,
    name: "Web Bolt",
  },
  {
    level: 1,
    name: "Burning Hands",
  },
  {
    level: 1,
    name: "Comprehend Languages",
  },
  {
    level: 2,
    name: "Blindness Deafness",
  },
  {
    level: 2,
    name: "Raven's Flight",
  },
  {
    level: 2,
    name: "Silence",
  },
  {
    level: 2,
    name: "Psychic Leech",
  },
  {
    level: 2,
    name: "Vomit Swarm",
  },
  {
    level: 2,
    name: "Lipstitch",
  },
  {
    level: 2,
    name: "Glitterdust",
  },
  {
    level: 3,
    name: "Howling Agony",
  },
  {
    level: 3,
    name: "Bestow Curse",
  },
  {
    level: 3,
    name: "Air Geyser",
  },
  {
    level: 3,
    name: "Harrowing",
  },
  {
    level: 3,
    name: "Haste",
  },
  {
    level: 3,
    name: "Dispel Magic",
  },
  {
    level: 4,
    name: "Black Tentacles",
  },
  {
    level: 4,
    name: "Divination",
  },
].map((spell, i) => ({ ...spell, id: i }));
