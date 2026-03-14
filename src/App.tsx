import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import LoadingSpinner from './components/LoadingSpinner';
import { useTheme } from './hooks/useTheme';
import { routes } from './routes';

function App() {
  const { theme } = useTheme();
  const element = useRoutes(routes);

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
