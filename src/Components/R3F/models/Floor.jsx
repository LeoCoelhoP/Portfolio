import { RigidBody } from '@react-three/rapier';

export default function Floor() {
  return (
    <RigidBody type='fixed' friction={2}>
      <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 100]} />
        <meshStandardMaterial transparent color='green' opacity={0} />
      </mesh>
    </RigidBody>
  );
}
