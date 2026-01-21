import { Suspense, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import LoadingSpinner from './components/LoadingSpinner';
import { useTheme } from './hooks/useTheme';
import { useAuth } from './hooks/useAuth';
import { useMatchmaking } from './hooks/useMatchmaking';
import { routes } from './routes';

function App() {
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();
  const { connect, disconnect, setupEventHandlers, isConnected, isConnecting } =
    useMatchmaking();
  const element = useRoutes(routes);

  // Connect to matchmaking socket when user is authenticated - eager connection
  useEffect(() => {
    if (isAuthenticated && !isConnected && !isConnecting) {
      console.log('[App] User authenticated, connecting to matchmaking...');

      // Connect immediately without waiting
      const connectSocket = async () => {
        try {
          await connect();
          setupEventHandlers();
          console.log('[App] Matchmaking socket connected and ready');
        } catch (error) {
          console.error('[App] Failed to connect matchmaking socket:', error);
        }
      };

      connectSocket();
    }

    return () => {
      if (isAuthenticated && isConnected) {
        console.log('[App] Cleaning up matchmaking connection...');
        disconnect();
      }
    };
  }, [
    isAuthenticated,
    isConnected,
    isConnecting,
    connect,
    disconnect,
    setupEventHandlers,
  ]);

  return (
    <>
      <Helmet>
        <html lang="en" className={theme} />
      </Helmet>
      <Suspense fallback={<LoadingSpinner />}>{element}</Suspense>
    </>
  );
}

export default App;
