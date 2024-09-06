import { useProgress } from '@react-three/drei';
import { Suspense, useContext } from 'react';

import { PortfolioContext } from '../../Contexts/PortfolioContext';

export default function LoadingScreen({ setLoadingProgress, children }) {
  const { setPortfolioState } = useContext(PortfolioContext);

  function Loader() {
    const { active, progress, errors, item, loaded, total } = useProgress();

    if (loaded === total) {
      setPortfolioState((state) => ({ ...state, isLoaded: true }));
    }
    return setLoadingProgress(progress);
  }

  return <Suspense fallback={<Loader />}>{children}</Suspense>;
}
