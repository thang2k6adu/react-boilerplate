import React, { useState } from 'react';
import { RoomData, MatchData } from '@/types/matchmaking';
import { cn } from '@/utils/helpers';
import Button from './Button';
import TaskInfoPanel from './TaskInfoPanel';
import SessionSummary from './SessionSummary';
import TaskSelectionDialog from './TaskSelectionDialog';
import { useTrackingSession } from '@/hooks/useTrackingSession';
import { Task } from '@/types/task';
import { SessionResponse } from '@/types/trackingSession';
import dayjs from 'dayjs';

interface RoomViewProps {
  room: RoomData | null;
  matchData: MatchData | null;
  currentUserName?: string;
  onLeaveRoom: () => void;
  className?: string;
}

export const RoomView: React.FC<RoomViewProps> = ({
  room,
  matchData,
  currentUserName = 'You',
  onLeaveRoom,
  className,
}) => {
  const { currentSession, activeTask } = useTrackingSession();
  const [showTaskSelection, setShowTaskSelection] = useState(false);
  const [showSessionSummary, setShowSessionSummary] = useState(false);
  const [sessionResult, setSessionResult] = useState<
    SessionResponse['data'] | null
  >(null);

  if (!room && !matchData) {
    return null;
  }

  // Debug log
  console.log('RoomView data:', { room, matchData, currentUserName });

  // Get opponent name with fallbacks - split email to get username part
  const displayName = (() => {
    const getName = (name?: string) => {
      if (!name || name === 'Unknown') return 'Waiting...';
      // If it's an email, take the part before @
      if (name.includes('@')) {
        return name.split('@')[0];
      }
      return name;
    };
    return getName(matchData?.opponentName || undefined);
  })();

  const handleStopSession = (result: SessionResponse['data']) => {
    setSessionResult(result);
    setShowSessionSummary(true);
  };

  const handleTaskSelected = (_task: Task) => {
    setShowTaskSelection(false);
  };

  const handleStayInRoom = () => {
    setShowSessionSummary(false);
  };

  const handleSelectNewTask = () => {
    setShowSessionSummary(false);
    setShowTaskSelection(true);
  };

  const handleLeaveAndMatchmaking = () => {
    setShowSessionSummary(false);
    onLeaveRoom();
  };

  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-2 border-green-500',
        className
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          📖 Study Room
        </h2>
        <div className="flex gap-2">
          {!currentSession && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowTaskSelection(true)}
            >
              Select Task
            </Button>
          )}
          <Button variant="danger" size="sm" onClick={onLeaveRoom}>
            Leave Room
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Players Battle View */}
          <div className="relative">
            {/* Versus Badge */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-4 py-2 rounded-full shadow-lg text-lg">
                Study Together
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {/* Current User */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/40 dark:to-purple-800/40 rounded-lg p-6 border-2 border-purple-400 transform hover:scale-105 transition-transform">
                <div className="text-center space-y-3">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-4xl">👨‍🎓</span>
                  </div>
                  <div>
                    <p className="text-xs text-purple-600 dark:text-purple-300 font-semibold uppercase mb-1">
                      You
                    </p>
                    <p className="font-bold text-lg text-gray-900 dark:text-white truncate">
                      {currentUserName}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-purple-500 text-white rounded-full text-xs font-semibold">
                    <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                    Ready to Learn
                  </div>
                </div>
              </div>

              {/* Study Partner */}
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/40 dark:to-indigo-800/40 rounded-lg p-6 border-2 border-indigo-400 transform hover:scale-105 transition-transform">
                <div className="text-center space-y-3">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-4xl">👩‍🎓</span>
                  </div>
                  <div>
                    <p className="text-xs text-indigo-600 dark:text-indigo-300 font-semibold uppercase mb-1">
                      Study Partner
                    </p>
                    <p className="font-bold text-lg text-gray-900 dark:text-white truncate">
                      {displayName}
                    </p>
                    {matchData?.opponentId && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-mono mt-1">
                        {matchData.opponentId.slice(0, 8)}...
                      </p>
                    )}
                  </div>
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-500 text-white rounded-full text-xs font-semibold">
                    <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                    Ready to Learn
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Room Info */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
              Room Information
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Room ID:
                </span>
                <span className="text-sm font-mono text-gray-900 dark:text-white">
                  {room?.roomId || matchData?.roomId}
                </span>
              </div>
              {room?.createdAt && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Created:
                  </span>
                  <span className="text-sm text-gray-900 dark:text-white">
                    {dayjs(room.createdAt).format('HH:mm:ss')}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Game Status */}
          <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 text-center">
            <p className="text-green-800 dark:text-green-200 font-semibold">
              ✨ Ready to start studying together!
            </p>
            <p className="text-sm text-green-600 dark:text-green-300 mt-1">
              Share your learning goals and start collaborating...
            </p>
          </div>
        </div>

        {/* Task Info Sidebar */}
        <div className="lg:col-span-1">
          {currentSession && activeTask ? (
            <TaskInfoPanel onStopSession={handleStopSession} />
          ) : (
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 text-center border-2 border-dashed border-gray-300 dark:border-gray-700">
              <div className="text-4xl mb-3">📋</div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No Active Task
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Select a task to start tracking your work
              </p>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowTaskSelection(true)}
              >
                Select Task
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Task Selection Dialog */}
      <TaskSelectionDialog
        isOpen={showTaskSelection}
        onClose={() => setShowTaskSelection(false)}
        onTaskSelected={handleTaskSelected}
      />

      {/* Session Summary Dialog */}
      {sessionResult && (
        <SessionSummary
          isOpen={showSessionSummary}
          onClose={() => setShowSessionSummary(false)}
          duration={sessionResult.duration || 0}
          expEarned={sessionResult.expEarned || 0}
          previousProgress={sessionResult.previousProgress || 0}
          currentProgress={sessionResult.progress || 0}
          taskCompleted={(sessionResult.progress ?? 0) >= 100}
          onStayInRoom={handleStayInRoom}
          onNewTask={handleSelectNewTask}
          onLeaveRoom={handleLeaveAndMatchmaking}
        />
      )}
    </div>
  );
};
