type TaskPercentageData = {
  working: { value: number; color: string; stroke: string };
  completed: { value: number; color: string; stroke: string };
  pending: { value: number; color: string; stroke: string };
};

type TaskPercentageChartProps = {
  data: TaskPercentageData;
};

export function TaskPercentageChart({ data }: TaskPercentageChartProps) {
  const { working, completed, pending } = data;

  // Calculate stroke offsets for the circular progress
  const circumference = 2 * Math.PI * 70;
  const workingOffset = circumference - (circumference * working.value) / 100;

  return (
    <div className="bg-white rounded-lg border p-6">
      <h2 className="text-lg font-semibold mb-6">Task Percentage</h2>

      {/* Circular Progress */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#E5E7EB"
              strokeWidth="10"
              fill="none"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke={working.stroke}
              strokeWidth="10"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={workingOffset}
              strokeLinecap="round"
            />
            <circle
              cx="80"
              cy="80"
              r="55"
              stroke={completed.stroke}
              strokeWidth="10"
              fill="none"
              strokeDasharray="345"
              strokeDashoffset="86"
              strokeLinecap="round"
            />
            <circle
              cx="80"
              cy="80"
              r="40"
              stroke={pending.stroke}
              strokeWidth="10"
              fill="none"
              strokeDasharray="251"
              strokeDashoffset="63"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${working.color}`} />
            <span className="text-sm text-gray-600">Working</span>
          </div>
          <span className="text-sm font-medium">{working.value}%</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${completed.color}`} />
            <span className="text-sm text-gray-600">Completed</span>
          </div>
          <span className="text-sm font-medium">{completed.value}%</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${pending.color}`} />
            <span className="text-sm text-gray-600">Pending</span>
          </div>
          <span className="text-sm font-medium">{pending.value}%</span>
        </div>
      </div>
    </div>
  );
}
