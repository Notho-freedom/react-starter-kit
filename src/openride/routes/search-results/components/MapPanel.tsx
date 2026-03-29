import { useNavigate } from "react-router-dom";
import { OpenRideIcon } from "@/openride/shared/icons";
import { useOpenRideWorkflow } from "@/openride/shared/workflows";

function MapPanel() {
  const navigate = useNavigate();
  const workflow = useOpenRideWorkflow();
  const selectedRide = workflow.selectedRide ?? workflow.searchRides[0];

  return (
    <div className="hidden lg:block w-7/12 xl:w-1/2 relative h-full border-l border-gray-800/50">
      <div className="absolute inset-0 bg-[#0B0F19] z-0">
        <img
          className="w-full h-full object-cover opacity-70 mix-blend-screen"
          src={selectedRide?.mapImage}
          alt="detailed dark mode map showing routes and pins"
        />
      </div>

      <div className="absolute top-6 right-6 z-10 flex flex-col gap-2">
        <button className="w-10 h-10 glass-card rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors shadow-lg shadow-black/50">
          <OpenRideIcon name="plus" className="text-white" />
        </button>
        <button className="w-10 h-10 glass-card rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors shadow-lg shadow-black/50">
          <OpenRideIcon name="minus" className="text-white" />
        </button>
        <button className="w-10 h-10 glass-card rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors shadow-lg shadow-black/50 mt-4">
          <OpenRideIcon name="location-crosshairs" className="text-brand-purpleLight" />
        </button>
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none">
        {workflow.searchRides.map((ride, index) => {
          const positions = [
            "top-[30%] left-[40%]",
            "top-[45%] left-[25%]",
            "top-[20%] left-[60%]",
          ];
          const isSelected = ride.id === selectedRide?.id;

          return (
            <div
              key={ride.id}
              className={`absolute ${positions[index] ?? positions[0]} flex flex-col items-center pointer-events-auto cursor-pointer group`}
              onClick={() => workflow.setSelectedRide(ride.id)}
            >
              <div className={`bg-brand-surfaceLight px-3 py-1 rounded-full text-xs font-bold text-white mb-1 shadow-lg ${isSelected ? "border border-brand-purple opacity-100" : "border border-gray-600 opacity-0 group-hover:opacity-100"} transition-opacity`}>
                {ride.priceLabel}
              </div>
              <div className={`map-marker ${isSelected ? "active" : ""}`}>
                <OpenRideIcon name="car" className="text-xs" />
              </div>
            </div>
          );
        })}

        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
          <path
            d="M 300 250 Q 400 350 500 500"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth={3}
            strokeDasharray="5,5"
            className="opacity-50"
          />
        </svg>
      </div>

      {selectedRide ? (
        <div className="absolute bottom-6 left-6 right-6 z-20 pointer-events-none">
          <div className="glass-card rounded-2xl p-4 pointer-events-auto shadow-2xl border-brand-purple/50 flex gap-4 items-center">
            <img
              src={selectedRide.driver.avatar}
              alt={selectedRide.driver.name}
              className="w-14 h-14 rounded-xl border border-brand-purple/30 object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-white font-bold">{selectedRide.driver.shortName}</h4>
                  <p className="text-xs text-gray-400">
                    {selectedRide.departureTime} {selectedRide.originCity} → {selectedRide.arrivalTime}{" "}
                    {selectedRide.arrivalLocation}
                  </p>
                </div>
                <span className="text-lg font-bold text-white">{selectedRide.priceLabel}</span>
              </div>
              <div className="flex gap-2 mt-2">
                <span className="text-[10px] bg-brand-green/20 text-brand-green px-2 py-0.5 rounded border border-brand-green/30">
                  {selectedRide.seatsLeft} seats
                </span>
                {selectedRide.preferences.instantBook ? (
                  <span className="text-[10px] bg-brand-accent/20 text-brand-accent px-2 py-0.5 rounded border border-brand-accent/30">
                    Instant Book
                  </span>
                ) : null}
              </div>
            </div>
            <button
              className="bg-brand-purple hover:bg-brand-purpleLight text-white w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
              onClick={() => navigate("/trip-details")}
              type="button"
            >
              <OpenRideIcon name="chevron-right" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default MapPanel;
