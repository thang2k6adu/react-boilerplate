import { Activity } from '../types';
import { PROGRESS_BAR_COLOR } from '../constants';

export function ActivityCard({
  title,
  subtitle,
  date,
  status,
  progress,
}: Activity) {
  return (
    <div className="border rounded-lg p-3 hover:shadow-md transition">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 text-sm">{title}</h4>
          <p className="text-xs text-gray-500">{subtitle}</p>
          <p className="text-xs text-gray-400 mt-1">{date}</p>
        </div>
        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
          <svg
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <circle cx="10" cy="10" r="2" />
          </svg>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-3">
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className={`${PROGRESS_BAR_COLOR} h-1.5 rounded-full transition-all`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">{status}</p>
      </div>
    </div>
  );
}
