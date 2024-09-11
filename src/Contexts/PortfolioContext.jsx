import { createContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const PortfolioContext = createContext();

export default function PortfolioProvider({ children }) {
  const { t } = useTranslation();
  let ranks = useMemo(
    () => [t('private'), t('specialist'), t('corporal'), t('sergeant')],
    [t]
  );
  const [portfolioState, setPortfolioState] = useState({
    onCountDown: false,
    isPaused: false,
    isPlayerDead: false,
    isModalOpen: false,
    isLoaded: false,
    isMuted: false,
    play: false,
    currentModal: '',
    isMobile: window.innerWidth <= 1025,
    xp: 0,
    rank: ranks[0],
    ranks,
    level: 0,
  });

  useEffect(() => {
    function handleKeyPress(e) {
      if (
        e.code === 'Escape' &&
        portfolioState.currentModal === '' &&
        !portfolioState.isPlayerDead
      )
        return setPortfolioState((state) => ({
          ...state,
          isPaused: !state.isPaused,
        }));

      if (e.code === 'Escape' && portfolioState.currentModal !== '')
        return setPortfolioState((state) => ({
          ...state,
          isPaused: false,
          isModalOpen: false,
          currentModal: '',
        }));

      if (
        e.code === 'KeyR' &&
        portfolioState.isPlayerDead &&
        portfolioState.isLoaded
      ) {
        setPortfolioState((state) => ({
          ...state,
          isPlayerDead: false,
          xp: 0,
          level: 0,
          rank: ranks[0],
        }));
      }
    }

    window.addEventListener('keydown', handleKeyPress);

    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [
    portfolioState.isPlayerDead,
    portfolioState.currentModal,
    portfolioState.isLoaded,
    ranks,
  ]);

  useEffect(() => {
    function handleResize() {
      setPortfolioState((state) => ({
        ...state,
        isMobile: window.innerWidth <= 768,
      }));
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (portfolioState.rank === t('sergeant')) return;
    if (portfolioState.xp > 10) {
      setPortfolioState((state) => ({
        ...state,
        level: state.level + 1,
        xp: 0,
        rank:
          state.level + 1 >= state.ranks.length
            ? state.ranks[state.ranks.length - 1]
            : state.ranks[state.level + 1],
      }));
    }
  }, [portfolioState.xp, portfolioState.rank, portfolioState.ranks.length, t]);

  useEffect(() => {
    if (
      !portfolioState.isModalOpen ||
      !portfolioState.isPlayerDead ||
      !portfolioState.isPaused
    )
      setPortfolioState((state) => ({ ...state, onCountDown: true }));
  }, [
    portfolioState.isModalOpen,
    portfolioState.isPlayerDead,
    portfolioState.isPaused,
  ]);

  return (
    <PortfolioContext.Provider value={{ portfolioState, setPortfolioState }}>
      {children}
    </PortfolioContext.Provider>
  );
}
