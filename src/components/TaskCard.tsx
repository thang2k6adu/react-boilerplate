import React from 'react';
import { Clock, Calendar, ArrowUpRight } from 'lucide-react';

interface TaskCardProps {
  title: string;
  estimatedTime: string;
  deadline: string;
  status?: 'running' | 'pending' | 'completed';
  avatars?: string[];
  onComplete?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  estimatedTime,
  deadline,
  onComplete,
}) => {
  return (
    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-8 text-white relative overflow-hidden group hover:shadow-xl transition-shadow">
      {/* Status Badge */}
      <div className="absolute top-6 left-6">
        <span className="bg-emerald-400/50 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
          Running Task
        </span>
      </div>

      {/* Expand Icon */}
      <button className="absolute top-6 right-6 w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors backdrop-blur-sm">
        <ArrowUpRight className="w-4 h-4" />
      </button>

      {/* Task Content */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-6">{title}</h2>

        {/* Task Meta */}
        <div className="flex items-center space-x-6 mb-8">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-emerald-100" />
            <span className="text-sm text-emerald-50">{estimatedTime}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-emerald-100" />
            <span className="text-sm text-emerald-50">
              Deadline: {deadline}
            </span>
          </div>
        </div>

        {/* Team Avatars and Action */}
        <div className="flex items-center justify-between">
          {/* Avatars */}
          <div className="flex -space-x-2">
            <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-xs font-semibold">T</span>
            </div>
            <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-xs font-semibold">A</span>
            </div>
            <div className="w-8 h-8 bg-pink-500 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-xs font-semibold">+3</span>
            </div>
          </div>

          {/* Complete Button */}
          <button
            onClick={onComplete}
            className="bg-white text-emerald-600 px-6 py-2 rounded-lg font-semibold text-sm hover:bg-emerald-50 transition-colors shadow-lg"
          >
            COMPLETE TASK
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
