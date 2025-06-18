import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DragonFight from './DragonFight';

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
  const [mode, setMode] = React.useState('dragonFight');
  const [message, setMessage] = React.useState('');

  return (
    <DragonFight
      onReturnClick={() => {}}
      health={health}
      setHealth={setHealth}
      gold={gold}
      setGold={setGold}
      inventory={inventory}
      xp={xp}
      setXp={setXp}
      currentWeaponIndex={currentWeaponIndex}
      setMode={setMode}
      setMessage={setMessage}
    />
  );
}

describe('DragonFight combat', () => {
  test('attacking dragon reduces player health', async () => {
    render(<Wrapper />);

    await userEvent.click(screen.getByRole('button', { name: /fight dragon/i }));
    await userEvent.click(screen.getByRole('button', { name: /attack/i }));

    expect(screen.getByText(/health: 95/i)).toBeInTheDocument();
  });
});


