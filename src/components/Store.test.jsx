import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Store from './Store';

function Wrapper() {
  const [health, setHealth] = React.useState(100);
  const [gold, setGold] = React.useState(40);
  const [inventory, setInventory] = React.useState([]);
  const [currentWeaponIndex, setCurrentWeaponIndex] = React.useState(-1);

  return (
    <Store
      onReturnClick={() => {}}
      health={health}
      setHealth={setHealth}
      gold={gold}
      setGold={setGold}
      inventory={inventory}
      setInventory={setInventory}
      currentWeaponIndex={currentWeaponIndex}
      setCurrentWeaponIndex={setCurrentWeaponIndex}
    />
  );
}


describe('Store actions', () => {
  test('buyItem adds a weapon and subtracts gold', async () => {
    render(<Wrapper />);

    // Buy first weapon
    await userEvent.click(screen.getByRole('button', { name: /buy stick/i }));
    expect(screen.getByText(/gold: 10/i)).toBeInTheDocument();
    expect(screen.getByText(/inventory: stick/i)).toBeInTheDocument();
  });

  test('sellItem removes a weapon and adds gold', async () => {
    render(<Wrapper />);

    // buy then sell
    await userEvent.click(screen.getByRole('button', { name: /buy stick/i }));
    await userEvent.click(screen.getByRole('button', { name: /sell weapon/i }));

    expect(screen.getByText(/gold: 25/i)).toBeInTheDocument();
    expect(screen.getByText(/inventory: empty/i)).toBeInTheDocument();
  });

  test('buyHealth increases health and costs gold', async () => {
    render(<Wrapper />);

    await userEvent.click(screen.getByRole('button', { name: /buy health/i }));
    expect(screen.getByText(/health: 110/i)).toBeInTheDocument();
    expect(screen.getByText(/gold: 30/i)).toBeInTheDocument();
  });
});


