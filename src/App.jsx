import { KeyboardControls } from '@react-three/drei';
import PlayerProvider from './Contexts/PlayerContext';
import PortfolioProvider from './Contexts/PortfolioContext';
import Experience from './Components/R3F/Experience';
import ObstaclesProvider from './Contexts/ObstaclesContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './configs/18n';

export default function App() {
  const keysToBeListened = [
    { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
    { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
    { name: 'escape', keys: ['Escape', 'Escape'] },
  ];

  return (
    <I18nextProvider i18n={i18n}>
      <KeyboardControls map={keysToBeListened}>
        <PortfolioProvider>
          <PlayerProvider>
            <ObstaclesProvider>
              <Experience />
            </ObstaclesProvider>
          </PlayerProvider>
        </PortfolioProvider>
      </KeyboardControls>
    </I18nextProvider>
  );
}
