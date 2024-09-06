import { useContext, useEffect, useRef } from 'react';

import { useTranslation } from 'react-i18next';

import { PortfolioContext } from '../../../Contexts/PortfolioContext';
import { GAME_OVER_VOLUME } from '../../../configs/constants';

const gameOverAudio = new Audio('/audios/gameover.mp3');

export default function GameOverScreen() {
  const { portfolioState, setPortfolioState } = useContext(PortfolioContext);
  const audioPlayed = useRef(false);

  const { t } = useTranslation();

  function handleRestart() {
    setPortfolioState((state) => ({ ...state, isPlayerDead: false }));
  }

  useEffect(() => {
    if (
      portfolioState.isPlayerDead &&
      portfolioState.currentModal === '' &&
      !audioPlayed.current
    ) {
      gameOverAudio.volume = GAME_OVER_VOLUME;
      gameOverAudio.play();
      audioPlayed.current = true;
      return;
    }

    if (!portfolioState.isPlayerDead) audioPlayed.current = false;

    if (!portfolioState.isPlayerDead || portfolioState.currentModal !== '') {
      gameOverAudio.pause();
      gameOverAudio.currentTime = 0;
    }
  }, [portfolioState.isPlayerDead, portfolioState.currentModal]);

  return (
    <div
      onTouchStart={handleRestart}
      onClick={handleRestart}
      className={`${
        portfolioState.isPlayerDead ? 'absolute' : 'hidden'
      } z-10 flex flex-col items-center justify-center bg-red-300 bg-opacity-80 w-full h-full`}
    >
      <p className='text-3xl font-bold'>Game Over!</p>
      <p className='mb-2 animate-pulse'>
        {t('gameOverMessage')}
        {portfolioState.rank}!
      </p>
      <p className='mb-2 text-center animate-pulse'>{t('restartMessage')}</p>
      {portfolioState.isMobile ? (
        <p className='animate-pulse'>{t('clickToRestart')}</p>
      ) : (
        <p className='animate-pulse'>{t('clickOrPressToRestart')}</p>
      )}
    </div>
  );
}
