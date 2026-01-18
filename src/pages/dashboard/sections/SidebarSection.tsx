import { Calendar } from '../components/Calendar';
import { UpcomingTasks } from '../components/UpcomingTasks';
import { UpcomingTask } from '../types';

type SidebarSectionProps = {
  upcomingTasks: UpcomingTask[];
};

export function SidebarSection({ upcomingTasks }: SidebarSectionProps) {
  return (
    <section className="col-span-4 flex flex-col gap-6">
      <Calendar />

      <UpcomingTasks tasks={upcomingTasks} />
    </section>
  );
}
