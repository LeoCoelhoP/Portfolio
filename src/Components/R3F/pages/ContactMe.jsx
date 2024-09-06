import { useContext, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';

import useClickSound from '../../../hooks/useClickSound';
import LinkedInIcon from '../../icons/LinkedInIcon';
import MailIcon from '../../icons/MailIcons';
import WhatsappIcon from '../../icons/WhatsappIcon';
import { PortfolioContext } from '../../../Contexts/PortfolioContext';

export default function ContactMe() {
  const [displayEmail, setDisplayEmail] = useState(false);
  const [displayWpp, setDisplayWpp] = useState(false);
  const { portfolioState } = useContext(PortfolioContext);
  const { t } = useTranslation();
  const click = useClickSound();

  function handleSound() {
    if (portfolioState.isMobile) return;
    click();
  }
  function handleEmailButtonClick() {
    handleSound();
    const recipient = 'someone@example.com';
    const subject = `Your Portfolio Caught My Eye – Let's Discuss`;

    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(
      subject
    )}`;
    window.location.href = mailtoUrl;
  }

  function handleWhatsappButtonClick() {
    handleSound();
    const phoneNumber = '+5545998184776'; // Replace with the actual phone number

    const whatsappUrl = `https://wa.me/${phoneNumber}`;

    window.open(whatsappUrl, '_blank');
  }
  function handleShowDisplay() {
    setDisplayEmail((state) => !state);
  }
  function handleShowWpp() {
    setDisplayWpp((state) => !state);
  }

  return (
    <div className='absolute z-10 flex flex-col items-center justify-start w-full h-full p-4 bg-zinc-900 '>
      <div className='flex flex-col items-center justify-start w-full px-2 mt-5 text-xl text-white rounded-md md:w-2/3 md:mt-0 lg:w-fit h-fit bg-opacity-80'>
        <h1 className='relative px-16 font-semibold text-center break-words bottom-4'>
          {t('contactMeTitle')}
        </h1>

        <button
          onClick={handleWhatsappButtonClick}
          className='game-button  w-[90%] md:w-2/3 lg:w-[90%] flex'
          onMouseEnter={handleShowWpp}
          onMouseLeave={handleShowWpp}
          onTouchStart={handleShowWpp}
          onTouchEnd={handleShowWpp}
        >
          <WhatsappIcon className='flex-shrink-0 fill-lime-500' />
          <div className='flex flex-col items-start justify-center w-full mr-auto'>
            <p className='w-full p-2 my-auto ml-auto text-center '>
              {t('contactWhatsAppTitle')}
            </p>
            <AnimatePresence>
              {displayWpp && (
                <motion.p
                  initial={{ y: 0 }}
                  animate={{ y: -20 }}
                  exit={{ opacity: 0 }}
                  className={` w-full my-auto  text-center rounded-md text-xs md:text-sm lg:text-xs mt-1`}
                >
                  {t('contactWhatsAppPhoneNumber')}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </button>

        <button
          onClick={() => {
            handleSound(),
              window.open(
                'https://www.linkedin.com/in/leonardo-padilha-coelho-9a9044321/',
                '_blank'
              );
          }}
          className='game-button  w-[90%] md:w-2/3 lg:w-[90%] mt-2'
        >
          <div className='flex items-center justify-center w-full gap-2'>
            <LinkedInIcon className='flex-shrink-0 mr-auto fill-white' />
            <p className='w-full p-2 text-center'>{t('contactMeLinkedin')}</p>
          </div>
        </button>

        <button
          onClick={handleEmailButtonClick}
          className='game-button  w-[90%] md:w-2/3 lg:w-[90%] flex mt-2'
          onMouseEnter={handleShowDisplay}
          onMouseLeave={handleShowDisplay}
          onTouchStart={handleShowDisplay}
          onTouchEnd={handleShowDisplay}
        >
          <MailIcon className='flex-shrink-0' />
          <div className='flex flex-col items-start justify-center w-full mr-auto'>
            <p className='w-full p-2 my-auto ml-auto text-center '>
              {t('contactMeEmail')}
            </p>
            <AnimatePresence>
              {displayEmail && (
                <motion.p
                  initial={{ y: 0 }}
                  animate={{ y: -20 }}
                  exit={{ opacity: 0 }}
                  className={` w-full my-auto  text-center rounded-md text-xs md:text-sm lg:text-xs mt-1`}
                >
                  leopadilha23@outlook.com
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </button>
      </div>
    </div>
  );
}
