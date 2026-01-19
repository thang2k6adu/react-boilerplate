import React from 'react';
import { Participant } from '../types';

interface ParticipantCardProps {
  participant: Participant;
}

export const ParticipantCard: React.FC<ParticipantCardProps> = ({
  participant,
}) => {
  const videoOff = participant.isVideoOff;

  return (
    <div className="relative w-full h-full aspect-video bg-gray-600 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition">
      {!videoOff && participant.avatar && (
        <img
          src={participant.avatar}
          alt={participant.name}
          className="w-full h-full object-cover"
        />
      )}

      {videoOff && (
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
            {participant.avatar ? (
              <img
                src={participant.avatar}
                alt={participant.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-4xl font-semibold text-gray-300">
                {participant.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-black/0">
        <div className="text-xs font-medium text-white truncate">
          {participant.name}
        </div>

        {participant.taskTitle && (
          <div className="text-[10px] text-gray-300 truncate">
            {participant.taskTitle}
          </div>
        )}

        {typeof participant.progress === 'number' && (
          <div className="mt-1 h-1 w-full bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all"
              style={{ width: `${participant.progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
