import React from 'react';
import type { RouteConfig } from './type';
// import Layout from '@/components/Layout';
import { Layout } from '@/layout/AppLayout';
import DashboardLayout from '@/components/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';

const Home = React.lazy(() => import('@/pages/Home'));
const About = React.lazy(() => import('@/pages/About'));
const Login = React.lazy(() => import('@/pages/Login'));
const SignUp = React.lazy(() => import('@/pages/SignUp'));
const ForgotPassword = React.lazy(() => import('@/pages/ForgotPassword'));
const Dashboard = React.lazy(() => import('@/pages/Dashboard'));
const Tasks = React.lazy(() => import('@/pages/Tasks'));
const Calendar = React.lazy(() => import('@/pages/Calendar'));
const Settings = React.lazy(() => import('@/pages/Settings'));
const Matchmaking = React.lazy(() => import('@/pages/Matchmaking'));
const NotFound = React.lazy(() => import('@/pages/NotFound'));

const DashboardV2 = React.lazy(() => import('@/pages/dashboard/DashboardV2'));
const TaskV2 = React.lazy(() => import('@/pages/task/TasksV2'));
const Focus = React.lazy(() => import('@/pages/focus/Focus'));

export const routes: RouteConfig[] = [
  {
    path: '/',
    // element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  {
    path: '/v2',
    // TODO: gói protect route vào đây
    element: <Layout />,
    children: [
      { index: true, element: <DashboardV2 /> },
      { path: 'tasks', element: <TaskV2 /> },
      { path: 'focus', element: <Focus /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'tasks', element: <Tasks /> },
      { path: 'calendar', element: <Calendar /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
  {
    path: '/matchmaking',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <Matchmaking /> }],
  },
];
