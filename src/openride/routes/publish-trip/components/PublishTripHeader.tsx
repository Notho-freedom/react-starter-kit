import { OpenRideIcon } from "@/openride/shared/icons";

const PublishTripHeader = () => (
<header id="top-header" className="sticky top-0 z-40 h-20 shrink-0 glass-panel flex items-center justify-between border-b border-gray-800/50 px-6 lg:px-10">
    <div className="flex items-center gap-4">
      <h1 className="text-xl md:text-2xl font-semibold text-white">Publier un Trajet</h1>
    </div>
    <div className="flex items-center gap-4">
      <button className="text-sm font-medium text-brand-textMuted hover:text-white transition-colors px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-800">
        Sauvegarder Brouillon
      </button>
    </div>
  </header>
);

export default PublishTripHeader;
