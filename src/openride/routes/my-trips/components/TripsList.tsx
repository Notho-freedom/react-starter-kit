import { OpenRideIcon } from "@/openride/shared/icons";
import type { PassengerTrip, PublishedTrip, TripViewRole } from "@/openride/shared/workflows";

type TripsListProps = {
  onMessage: (rideId: string) => void;
  onOpenDetails: (rideId: string) => void;
  onSelectTrip: (tripId: string) => void;
  role: TripViewRole;
  selectedTripId: string | null;
  trips: Array<PassengerTrip | PublishedTrip>;
};

function TripsList({
  onMessage,
  onOpenDetails,
  onSelectTrip,
  role,
  selectedTripId,
  trips,
}: TripsListProps) {
  return (
    <div className="xl:col-span-2 space-y-4">
      {trips.map((trip) => {
        const isPassengerTrip = role === "passenger";
        const isSelected = selectedTripId === trip.id;
        const statusLabel =
          role === "passenger"
            ? trip.status === "confirmed"
              ? "Confirmé"
              : trip.status === "pending"
                ? "En attente"
                : "Annulé"
            : trip.status === "published"
              ? "Publié"
              : "Brouillon";
        const statusTone =
          role === "passenger"
            ? trip.status === "confirmed"
              ? "bg-brand-success/10 text-brand-success border-brand-success/20"
              : trip.status === "pending"
                ? "bg-brand-warning/10 text-brand-warning border-brand-warning/20"
                : "bg-brand-error/10 text-brand-error border-brand-error/20"
            : trip.status === "published"
              ? "bg-brand-accentPurple/10 text-brand-accentPurple border-brand-accentPurple/20"
              : "bg-brand-surface text-gray-300 border-white/10";

        return (
          <div
            key={trip.id}
            className={`glass-card rounded-xl p-5 cursor-pointer ${isSelected ? "border-brand-accentPurple/50 shadow-[0_0_15px_rgba(139,92,246,0.1)]" : ""}`}
            onClick={() => onSelectTrip(trip.id)}
          >
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-brand-surface border border-white/10 flex items-center justify-center ${isPassengerTrip ? "text-brand-accentPurple" : "text-brand-accentGreen"}`}>
                  <OpenRideIcon name="car" />
                </div>
                <div>
                  <h3 className="text-white font-medium">{trip.routeLabel}</h3>
                  <p className="text-sm text-gray-400">{trip.departureLabel}</p>
                </div>
              </div>
              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-1">
                <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${statusTone}`}>{statusLabel}</span>
                <span className="text-lg font-semibold text-white">{trip.price.toFixed(2)} €</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-white/5 mb-4">
              {isPassengerTrip ? (
                <>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Conducteur</p>
                    <div className="flex items-center gap-2">
                      <img src={(trip as PassengerTrip).driverAvatar} className="w-6 h-6 rounded-full" alt={(trip as PassengerTrip).driverName} />
                      <span className="text-sm text-gray-300">{(trip as PassengerTrip).driverName}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Passagers</p>
                    <div className="flex items-center gap-1">
                      <OpenRideIcon name="user" className="text-gray-400 text-xs" />
                      <span className="text-sm text-gray-300">{trip.passengersLabel}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Paiement</p>
                    <div className={`flex items-center gap-1 ${(trip as PassengerTrip).paymentStatus === "paid" ? "text-brand-success" : "text-brand-warning"}`}>
                      <OpenRideIcon name={(trip as PassengerTrip).paymentStatus === "paid" ? "circle-check" : "clock"} className="text-xs" />
                      <span className="text-sm">{(trip as PassengerTrip).paymentStatus === "paid" ? "Payé" : "Autorisé"}</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Places</p>
                    <div className="flex items-center gap-1">
                      <OpenRideIcon name="user" className="text-gray-400 text-xs" />
                      <span className="text-sm text-gray-300">{trip.passengersLabel}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Statut</p>
                    <span className="text-sm text-gray-300">{statusLabel}</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Annonce</p>
                    <span className="text-sm text-gray-300">Conducteur</span>
                  </div>
                </>
              )}
              <div>
                <p className="text-xs text-gray-500 mb-1">Véhicule</p>
                <span className="text-sm text-gray-300">{trip.vehicleName}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isPassengerTrip ? "bg-brand-accentPurple hover:bg-brand-accentPurpleDark text-white" : "bg-brand-accentGreen hover:bg-[#8be08b] text-brand-dark"}`}
                onClick={(event) => {
                  event.stopPropagation();
                  onOpenDetails(trip.rideId);
                }}
                type="button"
              >
                Voir détails
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-brand-surface border border-white/10 hover:bg-white/5 text-white text-sm font-medium transition-colors flex items-center gap-2"
                onClick={(event) => {
                  event.stopPropagation();
                  onMessage(trip.rideId);
                }}
                type="button"
              >
                <OpenRideIcon name="message" /> Message
              </button>
              <button className="px-4 py-2 rounded-lg bg-transparent hover:bg-brand-error/10 text-gray-400 hover:text-brand-error text-sm font-medium transition-colors ml-auto">
                {isPassengerTrip ? "Annuler" : "Archiver"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TripsList;
