import { useContext, useRef } from 'react';

import { PerspectiveCamera, useGLTF } from '@react-three/drei';

import { PortfolioContext } from '../../../Contexts/PortfolioContext';

export default function Map(props) {
  const { nodes, materials } = useGLTF('/models/map.glb');
  const groupRef = useRef();
  const { portfolioState } = useContext(PortfolioContext);

  return (
    <group ref={groupRef} {...props}>
      <PerspectiveCamera
        makeDefault={true}
        far={130}
        near={0.1}
        fov={55}
        position={[0, 5, 19.4]}
        rotation={[-0.209, 0, 0]}
      />
      <group position={[0, 0, 14]}>
        <group {...props}>
          <group
            position={[249.973, 56.932, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={59.541}
          >
            <group rotation={[Math.PI / 2, 0, 0]}>
              <group
                position={[-4.185, -0.349, -0.529]}
                rotation={[-Math.PI, 1.47, -Math.PI]}
              >
                {!portfolioState.isMobile && (
                  <mesh
                    geometry={nodes.defaultMaterial001_2.geometry}
                    material={materials['ROCKS_SMALL.001']}
                  />
                )}

                <mesh
                  geometry={nodes.defaultMaterial001_1.geometry}
                  material={materials['ROCKS_BIG.001']}
                />
                <mesh
                  geometry={nodes.defaultMaterial001_3.geometry}
                  material={materials['BEAMS.001']}
                  receiveShadow
                />
              </group>
            </group>
          </group>
          <group
            position={[8.972, 0.177, -19.68]}
            rotation={[0, Math.PI / 2, 0]}
          >
            <mesh
              geometry={nodes.Mesh011.geometry}
              material={materials.Material}
            />
            <mesh
              geometry={nodes.Mesh011_1.geometry}
              material={materials.picture_1}
            />
          </group>
          {!portfolioState.isMobile && (
            <group position={[-6.968, 0, -20.811]} rotation={[0, 0.787, 0]}>
              <mesh
                geometry={nodes.Mesh015.geometry}
                material={materials.Material}
              />
              <mesh
                geometry={nodes.Mesh015_1.geometry}
                material={materials.picture_1}
                castShadow
              />
              <group position={[0.032, 1.593, 0.034]}>
                <mesh
                  geometry={nodes.Mesh019.geometry}
                  material={materials.Material}
                />
                <mesh
                  geometry={nodes.Mesh019_1.geometry}
                  material={materials.picture_1}
                />
                <mesh
                  geometry={nodes.tank_gun_001.geometry}
                  material={materials.picture_1}
                  position={[-0.008, 0.534, 1.434]}
                  castShadow
                />
              </group>
            </group>
          )}
          <mesh
            geometry={nodes.tower_001.geometry}
            material={materials.Material}
            position={[-5.995, 0.036, -49.412]}
          />
          <mesh
            geometry={nodes.container_001001.geometry}
            material={materials.Material}
            position={[0.315, 2.497, -57.685]}
            rotation={[0, Math.PI / 2, 0]}
          />
          <group
            position={[-16.415, 0.087, -12.012]}
            rotation={[0, Math.PI / 2, 0]}
          >
            <mesh
              geometry={nodes.Cylinder013.geometry}
              material={materials.Material}
            />
            <mesh
              geometry={nodes.Cylinder013_1.geometry}
              material={materials.picture_1}
              castShadow
            />
          </group>
          <group position={[-12.928, 0, -4.813]} rotation={[0, 1.168, 0]}>
            <mesh
              geometry={nodes.Cube009.geometry}
              material={materials.Material}
              castShadow
            />
            <mesh
              geometry={nodes.Cube009_1.geometry}
              material={materials.picture_1}
            />
          </group>
          <group position={[0, 0.05, -45]} scale={[3, 0.05, 9]}>
            <mesh
              geometry={nodes.Cube004.geometry}
              material={materials['Material.001']}
              receiveShadow
            />
            <mesh
              geometry={nodes.Cube004_1.geometry}
              material={materials['Material.002']}
              receiveShadow
            />
            <mesh
              geometry={nodes.Cube004_2.geometry}
              material={materials['Material.004']}
              receiveShadow
            />
            <mesh
              geometry={nodes.Cube004_3.geometry}
              material={materials['Material.003']}
              receiveShadow
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/models/map.glb');
