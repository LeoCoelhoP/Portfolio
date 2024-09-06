import { useContext } from 'react';

import useClickSound from '../../hooks/useClickSound';
import { PortfolioContext } from '../../Contexts/PortfolioContext';
import ReturnIcon from '../icons/ReturnIcon';

export default function BackButton() {
  const click = useClickSound();

  const { portfolioState, setPortfolioState } = useContext(PortfolioContext);
  function handleClick() {
    setPortfolioState((state) => ({
      ...state,
      isModalOpen: false,
      currentModal: '',
    }));
    if (portfolioState.isMuted || portfolioState.isMobile) return;
    click();
  }
  return (
    <div
      onClick={handleClick}
      className='absolute z-20 flex items-center justify-center w-full py-4'
    >
      <div className='my-0 mr-auto game-button orange back start-0 w-fit h-fit'>
        <ReturnIcon className=' stroke-white w-[20px] h-[25px] ' size='100%' />
      </div>
    </div>
  );
}
