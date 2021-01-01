import React from 'react';
import spells, {Spell} from './spells';

const spellsByLevel: Record<number, Spell[]> = spells.reduce((result, spell) => {
  if (result[spell.level] != null) {
    result[spell.level].push(spell);
  } else {
    result[spell.level] = [spell];
  }
  return result;
}, {} as Record<number, Spell[]>);

function App() {
  return (
    <div className={"px-4"}>
      {Object.entries(spellsByLevel).map(([level, spells]) => {
        return (<>
          <div className={"uppercase text-sm sticky top-0 py-3 bg-white"}>Level {level}</div>
          <ul className={"mb-4"}>
            {spells.map(spell => (<li id={spell.name}>{spell.name}</li>))}
          </ul>
        </>)
      })}
    </div>
  );
}

export default App;
