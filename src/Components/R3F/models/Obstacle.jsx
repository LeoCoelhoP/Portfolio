import { useTranslation } from 'react-i18next';
import { Text } from '@react-three/drei';

export default function Obstacle({ obstacle, obstacleRef }) {
  const { t } = useTranslation();
  return (
    <mesh ref={obstacleRef}>
      <planeGeometry args={[Boolean(obstacle.specialObstacle) ? 7 : 3.5, 4]} />
      <meshStandardMaterial transparent opacity={0.4} color='blue' />
      <Text position={[0, 1.3, 0.015]}>{obstacle.health}</Text>
      {obstacle.specialObstacle && (
        <Text position={[0, 0, 0.015]}>{t(`${obstacle.specialObstacle}`)}</Text>
      )}
    </mesh>
  );
}
