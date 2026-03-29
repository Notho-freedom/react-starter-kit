import { OpenRideIcon } from "@/openride/shared/icons";

const TripDetailsHeader = () => (
<header id="top-header" className="sticky top-0 z-40 h-20 shrink-0 glass-panel flex items-center justify-between border-b border-gray-800/50 px-6 lg:px-10">
    <div className="flex items-center gap-4">
      <button
        type="button"
        data-openride-route="/my-trips"
        className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition-colors text-white"
      >
        <OpenRideIcon name="arrow-left" />
      </button>
      <h1 className="text-xl md:text-2xl font-semibold text-white">Détails du Trajet</h1>
    </div>
    <div className="flex items-center gap-4">
      <button className="relative w-10 h-10 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-white transition-colors">
        <OpenRideIcon name="heart" className="text-lg" />
      </button>
      <button className="relative w-10 h-10 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-white transition-colors">
        <OpenRideIcon name="share-nodes" className="text-lg" />
      </button>
    </div>
  </header>
);

export default TripDetailsHeader;
