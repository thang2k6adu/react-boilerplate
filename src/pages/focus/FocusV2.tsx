import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilterSidebar } from './sections/FilterSidebar';
import { WelcomeBanner } from './sections/WelcomeBanner';
import { RoomsGrid } from './sections/RoomsGrid';
import { useRooms } from '@/hooks/useRooms';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Room } from './types';
import { Helmet } from 'react-helmet-async';
import { getNatureImage } from '@/utils/images';

export default function FocusV2() {
  const navigate = useNavigate();
  const { publicRooms, isLoading, fetchPublicRooms, joinRoom } = useRooms();

  useEffect(() => {
    fetchPublicRooms();
  }, [fetchPublicRooms]);

  // Transform API data to UI format
  const rooms: Room[] = useMemo(() => {
    return publicRooms.map((room, index) => ({
      id: parseInt(room.id.substring(0, 8), 16), // Convert UUID to number for UI
      roomId: room.id, // Keep original UUID for API calls
      title: room.topic || 'Study Room',
      subtitle: "Let's study and be productive",
      image: getNatureImage(index),
      members: Array.from(
        { length: room.currentMembers },
        (_, i) => `https://i.pravatar.cc/150?img=${index * 10 + i + 1}`
      ),
      isFavorite: false,
      currentMembers: room.currentMembers,
      maxMembers: room.maxMembers,
    }));
  }, [publicRooms]);

  const handleJoinRoom = async (roomId: string) => {
    const result = await joinRoom(roomId);
    // Check if join was successful (thunk returns fulfilled result with payload)
    if (result.meta.requestStatus === 'fulfilled' && result.payload) {
      // Navigate to focus room page with roomId
      navigate('/v2/focus-room', { state: { roomId } });
    }
  };

  if (isLoading && publicRooms.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Helmet>
        <title>Focus Rooms - React Boilerplate</title>
        <meta
          name="description"
          content="Join study rooms and focus together"
        />
      </Helmet>

      <div className="col-span-3 bg-white rounded-lg border p-4 mb-6 shadow-md">
        <FilterSidebar />
      </div>

      <div className="col-span-9 space-y-8">
        <WelcomeBanner />

        <RoomsGrid rooms={rooms} onJoinRoom={handleJoinRoom} />
      </div>
    </>
  );
}
