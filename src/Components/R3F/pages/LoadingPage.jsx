import { useContext } from 'react';

import { useTranslation } from 'react-i18next';

import { PortfolioContext } from '../../../Contexts/PortfolioContext';
import Button from '../../common/Button';
import AboutMeIcon from '../../icons/AboutMeIcon';
import CodePlusIcon from '../../icons/CodePlusIcon';
import ContactMeIcon from '../../icons/ContactMeIcon';
import MouseIcon from '../../icons/MouseIcon';
import ReturnIcon from '../../icons/ReturnIcon';
import TouchIcon from '../../icons/TouchIcon';

export default function LoadingPage({ loadingProgress }) {
  const { t } = useTranslation();
  const { setPortfolioState } = useContext(PortfolioContext);

  return (
    <div className='absolute z-20 flex flex-col items-center justify-center overflow-hidden bg-zinc-200 w-svw h-svh'>
      <div className='flex flex-col items-center w-5/6 lg:w-[90%] gap-6 mt-8 overflow-y-auto overflow-x-hidden lg:mt-4'>
        <h1 className='font-bold'>{t('loadingPageText')}</h1>
        <div className='flex flex-col items-start gap-2 text-lg font-semibold'>
          <h1 className='flex items-center gap-2 text-sm'>
            <span className='text-xl'>ℹ️</span>
            {t('loadingPageFirstInstruction')}
          </h1>
          <h1 className='flex items-center gap-2 text-sm'>
            <span className='text-xl'>ℹ️</span>
            {t('loadingPageSecondInstruction')}
          </h1>
          <h1 className='flex items-center gap-2 text-sm'>
            <span className='text-xl'>ℹ️</span>
            {t('loadingPageThirdInstruction')}
          </h1>
          <h1 className='flex items-center gap-2 text-sm'>
            <span className='text-xl'>ℹ️</span>
            {t('loadingPageForthInstruction')}
          </h1>
        </div>

        <div className='w-[85%] md:w-2/4 lg:w-1/4'>
          <div className='flex items-center gap-2'>
            <div className='flex flex-col justify-between w-full'>
              <p className='font-bold text-md'>
                {t('move')}
                <br />
                {t('press')}
              </p>

              <div className='flex flex-col gap-5'>
                <p className='font-semibold'>{t('computer')}</p>
                <div className='flex flex-col items-center justify-between'>
                  <div className='flex gap-8'>
                    <button
                      className='btn-old-pc w-[50px] h-[50px]'
                      data-title={'A'}
                    />
                    <button
                      className='btn-old-pc w-[50px] h-[50px]'
                      data-title={'D'}
                    />
                  </div>
                  <p className='mt-4 mr-auto font-semibold'>{t('mobile')}</p>
                  <div className='flex items-center justify-between'>
                    <button className='w-[50px] h-[50px] game-button red'>
                      ←
                    </button>
                    <button className='w-[50px] h-[50px] game-button red'>
                      →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-2 h-[250px] items-center relative bottom-3'>
              <p className='mb-auto font-bold text-center text-md'>
                {t('fire')} {t('press')}
              </p>

              <MouseIcon
                className='mt-4 stroke-black fill-black shrink-0'
                size={44}
              />
              <span className='mt-4 font-semibold h-[23.99px]'></span>

              <button className='w-[50px] h-[50px] game-button blue flex items-center justify-center  shrink-0 mt-6'>
                <TouchIcon className='stroke-black ' size={32} />
              </button>
            </div>
          </div>
        </div>
        <div className='w-[85%] md:w-2/4 lg:w-1/4'>
          <div className='flex items-center gap-2'>
            <div className='flex flex-col justify-between w-full'>
              <p className='font-bold text-md'>
                {t('navigation')}
                {t('click')}
              </p>
              <div className='flex flex-col gap-5'>
                <div className='flex flex-col items-center justify-between'>
                  <div className='flex gap-2 md:gap-6 lg:gap-8'>
                    <div className='flex flex-col items-center justify-center w-fit h-fit'>
                      <Button
                        className='w-[50px] h-[50px]'
                        icon={
                          <AboutMeIcon
                            className='stroke-white w-[32px] lg:ml-4 '
                            size={'100%'}
                          />
                        }
                      />
                      <p className='text-xs font-bold'>{t('aboutMe')}</p>
                    </div>

                    <div className='flex flex-col items-center justify-center w-fit h-fit'>
                      <Button
                        className='w-[50px] h-[50px]'
                        icon={
                          <ContactMeIcon
                            className='stroke-white w-[32px] lg:ml-4'
                            size={'100%'}
                          />
                        }
                      />
                      <p className='text-xs font-bold'>{t('contactMe')}</p>
                    </div>

                    <div className='flex flex-col items-center justify-center w-fit h-fit'>
                      <Button
                        className='w-[50px] h-[50px]'
                        icon={
                          <CodePlusIcon
                            className='stroke-white w-[32px] lg:ml-4'
                            size={'100%'}
                          />
                        }
                      />
                      <p className='text-xs font-bold'>{t('projects')}</p>
                    </div>

                    <div className='flex flex-col items-center justify-center w-fit h-fit'>
                      <Button
                        className='w-[50px] h-[50px]'
                        icon={
                          <ReturnIcon
                            className='stroke-white w-[32px] lg:ml-4'
                            size={'100%'}
                          />
                        }
                      />
                      <p className='text-xs font-bold'>{t('return')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loadingProgress >= 100 && (
        <div className='flex items-center justify-center w-3/4 p-2 mt-auto mb-6 h-fit lg:w-2/4'>
          <button
            className='w-full md:w-1/2 game-button green'
            onClick={() =>
              setPortfolioState((state) => ({
                ...state,
                play: true,
                onCountDown: true,
              }))
            }
          >
            <p className='text-xl font-bold h-[50px] flex items-center justify-center'>
              {t('clickToStart')}
            </p>
          </button>
        </div>
      )}
      {loadingProgress < 100 && (
        <div className='flex flex-col items-center justify-center w-5/6 p-2 mt-auto mb-6 h-fit'>
          <p className='w-full font-bold animate-pulse text-end'>
            Loading... {loadingProgress.toFixed(2)}%
          </p>
          <div className='w-full rounded-md bg-neutral-400'>
            <div
              className='h-[20px] bg-gradient-to-r from-blue-300 to-blue-500 rounded-md'
              style={{ width: `${Math.ceil(loadingProgress)}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
