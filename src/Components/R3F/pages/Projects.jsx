import { useTranslation } from 'react-i18next';

import useClickSound from '../../../hooks/useClickSound';
import BackButton from '../../common/BackButton';
import GitHubIcon from '../../icons/GitHubIcon';
import MongoDbIcon from '../../icons/MongoDbIcon';
import NodeJsIcon from '../../icons/NodeJsIcon';
import ReactIcon from '../../icons/ReactIcon';
import { useContext } from 'react';
import { PortfolioContext } from '../../../Contexts/PortfolioContext';

export default function Projects() {
  const { portfolioState } = useContext(PortfolioContext);
  const { t } = useTranslation();
  const click = useClickSound();

  const projects = [
    {
      name: 'Way To Ace',
      description: t('wayToAceDescription'),
      link: '',
    },
    {
      name: 'Seeking A Cause',
      description: t('seekingACauseDescription'),
      link: '',
    },
  ];

  function handleSound() {
    if (portfolioState.isMobile) return;
    click();
  }

  return (
    <div className='absolute z-10 flex flex-col items-center justify-start w-full h-full gap-1 px-4 pb-32 overflow-y-auto bg-zinc-900 '>
      <BackButton />
      <div className='w-full pt-4'>
        <button
          onClick={() => {
            handleSound();
            window.open('https://github.com/LeoCoelhoP', '_blank');
          }}
          className='flex items-center justify-center  !important shrink-0 game-button h-[50px] mx-0 mt-0 w-[calc(100%-70px)] ml-auto md:mx-auto  md:w-[85%] lg:w-[60%] '
        >
          <GitHubIcon className={'stroke-white'} size={36} />
          <p className='text-xl font-bold text-white'>
            {t('accessGitHubPage')}
          </p>
        </button>
      </div>

      <div className='md:flex md:justify-between md:items-center md:gap-8 md:w-[90%] lg:w-[60%] '>
        {projects.map((project) => (
          <div
            onClick={handleSound}
            key={project.name}
            className='flex items-center justify-between w-full gap-6 p-4 mt-2 text-2xl text-white rounded-md shadow-2xl bg-zinc-800 drop-shadow-lg h-fit bg-opacity-80'
          >
            <div className='flex flex-col w-full h-full'>
              <div className='flex items-center justify-center gap-4'>
                <img
                  src='https://i.pinimg.com/236x/6e/fd/38/6efd3884f1b370ec442f7043a3b5231a.jpg'
                  alt='project name'
                  className='bg-white h-full w-[150px]  rounded-md'
                />
                <div className='flex flex-col items-start justify-start w-full h-full gap-2'>
                  <h1 className='font-semibold'>{project.name}</h1>
                  <p className='w-full text-sm break-words'>
                    {project.description}
                  </p>
                  <h1 className='text-lg font-semibold text-center'>
                    {t('technologies')}
                  </h1>
                  <div className='flex items-center justify-center w-full gap-2 lg:gap-4 lg:w-fit'>
                    <ReactIcon className='w-full stroke-sky-400' size={35} />
                    <NodeJsIcon className='w-full stroke-lime-500' size={35} />
                    <MongoDbIcon className='w-full' size={35} />
                  </div>
                  <div className='w-full relative top-[0.7rem]'>
                    <button className='w-5/6 game-button h-fit '>
                      {t('access')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
