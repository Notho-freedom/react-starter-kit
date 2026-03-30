import { useNavigate } from "react-router-dom";
import { OpenRideIcon } from "@/openride/shared/icons";
import { useOpenRideWorkflow } from "@/openride/shared/workflows";

function RideResultsList() {
  const navigate = useNavigate();
  const workflow = useOpenRideWorkflow();
  const activeAvailabilities = workflow.driverAvailabilities.filter(
    (availability) => availability.kind === "active",
  );

  return (
    <div className="w-full lg:w-5/12 xl:w-1/2 overflow-y-auto hide-scroll p-4 md:p-6 flex flex-col gap-6">
      <div className="space-y-1">
        <p className="text-sm text-gray-400">
          {workflow.searchRides.length} trajets planifiés • {activeAvailabilities.length} chauffeurs
          disponibles
        </p>
        <h2 className="text-lg font-semibold text-white">Choisissez le format qui vous convient</h2>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-accentPurple">
            Trajets planifiés
          </h3>
          <span className="text-xs text-gray-500">{workflow.searchRides.length} résultats</span>
        </div>

        {workflow.searchRides.map((ride) => {
          const isSelected = workflow.selectedRide?.id === ride.id;

          return (
            <div
              key={ride.id}
              className={`glass-card rounded-2xl p-5 flex flex-col gap-4 cursor-pointer hover:border-brand-purple/50 relative overflow-hidden group ${
                isSelected ? "border-brand-purple/30 shadow-[0_0_15px_rgba(139,92,246,0.12)]" : ""
              }`}
              onClick={() => {
                workflow.setSelectedRide(ride.id);
                navigate("/trip-details");
              }}
            >
              {isSelected ? <div className="absolute top-0 left-0 w-1 h-full bg-brand-purple" /> : null}

              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={ride.driver.avatar}
                      alt={ride.driver.name}
                      className={`w-12 h-12 rounded-full ${
                        isSelected ? "border-2 border-brand-purple/30" : "border-2 border-gray-600"
                      }`}
                    />
                    <div className="absolute -bottom-1 -right-1 bg-brand-green text-brand-dark text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-brand-surface">
                      {ride.driver.rating.toFixed(1)} <OpenRideIcon name="star" className="text-[8px]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">{ride.driver.shortName}</h3>
                    <p className="text-xs text-gray-400">
                      {ride.driver.vehicleName} • {ride.driver.vehicleColor}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">{ride.priceLabel}</p>
                  <p
                    className={`text-xs font-medium ${
                      ride.seatsLeft <= 1 ? "text-brand-accent" : "text-brand-green"
                    }`}
                  >
                    {ride.seatsLeft} seat{ride.seatsLeft > 1 ? "s" : ""} left
                  </p>
                </div>
              </div>

              <div className="bg-gray-800/30 rounded-xl p-4 mt-2 border border-gray-700/30">
                <div className="relative pl-6 py-1 border-l-2 border-dashed border-gray-600 ml-2 space-y-6">
                  <div className="relative">
                    <div className="absolute -left-[1.65rem] top-1 w-3 h-3 bg-brand-surface border-2 border-brand-purpleLight rounded-full" />
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-bold text-white">
                          {ride.departureTime}
                          <span className="text-gray-400 font-normal ml-2">{ride.originCity}</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{ride.departureStation}</p>
                      </div>
                      <span className="text-xs text-gray-500">{ride.distanceLabel}</span>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[1.65rem] top-1 w-3 h-3 bg-brand-surface border-2 border-brand-accent rounded-full" />
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-bold text-white">
                          {ride.arrivalTime}
                          <span className="text-gray-400 font-normal ml-2">{ride.arrivalLocation}</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{ride.arrivalStation}</p>
                      </div>
                      <span className="text-xs text-gray-500">{ride.durationLabel}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex gap-3 text-gray-400 flex-wrap">
                  <div className="flex items-center gap-1 bg-gray-800/50 px-2 py-1 rounded text-xs">
                    <OpenRideIcon name="suitcase" />
                    <span className="hidden sm:inline">{ride.preferences.luggage}</span>
                  </div>
                  {ride.preferences.instantBook ? (
                    <div className="flex items-center gap-1 bg-brand-accent/10 text-brand-accent px-2 py-1 rounded text-xs">
                      <OpenRideIcon name="bolt" />
                      <span className="hidden sm:inline">Instant</span>
                    </div>
                  ) : null}
                </div>

                <button
                  type="button"
                  className="bg-brand-purple hover:bg-brand-purpleLight text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-lg shadow-brand-purple/20"
                  onClick={(event) => {
                    event.stopPropagation();
                    workflow.setSelectedRide(ride.id);
                    navigate("/trip-details");
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-accentGreen">
            Chauffeurs disponibles
          </h3>
          <span className="text-xs text-gray-500">{activeAvailabilities.length} actifs</span>
        </div>

        {activeAvailabilities.map((availability) => (
          <div
            key={availability.id}
            className="glass-card rounded-2xl border border-white/10 p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  alt={availability.driverName}
                  className="h-12 w-12 rounded-full border border-white/10"
                  src={availability.driverAvatar}
                />
                <div>
                  <h4 className="font-semibold text-white">{availability.driverName}</h4>
                  <p className="text-xs text-brand-textMuted">
                    {availability.vehicleName} • {availability.driverRating.toFixed(1)}{" "}
                    <OpenRideIcon name="star" className="text-brand-warning" />
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-brand-accentGreen/10 px-3 py-1 text-xs font-medium text-brand-accentGreen">
                Disponible
              </span>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-brand-surface p-4">
              <p className="text-sm font-medium text-white">{availability.routeLabel}</p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs text-brand-textMuted">
                <span className="rounded-full bg-white/5 px-3 py-1">{availability.date}</span>
                <span className="rounded-full bg-white/5 px-3 py-1">{availability.timeWindow}</span>
                <span className="rounded-full bg-white/5 px-3 py-1">
                  {availability.seats} places
                </span>
              </div>
              <p className="mt-3 text-sm text-brand-textMuted">{availability.notes}</p>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="text-xs text-gray-500">Pas de destination imposée</span>
              <button
                className="rounded-lg bg-brand-accentGreen px-4 py-2 text-sm font-medium text-brand-dark transition-colors hover:bg-[#8be08b]"
                type="button"
                onClick={async () => {
                  await workflow.openConversationForContext({
                    contextId: availability.id,
                    contextType: "availability",
                    counterpartAvatar: availability.driverAvatar,
                    counterpartName: availability.driverName,
                    counterpartRoleLabel: "Conducteur disponible",
                    routeLabel: availability.routeLabel,
                    statusLabel: "Disponibilité active",
                  });
                  navigate("/messages");
                }}
              >
                Contacter
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default RideResultsList;
