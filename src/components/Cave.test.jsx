import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cave from './Cave';

jest.mock('../utils/fightUtils', () => ({
  isEnemyHit: jest.fn(() => true),
  enemyAttackValue: jest.fn(() => 5),
  resetAfterDefeat: jest.fn(),
}));

function Wrapper() {
  const [health, setHealth] = React.useState(100);
  const [gold, setGold] = React.useState(0);
  const [inventory, setInventory] = React.useState([{ name: 'Stick', power: 5 }]);
  const [xp, setXp] = React.useState(0);
  const [currentWeaponIndex, setCurrentWeaponIndex] = React.useState(0);
  const [mode, setMode] = React.useState('cave');
  const [message, setMessage] = React.useState('');

  return (
    <Cave
      onReturnClick={() => {}}
      health={health}
      setHealth={setHealth}
      gold={gold}
      setGold={setGold}
      inventory={inventory}
      setMode={setMode}
      xp={xp}
      setXp={setXp}
      currentWeaponIndex={currentWeaponIndex}
      setMessage={setMessage}
    />
  );
}

describe('Cave combat', () => {
  test('attacking enemy reduces player health', async () => {
    render(<Wrapper />);

    await userEvent.click(screen.getByRole('button', { name: /fight sludger/i }));
    await screen.findByText(/enemy: sludger \(health: 15\)/i);
    await userEvent.click(screen.getByRole('button', { name: /attack/i }));

    await screen.findByText(/health: 95/i);
  });
});


