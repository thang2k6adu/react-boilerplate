import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Layout from './components/Layout';
import DashboardLayout from './components/DashboardLayout';
import LoadingSpinner from './components/LoadingSpinner';
import { useTheme } from './hooks/useTheme';

const Home = React.lazy(() => import('@/pages/Home'));
const About = React.lazy(() => import('@/pages/About'));
const Login = React.lazy(() => import('@/pages/Login'));
const SignUp = React.lazy(() => import('@/pages/SignUp'));
const ForgotPassword = React.lazy(() => import('@/pages/ForgotPassword'));
const Dashboard = React.lazy(() => import('@/pages/Dashboard'));
const Tasks = React.lazy(() => import('@/pages/Tasks'));
const Calendar = React.lazy(() => import('@/pages/Calendar'));
const Settings = React.lazy(() => import('@/pages/Settings'));
const NotFound = React.lazy(() => import('@/pages/NotFound'));

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { theme } = useTheme();

  return (
    <>
      <Helmet>
        <html lang="en" className={theme} />
      </Helmet>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Dashboard routes with separate layout */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
