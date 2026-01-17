import { RoomCard } from '../components/RoomCard';
import { Room } from '../types';

type RoomsGridProps = {
  rooms: Room[];
};

export function RoomsGrid({ rooms }: RoomsGridProps) {
  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="grid grid-cols-3 gap-4">
        {rooms.map(room => (
          <RoomCard key={room.id} {...room} />
        ))}
      </div>
    </div>
  );
}
