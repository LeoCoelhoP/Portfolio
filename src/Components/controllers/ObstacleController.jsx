import { useContext, useRef, useEffect } from 'react';
import { ObstaclesContext } from '../../Contexts/ObstaclesContext';
import { PortfolioContext } from '../../Contexts/PortfolioContext';
import { RigidBody } from '@react-three/rapier';
import {
  HITTED_OBSTACLE_SOUND_VOLUME,
  OBSTACLE_VELOCITY,
} from '../../configs/constants';
import { useFrame } from '@react-three/fiber';
import Obstacle from '../R3F/models/Obstacle';
import { useTranslation } from 'react-i18next';

export default function ObstacleController() {
  const { obstacle, setObstacle } = useContext(ObstaclesContext);
  const { portfolioState, setPortfolioState } = useContext(PortfolioContext);
  const { t } = useTranslation();
  const rigidBody = useRef(null);
  const audioRef = useRef(null);
  const obstacleRef = useRef(null);

  useEffect(() => {
    // Reset obstacle velocity when resuming play
    if (portfolioState.play && rigidBody.current) {
      rigidBody.current.setLinvel({ x: 0, y: 0, z: OBSTACLE_VELOCITY });
    }
  }, [portfolioState.play]);

  useFrame(() => {
    if (!rigidBody.current || !portfolioState.play) return;

    // Handle conditions where the obstacle should stop moving
    if (
      portfolioState.isPlayerDead ||
      portfolioState.currentModal !== '' ||
      portfolioState.isPaused ||
      portfolioState.onCountDown
    ) {
      rigidBody.current.setLinvel({ x: 0, y: 0, z: 0 });
      return;
    }

    // Ensure the obstacle maintains its velocity
    const obstacleVelocity = rigidBody.current.linvel().z;
    if (obstacleVelocity < OBSTACLE_VELOCITY) {
      rigidBody.current.setLinvel({ x: 0, y: 0, z: OBSTACLE_VELOCITY });
    }

    // Remove the obstacle if it has moved out of the scene
    const obstaclePosition = rigidBody.current.translation().z;
    if (obstaclePosition > 5) {
      setObstacle(null);
    }
  });

  function handleIntersection(e) {
    if (portfolioState.isModalOpen) return;
    if (e.other.rigidBody.userData === 'player') {
      rigidBody.current = null;
      setObstacle(null);
      setPortfolioState((state) => ({
        ...state,
        isPlayerDead: true,
        xp: 0,
        rank: state.ranks[0],
        level: 0,
      }));
    } else if (e.other.rigidBody.userData === 'bullet' && obstacle) {
      if (!portfolioState.isMuted && !portfolioState.isMobile) {
        audioRef.current = new Audio('/audios/hitSound.wav');
        audioRef.current.volume = HITTED_OBSTACLE_SOUND_VOLUME;
        audioRef.current.play();
      }
      obstacleRef.current.scale.set(0.9, 0.9);
      setTimeout(() => {
        obstacleRef.current.scale.set(1, 1);
      }, 100);
      setObstacle((state) => ({
        ...state,
        health: (state?.health || 1) - 1,
      }));

      setPortfolioState((state) => ({ ...state, xp: (state.xp += 1) }));
    }
  }

  useEffect(() => {
    if (!obstacle || !rigidBody.current) return;

    // Handle obstacle destruction when health is depleted
    if (obstacle.health <= 0) {
      if (obstacle.specialObstacle) {
        setPortfolioState((state) => ({
          ...state,
          isModalOpen: true,
          currentModal: t(`${obstacle.specialObstacle}`),
        }));
      }
      rigidBody.current = null;
      setObstacle(null);
    }
  }, [obstacle, setPortfolioState, setObstacle, t]);

  if (!obstacle) return null;

  return (
    <RigidBody
      key={obstacle.id}
      ref={rigidBody}
      enabledRotations={[false, false, false]}
      userData={obstacle.specialObstacle || 'obstacle'}
      position={[obstacle.specialObstacle ? 0 : obstacle.onLeft, 2.2, -35]}
      sensor
      onIntersectionEnter={handleIntersection}
      canSleep={false}
    >
      <Obstacle obstacle={obstacle} obstacleRef={obstacleRef} />
    </RigidBody>
  );
}
