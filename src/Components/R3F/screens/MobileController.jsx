import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import AnimatedContainer from '../../AnimatedContainer';

import TouchIcon from '../../icons/TouchIcon';

export default function MobileController({ setFiring }) {
  const [displayInstructions, setDisplayInstructions] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const timeOut = window.setTimeout(() => {
      setDisplayInstructions(false);
    }, 3000);

    return () => window.clearTimeout(timeOut);
  }, []);

  function handleWalk(e, direction = 'left', firstClick = true) {
    const key = direction === 'left' ? 'a' : 'd';
    const code = direction === 'left' ? 'KeyA' : 'KeyD';

    const keyboardEvent = new KeyboardEvent(firstClick ? 'keydown' : 'keyup', {
      bubbles: true,
      cancelable: true,
      key,
      shiftKey: false,
      code,
    });

    e.target.dispatchEvent(keyboardEvent);
  }

  return (
    <div className='absolute z-20 flex items-center justify-between w-full bottom-24 mobile-controller '>
      <div className='z-20 flex items-center justify-center '>
        <button
          style={{
            WebkitTouchCallout: 'none',
          }}
          className='game-button red w-[50px] z-20'
          onTouchStart={handleWalk}
          onTouchEnd={(e) => handleWalk(e, 'left', false)}
          onMouseDown={handleWalk}
          onMouseUp={(e) => handleWalk(e, 'left', false)}
          onMouseLeave={(e) => handleWalk(e, 'left', false)}
        >
          <p className='mb-1'>←</p>
        </button>
        <button
          style={{
            WebkitTouchCallout: 'none',
          }}
          className='game-button red w-[50px] '
          onTouchStart={(e) => handleWalk(e, 'right')}
          onTouchEnd={(e) => handleWalk(e, 'right', false)}
          onMouseDown={(e) => handleWalk(e, 'right')}
          onMouseUp={(e) => handleWalk(e, 'right', false)}
          onMouseLeave={(e) => handleWalk(e, 'right', false)}
        >
          <p className='mb-1'>→</p>
        </button>
      </div>
      <button
        style={{
          WebkitTouchCallout: 'none',
        }}
        className='game-button green w-[60px]'
        onTouchStart={() => setFiring(true)}
        onTouchEnd={() => setFiring(false)}
        onMouseDown={() => setFiring(true)}
        onMouseUp={() => setFiring(false)}
        onMouseLeave={() => setFiring(false)}
      >
        <TouchIcon className='w-full mr-5 stroke-white' size={'100%'} />
      </button>
      {
        <AnimatedContainer
          onlyOpacity={true}
          condition={displayInstructions}
          className='absolute z-20 w-full'
        >
          <div className='flex items-center justify-between w-full '>
            <p className='relative p-2 text-sm text-white break-words bg-black rounded-md w-fit text-end bottom-16 left-4 animate-pulse'>
              {t('press')}
            </p>
            <p className='relative p-2 text-sm text-white break-words bg-black rounded-md w-fit text-end bottom-16 right-4 animate-pulse'>
              {t('press')}
            </p>
          </div>
        </AnimatedContainer>
      }
    </div>
  );
}
