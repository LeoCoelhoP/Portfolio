import { useContext, useEffect, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';

import useClickSound from '../../../hooks/useClickSound';
import { PortfolioContext } from '../../../Contexts/PortfolioContext';
import AnimatedContainer from '../../AnimatedContainer';
import Button from '../../common/Button';
import AboutMeIcon from '../../icons/AboutMeIcon';
import CodePlusIcon from '../../icons/CodePlusIcon';
import ContactMeIcon from '../../icons/ContactMeIcon';

export default function HotBar() {
  const [displayInstructions, setDisplayInstructions] = useState(true);
  const { portfolioState, setPortfolioState } = useContext(PortfolioContext);

  const { t } = useTranslation();

  const menu = useMemo(
    () => [
      {
        name: t('aboutMe'),
        type: 'Info',
        icon: <AboutMeIcon className='stroke-white w-[32px] ' size={'100%'} />,
      },
      {
        name: t('contactMe'),
        type: 'Info',
        icon: (
          <ContactMeIcon className='stroke-white w-[32px] ' size={'100%'} />
        ),
      },
      {
        name: t('projects'),
        icon: (
          <CodePlusIcon className='stroke-white w-[32px]  ' size={'100%'} />
        ),
      },
    ],
    [t]
  );

  useEffect(() => {
    const timeOut = window.setTimeout(() => {
      setDisplayInstructions(false);
    }, 6000);

    return () => window.clearTimeout(timeOut);
  }, []);

  useEffect(() => {
    const digitMap = {
      Digit1: menu[0]?.name,
      Digit2: menu[1]?.name,
      Digit3: menu[2]?.name,
    };

    function handleOnKeyPress(e) {
      const modalName = digitMap[e.code];
      if (modalName) {
        setPortfolioState((state) => {
          const isCurrentlyOpen = state.currentModal === modalName;
          return {
            ...state,
            isModalOpen: !isCurrentlyOpen,
            currentModal: isCurrentlyOpen ? '' : modalName,
          };
        });
      }
    }
    window.addEventListener('keydown', handleOnKeyPress);

    return () => window.removeEventListener('keydown', handleOnKeyPress);
  }, [portfolioState, setPortfolioState, menu]);

  function handleOnClick(index) {
    const modalName = menu[index]?.name;
    if (modalName) {
      setPortfolioState((state) => {
        const isCurrentlyOpen = state.currentModal === modalName;
        return {
          ...state,
          isModalOpen: !isCurrentlyOpen,
          currentModal: isCurrentlyOpen ? '' : modalName,
        };
      });
    }
  }
  const click = useClickSound();
  function handleSound() {
    if (!portfolioState.isMobile) {
      click();
    }
  }

  return (
    <>
      <div
        onClick={handleSound}
        className='absolute bottom-0 z-30 flex flex-col w-full gap-2 mt-auto bg-opacity-0 bg-gradient-to-t from-black to-transparent h-[5.63rem]'
      >
        <div className='flex justify-center w-full '>
          {menu.map((option, index) => (
            <Button
              text={option.name}
              key={option.name}
              icon={option.icon}
              onClick={() => handleOnClick(index)}
              className='w-[75px] h-[45px] md:h-[45px] md:w-[200px]'
            >
              {index + 1}
            </Button>
          ))}
        </div>

        <AnimatedContainer
          onlyOpacity={true}
          condition={displayInstructions && !portfolioState.isMobile}
          className='absolute z-20 w-full'
        >
          <div className='flex items-center justify-center w-full '>
            <p className='relative p-2 text-sm text-center text-white break-words bg-black rounded-md w-fit text-end bottom-8 animate-pulse'>
              {t('loadingPageFirstInstruction')}
            </p>
          </div>
        </AnimatedContainer>
      </div>
    </>
  );
}
