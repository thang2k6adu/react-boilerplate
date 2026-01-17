import { BUTTON_COLORS } from '../constants';

export function WelcomeBanner() {
  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-1">Welcome To</h2>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Room Matching Area
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Find your best focus room here and start at just public
          </p>
          <button
            className={`px-6 py-2 ${BUTTON_COLORS.primary} text-white text-sm font-medium rounded-lg transition`}
          >
            Select Room
          </button>
        </div>
        <div className="flex-shrink-0">
          <img
            src="https://illustrations.popsy.co/amber/remote-work.svg"
            alt="Focus illustration"
            className="w-48 h-48 object-contain"
          />
        </div>
      </div>
    </div>
  );
}
