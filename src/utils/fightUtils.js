export const enemyAttackValue = (enemyPower, xp) => {
  return Math.max(0, enemyPower * 5 - Math.floor(Math.random() * xp));
};

export const isEnemyHit = () => {
  return Math.random() > 0.2;
};

export const resetAfterDefeat = (setHealth, setEnemy, setIsFighting, setMode) => {
  setHealth(100);
  setEnemy(null);
  setIsFighting(false);
  setTimeout(() => {
    setMode('start');
  }, 2000);
};
