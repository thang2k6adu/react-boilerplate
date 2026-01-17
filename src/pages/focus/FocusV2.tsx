import { FilterSidebar } from './sections/FilterSidebar';
import { WelcomeBanner } from './sections/WelcomeBanner';
import { RoomsGrid } from './sections/RoomsGrid';
import { ROOMS } from './constants';

export default function FocusV2() {
  return (
    <>
      {/* LEFT SIDEBAR - col-span-2 */}
      <FilterSidebar />

      {/* RIGHT SECTION - col-span-10 */}
      <div className="col-span-10 space-y-4">
        {/* TOP SECTION - Welcome Banner */}
        <WelcomeBanner />

        {/* BOTTOM SECTION - Rooms Grid */}
        <RoomsGrid rooms={ROOMS} />
      </div>
    </>
  );
}
