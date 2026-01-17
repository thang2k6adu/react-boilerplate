import { Card, CardContent } from '@/components/ui/card';
import { TaskProgress } from '../types';
import { COLOR_MAP } from '../constants';

export function TaskCard({
  title,
  progress,
  startDate,
  estimated,
  status,
}: TaskProgress) {
  return (
    <Card className="w-full border rounded-lg">
      <CardContent className="p-4">
        <div className="flex flex-col gap-3">
          <span className="text-xs text-gray-400">Ongoing Task</span>
          <h4 className="text-base font-semibold text-gray-900">{title}</h4>

          {/* Progress Bar */}
          <div className="flex flex-col gap-1">
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${progress}%`,
                  backgroundColor: COLOR_MAP[status],
                }}
              />
            </div>
            <span className="text-xs text-gray-500">{progress} % Complete</span>
          </div>

          {/* Dates */}
          <div className="flex items-center gap-4 text-xs">
            <div>
              <span className="font-semibold text-gray-700">Start Date : </span>
              <span className="text-gray-600">{startDate}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Estimated : </span>
              <span className="text-gray-600">{estimated}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
