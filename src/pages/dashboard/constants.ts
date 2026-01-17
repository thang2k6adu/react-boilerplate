import { CheckCircle2, ListChecks, CalendarCheck2, Timer } from 'lucide-react';
import { Stat, TaskProgress, UpcomingTask, ProgressStatus } from './types';

// Semantic color mapping
export const COLOR_MAP: Record<ProgressStatus, string> = {
  primary: '#8b5cf6',
  danger: '#ef4444',
  success: '#10b981',
};

export const BG_COLOR_MAP: Record<ProgressStatus, string> = {
  primary: 'bg-violet-500',
  danger: 'bg-red-500',
  success: 'bg-emerald-500',
};

// Stats data
export const DASHBOARD_STATS: Stat[] = [
  { value: 1120, label: 'Total Task', icon: CheckCircle2 },
  { value: 320, label: 'In Progress', icon: ListChecks },
  { value: 760, label: 'Completed', icon: CalendarCheck2 },
  { value: 40, label: 'Overdue', icon: Timer },
];

// Work progress tasks data
export const WORK_PROGRESS_TASKS: TaskProgress[] = [
  {
    title: 'Dashboard Design',
    progress: 90,
    startDate: '10 Jan',
    estimated: '2 Hours',
    status: 'primary',
  },
  {
    title: 'Dashboard Design',
    progress: 90,
    startDate: '10 Jan',
    estimated: '2 Hours',
    status: 'primary',
  },
  {
    title: 'Dashboard Design',
    progress: 90,
    startDate: '10 Jan',
    estimated: '2 Hours',
    status: 'danger',
  },
  {
    title: 'Dashboard Design',
    progress: 90,
    startDate: '10 Jan',
    estimated: '2 Hours',
    status: 'success',
  },
];

// Upcoming tasks data
export const UPCOMING_TASKS: UpcomingTask[] = [
  { title: 'Finish Homework', date: 'May 18, 2023 | 09:00 AM' },
  { title: 'Finish Homework', date: 'May 18, 2023 | 09:00 AM' },
  { title: 'Finish Homework', date: 'May 18, 2023 | 09:00 AM' },
  { title: 'Finish Homework', date: 'May 18, 2023 | 09:00 AM' },
  { title: 'Finish Homework', date: 'May 18, 2023 | 09:00 AM' },
];
