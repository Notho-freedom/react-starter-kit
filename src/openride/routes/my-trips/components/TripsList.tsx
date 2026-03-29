import { OpenRideIcon } from "@/openride/shared/icons";

const TripsList = () => (
  <>
    <div className="xl:col-span-2 space-y-4">
          {/* Trip Card 1 (Upcoming, Confirmed) */}
          <div className="glass-card rounded-xl p-5 cursor-pointer border-brand-accentPurple/50 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-surface border border-white/10 flex items-center justify-center text-brand-accentPurple">
                  <OpenRideIcon name="car" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Paris → Lyon</h3>
                  <p className="text-sm text-gray-400">Demain, 08:00</p>
                </div>
              </div>
              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-1">
                <span className="px-2.5 py-1 rounded-md bg-brand-success/10 text-brand-success text-xs font-medium border border-brand-success/20">
                  Confirmé
                </span>
                <span className="text-lg font-semibold text-white">35.00 €</span>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-white/5 mb-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Conducteur</p>
                <div className="flex items-center gap-2">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" className="w-6 h-6 rounded-full" alt="Driver" />
                  <span className="text-sm text-gray-300">Thomas D.</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Passagers</p>
                <div className="flex items-center gap-1">
                  <OpenRideIcon name="user" className="text-gray-400 text-xs" />
                  <span className="text-sm text-gray-300">1/3</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Paiement</p>
                <div className="flex items-center gap-1 text-brand-success">
                  <OpenRideIcon name="circle-check" className="text-xs" />
                  <span className="text-sm">Payé</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Véhicule</p>
                <span className="text-sm text-gray-300">Peugeot 3008</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button className="px-4 py-2 rounded-lg bg-brand-accentPurple hover:bg-brand-accentPurpleDark text-white text-sm font-medium transition-colors">
                Voir détails
              </button>
              <button className="px-4 py-2 rounded-lg bg-brand-surface border border-white/10 hover:bg-white/5 text-white text-sm font-medium transition-colors flex items-center gap-2">
                <OpenRideIcon name="message" /> Message
              </button>
              <button className="px-4 py-2 rounded-lg bg-transparent hover:bg-brand-error/10 text-gray-400 hover:text-brand-error text-sm font-medium transition-colors ml-auto">
                Annuler
              </button>
            </div>
          </div>
          {/* Trip Card 2 (Upcoming, Pending) */}
          <div className="glass-card rounded-xl p-5 cursor-pointer">
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-surface border border-white/10 flex items-center justify-center text-gray-400">
                  <OpenRideIcon name="car" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Bordeaux → Toulouse</h3>
                  <p className="text-sm text-gray-400">Ven 24 Nov, 14:30</p>
                </div>
              </div>
              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-1">
                <span className="px-2.5 py-1 rounded-md bg-brand-warning/10 text-brand-warning text-xs font-medium border border-brand-warning/20">
                  En attente
                </span>
                <span className="text-lg font-semibold text-white">22.50 €</span>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-white/5 mb-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Conducteur</p>
                <div className="flex items-center gap-2">
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" className="w-6 h-6 rounded-full" alt="Driver" />
                  <span className="text-sm text-gray-300">Marie L.</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Passagers</p>
                <div className="flex items-center gap-1">
                  <OpenRideIcon name="user" className="text-gray-400 text-xs" />
                  <span className="text-sm text-gray-300">2/4</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Paiement</p>
                <div className="flex items-center gap-1 text-brand-warning">
                  <OpenRideIcon name="clock" className="text-xs" />
                  <span className="text-sm">Autorisé</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Véhicule</p>
                <span className="text-sm text-gray-300">Renault Clio</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button className="px-4 py-2 rounded-lg bg-brand-surface border border-white/10 hover:bg-white/5 text-white text-sm font-medium transition-colors">
                Voir détails
              </button>
              <button className="px-4 py-2 rounded-lg bg-brand-surface border border-white/10 hover:bg-white/5 text-white text-sm font-medium transition-colors flex items-center gap-2">
                <OpenRideIcon name="message" /> Message
              </button>
              <button className="px-4 py-2 rounded-lg bg-transparent hover:bg-brand-error/10 text-gray-400 hover:text-brand-error text-sm font-medium transition-colors ml-auto">
                Annuler la demande
              </button>
            </div>
          </div>
    </div>
  </>
);

export default TripsList;
