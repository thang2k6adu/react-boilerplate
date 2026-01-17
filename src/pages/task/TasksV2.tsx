import { ActivitiesSidebar } from './sections/ActivitiesSidebar';
import { ChartsSection } from './sections/ChartsSection';
import { RecentActivitiesSection } from './sections/RecentActivitiesSection';
import {
  ACTIVITIES,
  RECENT_ACTIVITIES,
  TOTAL_WORK_CHART_DATA,
  CHART_LABELS,
  TASK_PERCENTAGE,
} from './constants';

export default function TasksV2() {
  return (
    <>
      {/* LEFT SIDEBAR - col-span-3 */}
      <ActivitiesSidebar activities={ACTIVITIES} />

      {/* RIGHT SECTION - col-span-9 */}
      <div className="col-span-9 space-y-4">
        {/* Top Row: Total Work Chart + Task Percentage */}
        <ChartsSection
          chartData={TOTAL_WORK_CHART_DATA}
          chartLabels={CHART_LABELS}
          taskPercentage={TASK_PERCENTAGE}
        />

        {/* Recent Activities */}
        <RecentActivitiesSection activities={RECENT_ACTIVITIES} />
      </div>
    </>
  );
}
