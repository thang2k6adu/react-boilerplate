import { Room } from '../types';
import { BUTTON_COLORS } from '../constants';

type RoomCardProps = Room & {
  onToggleFavorite?: (id: number) => void;
  onJoin?: (id: number) => void;
};

export function RoomCard({
  id,
  title,
  subtitle,
  image,
  members,
  isFavorite,
  onToggleFavorite,
  onJoin,
}: RoomCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition group">
      {/* Room Image */}
      <div className="relative h-32 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Room Info */}
      <div className="p-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h4 className="font-semibold text-sm text-gray-900">{title}</h4>
            <p className="text-xs text-gray-500">{subtitle}</p>
          </div>
          <button
            className="text-purple-600 hover:text-purple-700"
            onClick={() => onToggleFavorite?.(id)}
          >
            {isFavorite ? (
              <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Members & Join Button */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex -space-x-2">
            {members.map((avatar, idx) => (
              <img
                key={idx}
                src={avatar}
                alt="Member"
                className="w-6 h-6 rounded-full border-2 border-white"
              />
            ))}
          </div>
          <button
            className={`px-4 py-1.5 ${BUTTON_COLORS.primary} text-white text-xs font-medium rounded-full transition`}
            onClick={() => onJoin?.(id)}
          >
            Join Us
          </button>
        </div>
      </div>
    </div>
  );
}
