import { ActivityCard } from '../components/ActivityCard';
import { Activity } from '../types';

type ActivitiesSidebarProps = {
  activities: Activity[];
};

export function ActivitiesSidebar({ activities }: ActivitiesSidebarProps) {
  return (
    <div className="col-span-3 bg-white rounded-lg border p-4">
      {/* Total Work Card */}
      <div className="flex items-center gap-3 mb-6 p-3 bg-gray-50 rounded-lg">
        <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Total Work</h3>
          <p className="text-xs text-gray-500">All Tasks</p>
        </div>
      </div>

      {/* Activities List */}
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <ActivityCard key={index} {...activity} />
        ))}
      </div>
    </div>
  );
}
