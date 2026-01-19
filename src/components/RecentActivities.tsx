import { Card, CardContent } from '@/components/ui/card';
import { formatDurationHYM } from '@/utils/date';

export type RecentActivity = {
  title: string;
  estimated: number;
};

type RecentActivitiesProps = {
  tasks: RecentActivity[];
};

export function RecentActivities({ tasks }: RecentActivitiesProps) {
  return (
    <Card className="w-full bg-transparent shadow-none border-none">
      <CardContent className="p-0 gap-4 flex flex-col">
        <div className="flex flex-col gap-0">
          <h3 className="text-h6-semi text-black">Recent Activities</h3>
          <p className="text-caption-lg-regular text-muted-foreground">
            Wednesday, 13th March, 2026
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="cursor-pointer flex bg-white shadow-md items-start gap-3 p-3 border-l-4 border-violet-600 rounded-md hover:bg-gray-50 w-full"
            >
              <div className="flex-1">
                <h4 className="text-body-semi text-gray-900">{task.title}</h4>
                <p className="text-caption-lg-regular text-muted-foreground mt-1">
                  {formatDurationHYM(task.estimated)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
