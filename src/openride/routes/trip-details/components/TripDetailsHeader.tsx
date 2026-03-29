import { DashboardTopBar } from "@/openride/shared/layouts";
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
    title="Détails du Trajet"
    actions={
      <>
      <button className="relative w-10 h-10 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-white transition-colors">
        <OpenRideIcon name="heart" className="text-lg" />
      </button>
      <button className="relative w-10 h-10 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-white transition-colors">
        <OpenRideIcon name="share-nodes" className="text-lg" />
      </button>
      </>
    }
  />
);

export default TripDetailsHeader;
