const useAudioManager = (muted) => {
  const beep = (frequency) => {
    if (muted) return;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    osc.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  };

  const play = (name) => {
    switch (name) {
      case 'attack':
        beep(440);
        break;
      case 'hit':
        beep(660);
        break;
      case 'miss':
        beep(220);
        break;
      default:
        break;
    }
  };

  return { play };
};

export default useAudioManager;
