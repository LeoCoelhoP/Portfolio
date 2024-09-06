import { useContext, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { PortfolioContext } from '../../../Contexts/PortfolioContext';
import AnimatedContainer from '../../AnimatedContainer';

let firstLoad = true;
export default function Level() {
  const [displayInstructions, setDisplayInstructions] = useState(true);
  const { portfolioState } = useContext(PortfolioContext);

  const { t } = useTranslation();
  const [color, setColor] = useState({ from: '#a4ff84', to: '#006912' });

  useEffect(() => {
    const timeOut = window.setTimeout(() => {
      setDisplayInstructions(false);
      firstLoad = false;
    }, 6000);

    return () => window.clearTimeout(timeOut);
  }, []);

  useEffect(() => {
    switch (portfolioState.level) {
      case 1:
        setColor({ from: '#84d9ff', to: '#002569' });
        break;
      case 2:
        setColor({ from: '#ffffd8', to: '#d4ce00' });
        break;
      default:
        setColor({ from: '#a4ff84', to: '#006912' });
    }
  }, [portfolioState.level]);

  const isMaxRank =
    portfolioState.rank ===
    portfolioState.ranks[portfolioState.ranks.length - 1];
  const progressBarWidth =
    portfolioState.xp >= 10 ? '100%' : `${Math.floor(portfolioState.xp * 10)}%`;

  const containerClasses =
    'absolute z-10 flex flex-col items-center justify-start w-full p-2 pt-3 h-fit';

  return (
    <div
      className={
        isMaxRank ? `${containerClasses} z-20 animate-pulse` : containerClasses
      }
    >
      <div className='w-4/5 ml-4 bg-black rounded-md shadow-lg h-fit bg-opacity-80 drop-shadow-lg lg:w-1/3'>
        <div
          className={`h-[20px] font-medium leading-none text-center rounded-md ${
            isMaxRank ? 'bg-gradient-to-r from-pink-600 to-red-700' : ''
          }`}
          style={{
            width: isMaxRank ? '100%' : progressBarWidth,
            background: !isMaxRank
              ? `linear-gradient(to right, ${color.from}, ${color.to})`
              : undefined,
          }}
        />
      </div>
      <div className='flex justify-between w-2/3 ml-10 text-lg font-bold lg:w-1/3'>
        <p className={isMaxRank ? 'text-red-600 text-center w-full' : ''}>
          {portfolioState.rank}
        </p>
        {!isMaxRank && <p>{portfolioState.ranks[portfolioState.level + 1]}</p>}
      </div>
      <AnimatedContainer
        onlyOpacity={true}
        condition={displayInstructions && firstLoad}
        className='absolute z-20 w-full'
      >
        <div className='flex items-center justify-center w-full '>
          <p className='relative p-2 text-sm text-white break-words bg-black rounded-md w-fit text-end top-12 animate-pulse'>
            {t('loadingPageSecondInstruction')}
          </p>
        </div>
      </AnimatedContainer>
    </div>
  );
}
