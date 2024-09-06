import { createContext, useState } from 'react';

export const PlayerContext = createContext();

export default function PlayerProvider({ children }) {
  const [playerState, setPlayerState] = useState({
    animation: 'idle',
  });

  return (
    <PlayerContext.Provider value={{ playerState, setPlayerState }}>
      {children}
    </PlayerContext.Provider>
  );
}
