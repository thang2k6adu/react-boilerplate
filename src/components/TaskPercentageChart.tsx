import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

type TaskData = {
  planning: number;
  inProgress: number;
  finished: number;
};

const COLORS = {
  planning: '#8382FA',
  inProgress: '#FFBBB1',
  finished: '#ACDEE5',
};

export default function TaskPercentageChart({ data }: { data: TaskData }) {
  const chartData = [
    { name: 'Planning', value: data.planning, color: COLORS.planning },
    { name: 'In Progress', value: data.inProgress, color: COLORS.inProgress },
    { name: 'Finished', value: data.finished, color: COLORS.finished },
  ];

  return (
    <div className="flex w-full h-[260px] items-center gap-6">
      <div className="h-full w-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={55}
              outerRadius={90}
              paddingAngle={4}
            >
              {chartData.map(item => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>

            <Tooltip formatter={(value, name) => [`${value} tasks`, name]} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col gap-3 text-sm">
        {chartData.map(item => (
          <div key={item.name} className="flex items-center gap-3">
            <span
              className="h-3 w-3 rounded-sm"
              style={{ backgroundColor: item.color }}
            />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
