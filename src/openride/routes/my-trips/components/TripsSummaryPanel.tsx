import { OpenRideIcon } from "@/openride/shared/icons";

const TripsSummaryPanel = () => (
  <>
    <div className="hidden xl:block">
      <div className="glass-card rounded-xl p-6 sticky top-0">
        <h3 className="text-lg font-medium text-white mb-6">Détails du Trajet</h3>
        {/* Route Map Placeholder */}
        <div className="w-full h-40 bg-brand-surface rounded-lg border border-white/5 mb-6 relative overflow-hidden flex items-center justify-center">
          <OpenRideIcon name="map-location-dot" className="text-4xl text-white/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-surfaceLight to-transparent opacity-50" />
        </div>
        {/* Route Details */}
        <div className="relative pl-6 space-y-6 mb-8 border-l border-white/10 ml-3">
          <div className="relative">
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-brand-surface border-2 border-brand-accentPurple z-10" />
            <p className="text-sm font-medium text-white">Paris (Gare de Lyon)</p>
            <p className="text-xs text-gray-500 mt-1">Demain, 08:00</p>
          </div>
          <div className="relative">
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-brand-surface border-2 border-brand-accentPurple z-10" />
            <p className="text-sm font-medium text-white">Lyon (Part-Dieu)</p>
            <p className="text-xs text-gray-500 mt-1">Demain, 12:30</p>
          </div>
        </div>
        {/* Driver Info */}
        <div className="p-4 rounded-lg bg-brand-surface border border-white/5 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" className="w-10 h-10 rounded-full" alt="Driver" />
            <div>
              <p className="text-sm font-medium text-white">Thomas Dubois</p>
              <div className="flex items-center gap-1 text-xs">
                <OpenRideIcon name="star" className="text-brand-warning" />
                <span className="text-gray-300">4.9 (24 avis)</span>
              </div>
            </div>
            <button className="ml-auto w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 transition-colors">
              <OpenRideIcon name="message" />
            </button>
          </div>
          <div className="flex items-center gap-2 text-xs text-brand-success">
            <OpenRideIcon name="shield-check" />
            <span>Profil vérifié</span>
          </div>
        </div>
        {/* Summary */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Prix par place</span>
            <span className="text-white">35.00 €</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Frais de service</span>
            <span className="text-white">4.50 €</span>
          </div>
          <div className="flex justify-between text-base font-medium pt-3 border-t border-white/5">
            <span className="text-white">Total payé</span>
            <span className="text-brand-accentPurple">39.50 €</span>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default TripsSummaryPanel;
