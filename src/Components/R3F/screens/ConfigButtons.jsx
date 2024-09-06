import { useContext } from 'react';

import { PortfolioContext } from '../../../Contexts/PortfolioContext';
import PauseIcon from '../../icons/PauseIcon';
import SpeakerIcon from '../../icons/SpeakerIcon';
import SpeakerOffIcon from '../../icons/SpeakerOffIcon';

export default function ConfigButtons() {
  const { portfolioState, setPortfolioState } = useContext(PortfolioContext);

  function handleSpeakerButtons() {
    setPortfolioState((state) => ({ ...state, isMuted: !state.isMuted }));
  }

  function handlePauseButtons() {
    setPortfolioState((state) => ({ ...state, isPaused: !state.isPaused }));
  }

  return (
    <div className='absolute z-20 flex gap-2 top-2 start-2 config'>
      <div
        className='w-[30px] h-[30px] md:w-[40px] md:h-[40px] config'
        onClick={handlePauseButtons}
      >
        <PauseIcon className='w-full h-full stroke-black config' />
      </div>
      {!portfolioState.isMobile && (
        <div
          className='w-[30px] h-[30px] md:w-[40px] md:h-[40px] config'
          onClick={handleSpeakerButtons}
        >
          {portfolioState.isMuted ? (
            <SpeakerOffIcon className='w-full h-full stroke-black config' />
          ) : (
            <SpeakerIcon className='w-full h-full stroke-black config' />
          )}
        </div>
      )}
    </div>
  );
}
