import { useContext } from 'react';

import { useTranslation } from 'react-i18next';

import { PortfolioContext } from '../../../Contexts/PortfolioContext';

export default function PauseScreen() {
  const { portfolioState, setPortfolioState } = useContext(PortfolioContext);
  const { t } = useTranslation();

  return (
    <div
      onClick={() =>
        setPortfolioState((state) => ({ ...state, isPaused: false }))
      }
      className={`${
        portfolioState.isPaused && !portfolioState.isPlayerDead
          ? 'absolute'
          : 'hidden'
      } z-10 flex flex-col items-center justify-center bg-zinc-300 bg-opacity-80 w-full h-full`}
    >
      <p className='text-3xl font-bold'>{t('paused')}</p>
      {portfolioState.isMobile ? (
        <p className='animate-pulse'>{t('clickToResume')}</p>
      ) : (
        <p className='animate-pulse'>{t('clickOrPressToResume')}</p>
      )}
    </div>
  );
}
