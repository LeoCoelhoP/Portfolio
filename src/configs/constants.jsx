import JavaScriptIcon from '../components/icons/JavaScriptIcon';
import MongoDbIcon from '../Components/icons/MongoDbIcon';
import NodeJsIcon from '../Components/icons/NodeJsIcon';
import ReactIcon from '../Components/icons/ReactIcon';

const CLICK_VOLUME = 0.2;

const BULLET_SPEED = 20;
const WEAPON_OFFSET = {
  x: -0.2,
  y: 1.9,
  z: 0.8,
};
const SPECIAL_OBSTACLE_PERCENTAGE_TO_APPEAR = 35;
const OBSTACLE_VELOCITY = 8;
const OBSTACLE_HEALTH_MULTIPLY_FACTOR = 5;
const OBSTACLE_HEALTH_STANDARD_HEALTH = 2;

const HITTED_OBSTACLE_SOUND_VOLUME = 0.8;
const GAME_OVER_VOLUME = 0.5;
const GUN_SHOOT_VOLUME = 0.5;

const PLAYER_CONTROLLER = {
  FIRE_RATE: 400,
  MOVEMENT_SPEED: 0.5,
  MAX_VEL: 3,
};

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

export {
  BULLET_SPEED,
  SPECIAL_OBSTACLE_PERCENTAGE_TO_APPEAR,
  GUN_SHOOT_VOLUME,
  HITTED_OBSTACLE_SOUND_VOLUME,
  OBSTACLE_VELOCITY,
  PLAYER_CONTROLLER,
  SKILLS,
  WEAPON_OFFSET,
  OBSTACLE_HEALTH_MULTIPLY_FACTOR,
  OBSTACLE_HEALTH_STANDARD_HEALTH,
  CLICK_VOLUME,
  GAME_OVER_VOLUME,
};
