//import for Reat and all child components
import React, { useState } from 'react';
import StartMenu from '../StartMenu';
import TownHall from '../TownHall';
import Store from '../Store';
import Cave from '../Cave';
import DragonFight from '../DragonFight';
import usePlayer from '../Player';
import TextModal from '../TextModal';

//define App component 
const App = () => {

  //define player using usePlayer hook and initialize game modes
  const player = usePlayer();
  const [mode, setMode] = useState('start');
  const [message, setMessage] = useState('');

  const changeMode = (newMode) => setMode(newMode);
  const onReturnClick = () => changeMode('townHall'); //add handler to return to previous mode

  return (
    <div>
      {mode === 'start' && (
        <StartMenu onStart={() => changeMode('townHall')} onReset={player.resetPlayer} />
      )}
      {mode === 'townHall' && (
        <TownHall
          onEnterCave={() => changeMode('cave')}
          onEnterStore={() => changeMode('store')}
          onEnterDragonFight={() => changeMode('dragonFight')}
          onReturnToStart={() => changeMode('start')}
        />
      )}
      {mode === 'cave' && <Cave {...player} onReturnClick={onReturnClick} setMessage={setMessage} />}
      {mode === 'store' && <Store {...player} setMode={setMode} onReturnClick={onReturnClick}/>}
      {mode === 'dragonFight' && <DragonFight {...player} setMode={setMode} onReturnClick={onReturnClick} setMessage={setMessage} />}
      <TextModal message={message} onClose={() => setMessage('')} />
    </div>
  );
};

export default App;
