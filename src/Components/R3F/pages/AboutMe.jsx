import { useTranslation } from 'react-i18next';

import JoyStickIcon from '../../icons/JoyStickIcon';
import BrazilFlagIcon from '../../icons/BrazilFlagIcon';
import SpainFlagIcon from '../../icons/SpainFlagIcon';
import UsaFlagIcon from '../../icons/UsaFlagIcon';
import JavaScriptIcon from '../../icons/JavaScriptIcon';
import ReactIcon from '../../icons/ReactIcon';
import NodeJsIcon from '../../icons/NodeJsIcon';
import MongoDbIcon from '../../icons/MongoDbIcon';

const SKILLS = [
  {
    icon: (
      <JavaScriptIcon
        className='w-full stroke-black fill-yellow-400'
        size={35}
      />
    ),
    name: 'Javascript',
    knowledge: 5,
  },
  {
    icon: <ReactIcon className='w-full stroke-sky-400' size={35} />,
    name: 'React',
    knowledge: 5,
  },
  {
    icon: <NodeJsIcon className='w-full stroke-lime-500' size={35} />,
    name: 'NodeJS',
    knowledge: 4,
  },
  {
    icon: <MongoDbIcon className='w-full' size={35} />,
    name: 'MongoDB',
    knowledge: 4,
  },
];

export default function AboutMe() {
  const { t } = useTranslation();

  const LANGUAGES = [
    {
      icon: <BrazilFlagIcon className='w-full' size={35} />,
      name: t('portuguese'),
      knowledge: 5,
    },
    {
      icon: <UsaFlagIcon className='w-full ' size={35} />,
      name: t('english'),
      knowledge: 5,
    },
    {
      icon: <SpainFlagIcon className='w-full' size={35} />,
      name: t('spanish'),
      knowledge: 3,
    },
  ];

  return (
    <div className='absolute z-10 flex flex-col items-start justify-start w-full h-full overflow-y-auto overflow-x-hidden pb-[5.63rem] text-white lg:overflow-y-auto lg:justify-center lg:items-center md:overflow-hidden md:flex-row bg-zinc-900 '>
      <div className='items-start justify-center lg:flex lg:h-fit lg:w-fit lg:items-center md:h-full md:overflow-y-auto'>
        {/* Description and Profile Container */}
        <div className='flex flex-col justify-end lg:w-1/2 grow-0'>
          <div className='flex flex-col  w-full h-fit items-center  md:h-[87.5%] bg-opacity-80 md:items-center lg:h-full lg:w-fit'>
            <div className=' h-[200px] p-2  w-full sm:w-1/2 md:w-2/3 md:h-[250px] lg:w-2/3 lg:mb-auto rounded-2xl'>
              <img
                className='w-full h-full rounded-xl bg-zinc-200 shrink-0'
                src='/images/profile.jpg'
              />
              <div className='relative bottom-[180px]  end-[10px]   md:bottom-[230px]'>
                <BrazilFlagIcon
                  className='ml-auto shadow-2xl drop-shadow-lg'
                  size={35}
                />
              </div>
            </div>

            <div className='flex items-center h-full p-2 lg:w-2/3 lg:h-fit'>
              <div className='flex flex-col bg-white rounded-md bg-opacity-5'>
                <h1
                  className='px-2 pt-2 text-2xl break-words md:text-3xl'
                  dangerouslySetInnerHTML={{ __html: t('aboutMeTitle') }}
                />
                <p
                  className='px-2 pb-2 text-xl lg:text-2xl'
                  dangerouslySetInnerHTML={{ __html: t('aboutMeText') }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Skills Container */}
        <div className='flex flex-col w-full h-fit gap-2 p-2  md:h-[87.5%] bg-zinc-900 bg-opacity-80  lg:h-full lg:mb-0 lg:mr-28'>
          <h1 className='text-2xl font-bold text-white break-words md:text-3xl lg:h-fit'>
            {t('skills')}
          </h1>
          {SKILLS.map((skill) => (
            <div
              key={skill.name}
              className='flex justify-between gap-2 p-2 bg-white rounded-md md:h-full bg-opacity-5'
            >
              <div className='flex items-center justify-between gap-2 w-fit'>
                {skill.icon}
                <h2 className='w-full text-xl text-center'>{skill.name}</h2>
              </div>

              <div className='flex items-center gap-2'>
                {[...Array(5)].map((_, index) => (
                  <JoyStickIcon
                    key={index}
                    className={`${
                      index + 1 > skill.knowledge
                        ? 'stroke-zinc-600'
                        : 'stroke-white'
                    }`}
                    size={30}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Languagues Container */}
          <h1 className='text-2xl font-bold text-white break-words md:text-3xl lg:h-fit'>
            {t('languages')}
          </h1>
          {LANGUAGES.map((skill) => (
            <div
              key={skill.name}
              className='flex justify-between gap-2 p-2 bg-white rounded-md md:h-full bg-opacity-5'
            >
              <div className='flex items-center justify-between gap-2 w-fit'>
                {skill.icon}
                <h2 className='w-full text-xl text-center'>{skill.name}</h2>
              </div>

              <div className='flex items-center gap-2'>
                {[...Array(5)].map((_, index) => (
                  <JoyStickIcon
                    key={index}
                    className={`${
                      index + 1 > skill.knowledge
                        ? 'stroke-zinc-600'
                        : 'stroke-white'
                    }`}
                    size={30}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
