import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PCFSoftShadowMap } from 'three';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { CameraShake, Preload } from '@react-three/drei';

import { PortfolioContext } from '../../Contexts/PortfolioContext';
import PlayerController from '../controllers/PlayerController';
import ObstacleController from '../controllers/ObstacleController';
import LoadingController from '../controllers/LoadingController';

import PauseScreen from './screens/PauseScreen';
import GameOverScreen from './screens/GameOverScreen';
import HotBar from './screens/HotBar';
import MobileController from './screens/MobileController';
import CountDownOverlay from './screens/CountDownOverlay';
import Level from './screens/Level';
import MuteButton from './screens/ConfigButtons';

import AboutMe from './pages/AboutMe';
import ContactMe from './pages/ContactMe';
import Projects from './pages/Projects';
import LoadingPage from './pages/LoadingPage';

import Bullet from './models/Bullet';
import Floor from './models/Floor';
import Map from './models/Map';

import BackButton from '../common/BackButton';
import AnimatedContainer from '../AnimatedContainer';

const backgroundAudio = new Audio('/audios/bgSound.wav');

export default function Experience() {
  const [bullets, setBullets] = useState([]);
  const [firing, setFiring] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const { portfolioState } = useContext(PortfolioContext);
  const { t } = useTranslation();

  useEffect(() => {
    setBullets([]);
  }, [portfolioState.isPlayerDead]);

  function handleAudioPlay() {
    backgroundAudio.volume = 0;
    backgroundAudio.loop = true;
    backgroundAudio.play();
    // Gradually increase the volume
    const intervalId = setInterval(() => {
      if (backgroundAudio.volume < 0.2) {
        backgroundAudio.volume = Math.min(backgroundAudio.volume + 0.01, 0.2);
      } else {
        clearInterval(intervalId);
      }
    }, 100);
  }

  useEffect(() => {
    if (portfolioState.play && !portfolioState.isMobile) {
      handleAudioPlay();
    } else {
      backgroundAudio.pause();
      backgroundAudio.currentTime = 0;
    }
  }, [portfolioState.play, portfolioState.isMobile]);

  if (!portfolioState) return null;

  return (
    <div className='flex items-center justify-center overflow-hidden w-svw h-svh font-reddit'>
      {portfolioState.play && (
        <div className='absolute w-full h-full'>
          <AnimatedContainer
            className='z-10'
            condition={portfolioState.isPaused}
          >
            <PauseScreen />
          </AnimatedContainer>

          <AnimatedContainer
            className='z-10'
            condition={portfolioState.isPlayerDead}
          >
            <GameOverScreen />
          </AnimatedContainer>

          <HotBar />
        </div>
      )}

      <AnimatedContainer
        condition={
          portfolioState.onCountDown &&
          !portfolioState.isModalOpen &&
          !portfolioState.isPlayerDead &&
          !portfolioState.isPaused &&
          portfolioState.play
        }
        onlyOpacity={true}
      >
        <CountDownOverlay />
      </AnimatedContainer>

      <AnimatedContainer
        condition={
          portfolioState.play &&
          !portfolioState.isPlayerDead &&
          !portfolioState.isPaused
        }
        className='absolute w-full h-full'
      >
        {portfolioState.isMobile && (
          <MobileController firing={firing} setFiring={setFiring} />
        )}

        <MuteButton />
        <Level />
      </AnimatedContainer>

      <AnimatedContainer
        condition={portfolioState.currentModal === t('aboutMe')}
      >
        <>
          <BackButton />
          <AboutMe />
        </>
      </AnimatedContainer>
      <AnimatedContainer
        condition={portfolioState.currentModal === t('contactMe')}
      >
        <>
          <BackButton />
          <ContactMe />
        </>
      </AnimatedContainer>
      <AnimatedContainer
        condition={portfolioState.currentModal === t('projects')}
      >
        <Projects />
      </AnimatedContainer>

      <AnimatedContainer condition={!portfolioState.play}>
        <LoadingPage loadingProgress={loadingProgress} />
      </AnimatedContainer>

      <Canvas
        className='w-full h-full bg-sky-300'
        shadows
        gl={{ shadowMap: { enabled: true, type: PCFSoftShadowMap } }}
      >
        <LoadingController
          setLoadingProgress={setLoadingProgress}
          loadingProgress={loadingProgress}
        >
          <Preload all />

          <Physics>
            <Floor />
            <PlayerController
              onFire={(bullet) => setBullets((state) => [...state, bullet])}
              position={[0, 1.4, 0]}
              firing={firing}
              setFiring={setFiring}
            />

            <ObstacleController />
            {bullets.map((bullet) => (
              <Bullet key={bullet.id} {...bullet} bulletId={bullet.id} />
            ))}
          </Physics>
          <Map />
          <CameraShake intensity={0.5} />
          <ambientLight intensity={1} />
          <directionalLight
            position={[-10, 8, 0]}
            color='white'
            intensity={4}
            shadow-mapSize-width={portfolioState.isMobile ? 256 : 1024}
            shadow-mapSize-height={portfolioState.isMobile ? 256 : 1024}
            shadow-camera-far={portfolioState.isMobile ? 20 : 25}
            shadow-camera-left={portfolioState.isMobile ? -37 : -40}
            shadow-camera-right={portfolioState.isMobile ? 5 : 10}
            shadow-camera-top={portfolioState.isMobile ? 5 : 10}
            shadow-camera-bottom={-10}
            castShadow
          />
        </LoadingController>
      </Canvas>
    </div>
  );
}
