import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useMatchmaking } from '@/hooks/useMatchmaking';
import { UserState } from '@/types/matchmaking';
import Button from '@/components/Button';
import { MatchmakingStatus } from '@/components/MatchmakingStatus';
import VideoCall from '@/components/VideoCall';
import { matchmakingService } from '@/services/matchmakingService';
import toast from 'react-hot-toast';

const Matchmaking: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isInVideoCall, setIsInVideoCall] = useState(false);

  const {
    state,
    isConnected,
    isConnecting,
    matchData,
    error,
    isJoining,
    isCanceling,
    connect,
    disconnect,
    joinMatchmaking,
    cancelMatchmaking,
    leaveRoom,
    clearError,
  } = useMatchmaking();

  // Auto-connect khi component mount
  useEffect(() => {
    connect();

    // Cleanup khi unmount
    // return () => {
    //   if (state === UserState.IDLE) {
    //     disconnect();
    //   }
    // };
  }, [connect, disconnect, state]);

  // Automatically enter video call when matched
  useEffect(() => {
    if (
      state === UserState.IN_ROOM &&
      matchData?.livekitRoomName &&
      matchData?.token &&
      matchData?.wsUrl
    ) {
      setIsInVideoCall(true);
    }
  }, [state, matchData]);

  // Debug log
  useEffect(() => {
    if (matchData) {
      console.log('Match data updated:', matchData);
    }
  }, [matchData]);

  const handleJoinMatchmaking = () => {
    if (error) {
      clearError();
    }
    joinMatchmaking();
  };

  const handleLeaveVideoCall = async () => {
    if (matchData?.roomId) {
      try {
        // Leave LiveKit room and update database
        await matchmakingService.leaveRoomAPI(matchData.roomId);

        // Leave WebSocket room
        leaveRoom();

        // Reset video call state
        setIsInVideoCall(false);

        toast.success('Left video call');
      } catch (error) {
        console.error('Error leaving video call:', error);
        toast.error('Failed to leave room');
      }
    }
  };

  // If in video call, show VideoCall component
  if (
    isInVideoCall &&
    matchData?.livekitRoomName &&
    matchData?.token &&
    matchData?.wsUrl
  ) {
    return (
      <VideoCall
        roomName={matchData.livekitRoomName}
        token={matchData.token}
        wsUrl={matchData.wsUrl}
        userName={user?.displayName || user?.email || 'You'}
        opponentName={matchData.opponentName}
        onLeave={handleLeaveVideoCall}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          📚 Study Partner Matching
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Connect with other learners and study together
        </p>
      </div>

      {/* Connection Status */}
      <div className="mb-6">
        <MatchmakingStatus
          state={state}
          isConnected={isConnected}
          isConnecting={isConnecting}
          opponentName={matchData?.opponentName}
        />
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-red-500 text-xl">⚠️</span>
              <p className="text-red-800 dark:text-red-200 font-medium">
                {error}
              </p>
            </div>
            <button
              onClick={clearError}
              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="text-center space-y-6">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full shadow-lg">
            <span className="text-5xl">🎓</span>
          </div>

          {/* Status Text */}
          <div>
            {state === UserState.IDLE && isConnected && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Ready to study?
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Find a study partner and learn together
                </p>
              </>
            )}

            {state === UserState.WAITING && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Searching for study partner...
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Please wait while we match you with another learner
                </p>
              </>
            )}

            {!isConnected && !isConnecting && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Connection lost
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Click reconnect to try again
                </p>
              </>
            )}

            {isConnecting && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Connecting...
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Establishing connection to the server
                </p>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isConnected && !isConnecting && (
              <Button
                variant="primary"
                size="lg"
                onClick={connect}
                className="min-w-[200px]"
              >
                Reconnect
              </Button>
            )}

            {isConnected && state === UserState.IDLE && (
              <Button
                variant="primary"
                size="lg"
                onClick={handleJoinMatchmaking}
                isLoading={isJoining}
                className="min-w-[200px]"
              >
                {isJoining ? 'Searching...' : 'Find Study Partner'}
              </Button>
            )}

            {state === UserState.WAITING && (
              <Button
                variant="danger"
                size="lg"
                onClick={cancelMatchmaking}
                isLoading={isCanceling}
                className="min-w-[200px]"
              >
                {isCanceling ? 'Canceling...' : 'Cancel'}
              </Button>
            )}
          </div>

          {/* Queue Info */}
          {state === UserState.WAITING && (
            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                💡 <strong>Tip:</strong> Make sure you have a stable internet
                connection for the best experience
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Info Cards */}
      {state === UserState.IDLE && isConnected && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">⚡</span>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Quick Pairing
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Find partners instantly
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🤝</span>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Collaborate
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Learn from each other
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎯</span>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Productive
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Achieve learning goals
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Matchmaking;
