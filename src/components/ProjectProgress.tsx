import React from 'react';

interface ProjectProgressProps {
  percentage: number;
  taskName: string;
  isActive?: boolean;
}

const ProjectProgress: React.FC<ProjectProgressProps> = ({
  percentage,
  taskName,
  isActive = false,
}) => {
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-2">Task Progress</h3>
      <p
        className={`text-sm mb-6 truncate ${
          isActive ? 'text-gray-600' : 'text-gray-400 italic'
        }`}
        title={taskName}
      >
        {isActive ? taskName : 'No task selected'}
      </p>

      <div className="flex items-center justify-center mb-8">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="90"
              className="fill-none stroke-gray-100"
              strokeWidth="12"
            />
            <circle
              cx="96"
              cy="96"
              r="90"
              className="fill-none stroke-emerald-500"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{
                transition: 'stroke-dashoffset 0.5s ease',
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-gray-900">
              {percentage}%
            </span>
            <span className="text-sm text-gray-500">
              {!isActive
                ? 'Idle'
                : percentage === 100
                  ? 'Completed!'
                  : 'In Progress'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-8">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Completed</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
          <span className="text-sm text-gray-600">Remaining</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectProgress;
