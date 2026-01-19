import { FilterSidebar } from './sections/FilterSidebar';
import { WelcomeBanner } from './sections/WelcomeBanner';
import { RoomsGrid } from './sections/RoomsGrid';
import { ROOMS } from './constants';

export default function FocusV2() {
  return (
    <>
      <div className="col-span-3 bg-white rounded-lg border p-4 mb-6 shadow-md">
        <FilterSidebar />
      </div>

      <div className="col-span-9 space-y-8">
        <WelcomeBanner />

        <RoomsGrid rooms={ROOMS} />
      </div>
    </>
  );
}
