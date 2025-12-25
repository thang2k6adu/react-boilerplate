import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from './Modal';
import Button from './Button';

interface SessionSummaryProps {
  isOpen: boolean;
  onClose: () => void;
  duration: number;
  expEarned: number;
  previousProgress: number;
  currentProgress: number;
  taskCompleted?: boolean;
  onStayInRoom?: () => void;
  onLeaveRoom?: () => void;
  onNewTask?: () => void;
}

const SessionSummary: React.FC<SessionSummaryProps> = ({
  isOpen,
  onClose,
  duration,
  expEarned,
  previousProgress,
  currentProgress,
  taskCompleted = false,
  onStayInRoom,
  onLeaveRoom,
  onNewTask,
}) => {
  const { t } = useTranslation();

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    }
    return `${secs}s`;
  };

  const progressGained = currentProgress - previousProgress;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        taskCompleted ? t('tasks.taskCompleted') : t('tasks.sessionStopped')
      }
    >
      <div className="space-y-6">
        {/* Celebration Icon */}
        <div className="text-center">
          {taskCompleted ? (
            <div className="text-6xl mb-2">🎉</div>
          ) : (
            <div className="text-6xl mb-2">✅</div>
          )}
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {taskCompleted ? t('tasks.congratulations') : t('tasks.greatWork')}
          </h3>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Duration */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
            <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">
              ⏱ {t('tasks.duration')}
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {formatTime(duration)}
            </div>
          </div>

          {/* EXP Earned */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
            <div className="text-sm text-green-600 dark:text-green-400 mb-1">
              🏆 {t('tasks.expEarned')}
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {expEarned.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            📊 {t('tasks.progressUpdate')}
          </div>
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {previousProgress.toFixed(1)}%
            </span>
            <span className="text-gray-400">→</span>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {currentProgress.toFixed(1)}%
            </span>
            {progressGained > 0 && (
              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                (+{progressGained.toFixed(1)}%)
              </span>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${currentProgress}%` }}
            />
          </div>
        </div>

        {/* Completion Message */}
        {taskCompleted && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
            <p className="text-green-800 dark:text-green-200 font-medium">
              {t('tasks.taskCompletedMessage')}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-2 pt-4 border-t">
          {onStayInRoom && (
            <Button
              variant="secondary"
              onClick={() => {
                onStayInRoom();
                onClose();
              }}
              className="w-full"
            >
              {t('tasks.stayInRoom')}
            </Button>
          )}

          {onNewTask && (
            <Button
              variant="primary"
              onClick={() => {
                onNewTask();
                onClose();
              }}
              className="w-full"
            >
              {t('tasks.selectNewTask')}
            </Button>
          )}

          {onLeaveRoom && (
            <Button
              variant="secondary"
              onClick={() => {
                onLeaveRoom();
                onClose();
              }}
              className="w-full"
            >
              {t('tasks.leaveAndMatchmaking')}
            </Button>
          )}

          {!onStayInRoom && !onNewTask && !onLeaveRoom && (
            <Button onClick={onClose} className="w-full">
              {t('common.close')}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default SessionSummary;
