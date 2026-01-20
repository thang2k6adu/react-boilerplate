import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  RoomEvent,
  Track,
  RemoteTrack,
  RemoteTrackPublication,
  RemoteParticipant,
  ConnectionState,
  Participant as LiveKitParticipant,
  TrackPublication,
} from 'livekit-client';
import { rtcManager } from '@/lib/rtcManager';
import { ParticipantsGridSection } from '@/pages/focus-room/sections/ParticipantsGridSection';
import { Participant } from '@/pages/focus-room/types';

interface VideoRoomProps {
  livekitUrl: string;
  token: string;
  onDisconnect?: () => void;
}

type ConnectionStatus =
  | 'idle'
  | 'connecting'
  | 'connected'
  | 'reconnecting'
  | 'disconnected'
  | 'error';

export const VideoRoom: React.FC<VideoRoomProps> = ({
  livekitUrl,
  token,
  onDisconnect,
}) => {
  const [status, setStatus] = useState<ConnectionStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);

  // Debug state changes
  useEffect(() => {
    console.log(
      '[VideoRoom] Participants state updated:',
      participants.map(p => ({
        id: p.id,
        isVideoOff: p.isVideoOff,
        isMuted: p.isMuted,
      }))
    );
  }, [participants]);

  const isMountedRef = useRef(true);
  const videoRefsMap = useRef<Map<string, HTMLDivElement>>(new Map());
  const trackElementsMap = useRef<
    Map<string, HTMLVideoElement | HTMLAudioElement>
  >(new Map());
  const connectionConfig = useRef({ url: livekitUrl, token });

  const room = rtcManager.getRoom();

  const updateParticipants = useCallback(() => {
    if (!room || !isMountedRef.current) return;

    setParticipants(prevParticipants => {
      const newParticipants: Participant[] = [];
      const localParticipant = room.localParticipant;
      const localId = localParticipant.identity || 'local';

      // Find existing local participant to preserve isVideoOff state
      const existingLocal = prevParticipants.find(p => p.id === localId);

      newParticipants.push({
        id: localId,
        name: localParticipant.identity || 'You',
        avatar: `https://i.pravatar.cc/150?u=${localParticipant.identity}`,
        isMuted:
          existingLocal?.isMuted ?? !localParticipant.isMicrophoneEnabled,
        isVideoOff:
          existingLocal?.isVideoOff ?? !localParticipant.isCameraEnabled,
        isActive: true,
        taskTitle: 'Working...',
        progress: 0,
      });

      room.remoteParticipants.forEach(participant => {
        // Find existing participant to preserve isVideoOff state
        const existing = prevParticipants.find(
          p => p.id === participant.identity
        );

        newParticipants.push({
          id: participant.identity,
          name: participant.identity || 'Guest',
          avatar: `https://i.pravatar.cc/150?u=${participant.identity}`,
          isMuted: existing?.isMuted ?? true,
          isVideoOff: existing?.isVideoOff ?? true, // Preserve state or default to off
          isActive: true,
          taskTitle: 'Working...',
          progress: 0,
        });
      });

      return newParticipants;
    });
  }, [room]);

  const attachVideoToParticipant = useCallback(
    (
      participantId: string,
      trackSid: string,
      videoElement: HTMLVideoElement | HTMLAudioElement
    ) => {
      const container = videoRefsMap.current.get(participantId);
      console.log('[VideoRoom] attachVideoToParticipant:', {
        participantId,
        trackSid,
        hasContainer: !!container,
        videoRefsMapSize: videoRefsMap.current.size,
        videoRefsMapKeys: Array.from(videoRefsMap.current.keys()),
      });

      if (container && videoElement) {
        if (videoElement.tagName === 'VIDEO') {
          videoElement.style.width = '100%';
          videoElement.style.height = '100%';
          videoElement.style.objectFit = 'cover';
          videoElement.style.position = 'absolute';
          videoElement.style.top = '0';
          videoElement.style.left = '0';
        }

        container.appendChild(videoElement);
        trackElementsMap.current.set(trackSid, videoElement);
        console.log('[VideoRoom] Video element attached successfully');
      } else {
        console.warn(
          '[VideoRoom] Cannot attach video - missing container or element'
        );
      }
    },
    []
  );

  const renderLocalVideo = useCallback(() => {
    if (!room) return;
    const localVideoPublication = Array.from(
      room.localParticipant.videoTrackPublications.values()
    )[0];
    const localVideoTrack = localVideoPublication?.track;
    if (localVideoTrack && localVideoPublication) {
      const element = localVideoTrack.attach();
      const localId = room.localParticipant.identity || 'local';
      console.log(
        '[VideoRoom] Rendering local video for identity:',
        localId,
        'trackSid:',
        localVideoPublication.trackSid
      );
      attachVideoToParticipant(
        localId,
        localVideoPublication.trackSid,
        element
      );
    }
  }, [room, attachVideoToParticipant]);

  const handleTrackSubscribed = useCallback(
    (
      track: RemoteTrack,
      pub: RemoteTrackPublication,
      participant: RemoteParticipant
    ) => {
      console.log('[VideoRoom] Track subscribed:', {
        kind: track.kind,
        participantIdentity: participant.identity,
        participantSid: participant.sid,
        trackSid: track.sid,
        publicationTrackSid: pub.trackSid,
      });

      if (track.kind === Track.Kind.Video || track.kind === Track.Kind.Audio) {
        const element = track.attach();
        console.log(
          '[VideoRoom] Attaching track to participant identity:',
          participant.identity
        );
        attachVideoToParticipant(participant.identity, pub.trackSid, element);

        // Set initial video state when first track subscribed
        if (track.kind === Track.Kind.Video) {
          setParticipants(prev => {
            const exists = prev.find(p => p.id === participant.identity);
            if (exists) {
              // Participant already exists, preserve state
              return prev;
            }
            // New participant - add with default state
            return [
              ...prev,
              {
                id: participant.identity,
                name: participant.identity || 'Guest',
                avatar: `https://i.pravatar.cc/150?u=${participant.identity}`,
                isMuted: true,
                isVideoOff: pub.isMuted, // Use publication mute state
                isActive: true,
                taskTitle: 'Working...',
                progress: 0,
              },
            ];
          });
        }
      }
    },
    [attachVideoToParticipant]
  );

  const handleTrackUnsubscribed = useCallback(
    (
      track: RemoteTrack,
      pub: RemoteTrackPublication,
      participant: RemoteParticipant
    ) => {
      console.log('[VideoRoom] Track unsubscribed:', {
        kind: track.kind,
        participantIdentity: participant.identity,
        participantSid: participant.sid,
        trackSid: pub.trackSid,
      });

      // Remove ONLY this specific track element by trackSid
      const element = trackElementsMap.current.get(pub.trackSid);
      if (element) {
        element.remove();
        trackElementsMap.current.delete(pub.trackSid);
        console.log('[VideoRoom] Removed track element:', pub.trackSid);
      }

      // Also call track.detach() for cleanup
      track.detach().forEach((el: Element) => {
        if (el !== element) el.remove(); // Remove any other attached elements
      });

      // Delay update to batch multiple unsubscribes (e.g., during toggle)
      setTimeout(() => {
        if (isMountedRef.current) {
          updateParticipants();
        }
      }, 100);
    },
    [updateParticipants]
  );

  const handleConnectionStateChanged = useCallback((state: ConnectionState) => {
    if (!isMountedRef.current) return;
    switch (state) {
      case ConnectionState.Connected:
        setStatus('connected');
        setError(null);
        break;
      case ConnectionState.Connecting:
        setStatus('connecting');
        break;
      case ConnectionState.Reconnecting:
        setStatus('reconnecting');
        break;
      case ConnectionState.Disconnected:
        setStatus('disconnected');
        break;
    }
  }, []);

  const handleDisconnected = useCallback(() => {
    if (isMountedRef.current) {
      setStatus('disconnected');
      setParticipants([]);
      onDisconnect?.();
    }
  }, [onDisconnect]);

  const handleReconnecting = useCallback(() => {
    if (isMountedRef.current) setStatus('reconnecting');
  }, []);
  const handleReconnected = useCallback(() => {
    if (isMountedRef.current) {
      setStatus('connected');
      setError(null);
    }
  }, []);
  const handleParticipantConnected = useCallback(
    (_p: LiveKitParticipant) => updateParticipants(),
    [updateParticipants]
  );
  const handleParticipantDisconnected = useCallback(
    (_p: LiveKitParticipant) => updateParticipants(),
    [updateParticipants]
  );

  const handleTrackMuted = useCallback(
    (publication: TrackPublication, participant: LiveKitParticipant) => {
      console.log('[VideoRoom] Track muted event', {
        source: publication.source,
        kind: publication.kind,
        participant: participant.identity,
        isMuted: publication.isMuted,
      });

      // DIRECTLY set state when video track muted - don't read pub.isMuted (timing bug)
      if (publication.source === Track.Source.Camera) {
        setParticipants(prev =>
          prev.map(p =>
            p.id === participant.identity ? { ...p, isVideoOff: true } : p
          )
        );
      }
    },
    []
  );

  const handleTrackUnmuted = useCallback(
    (publication: TrackPublication, participant: LiveKitParticipant) => {
      console.log('[VideoRoom] Track unmuted event', {
        source: publication.source,
        kind: publication.kind,
        participant: participant.identity,
        isMuted: publication.isMuted,
      });

      // DIRECTLY set state when video track unmuted - don't read pub.isMuted (timing bug)
      if (publication.source === Track.Source.Camera) {
        setParticipants(prev =>
          prev.map(p =>
            p.id === participant.identity ? { ...p, isVideoOff: false } : p
          )
        );
      }
    },
    []
  );

  const connectToRoom = useCallback(async () => {
    if (!isMountedRef.current) return;

    // Skip if already connected or connecting
    if (status === 'connected' || status === 'connecting') {
      console.log('[VideoRoom] Skipping connect - already', status);
      return;
    }

    try {
      setStatus('connecting');
      await rtcManager.connect(
        connectionConfig.current.url,
        connectionConfig.current.token
      );
      if (!isMountedRef.current) return;

      setStatus('connected');

      // ✅ Senior pattern: enableCameraAndMicrophone tự động publish tracks
      // Only call if tracks not already published
      const hasCamera = room.localParticipant.getTrackPublication(
        Track.Source.Camera
      );
      const hasMic = room.localParticipant.getTrackPublication(
        Track.Source.Microphone
      );

      if (!hasCamera || !hasMic) {
        await room.localParticipant.enableCameraAndMicrophone();
        console.log('[VideoRoom] Camera and microphone enabled');
      } else {
        console.log(
          '[VideoRoom] Tracks already published, skipping enableCameraAndMicrophone'
        );
      }

      updateParticipants();
      setTimeout(() => renderLocalVideo(), 100);
    } catch (err: unknown) {
      if (isMountedRef.current) {
        setError(err instanceof Error ? err.message : 'Failed to connect');
        setStatus('error');
      }
    }
  }, [room, renderLocalVideo, updateParticipants, status]);

  useEffect(() => {
    console.log('[VideoRoom] Component mounted');
    isMountedRef.current = true;

    room.on(RoomEvent.TrackSubscribed, handleTrackSubscribed);
    room.on(RoomEvent.TrackUnsubscribed, handleTrackUnsubscribed);
    room.on(RoomEvent.TrackMuted, handleTrackMuted);
    room.on(RoomEvent.TrackUnmuted, handleTrackUnmuted);
    room.on(RoomEvent.Disconnected, handleDisconnected);
    room.on(RoomEvent.Reconnecting, handleReconnecting);
    room.on(RoomEvent.Reconnected, handleReconnected);
    room.on(RoomEvent.ConnectionStateChanged, handleConnectionStateChanged);
    room.on(RoomEvent.ParticipantConnected, handleParticipantConnected);
    room.on(RoomEvent.ParticipantDisconnected, handleParticipantDisconnected);

    connectToRoom();

    return () => {
      console.log('[VideoRoom] Component unmounting - keep room alive');
      isMountedRef.current = false;

      // Clean up listeners only, DO NOT disconnect room
      room.off(RoomEvent.TrackSubscribed, handleTrackSubscribed);
      room.off(RoomEvent.TrackUnsubscribed, handleTrackUnsubscribed);
      room.off(RoomEvent.TrackMuted, handleTrackMuted);
      room.off(RoomEvent.TrackUnmuted, handleTrackUnmuted);
      room.off(RoomEvent.Disconnected, handleDisconnected);
      room.off(RoomEvent.Reconnecting, handleReconnecting);
      room.off(RoomEvent.Reconnected, handleReconnected);
      room.off(RoomEvent.ConnectionStateChanged, handleConnectionStateChanged);
      room.off(RoomEvent.ParticipantConnected, handleParticipantConnected);
      room.off(
        RoomEvent.ParticipantDisconnected,
        handleParticipantDisconnected
      );
    };
  }, [
    room,
    connectToRoom,
    handleTrackSubscribed,
    handleTrackUnsubscribed,
    handleTrackMuted,
    handleTrackUnmuted,
    handleDisconnected,
    handleReconnecting,
    handleReconnected,
    handleConnectionStateChanged,
    handleParticipantConnected,
    handleParticipantDisconnected,
  ]);

  const renderStatusOverlay = () => {
    if (status === 'error' && error) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="text-center">
            <p className="text-red-500 mb-4">❌ {error}</p>
            <button
              onClick={onDisconnect}
              className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
            >
              Back to Rooms
            </button>
          </div>
        </div>
      );
    }
    if (status === 'connecting') {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>🔌 Connecting...</p>
          </div>
        </div>
      );
    }
    if (status === 'reconnecting') {
      return (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
            <span className="font-medium">🔄 Reconnecting...</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative w-full h-full bg-gray-900">
      <ParticipantsGridSection
        participants={participants}
        videoRefsMap={videoRefsMap.current}
      />
      {renderStatusOverlay()}
    </div>
  );
};
