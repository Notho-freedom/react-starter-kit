import { DashboardTopBar, DashboardTopBarActionGroup } from "@/openride/shared/layouts";
import { OpenRideIcon } from "@/openride/shared/icons";

const SearchResultsHeader = () => (
  <DashboardTopBar
    subtitle="Affinez vos filtres et comparez les meilleurs trajets disponibles."
    title="Résultats de Recherche"
    actions={
      <DashboardTopBarActionGroup
        searchPlaceholder="Rechercher un trajet..."
        searchWidthClassName="w-40 xl:w-56"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-800 px-3 py-1 text-xs font-medium text-gray-300">
          <OpenRideIcon name="arrow-right" /> Paris to Lyon
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-800 px-3 py-1 text-xs font-medium text-gray-300">
          <OpenRideIcon name="calendar" /> Oct 24
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-800 px-3 py-1 text-xs font-medium text-gray-300">
          <OpenRideIcon name="user" /> 1 Passager
        </span>
        <button className="ml-1 text-sm font-medium text-brand-purpleLight transition-colors hover:text-white">
          Edit
        </button>
      </DashboardTopBarActionGroup>
    }
  />
);

export default SearchResultsHeader;
