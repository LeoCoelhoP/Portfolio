import { createContext, useCallback, useEffect, useState } from 'react';
import {
  OBSTACLE_HEALTH_MULTIPLY_FACTOR,
  OBSTACLE_HEALTH_STANDARD_HEALTH,
  SPECIAL_OBSTACLE_PERCENTAGE_TO_APPEAR,
} from '../configs/constants';

export const ObstaclesContext = createContext();

const specialObstaclesArray = ['aboutMe', 'contactMe', 'projects'];
let currentSpecialObstacleIndex = 0;

export default function ObstaclesProvider({ children }) {
  const [obstacle, setObstacle] = useState(null);

  function getSpecialObstacle() {
    if (currentSpecialObstacleIndex >= specialObstaclesArray.length) {
      currentSpecialObstacleIndex = 0;
    }
    const obstacle = specialObstaclesArray[currentSpecialObstacleIndex];

    currentSpecialObstacleIndex += 1;

    return obstacle;
  }

  const addRandomObstacle = useCallback(() => {
    const obstacle = {
      id: new Date().getMilliseconds(),
      health:
        OBSTACLE_HEALTH_MULTIPLY_FACTOR *
        Math.ceil(Math.random() * OBSTACLE_HEALTH_STANDARD_HEALTH),
      specialObstacle:
        Math.random() * 100 < SPECIAL_OBSTACLE_PERCENTAGE_TO_APPEAR
          ? getSpecialObstacle()
          : false,
      onLeft: Math.random() > 0.5 ? -1.5 : 1.5,
    };
    setObstacle(obstacle);
  }, []);

  useEffect(() => {
    if (!obstacle) addRandomObstacle();
  }, [obstacle, addRandomObstacle]);

  return (
    <ObstaclesContext.Provider
      value={{ obstacle, setObstacle, addRandomObstacle }}
    >
      {children}
    </ObstaclesContext.Provider>
  );
}
