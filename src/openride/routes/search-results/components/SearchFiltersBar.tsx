import { OpenRideIcon } from "@/openride/shared/icons";

const SearchFiltersBar = () => (
<div id="sticky-filters" className="glass-panel border-b border-gray-800/50 px-6 py-4 z-30 flex items-center justify-between overflow-x-auto hide-scroll">
    <div className="flex gap-3 min-w-max">
      <button className="glass-card px-4 py-2 rounded-full text-sm font-medium text-white flex items-center gap-2 border-brand-purple bg-brand-purple/10">
        <OpenRideIcon name="sort" /> Earliest Departure
      </button>
      <button className="glass-card px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white flex items-center gap-2">
        <OpenRideIcon name="euro-sign" /> Lowest Price
      </button>
      <button className="glass-card px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white flex items-center gap-2">
        <OpenRideIcon name="star" /> Highest Rating
      </button>
      <div className="w-px h-6 bg-gray-700 mx-2 self-center" />
      <button className="filter-chip px-4 py-2 rounded-full text-sm font-medium text-gray-300 flex items-center gap-2">
        <OpenRideIcon name="bolt" className="text-brand-accent" /> Instant Book
      </button>
      <button className="filter-chip px-4 py-2 rounded-full text-sm font-medium text-gray-300 flex items-center gap-2">
        <OpenRideIcon name="paw" /> Pets Allowed
      </button>
    </div>
    <button className="ml-4 glass-card px-4 py-2 rounded-lg text-sm font-medium text-white flex items-center gap-2 shrink-0">
      <OpenRideIcon name="sliders" /> More Filters
    </button>
  </div>
);

export default SearchFiltersBar;
