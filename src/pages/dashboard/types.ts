import { LucideIcon } from 'lucide-react';

export type ProgressStatus = 'primary' | 'danger' | 'success';

export type Stat = {
  value: number;
  label: string;
  icon: LucideIcon;
};

export type TaskProgress = {
  title: string;
  progress: number;
  startDate: string;
  estimated: string;
  status: ProgressStatus;
};

export type UpcomingTask = {
  title: string;
  date: string;
};
