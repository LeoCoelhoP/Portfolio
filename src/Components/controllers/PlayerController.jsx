import { useContext, useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';
import { useFrame } from '@react-three/fiber';
import { CapsuleCollider, RigidBody, vec3 } from '@react-three/rapier';
import { useKeyboardControls } from '@react-three/drei';
import { v4 as uuidv4 } from 'uuid';

import { PLAYER_CONTROLLER } from '../../configs/constants';
import { PlayerContext } from '../../Contexts/PlayerContext';
import { PortfolioContext } from '../../Contexts/PortfolioContext';
import Player from '../R3F/models/Player';

export default function PlayerController({ onFire, setFiring, firing }) {
  const rigidBody = useRef();
  const { playerState, setPlayerState } = useContext(PlayerContext);
  const [_, getKeys] = useKeyboardControls();
  const lastShoot = useRef(0);
  const { portfolioState } = useContext(PortfolioContext);

  useEffect(() => {
    if (
      !rigidBody ||
      !portfolioState.isLoaded ||
      portfolioState.currentModal !== ''
    )
      return;

    function handleMouseDown(e) {
      if (
        typeof className === 'string' &&
        e.target?.className?.includes('config')
      )
        return;
      if (portfolioState.isMobile) return;
      setFiring(true);
    }

    function handleMouseUp(e) {
      if (portfolioState.isMobile) return;
      setFiring(false);
    }

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [
    rigidBody,
    portfolioState.isLoaded,
    portfolioState.currentModal,
    portfolioState.isMobile,
    setFiring,
  ]);

  useEffect(() => {
    if (!portfolioState.isPlayerDead && rigidBody.current)
      rigidBody.current.setTranslation({ x: 0, y: 1, z: 0 });
  }, [portfolioState.isPlayerDead]);

  useFrame(() => {
    if (
      portfolioState.onCountDown ||
      portfolioState.isPaused ||
      portfolioState.isModalOpen ||
      portfolioState.isPlayerDead ||
      portfolioState.currentModal !== ''
    ) {
      setFiring(false);
      return;
    }

    const { leftward, rightward } = getKeys();

    const impulse = { x: 0, y: 0, z: 0 };
    const linearVelocity = rigidBody?.current?.linvel();
    const position = rigidBody?.current.translation();

    if (
      rightward &&
      linearVelocity.x < PLAYER_CONTROLLER.MAX_VEL &&
      position.x < 2.2
    ) {
      impulse.x += PLAYER_CONTROLLER.MOVEMENT_SPEED;
    }
    if (
      leftward &&
      linearVelocity.x > -PLAYER_CONTROLLER.MAX_VEL &&
      position.x > -2.2
    ) {
      impulse.x -= PLAYER_CONTROLLER.MOVEMENT_SPEED;
    }

    if (!rigidBody.current) return;

    rigidBody.current.applyImpulse(impulse, true);

    if (!leftward && !rightward && playerState.animation !== 'idle')
      setPlayerState((state) => ({ ...state, animation: 'idle' }));

    if (Math.abs(linearVelocity?.x) === 0) {
      if (playerState.animation !== 'idle' && !leftward && !rightward) {
        setPlayerState((state) => ({ ...state, animation: 'idle' }));
      }
    } else {
      if (linearVelocity?.x < 0 && leftward) {
        if (playerState.animation !== 'walkLeft')
          setPlayerState((state) => ({ ...state, animation: 'walkLeft' }));
      } else {
        if (playerState.animation !== 'walkRight' && rightward)
          setPlayerState((state) => ({ ...state, animation: 'walkRight' }));
      }
    }

    if (
      Date.now() - lastShoot.current >
        PLAYER_CONTROLLER.FIRE_RATE + 50 / (portfolioState.level + 1) &&
      portfolioState.isMobile
    ) {
      lastShoot.current = Date.now();
      const newBullet = {
        id: uuidv4(),
        position: vec3(rigidBody.current.translation()),
        angle: Math.PI,
      };
      if (firing) onFire(newBullet);
      return;
    }

    if (
      Date.now() - lastShoot.current >
        PLAYER_CONTROLLER.FIRE_RATE / (portfolioState.level + 1) &&
      !portfolioState.isMobile
    ) {
      lastShoot.current = Date.now();
      const newBullet = {
        id: uuidv4(),
        position: vec3(rigidBody.current.translation()),
        angle: Math.PI,
      };
      if (firing) onFire(newBullet);
    }
  });

  return (
    <RigidBody
      ref={rigidBody}
      colliders={false}
      enabledRotations={[false, false, false]}
      userData={'player'}
      position={[0, 2, 3]}
      scale={portfolioState.level * 0.03 + 1}
    >
      <CapsuleCollider args={[0.8, 0.4]} position={[0, 1.2, 0]} />
      <Player />
    </RigidBody>
  );
}

PlayerController.propTypes = {
  onFire: PropTypes.func.isRequired,
};
