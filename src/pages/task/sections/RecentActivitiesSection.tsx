import { RecentActivityCard } from '../components/RecentActivityCard';
import { RecentActivity } from '../types';

type RecentActivitiesSectionProps = {
  activities: RecentActivity[];
};

export function RecentActivitiesSection({
  activities,
}: RecentActivitiesSectionProps) {
  return (
    <div className="bg-white rounded-lg border p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <RecentActivityCard key={index} {...activity} />
        ))}
      </div>
    </div>
  );
}
