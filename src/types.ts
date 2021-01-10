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
  id: number;
};
export type Scroll = {
  name: string;
};
export type Wand = {
  id: number;
  name: string;
  charges: number;
};
