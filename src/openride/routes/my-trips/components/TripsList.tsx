import { OpenRideIcon } from "@/openride/shared/icons";
import type {
  DriverAvailabilityPost,
  MyTripsCollection,
  PassengerTrip,
  PublishedTrip,
  RiderRequestPost,
} from "@/openride/shared/workflows";

type TripsListItem = PassengerTrip | PublishedTrip | RiderRequestPost | DriverAvailabilityPost;

type TripsListProps = {
  collection: MyTripsCollection;
  items: TripsListItem[];
  onCancelAvailability: (availabilityId: string) => void;
  onCancelRequest: (requestId: string) => void;
  onMessage: (rideId: string) => void;
  onOpenDetails: (rideId: string) => void;
  onSelectItem: (itemId: string) => void;
  selectedItemId: string | null;
};

function TripsList({
  collection,
  items,
  onCancelAvailability,
  onCancelRequest,
  onMessage,
  onOpenDetails,
  onSelectItem,
  selectedItemId,
}: TripsListProps) {
  return (
    <div className="xl:col-span-2 space-y-4">
      {items.map((item) => {
        const isSelected = selectedItemId === item.id;

        return (
          <div
            key={item.id}
            className={`glass-card rounded-xl p-5 cursor-pointer ${
              isSelected ? "border-brand-accentPurple/50 shadow-[0_0_15px_rgba(139,92,246,0.1)]" : ""
            }`}
            onClick={() => onSelectItem(item.id)}
          >
            {collection === "bookings" ? (
              <>
                <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-surface border border-white/10 flex items-center justify-center text-brand-accentPurple">
                      <OpenRideIcon name="car" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{item.routeLabel}</h3>
                      <p className="text-sm text-gray-400">{(item as PassengerTrip).departureLabel}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="rounded-md border border-brand-success/20 bg-brand-success/10 px-2.5 py-1 text-xs font-medium text-brand-success">
                      {(item as PassengerTrip).status === "confirmed" ? "Confirmé" : "En attente"}
                    </span>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {(item as PassengerTrip).price.toFixed(2)} €
                    </p>
                  </div>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-4 border-y border-white/5 py-4 sm:grid-cols-4">
                  <div>
                    <p className="mb-1 text-xs text-gray-500">Conducteur</p>
                    <div className="flex items-center gap-2">
                      <img
                        src={(item as PassengerTrip).driverAvatar}
                        className="h-6 w-6 rounded-full"
                        alt={(item as PassengerTrip).driverName}
                      />
                      <span className="text-sm text-gray-300">{(item as PassengerTrip).driverName}</span>
                    </div>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-gray-500">Passagers</p>
                    <span className="text-sm text-gray-300">{(item as PassengerTrip).passengersLabel}</span>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-gray-500">Paiement</p>
                    <span
                      className={`text-sm ${
                        (item as PassengerTrip).paymentStatus === "cash_pending"
                          ? "text-brand-accentYellow"
                          : (item as PassengerTrip).paymentStatus === "paid"
                            ? "text-brand-success"
                            : "text-brand-warning"
                      }`}
                    >
                      {(item as PassengerTrip).paymentStatus === "cash_pending"
                        ? "Cash à bord"
                        : (item as PassengerTrip).paymentStatus === "paid"
                          ? "Payé"
                          : "Autorisé"}
                    </span>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-gray-500">Véhicule</p>
                    <span className="text-sm text-gray-300">{(item as PassengerTrip).vehicleName}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    className="rounded-lg bg-brand-accentPurple px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-accentPurpleDark"
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onOpenDetails((item as PassengerTrip).rideId);
                    }}
                  >
                    Voir détails
                  </button>
                  <button
                    className="rounded-lg bg-brand-surface px-4 py-2 text-sm font-medium text-white border border-white/10 transition-colors hover:bg-white/5"
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onMessage((item as PassengerTrip).rideId);
                    }}
                  >
                    Message
                  </button>
                </div>
              </>
            ) : null}

            {collection === "trips" ? (
              <>
                <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-surface border border-white/10 flex items-center justify-center text-brand-accentGreen">
                      <OpenRideIcon name="route" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{item.routeLabel}</h3>
                      <p className="text-sm text-gray-400">{item.departureLabel}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="rounded-md border border-brand-accentPurple/20 bg-brand-accentPurple/10 px-2.5 py-1 text-xs font-medium text-brand-accentPurple">
                      {(item as PublishedTrip).status === "published" ? "Publié" : "Brouillon"}
                    </span>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {(item as PublishedTrip).price.toFixed(2)} €
                    </p>
                  </div>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-4 border-y border-white/5 py-4 sm:grid-cols-4">
                  <div>
                    <p className="mb-1 text-xs text-gray-500">Places</p>
                    <span className="text-sm text-gray-300">{item.passengersLabel}</span>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-gray-500">Annonce</p>
                    <span className="text-sm text-gray-300">Trajet planifié</span>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-gray-500">Statut</p>
                    <span className="text-sm text-gray-300">
                      {(item as PublishedTrip).status === "published" ? "Actif" : "Brouillon"}
                    </span>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-gray-500">Véhicule</p>
                    <span className="text-sm text-gray-300">{item.vehicleName}</span>
                  </div>
                </div>

                <button
                  className="rounded-lg bg-brand-accentGreen px-4 py-2 text-sm font-medium text-brand-dark transition-colors hover:bg-[#8be08b]"
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onOpenDetails(item.rideId);
                  }}
                >
                  Voir détails
                </button>
              </>
            ) : null}

            {collection === "requests" ? (
              <>
                <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-surface border border-white/10 flex items-center justify-center text-brand-accentGreen">
                      <OpenRideIcon name="comments" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{item.routeLabel}</h3>
                      <p className="text-sm text-gray-400">{(item as RiderRequestPost).timeWindow}</p>
                    </div>
                  </div>
                  <span className="rounded-md border border-brand-accentGreen/20 bg-brand-accentGreen/10 px-2.5 py-1 text-xs font-medium text-brand-accentGreen self-start">
                    {(item as RiderRequestPost).kind === "active"
                      ? "Active"
                      : (item as RiderRequestPost).kind === "fulfilled"
                        ? "Pourvue"
                        : "Annulée"}
                  </span>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-4 border-y border-white/5 py-4 sm:grid-cols-4">
                  <div>
                    <p className="mb-1 text-xs text-gray-500">Date</p>
                    <span className="text-sm text-gray-300">{(item as RiderRequestPost).date}</span>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-gray-500">Places</p>
                    <span className="text-sm text-gray-300">{(item as RiderRequestPost).seatCount}</span>
                  </div>
                  <div className="col-span-2">
                    <p className="mb-1 text-xs text-gray-500">Note</p>
                    <span className="text-sm text-gray-300">{(item as RiderRequestPost).notes}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button className="rounded-lg bg-brand-accentPurple px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-accentPurpleDark">
                    Voir correspondances
                  </button>
                  {(item as RiderRequestPost).kind === "active" ? (
                    <button
                      className="rounded-lg bg-transparent px-4 py-2 text-sm font-medium text-gray-400 transition-colors hover:bg-brand-error/10 hover:text-brand-error"
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        onCancelRequest(item.id);
                      }}
                    >
                      Annuler
                    </button>
                  ) : null}
                </div>
              </>
            ) : null}

            {collection === "availabilities" ? (
              <>
                <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-surface border border-white/10 flex items-center justify-center text-brand-accentGreen">
                      <OpenRideIcon name="clock" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{(item as DriverAvailabilityPost).routeLabel}</h3>
                      <p className="text-sm text-gray-400">{(item as DriverAvailabilityPost).timeWindow}</p>
                    </div>
                  </div>
                  <span className="rounded-md border border-brand-accentGreen/20 bg-brand-accentGreen/10 px-2.5 py-1 text-xs font-medium text-brand-accentGreen self-start">
                    {(item as DriverAvailabilityPost).kind === "active"
                      ? "Active"
                      : (item as DriverAvailabilityPost).kind === "fulfilled"
                        ? "Pourvue"
                        : "Annulée"}
                  </span>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-4 border-y border-white/5 py-4 sm:grid-cols-4">
                  <div>
                    <p className="mb-1 text-xs text-gray-500">Zone</p>
                    <span className="text-sm text-gray-300">{(item as DriverAvailabilityPost).zone}</span>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-gray-500">Places</p>
                    <span className="text-sm text-gray-300">{(item as DriverAvailabilityPost).seats}</span>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-gray-500">Date</p>
                    <span className="text-sm text-gray-300">{(item as DriverAvailabilityPost).date}</span>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-gray-500">Véhicule</p>
                    <span className="text-sm text-gray-300">{(item as DriverAvailabilityPost).vehicleName}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button className="rounded-lg bg-brand-accentGreen px-4 py-2 text-sm font-medium text-brand-dark transition-colors hover:bg-[#8be08b]">
                    Voir demandes
                  </button>
                  {(item as DriverAvailabilityPost).kind === "active" ? (
                    <button
                      className="rounded-lg bg-transparent px-4 py-2 text-sm font-medium text-gray-400 transition-colors hover:bg-brand-error/10 hover:text-brand-error"
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        onCancelAvailability(item.id);
                      }}
                    >
                      Annuler
                    </button>
                  ) : null}
                </div>
              </>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default TripsList;
