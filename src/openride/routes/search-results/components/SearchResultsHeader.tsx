import { DashboardTopBar, DashboardTopBarActionGroup } from "@/openride/shared/layouts";
import { OpenRideIcon } from "@/openride/shared/icons";
import { useOpenRideWorkflow } from "@/openride/shared/workflows";

const SearchResultsHeader = () => {
  const workflow = useOpenRideWorkflow();
  const ride = workflow.selectedRide ?? workflow.searchRides[0];

  return (
    <DashboardTopBar
      subtitle="Affinez vos filtres et comparez les meilleurs trajets disponibles."
      title="Résultats de Recherche"
      actions={
        <DashboardTopBarActionGroup
          searchPlaceholder="Rechercher un trajet..."
          searchWidthClassName="w-40 xl:w-56"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-800 px-3 py-1 text-xs font-medium text-gray-300">
            <OpenRideIcon name="arrow-right" /> {ride?.routeLabel ?? "Montréal → Ottawa"}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-800 px-3 py-1 text-xs font-medium text-gray-300">
            <OpenRideIcon name="calendar" /> {ride?.departureDateLabel ?? "Demain"}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-800 px-3 py-1 text-xs font-medium text-gray-300">
            <OpenRideIcon name="user" /> {workflow.bookingDraft.seatCount} passager
            {workflow.bookingDraft.seatCount > 1 ? "s" : ""}
          </span>
        </DashboardTopBarActionGroup>
      }
    />
  );
};

export default SearchResultsHeader;
