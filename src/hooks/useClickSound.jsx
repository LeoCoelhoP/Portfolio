import { useCallback, useContext, useEffect, useRef } from 'react';
import { PortfolioContext } from '../Contexts/PortfolioContext';
import { CLICK_VOLUME } from '../configs/constants';

export default function useClickSound() {
  const audioRef = useRef(null);
  const { portfolioState } = useContext(PortfolioContext);

  useEffect(() => {
    audioRef.current = new Audio('/audios/click.mp3');

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  const playSound = useCallback(() => {
    if (portfolioState.isMuted) return;

    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = CLICK_VOLUME;
    audio.currentTime = 0;
    audio.play();
  }, [portfolioState.isMuted]);

  return playSound;
}
