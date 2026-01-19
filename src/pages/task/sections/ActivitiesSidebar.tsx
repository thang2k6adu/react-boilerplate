import { TaskCard } from '@/components/TaskCard';
import { Activity } from '../types';
import { CreateTaskDialog } from './CreateTaskDialog';

type ActivitiesSidebarProps = {
  activities: Activity[];
};

export function ActivitiesSidebar({ activities }: ActivitiesSidebarProps) {
  return (
    <div className="col-span-3">
      <div className="flex items-center justify-between mb-6 bg-gray-50 rounded-lg">
        <div>
          <h3 className="text-h4-medium text-gray-900">Activities</h3>
          <p className="text-body-regular text-gray-500">June 28th, 2025</p>
        </div>

        <CreateTaskDialog />
      </div>

      <div className="flex flex-col gap-3 text-gray-400">
        <h6 className="text-h6 font-regular">All Tasks</h6>

        <div className="space-y-3">
          {activities.map((activity, index) => (
            <TaskCard key={index} {...activity} />
          ))}
        </div>
      </div>
    </div>
  );
}
