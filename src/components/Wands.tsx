import React from "react";
import { v4 as uuid } from "uuid";
import Section from "./Section";
import { Wand } from "../types";
import Button, { ButtonSizes, ButtonType } from "./Button";

export const initialWands: Wand[] = [
  { name: "Fly", charges: 8 },
  { name: "Lightning Bolt", charges: 3 },
  { name: "Cure Critical Wounds", charges: 9 },
  { name: "Charm Person", charges: 18 },
  { name: "Charm Person", charges: 9 },
  { name: "Mage Armor", charges: 6 },
].map((wand) => ({ ...wand, id: uuid() }));

const Wands = ({
  wands,
  increment,
  decrement,
}: {
  wands: Wand[];
  increment: (wand: Wand) => unknown;
  decrement: (wand: Wand) => unknown;
}) => {
  return (
    <Section>
      <Section.Title>Wands</Section.Title>
      <Section.Body>
        {wands.map((wand) => {
          return (
            <div
              key={wand.id}
              className={"flex justify-between items-center mb-2"}
            >
              <div>{wand.name}</div>
              <div>
                <Button
                  size={ButtonSizes.SMALL}
                  type={ButtonType.OUTLINE}
                  onClick={() => decrement(wand)}
                >
                  -
                </Button>
                <span className={"mx-2"}>{wand.charges}</span>
                <Button
                  size={ButtonSizes.SMALL}
                  type={ButtonType.OUTLINE}
                  onClick={() => increment(wand)}
                >
                  +
                </Button>
              </div>
            </div>
          );
        })}
      </Section.Body>
    </Section>
  );
};
export default Wands;
