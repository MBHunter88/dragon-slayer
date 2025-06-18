import React, { useState, useEffect } from "react";
import "./App/App.css";
import murlocimg from "./App/assests/murloc.png";
import sludgerimg from "./App/assests/sludger.png";
import { enemyAttackValue, isEnemyHit, resetAfterDefeat } from "../utils/fightUtils";
import useAudioManager from "../utils/useAudioManager";

const Cave = ({ onReturnClick, health, setHealth, gold, setGold, inventory, setMode, xp, setXp, currentWeaponIndex, setMessage, isMuted }) => {

    const caveEnemies = [
        { name: 'Sludger', power: 2, health: 15 },
        { name: 'Murloc', power: 8, health: 60 },
    ];
    const { play } = useAudioManager(isMuted);
    const [isFighting, setIsFighting] = useState(false);
    const [enemy, setEnemy] = useState(null);
    const [enemyHealth, setEnemyHealth] = useState(null)
    const [enemyPower, setEnemyPower] = useState(null)
    
    // Use effect to initialize enemy stats when the enemy is set
    useEffect(() => {
        if (enemy) {
            setEnemyHealth(enemy.health);
            setEnemyPower(enemy.power);
        }
    }, [enemy]);

    //function to hold logic for player attack
    const playerAttack = () => {
        play('attack');
        if (!inventory[currentWeaponIndex]) {
            setMessage("You don't have a weapon, go to the store buy one");
            return;
        }

        if (isEnemyHit()) { //if hit is landed
            play('hit');
            const damage = inventory[currentWeaponIndex]?.power + Math.floor(Math.random() * xp); //damage = weapon power + player xp factor
            setEnemyHealth(prevHealth => prevHealth - damage); //subtract damage from current health
            if (enemyHealth - damage <= 0) {
                setMessage(`${enemy.name} defeated! You gained XP and gold!`);
                setXp(xp + enemyPower);
                setGold(gold + 20);
                setIsFighting(false);
                return; //enemy defeated, stop further actions
            }
        } else {
            play('miss');
            setMessage("you missed!");
        }

        const enemyDamage = enemyAttackValue(enemyPower, xp);
        const newHealth = health - enemyDamage;
        setHealth(newHealth);
        setMessage(`You took ${enemyDamage} damage!`);
        if (newHealth <= 0) {
            setMessage("You have been defeated! The game will reset.");
            resetAfterDefeat(setHealth, setEnemy, setIsFighting, setMode);
        }
    };

    return (

        <>
        <div className="game-container">
            <h1>Cave</h1>
            <p>Face the monsters lurking in the dark.</p>
            <div className="player-stats">
            <p>Health: {health}</p>
            <p>Gold: {gold}</p>
            <p>XP: {xp}</p>
            <p>Current Weapon: {inventory.length > 0 ? inventory[currentWeaponIndex].name : "Empty"}</p>
            </div>
            
            {isFighting ? (
                <>
  
                    <p>Enemy: {enemy.name} (Health: {enemyHealth})</p>
                    <div className="button-container">
                        <button onClick={playerAttack}>Attack</button>
                        <button onClick={() => setIsFighting(false)}>Run</button>
                    </div>
                </>
            ) : (
                <>
                    <img src={sludgerimg} alt="Sludger enemy" />
                    <img src={murlocimg} alt="Murloc enemy" />
                    <div className="button-container">
                        <button onClick={() => {
                            setEnemy(caveEnemies[0]);
                            setIsFighting(true)
                        }}>Fight Sludger</button>
                        <button onClick={() => {
                            setEnemy(caveEnemies[1]);
                            setIsFighting(true)
                        }}>Fight Murloc</button>
                        
                    </div>
                    <div className="return-container">
                        <button onClick={onReturnClick}>Return to Town Hall</button>
                    </div>
                    
                </>
            )}
            </div>
        </>
    );

}
export default Cave
