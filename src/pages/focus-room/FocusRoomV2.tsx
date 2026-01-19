import React, { useState } from 'react';
import { HeaderSection } from './sections/HeaderSection';
import { ParticipantsGridSection } from './sections/ParticipantsGridSection';
import { ControlsSection } from './sections/ControlsSection';
import { MOCK_PARTICIPANTS, ROOM_NAME } from './constants';
import { FocusRoomState } from './types';

const FocusRoom: React.FC = () => {
  const [state, setState] = useState<FocusRoomState>({
    isMuted: false,
    isVideoOff: false,
    isScreenSharing: false,
    showSettings: false,
  });

  const handleToggleMute = () => {
    setState(prev => ({ ...prev, isMuted: !prev.isMuted }));
  };

  const handleToggleVideo = () => {
    setState(prev => ({ ...prev, isVideoOff: !prev.isVideoOff }));
  };

  const handleToggleScreenShare = () => {
    setState(prev => ({ ...prev, isScreenSharing: !prev.isScreenSharing }));
  };

  const handleLeave = () => {
    // TODO: Implement leave functionality
    console.log('Leaving room...');
  };

  const handleMoreOptions = () => {
    // TODO: Implement more options
    console.log('Opening more options...');
  };

  const handleSettingsClick = () => {
    setState(prev => ({ ...prev, showSettings: !prev.showSettings }));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <HeaderSection
        roomName={ROOM_NAME}
        onSettingsClick={handleSettingsClick}
      />

      <ParticipantsGridSection participants={MOCK_PARTICIPANTS} />

      <ControlsSection
        state={state}
        onToggleMute={handleToggleMute}
        onToggleVideo={handleToggleVideo}
        onToggleScreenShare={handleToggleScreenShare}
        onLeave={handleLeave}
        onMoreOptions={handleMoreOptions}
      />
    </div>
  );
};

export default FocusRoom;
