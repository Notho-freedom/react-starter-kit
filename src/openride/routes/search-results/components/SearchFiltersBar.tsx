import { OpenRideIcon } from "@/openride/shared/icons";
import { useOpenRideWorkflow } from "@/openride/shared/workflows";

const SearchFiltersBar = () => {
  const workflow = useOpenRideWorkflow();
  const isRequestMode = workflow.searchMode === "post-request";

  return (
    <div
      id="sticky-filters"
      className="sticky top-20 z-30 flex flex-col gap-4 overflow-x-auto border-b border-gray-800/50 glass-panel px-6 py-4 hide-scroll"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center rounded-full border border-white/10 bg-brand-surfaceLight p-1">
          <button
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              !isRequestMode ? "toggle-active" : "toggle-inactive hover:text-white"
            }`}
            type="button"
            onClick={() => workflow.setSearchMode("find-rides")}
          >
            Trouver un trajet
          </button>
          <button
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isRequestMode ? "toggle-active" : "toggle-inactive hover:text-white"
            }`}
            type="button"
            onClick={() => workflow.setSearchMode("post-request")}
          >
            Publier une demande
          </button>
        </div>

        {isRequestMode ? (
          <div className="rounded-full border border-brand-accentGreen/20 bg-brand-accentGreen/10 px-4 py-2 text-xs font-medium text-brand-accentGreen">
            Les chauffeurs disponibles et trajets publiés seront suggérés automatiquement.
          </div>
        ) : (
          <button className="glass-card rounded-lg px-4 py-2 text-sm font-medium text-white flex items-center gap-2 shrink-0">
            <OpenRideIcon name="sliders" /> More Filters
          </button>
        )}
      </div>

      {!isRequestMode ? (
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
      ) : null}
    </div>
  );
};

export default SearchFiltersBar;
