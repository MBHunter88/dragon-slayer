import React, { useState, useEffect } from "react";
import "./App/App.css";
import dragonimg from "./App/assests/dragonimg.jpg";
import { enemyAttackValue, isEnemyHit, resetAfterDefeat } from "../utils/fightUtils";
import useAudioManager from "../utils/useAudioManager";

const DragonFight = ({ onReturnClick, health, setHealth, gold, setGold, inventory, xp, setXp, currentWeaponIndex, setMode, setMessage, isMuted }) => {
    const dragon = { name: 'Dragon', power: 20, health: 300 };
    const [isFighting, setIsFighting] = useState(false);

    const { play } = useAudioManager(isMuted);

    const [enemy, setEnemy] = useState(null);
    const [enemyHealth, setEnemyHealth] = useState(null);
    const [enemyPower, setEnemyPower] = useState(null);

    // Initialize enemy stats when the enemy is set
    useEffect(() => {
        if (enemy) {
            setEnemyHealth(enemy.health);
            setEnemyPower(enemy.power);
        }
    }, [enemy]);

    const playerAttack = () => {
        play('attack');
        if (!inventory[currentWeaponIndex]) {
            setMessage("You don't have a weapon, go to the store buy one");
            return;
        }

        if (isEnemyHit()) {
            play('hit');
            const damage = inventory[currentWeaponIndex]?.power + Math.floor(Math.random() * xp);
            setEnemyHealth(prevHealth => prevHealth - damage);
            if (enemyHealth - damage <= 0) {
                setMessage(`${enemy.name} defeated! You gained XP and gold!`);
                setXp(xp + enemyPower);
                setGold(gold + 100); // More gold for defeating the dragon
                setIsFighting(false);
                return;
            }
        } else {
            play('miss');
            setMessage("You missed!");
        }

        const enemyDamage = enemyAttackValue(enemyPower, xp);
        const newHealth = health - enemyDamage;
        setHealth(newHealth);
        setMessage(`You took ${enemyDamage} damage!`);
        if (newHealth <= 0) {
            setMessage("You have been defeated by the Dragon! The game will reset.");
            resetAfterDefeat(setHealth, setEnemy, setIsFighting, setMode);
        }
    };



    return (
        <>
    <div className="game-container">
       <h1>Dragon Fight</h1>
       <p>Confront the mighty dragon in a battle for the kingdom.</p>
       <div className="player-stats">
      <p>Health: {health}</p>
      <p>Gold: {gold}</p>
      <p>XP: {xp}</p>
      <p>Current Weapon: {inventory.length > 0 ? inventory[currentWeaponIndex].name : "Empty"}</p>
      </div>
      {isFighting ? (
        <>
        <img src={dragonimg} alt="Ferocious dragon" />
          <p>Dragon: {enemy.name} (Health: {enemyHealth})</p>
          <div className="button-container">
          <button onClick={playerAttack}>Attack</button>
          <button onClick={() => setIsFighting(false)}>Run</button>
          </div>
        </>
      ) : (
        <div className="button-container">
       <button onClick={() => {
                        setEnemy(dragon);
                        setIsFighting(true);
                    }}>Fight Dragon</button>
        </div>
      )}
      <div className="return-container">
      <button onClick={onReturnClick}>Return to Town Hall</button>
      </div>
      </div>
        </>
    )
}

export default DragonFight
