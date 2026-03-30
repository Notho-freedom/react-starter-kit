import { OpenRideIcon } from "@/openride/shared/icons";
import type { PassengerTrip, PublishedTrip, Ride, TripViewRole } from "@/openride/shared/workflows";

type TripsSummaryPanelProps = {
  onMessage: (rideId: string) => void;
  ride: Ride | null;
  role: TripViewRole;
  trip: PassengerTrip | PublishedTrip | null;
};

function TripsSummaryPanel({ onMessage, ride, role, trip }: TripsSummaryPanelProps) {
  if (!trip) {
    return null;
  }

  const isPassengerTrip = role === "passenger";
  const total = isPassengerTrip && ride ? trip.price + ride.serviceFee + ride.taxes : trip.price;

  return (
    <div className="hidden xl:block">
      <div className="glass-card rounded-xl p-6 sticky top-0">
        <h3 className="text-lg font-medium text-white mb-6">Détails du Trajet</h3>
        <div className="w-full h-40 bg-brand-surface rounded-lg border border-white/5 mb-6 relative overflow-hidden flex items-center justify-center">
          {ride?.mapImage ? (
            <img src={ride.mapImage} alt={trip.routeLabel} className="absolute inset-0 h-full w-full object-cover opacity-50" />
          ) : (
            <OpenRideIcon name="map-location-dot" className="text-4xl text-white/10" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-surfaceLight to-transparent opacity-50" />
        </div>

        <div className="relative pl-6 space-y-6 mb-8 border-l border-white/10 ml-3">
          <div className="relative">
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-brand-surface border-2 border-brand-accentPurple z-10" />
            <p className="text-sm font-medium text-white">{ride?.originCity ?? trip.routeLabel.split(" → ")[0]}</p>
            <p className="text-xs text-gray-500 mt-1">{trip.departureLabel}</p>
          </div>
          <div className="relative">
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-brand-surface border-2 border-brand-accentPurple z-10" />
            <p className="text-sm font-medium text-white">{ride?.arrivalLocation ?? trip.routeLabel.split(" → ")[1]}</p>
            <p className="text-xs text-gray-500 mt-1">{ride?.arrivalTime ?? "Arrivée prévue"}</p>
          </div>
        </div>

        {isPassengerTrip ? (
          <div className="p-4 rounded-lg bg-brand-surface border border-white/5 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <img src={(trip as PassengerTrip).driverAvatar} className="w-10 h-10 rounded-full" alt={(trip as PassengerTrip).driverName} />
              <div>
                <p className="text-sm font-medium text-white">{(trip as PassengerTrip).driverName}</p>
                <div className="flex items-center gap-1 text-xs">
                  <OpenRideIcon name="star" className="text-brand-warning" />
                  <span className="text-gray-300">{ride?.driver.rating.toFixed(1) ?? "4.8"} ({ride?.driver.reviewCount ?? 24} avis)</span>
                </div>
              </div>
              <button
                className="ml-auto w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 transition-colors"
                onClick={() => onMessage(trip.rideId)}
                type="button"
              >
                <OpenRideIcon name="message" />
              </button>
            </div>
            <div className="flex items-center gap-2 text-xs text-brand-success">
              <OpenRideIcon name="shield-check" />
              <span>Profil vérifié</span>
            </div>
          </div>
        ) : null}

        <div className="space-y-3">
          {isPassengerTrip ? (
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Paiement</span>
              <span
                className={
                  (trip as PassengerTrip).paymentStatus === "cash_pending"
                    ? "text-brand-accentYellow"
                    : (trip as PassengerTrip).paymentStatus === "authorized"
                      ? "text-brand-warning"
                      : "text-brand-success"
                }
              >
                {(trip as PassengerTrip).paymentStatus === "cash_pending"
                  ? "Cash à bord"
                  : (trip as PassengerTrip).paymentStatus === "authorized"
                    ? "Paiement autorisé"
                    : "Payé en ligne"}
              </span>
            </div>
          ) : null}
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">{isPassengerTrip ? "Prix par place" : "Prix proposé"}</span>
            <span className="text-white">CA${trip.price.toFixed(2)}</span>
          </div>
          {isPassengerTrip && ride ? (
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Frais de service</span>
              <span className="text-white">CA${(ride.serviceFee + ride.taxes).toFixed(2)}</span>
            </div>
          ) : null}
          <div className="flex justify-between text-base font-medium pt-3 border-t border-white/5">
            <span className="text-white">{isPassengerTrip ? "Total payé" : "Total attendu"}</span>
            <span className="text-brand-accentPurple">CA${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripsSummaryPanel;
