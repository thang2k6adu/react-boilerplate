import { ActivitiesSidebar } from './sections/ActivitiesSidebar';
import { ChartsSection } from './sections/ChartsSection';
import { RecentActivities } from '@/components/RecentActivities';
import {
  ACTIVITIES,
  UPCOMING_TASKS,
  TOTAL_WORK_CHART_DATA,
  TASK_PERCENTAGE,
} from './constants';

export default function TasksV2() {
  return (
    <>
      <ActivitiesSidebar activities={ACTIVITIES} />

      <div className="col-span-9 space-y-4">
        <ChartsSection
          chartData={TOTAL_WORK_CHART_DATA}
          taskPercentage={TASK_PERCENTAGE}
          referenceX="May"
        />

        <RecentActivities tasks={UPCOMING_TASKS} />
      </div>
    </>
  );
}
