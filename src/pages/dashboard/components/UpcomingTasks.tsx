import { Card, CardContent } from '@/components/ui/card';
import { UpcomingTask } from '../types';

type UpcomingTasksProps = {
  tasks: UpcomingTask[];
};

export function UpcomingTasks({ tasks }: UpcomingTasksProps) {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <h3 className="text-base font-bold text-gray-900 mb-4">Upcoming</h3>
        <p className="text-xs text-gray-500 mb-4">May 18, 2023 | 09:00 AM</p>

        <div className="flex flex-col gap-3">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50"
            >
              <div className="w-1 h-12 bg-violet-600 rounded-full" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-900">
                  {task.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1">{task.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
