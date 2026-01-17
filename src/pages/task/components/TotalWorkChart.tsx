import { ChartDataPoint } from '../types';

type TotalWorkChartProps = {
  data: ChartDataPoint[];
  labels: string[];
};

export function TotalWorkChart({ data, labels }: TotalWorkChartProps) {
  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Total Work</h2>
        <button className="text-gray-400 hover:text-gray-600">• • •</button>
      </div>

      {/* Simple Bar Chart */}
      <div className="h-48 flex items-end justify-between gap-1">
        {data.map((height, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end">
            <div
              className="w-full bg-blue-100 rounded-t transition-all hover:bg-blue-200"
              style={{ height: `${height}%` }}
            />
          </div>
        ))}
      </div>

      {/* Chart Labels */}
      <div className="flex justify-between mt-2 text-xs text-gray-400">
        {labels.map((label, i) => (
          <span key={i}>{label}</span>
        ))}
      </div>
    </div>
  );
}
