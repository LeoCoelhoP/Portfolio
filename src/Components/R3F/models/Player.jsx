import { useContext, useEffect, useRef } from 'react';

import { Text, useAnimations, useGLTF } from '@react-three/drei';

import { PlayerContext } from '../../../Contexts/PlayerContext';
import { PortfolioContext } from '../../../Contexts/PortfolioContext';

export default function Model(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('./models/player.glb');
  const { actions } = useAnimations(animations, group);

  const { playerState } = useContext(PlayerContext);
  const { portfolioState } = useContext(PortfolioContext);

  useEffect(() => {
    actions[playerState.animation].reset()?.fadeIn(0.1).play();

    return () => {
      actions[playerState.animation]?.fadeOut(0.2);
    };
  }, [actions, playerState]);

  let rankColor = null;
  switch (portfolioState.level) {
    case 0:
      rankColor = 'darkgreen';
      break;
    case 1:
      rankColor = 'blue';
      break;

    case 2:
      rankColor = 'yellow';
      break;

    default:
      rankColor = 'red';
  }

  return (
    <>
      <Text
        position={[0.1, 2.8, 0]}
        color={rankColor}
        font='public/fonts/Roboto-Black.ttf'
        fontWeight='bold'
        fontSize={0.3}
      >
        {portfolioState.rank}
      </Text>
      <group ref={group} {...props} rotation={[0, -Math.PI, 0]} scale={1.4}>
        <group name='Scene'>
          <group name='Character' rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <primitive object={nodes.mixamorigHips} />
            <skinnedMesh
              name='Boots_01'
              geometry={nodes.Boots_01.geometry}
              material={materials.texture}
              skeleton={nodes.Boots_01.skeleton}
              castShadow
            />
            <skinnedMesh
              name='Hands_01'
              geometry={nodes.Hands_01.geometry}
              material={materials.texture}
              skeleton={nodes.Hands_01.skeleton}
              castShadow
            />
            <skinnedMesh
              name='Head_01'
              geometry={nodes.Head_01.geometry}
              material={materials.texture}
              skeleton={nodes.Head_01.skeleton}
              castShadow
            />
            <skinnedMesh
              name='Helmet_01'
              geometry={nodes.Helmet_01.geometry}
              material={materials.texture}
              skeleton={nodes.Helmet_01.skeleton}
              castShadow
            />
            <skinnedMesh
              name='Legs_01'
              geometry={nodes.Legs_01.geometry}
              material={materials.texture}
              skeleton={nodes.Legs_01.skeleton}
              castShadow
            />
            <skinnedMesh
              name='Torso_01'
              geometry={nodes.Torso_01.geometry}
              skeleton={nodes.Torso_01.skeleton}
              castShadow
            >
              <meshStandardMaterial color={rankColor} />
            </skinnedMesh>
          </group>
        </group>
      </group>
    </>
  );
}

useGLTF.preload('/models/player.glb');
