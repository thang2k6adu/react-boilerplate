import { TotalWorkChart } from '../components/TotalWorkChart';
import { TaskPercentageChart } from '../components/TaskPercentageChart';
import { ChartDataPoint } from '../types';

type ChartsSectionProps = {
  chartData: ChartDataPoint[];
  chartLabels: string[];
  taskPercentage: {
    working: { value: number; color: string; stroke: string };
    completed: { value: number; color: string; stroke: string };
    pending: { value: number; color: string; stroke: string };
  };
};

export function ChartsSection({
  chartData,
  chartLabels,
  taskPercentage,
}: ChartsSectionProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <TotalWorkChart data={chartData} labels={chartLabels} />
      <TaskPercentageChart data={taskPercentage} />
    </div>
  );
}
