import { DashboardTopBar, DashboardTopBarActionGroup } from "@/openride/shared/layouts";
import { OpenRideIcon } from "@/openride/shared/icons";

const TripDetailsHeader = () => (
  <DashboardTopBar
    leading={
      <button
        type="button"
        data-openride-route="/my-trips"
        className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition-colors text-white"
      >
        <OpenRideIcon name="arrow-left" />
      </button>
    }
    subtitle="Consultez le trajet, le conducteur et les places encore disponibles."
    title="Détails du Trajet"
    actions={
      <DashboardTopBarActionGroup
        searchPlaceholder="Rechercher un trajet..."
        searchWidthClassName="w-40 xl:w-52"
      >
        <button className="relative flex h-9 w-9 items-center justify-center rounded-full glass-card text-gray-400 transition-colors hover:text-white">
          <OpenRideIcon name="heart" className="text-lg" />
        </button>
        <button className="relative flex h-9 w-9 items-center justify-center rounded-full glass-card text-gray-400 transition-colors hover:text-white">
          <OpenRideIcon name="share-nodes" className="text-lg" />
        </button>
      </DashboardTopBarActionGroup>
    }
  />
);

export default TripDetailsHeader;
