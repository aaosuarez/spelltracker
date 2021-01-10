export enum Mode {
  PREPARE,
  CAST,
}

export type Hex = {
  name: string;
};

export type Spell = {
  level: number;
  name: string;
  id: string;
};

export type Scroll = {
  name: string;
};

export type Wand = {
  id: string;
  name: string;
  charges: number;
};
