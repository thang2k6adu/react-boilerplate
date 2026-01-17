import { SortButtons } from '../components/SortButtons';
import {
  FilterGroup,
  CategoryFilter,
  SimpleFilter,
} from '../components/FilterComponents';
import {
  SORT_OPTIONS,
  CATEGORIES,
  STATUS_OPTIONS,
  PRICE_OPTIONS,
  CAPACITY_OPTIONS,
  ROOM_OPTIONS,
} from '../constants';

export function FilterSidebar() {
  return (
    <div className="col-span-2 bg-white rounded-lg border p-4">
      {/* Filter Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Filter</h2>

        {/* Sort By */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Sort by</span>
            <button className="text-xs text-gray-400">Clear</button>
          </div>
          <SortButtons options={SORT_OPTIONS} />
        </div>

        {/* Filter By */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Filter By</span>
            <button className="text-xs text-gray-400">Clear</button>
          </div>

          {/* Filter Categories */}
          <div className="space-y-2">
            <FilterGroup title="Category">
              <CategoryFilter categories={CATEGORIES} />
            </FilterGroup>

            <FilterGroup title="Status">
              <SimpleFilter options={STATUS_OPTIONS} />
            </FilterGroup>

            <FilterGroup title="Price">
              <SimpleFilter options={PRICE_OPTIONS} />
            </FilterGroup>

            <FilterGroup title="Capacity">
              <SimpleFilter options={CAPACITY_OPTIONS} />
            </FilterGroup>

            <FilterGroup title="Room">
              <SimpleFilter options={ROOM_OPTIONS} />
            </FilterGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
