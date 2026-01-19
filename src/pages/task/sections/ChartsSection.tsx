import { Card, CardContent } from '@/components/ui/card';
import TotalWorkChart from '@/components/TotalWorkChart';
import TaskPercentageChart from '@/components/TaskPercentageChart';

type ChartsSectionProps = {
  chartData: { month: string; Tasks: number }[];
  taskPercentage: {
    planning: number;
    inProgress: number;
    finished: number;
  };
  referenceX?: string;
};

export function ChartsSection({
  chartData,
  taskPercentage,
  referenceX,
}: ChartsSectionProps) {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="w-full h-full flex flex-col gap-3">
        <div className="text-h6-semi">Total work</div>

        <Card className="w-full shadow-md">
          <CardContent className="p-4">
            <TotalWorkChart data={chartData} referenceX={referenceX} />
          </CardContent>
        </Card>
      </div>

      <div className="w-full h-full flex flex-col gap-3">
        <div className="text-h6-semi">Task Percentage</div>

        <Card className="w-full h-full shadow-md">
          <CardContent className="p-4">
            <TaskPercentageChart data={taskPercentage} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
