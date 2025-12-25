import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTrackingSession } from '@/hooks/useTrackingSession';
import Button from './Button';
import { SessionResponse } from '@/types/trackingSession';

interface TaskInfoPanelProps {
  onStopSession?: (result: SessionResponse['data']) => void;
}

const TaskInfoPanel: React.FC<TaskInfoPanelProps> = ({ onStopSession }) => {
  const { t } = useTranslation();
  const {
    currentSession,
    activeTask,
    currentTime,
    pauseSession,
    resumeSession,
    stopSession,
    formatTime,
    isLoading,
  } = useTrackingSession();

  if (!currentSession || !activeTask) {
    return null;
  }

  const handleStop = async () => {
    try {
      const result = await stopSession();
      if (result) {
        onStopSession?.(result);
      }
    } catch (error) {
      console.error('Failed to stop session:', error);
    }
  };

  const handlePause = async () => {
    try {
      await pauseSession();
    } catch (error) {
      console.error('Failed to pause session:', error);
    }
  };

  const handleResume = async () => {
    try {
      await resumeSession();
    } catch (error) {
      console.error('Failed to resume session:', error);
    }
  };

  const getProgressBarColor = (progress: number) => {
    if (progress >= 100) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 dark:text-green-400';
      case 'paused':
        return 'text-yellow-600 dark:text-yellow-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            📋 {t('tasks.currentTask')}
          </h3>
          <span
            className={`text-xs font-medium ${getStatusColor(currentSession.status)}`}
          >
            ● {currentSession.status.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Task Name */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-gray-100">
            {activeTask.name}
          </h4>
        </div>

        {/* Timer */}
        <div className="text-center py-2">
          <div className="text-3xl font-mono font-bold text-gray-900 dark:text-gray-100">
            {formatTime(currentTime)}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {t('tasks.timeSpent')}
          </p>
        </div>

        {/* Progress */}
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-400">
              {t('tasks.progress')}
            </span>
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {activeTask.progress?.toFixed(1) || 0}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full transition-all ${getProgressBarColor(activeTask.progress || 0)}`}
              style={{ width: `${activeTask.progress || 0}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-2">
            <div className="text-gray-600 dark:text-gray-400 text-xs">
              {t('tasks.estimate')}
            </div>
            <div className="font-medium text-gray-900 dark:text-gray-100">
              {activeTask.estimateHours}h
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-2">
            <div className="text-gray-600 dark:text-gray-400 text-xs">
              {t('tasks.totalSpent')}
            </div>
            <div className="font-medium text-gray-900 dark:text-gray-100">
              {formatTime(activeTask.totalTimeSpent || 0)}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-2 pt-2">
          {currentSession.status === 'active' && (
            <>
              <Button
                variant="secondary"
                onClick={handlePause}
                disabled={isLoading}
                className="flex-1"
                size="sm"
              >
                ⏸ {t('tasks.pause')}
              </Button>
              <Button
                variant="danger"
                onClick={handleStop}
                disabled={isLoading}
                className="flex-1"
                size="sm"
              >
                ⏹ {t('tasks.stop')}
              </Button>
            </>
          )}

          {currentSession.status === 'paused' && (
            <>
              <Button
                variant="primary"
                onClick={handleResume}
                disabled={isLoading}
                className="flex-1"
                size="sm"
              >
                ▶ {t('tasks.resume')}
              </Button>
              <Button
                variant="danger"
                onClick={handleStop}
                disabled={isLoading}
                className="flex-1"
                size="sm"
              >
                ⏹ {t('tasks.stop')}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskInfoPanel;
