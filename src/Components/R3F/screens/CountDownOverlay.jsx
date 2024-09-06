import { useContext, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { PortfolioContext } from '../../../Contexts/PortfolioContext';

const tickAudio = new Audio('/audios/tick.wav');
tickAudio.load();

export default function CountDownOverlay() {
  const [countDown, setCountDown] = useState(3);
  const { portfolioState, setPortfolioState } = useContext(PortfolioContext);

  const { t } = useTranslation();

  useEffect(() => {
    if (!portfolioState.isMuted && !portfolioState.isMobile) tickAudio.play();

    function handleCountDown() {
      if (countDown > 1) {
        if (!portfolioState.isMuted && !portfolioState.isMobile)
          tickAudio.play();
        setCountDown((state) => state - 1);
      } else setPortfolioState((state) => ({ ...state, onCountDown: false }));
    }

    const interval = window.setInterval(handleCountDown, 1000);

    return () => window.clearInterval(interval);
  }, [
    countDown,
    portfolioState.isMuted,
    portfolioState.isMobile,
    setPortfolioState,
  ]);

  return (
    <div className='absolute z-10 flex flex-col items-center justify-center text-white bg-black w-svw h-svh bg-opacity-40'>
      <p className='lg:text-[6rem] text-[3rem] md:text-[4rem]'>
        {t('getReady')}
      </p>
      <p className='lg:text-[10rem] text-[3rem] md:text-[6rem]'>{countDown}</p>
    </div>
  );
}
