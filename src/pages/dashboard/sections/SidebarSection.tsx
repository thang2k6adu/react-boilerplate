import { Calendar } from '../components/Calendar';
import { UpcomingTasks } from '../components/UpcomingTasks';
import { UpcomingTask } from '../types';

type SidebarSectionProps = {
  upcomingTasks: UpcomingTask[];
};

export function SidebarSection({ upcomingTasks }: SidebarSectionProps) {
  return (
    <>
      <Calendar />
      <UpcomingTasks tasks={upcomingTasks} />
    </>
  );
}
