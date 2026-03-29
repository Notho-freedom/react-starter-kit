import { useNavigate } from "react-router-dom";
import { OpenRideIcon } from "@/openride/shared/icons";
import { useOpenRideWorkflow } from "@/openride/shared/workflows";

function RideResultsList() {
  const navigate = useNavigate();
  const workflow = useOpenRideWorkflow();

  return (
    <div className="w-full lg:w-5/12 xl:w-1/2 overflow-y-auto hide-scroll p-4 md:p-6 flex flex-col gap-4">
      <p className="text-sm text-gray-400 mb-2">{workflow.searchRides.length} rides available</p>

      {workflow.searchRides.map((ride) => {
        const isSelected = workflow.selectedRide?.id === ride.id;

        return (
          <div
            key={ride.id}
            className={`glass-card rounded-2xl p-5 flex flex-col gap-4 cursor-pointer hover:border-brand-purple/50 relative overflow-hidden group ${isSelected ? "border-brand-purple/30 shadow-[0_0_15px_rgba(139,92,246,0.12)]" : ""}`}
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
                    className={`w-12 h-12 rounded-full ${isSelected ? "border-2 border-brand-purple/30" : "border-2 border-gray-600"}`}
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
                <p className={`text-xs font-medium ${ride.seatsLeft <= 1 ? "text-brand-accent" : "text-brand-green"}`}>
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
                <div className="flex items-center gap-1 bg-gray-800/50 px-2 py-1 rounded text-xs">
                  <OpenRideIcon name={ride.preferences.petsAllowed ? "paw" : "volume-xmark"} />
                  <span className="hidden sm:inline">
                    {ride.preferences.petsAllowed ? "Pets OK" : ride.preferences.ambience}
                  </span>
                </div>
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
    </div>
  );
}

export default RideResultsList;
