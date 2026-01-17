import { Activity, RecentActivity, ChartDataPoint } from './types';

// Semantic color mapping
export const STATUS_COLOR_MAP = {
  'in-progress': 'bg-blue-500',
  completed: 'bg-green-500',
  pending: 'bg-yellow-500',
};

export const PROGRESS_BAR_COLOR = 'bg-black';

// Activities data
export const ACTIVITIES: Activity[] = [
  {
    title: 'Dashboard Design',
    subtitle: 'DashedUI Kit',
    date: 'March 20th, 2021',
    status: 'In Progress',
    progress: 60,
  },
  {
    title: 'Dashboard Design',
    subtitle: 'DashedUI Kit',
    date: 'March 20th, 2021',
    status: 'In Progress',
    progress: 60,
  },
  {
    title: 'Dashboard Design',
    subtitle: 'DashedUI Kit',
    date: 'March 20th, 2021',
    status: 'In Progress',
    progress: 60,
  },
  {
    title: 'Dashboard Design',
    subtitle: 'DashedUI Kit',
    date: 'March 20th, 2021',
    status: 'In Progress',
    progress: 60,
  },
  {
    title: 'Dashboard Design',
    subtitle: 'DashedUI Kit',
    date: 'March 20th, 2021',
    status: 'In Progress',
    progress: 60,
  },
];

// Recent activities data
export const RECENT_ACTIVITIES: RecentActivity[] = [
  { title: 'Finish Homework', time: '2:30 pm' },
  { title: 'Finish Homework', time: '2:30 pm' },
  { title: 'Finish Homework', time: '2:30 pm' },
  { title: 'Finish Homework', time: '2:30 pm' },
  { title: 'Finish Homework', time: '2:30 pm' },
];

// Chart data
export const TOTAL_WORK_CHART_DATA: ChartDataPoint[] = [
  40, 60, 45, 70, 55, 80, 50, 65, 75, 60, 85, 70,
];

export const CHART_LABELS = ['12', '13', '14', '15', '16', '17', '18'];

// Task percentage data
export const TASK_PERCENTAGE = {
  working: { value: 75, color: 'bg-purple-600', stroke: '#8B5CF6' },
  completed: { value: 60, color: 'bg-blue-600', stroke: '#3B82F6' },
  pending: { value: 45, color: 'bg-pink-600', stroke: '#EC4899' },
};
