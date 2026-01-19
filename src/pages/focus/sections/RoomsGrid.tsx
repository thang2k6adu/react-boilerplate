import { RoomCard } from '../components/RoomCard';
import { Room } from '../types';

type RoomsGridProps = {
  rooms: Room[];
};

export function RoomsGrid({ rooms }: RoomsGridProps) {
  return (
    <div>
      <h6 className="text-h6-medium text-black mb-4">All Rooms</h6>

      <div
        className="
        grid
        grid-cols-1
        gap-4
        sm:grid-cols-2
        lg:grid-cols-3
      "
      >
        {rooms.map(room => (
          <RoomCard key={room.id} {...room} />
        ))}
      </div>
    </div>
  );
}
