import { DashboardTopBar } from "@/openride/shared/layouts";
import { OpenRideIcon } from "@/openride/shared/icons";

const SearchResultsHeader = () => (
  <DashboardTopBar
    title="Résultats de Recherche"
    titleMeta={
      <>
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
      </>
    }
    actions={
      <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
        <OpenRideIcon name="bell" className="text-xl" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-brand-accent rounded-full border border-brand-background" />
      </button>
    }
  />
);

export default SearchResultsHeader;
