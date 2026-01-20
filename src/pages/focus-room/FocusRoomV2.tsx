import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Track } from 'livekit-client';
import { HeaderSection } from './sections/HeaderSection';
import { ParticipantsGridSection } from './sections/ParticipantsGridSection';
import { ControlsSection } from './sections/ControlsSection';
import { FocusRoomState, Participant } from './types';
import { useRooms } from '@/hooks/useRooms';
import { VideoRoom } from '@/components/VideoRoom';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Helmet } from 'react-helmet-async';
import { rtcManager } from '@/lib/rtcManager';

const LIVEKIT_URL =
  import.meta.env.VITE_LIVEKIT_URL || 'wss://your-livekit-server.com';

const FocusRoom: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentRoom, roomDetail, fetchRoomDetail, leaveRoom } = useRooms();
  const [state, setState] = useState<FocusRoomState>({
    isMuted: false,
    isVideoOff: false,
    isScreenSharing: false,
    showSettings: false,
  });

  const roomId = location.state?.roomId || currentRoom?.roomId;
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (!roomId) {
      navigate('/v2/focus');
      return;
    }

    if (!currentRoom) {
      // If we don't have currentRoom data (direct navigation), redirect back
      navigate('/v2/focus');
      return;
    }

    // Fetch room details for members list (only once)
    if (!hasFetchedRef.current) {
      fetchRoomDetail(roomId);
      hasFetchedRef.current = true;
    }
  }, [roomId, currentRoom, navigate, fetchRoomDetail]);

  const handleToggleMute = async () => {
    const room = rtcManager.getRoom();
    if (!room) return;

    const micPub = room.localParticipant.getTrackPublication(
      Track.Source.Microphone
    );
    if (!micPub?.track) return;

    const newMutedState = !state.isMuted;

    if (newMutedState) {
      await micPub.track.mute();
    } else {
      await micPub.track.unmute();
    }

    setState(prev => ({ ...prev, isMuted: newMutedState }));
  };

  const handleToggleVideo = async () => {
    const room = rtcManager.getRoom();
    if (!room) return;

    const camPub = room.localParticipant.getTrackPublication(
      Track.Source.Camera
    );
    if (!camPub?.track) return;

    const newVideoOffState = !state.isVideoOff;

    if (newVideoOffState) {
      await camPub.track.mute();
    } else {
      await camPub.track.unmute();
    }

    setState(prev => ({ ...prev, isVideoOff: newVideoOffState }));
  };

  const handleToggleScreenShare = () => {
    setState(prev => ({ ...prev, isScreenSharing: !prev.isScreenSharing }));
  };

  // Disconnect chỉ khi LEAVE room - Senior cleanup đúng chỗ
  const handleLeave = async () => {
    console.log('[FocusRoom] User leaving room, disconnecting...');

    // Mark for manual leave BEFORE disconnect
    rtcManager.markManualLeave();
    rtcManager.disconnect();

    if (roomId) {
      await leaveRoom(roomId);
    }
    navigate('/v2/focus');
  };

  const handleMoreOptions = () => {
    console.log('Opening more options...');
  };

  const handleSettingsClick = () => {
    setState(prev => ({ ...prev, showSettings: !prev.showSettings }));
  };

  // Transform room members to participants
  const participants: Participant[] =
    roomDetail?.members.map((member, index) => ({
      id: member.userId,
      name: `${member.user.firstName} ${member.user.lastName}`,
      avatar:
        member.user.avatar || `https://i.pravatar.cc/200?img=${index + 1}`,
      isMuted: false,
      isVideoOff: false,
      isActive: member.status === 'JOINED',
      taskTitle: 'Working...',
      progress: 0,
    })) || [];

  if (!currentRoom) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Helmet>
        <title>{`${currentRoom.topic} Room - React Boilerplate`}</title>
        <meta name="description" content="Focus room video call" />
      </Helmet>

      <div className="flex flex-col h-screen bg-gray-900 text-white">
        <HeaderSection
          roomName={currentRoom.topic || 'Study Room'}
          onSettingsClick={handleSettingsClick}
        />

        <div className="flex-1 relative">
          {currentRoom.token ? (
            <VideoRoom
              livekitUrl={LIVEKIT_URL}
              token={currentRoom.token}
              onDisconnect={handleLeave}
            />
          ) : (
            <ParticipantsGridSection participants={participants} />
          )}
        </div>

        <ControlsSection
          state={state}
          onToggleMute={handleToggleMute}
          onToggleVideo={handleToggleVideo}
          onToggleScreenShare={handleToggleScreenShare}
          onLeave={handleLeave}
          onMoreOptions={handleMoreOptions}
        />
      </div>
    </>
  );
};

export default FocusRoom;
