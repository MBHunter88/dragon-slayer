import React, { useState, useEffect } from 'react';
import "./App/App.css"


//define usePlayer hook
const usePlayer = () => {

  //initialize all Player stats, loading from localStorage if available
  const [health, setHealth] = useState(() => {
    const saved = localStorage.getItem('health');
    return saved !== null ? JSON.parse(saved) : 100;
  });
  const [gold, setGold] = useState(() => {
    const saved = localStorage.getItem('gold');
    return saved !== null ? JSON.parse(saved) : 150;
  });
  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem('inventory');
    return saved !== null ? JSON.parse(saved) : [];
  });
  const [xp, setXp] = useState(() => {
    const saved = localStorage.getItem('xp');
    return saved !== null ? JSON.parse(saved) : 0;
  });
  const [currentWeaponIndex, setCurrentWeaponIndex] = useState(() => {
    const saved = localStorage.getItem('currentWeaponIndex');
    return saved !== null ? JSON.parse(saved) : -1;
  });

  //sync state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('health', JSON.stringify(health));
  }, [health]);

  useEffect(() => {
    localStorage.setItem('gold', JSON.stringify(gold));
  }, [gold]);

  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('xp', JSON.stringify(xp));
  }, [xp]);

  useEffect(() => {
    localStorage.setItem('currentWeaponIndex', JSON.stringify(currentWeaponIndex));
  }, [currentWeaponIndex]);

  //reset function to clear storage and reinitialize state
  const resetPlayer = () => {
    localStorage.removeItem('health');
    localStorage.removeItem('gold');
    localStorage.removeItem('inventory');
    localStorage.removeItem('xp');
    localStorage.removeItem('currentWeaponIndex');
    setHealth(100);
    setGold(150);
    setInventory([]);
    setXp(0);
    setCurrentWeaponIndex(-1);
  };

  return {
    
    health,
    setHealth,
    gold,
    setGold,
    inventory,
    setInventory,
    xp,
    setXp,
    currentWeaponIndex,
    setCurrentWeaponIndex,
    resetPlayer,

  };
};

export default usePlayer;
