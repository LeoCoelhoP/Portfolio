import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { MeshBasicMaterial } from 'three';
import { RigidBody } from '@react-three/rapier';

import {
  BULLET_SPEED,
  GUN_SHOOT_VOLUME,
  WEAPON_OFFSET,
} from '../../../configs/constants';
import { PortfolioContext } from '../../../Contexts/PortfolioContext';

const bulletMaterial = new MeshBasicMaterial({
  color: 'yellow',
  toneMapped: false,
});

bulletMaterial.color.multiplyScalar(100);

export default function Bullet({ angle, position, bulletId }) {
  const { portfolioState } = useContext(PortfolioContext);
  const [destroyBullet, setDestroyBullet] = useState(false);
  const rigidBody = useRef();
  const audioRef = useRef(null);

  useEffect(() => {
    if (
      portfolioState.isPaused ||
      portfolioState.isPlayerDead ||
      portfolioState.isModalOpen
    )
      setDestroyBullet(true);
  }, [
    portfolioState.isPaused,
    portfolioState.isPlayerDead,
    portfolioState.isModalOpen,
  ]);

  useEffect(() => {
    if (
      portfolioState.isMuted ||
      portfolioState.isPaused ||
      portfolioState.isPlayerDead ||
      portfolioState.isModalOpen ||
      portfolioState.isMobile
    )
      return;

    audioRef.current = new Audio('/audios/gunshoot.wav');
    audioRef.current.load();
    audioRef.current.volume = GUN_SHOOT_VOLUME;

    return () => {
      audioRef.current.pause();
      audioRef.current = null;
    };
  }, [
    portfolioState.isPaused,
    portfolioState.isPlayerDead,
    portfolioState.isModalOpen,
    portfolioState.isMuted,
    portfolioState.isMobile,
  ]);

  const handleShoot = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }

    if (!rigidBody.current) return;

    const velocity = {
      x: Math.sin(angle) * BULLET_SPEED,
      y: 1,
      z: Math.cos(angle) * BULLET_SPEED,
    };

    rigidBody.current.setLinvel(velocity, true);
  }, [angle]);

  useEffect(() => {
    const destroyBulletTimer = setTimeout(() => setDestroyBullet(true), 3000);
    handleShoot(); // Play sound and set bullet velocity on component mount

    return () => clearTimeout(destroyBulletTimer);
  }, [angle, handleShoot]);

  return (
    <>
      {!destroyBullet && (
        <group
          position={[position.x, position.y, position.z]}
          rotation-y={angle}
          onPointerDown={handleShoot} // Ensure this is triggered by user interaction
        >
          <group
            position={[
              WEAPON_OFFSET.x,
              WEAPON_OFFSET.y + portfolioState.level * 0.03,
              WEAPON_OFFSET.z,
            ]}
          >
            <RigidBody
              ref={rigidBody}
              gravityScale={0}
              userData={'bullet'}
              sensor
              onIntersectionEnter={() => {
                rigidBody.current = null;
                setDestroyBullet(true);
              }}
            >
              <mesh material={bulletMaterial} castShadow>
                <boxGeometry args={[0.05, 0.05, 0.5]} />
              </mesh>
            </RigidBody>
          </group>
        </group>
      )}
    </>
  );
}
