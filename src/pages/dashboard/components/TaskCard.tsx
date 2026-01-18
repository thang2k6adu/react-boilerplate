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
    <Card className="w-full rounded-lg shadow-md">
      <CardContent className="p-[16px] pt-[32px]">
        <div className="flex flex-col w-full h-auto gap-[16px]">
          <div className="flex flex-col w-auto h-auto gap-[4px]">
            <div className="flex flex-col gap-[0px]">
              <span className="text-caption-xs-regular text-muted-foreground">
                Ongoing Task
              </span>
              <span className="text-body-semi">{title}</span>
            </div>

            <div className="flex flex-col w-auto h-auto gap-[4px]">
              <div className="w-full h-[8px] bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: COLOR_MAP[status],
                  }}
                />
              </div>

              <span className="text-caption-xs-regular text-muted-foreground">
                {progress}% completed
              </span>
            </div>
          </div>

          <div className="flex flex-col w-full h-auto gap-[4px]">
            <div className="w-full h-[0.5px] bg-gray-200" />

            <div className="flex w-full h-auto justify-between text-[12px]">
              <div>
                <span className="text-caption-xs-bold text-gray-700">
                  Start Date:
                </span>{' '}
                <span className="text-caption-xs-regular text-gray-600">
                  {startDate}
                </span>
              </div>

              <div>
                <span className="text-caption-xs-bold text-gray-700">
                  Estimated:
                </span>{' '}
                <span className="text-caption-xs-regular text-gray-600">
                  {estimated}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
