import { OpenRideIcon } from "@/openride/shared/icons";

const SearchResultsHeader = () => (
<header id="top-header" className="sticky top-0 z-40 h-20 shrink-0 glass-panel flex items-center justify-between border-b border-gray-800/50 px-6 lg:px-10">
    <div className="flex items-center gap-4">
      <h1 className="text-xl md:text-2xl font-semibold text-white">Résultats de Recherche</h1>
      <span className="hidden md:inline-flex items-center gap-2 px-3 py-1 bg-gray-800 text-gray-300 text-xs font-medium rounded-full border border-gray-700">
        <OpenRideIcon name="arrow-right" /> Paris to Lyon
      </span>
      <span className="hidden md:inline-flex items-center gap-2 px-3 py-1 bg-gray-800 text-gray-300 text-xs font-medium rounded-full border border-gray-700">
        <OpenRideIcon name="calendar" /> Oct 24
      </span>
      <span className="hidden md:inline-flex items-center gap-2 px-3 py-1 bg-gray-800 text-gray-300 text-xs font-medium rounded-full border border-gray-700">
        <OpenRideIcon name="user" /> 1 Passager
      </span>
      <button className="text-brand-purpleLight hover:text-white text-sm font-medium ml-2 transition-colors">Edit</button>
    </div>
    <div className="flex items-center gap-4 md:gap-6">
      <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
        <OpenRideIcon name="bell" className="text-xl" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-brand-accent rounded-full border border-brand-background" />
      </button>
    </div>
  </header>
);

export default SearchResultsHeader;
